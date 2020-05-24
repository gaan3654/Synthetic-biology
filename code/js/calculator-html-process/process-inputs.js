var sdeAllYIterations = [];
var substance_obj = [];
var position = 0;
var objectArray = [];
var weakEuler = false;
var graphList = [];
var chartList = [];

$("#submit").click(function () {
  var int_begin = parseFloat(document.getElementById("int_begins").value);
  var int_end = parseFloat(document.getElementById("int_ends").value);
  var N = parseInt(document.getElementById("n_inp").value);
  let timeCoordinate = [];
  let iterations = 1;
  let iterationsObject = document.getElementById("iterations");
  let showOnlyMean = false;
  let sde = iterationsObject != null;
  if (sde) {
    iterations = parseInt(iterationsObject.value);
    showOnlyMean = document.getElementById("show-only-mean").checked;
  } else {
    catalyzation = 0;
  }
  weakEuler = document.getElementById("checkbox-weak-euler").checked;
  sigma = [];

  sdeAllYIterations = [];

  for (let iteration = 0; iteration < iterations; iteration++) {
    substance_obj = [];
    position = 0;
    objectArray = [];
    for (let i = 0; i < reactions_id.length; i++) {
      get_reaction = extractSubstances(i);

      let reaction_left = get_reaction[0].split("");
      let reaction_right = get_reaction[1].split("");

      var func_array = [
        document.getElementById(`reaction_side${i}_${reaction_left[0]}_L`)
          .value,
        document.getElementById(`reaction_side${i}_${reaction_right[0]}_R`)
          .value,
      ];

      var substance_array = [];

      let tmp = func_array[0];
      while (tmp.match(alphabet_pattern)) {
        substance_array.push(tmp.match(alphabet_pattern)[0]);
        tmp = tmp.replace(tmp.match(alphabet_pattern)[0], "");
      }

      for (let substance = 0; substance < substance_array.length; substance++) {
        processDuplicates(substance_array, substance, func_array, sde);
        initializeSubstances(substance_array, substance, func_array);
      }
    }
    initializeValues(N, int_begin, int_end, substance_obj);

    let [yy, tt] = solution(substance_obj);

    sdeAllYIterations.push(yy);
    timeCoordinate.length == 0 ? (timeCoordinate = tt) : timeCoordinate;
  }
  if (weakEuler) {
    genetareHistogramData(N - 1, substance_obj, iterations);
  } else if (showOnlyMean) {
    showGraphBlocks();
    createCharts(am4core, true);
    let yMeans = drawOnlyMeans(iterations);
    addToChart([yMeans], timeCoordinate, substance_obj, showOnlyMean, sde);
  } else {
    showGraphBlocks();
    if (iterations < 201) {
      createCharts(am4core, true);
      if (sde) {
        addToChart(
          sdeAllYIterations,
          timeCoordinate,
          substance_obj,
          showOnlyMean,
          sde,
          sdeAllYIterations
        );
      } else {
        addToChart(
          sdeAllYIterations,
          timeCoordinate,
          substance_obj,
          showOnlyMean,
          sde
        );
      }
    } else {
      createCharts(am4core);
      if (iterations < 1001) {
        let y = [];
        for (let i = 0; i < sdeAllYIterations.length; i += 10) {
          y.push(sdeAllYIterations[i]);
        }
        addToChart(
          y,
          timeCoordinate,
          substance_obj,
          showOnlyMean,
          sde,
          sdeAllYIterations
        );
      } else if (iterations < 10001) {
        let y = [];
        for (let i = 0; i < sdeAllYIterations.length; i += 100) {
          y.push(sdeAllYIterations[i]);
        }
        addToChart(
          y,
          timeCoordinate,
          substance_obj,
          showOnlyMean,
          sde,
          sdeAllYIterations
        );
      } else {
        let y = [];
        for (let i = 0; i < sdeAllYIterations.length; i += 500) {
          y.push(sdeAllYIterations[i]);
          if (y.length > 100) {
            break;
          }
        }
        addToChart(
          y,
          timeCoordinate,
          substance_obj,
          showOnlyMean,
          sde,
          sdeAllYIterations
        );
      }
    }
  }
  if (!weakEuler) {
    addLegend(showOnlyMean, sde);
  }
});

function initializeSubstances(substance_array, i, func_array) {
  //Sutikus medžiagą pirmą kartą, jos reikšmės inicializuojamos
  if (!objectArray.includes(substance_array[i], 0)) {
    var obj = {};
    obj[substance_array[i]] = `y[${position++}][0]`;
    // ------------------------------------------------------------------------------------------
    let concentrationInput = document.getElementById(`${substance_array[i]}`)
      .value;
    if (!concentrationInput) {
      document.getElementById(substance_array[i]).value = "0";
      concentrationInput = 0;
    }
    // Process weak Euler
    let regex = new RegExp(/[^\d\.]/);
    if (regex.test(concentrationInput)) {
      let separator = concentrationInput.match(regex);
      let meanSigma = concentrationInput.split(separator);
      meanSigma = meanSigma.filter(Boolean);

      if (meanSigma.length > 1) {
        let randomConcentration = Math.abs(
          randomGaussian(meanSigma[0], meanSigma[1])
        );
        obj[`initial_conc`] = randomConcentration;
      } else {
        obj[`initial_conc`] = parseFloat(concentrationInput);
      }
    } else {
      obj[`initial_conc`] = parseFloat(concentrationInput);
    }
    // ------------------------------------------------------------------------------------------
    obj["color"] = document.getElementById(`color${substance_array[i]}`).value;
    obj["repetitions"] = 1;
    obj["name"] = substance_array[i];

    if (
      get_reaction[0].match(new RegExp(substance_array[i], "g")) &&
      get_reaction[1].match(new RegExp(substance_array[i], "g"))
    ) {
      obj["occurrences"] = "both";
      obj["function"] = `${func_array[0]}` + "+" + `${func_array[1]}`;
    } else if (get_reaction[0].match(new RegExp(substance_array[i], "g"))) {
      obj["occurrences"] = "left";
      obj["function"] = `${func_array[0]}`;
    } else {
      obj["occurrences"] = "right";
      obj["function"] = `${func_array[1]}`;
    }
    obj["catalyzation"] = catalyzation;
    substance_obj.push(obj);
    objectArray.push(substance_array[i]);
  }
}

function processDuplicates(substance_array, i, func_array, sde) {
  if (!sde) {
    for (let j = 0; j < substance_obj.length; j++) {
      if (
        substance_array[i] in substance_obj[j] &&
        substance_obj[j]["occurrences"] != "both"
      ) {
        substance_obj[j]["repetitions"]++;
        if (get_reaction[0].match(new RegExp(substance_array[i], "g"))) {
          substance_obj[j]["occurrences"] = "left";
          substance_obj[j][
            "function"
          ] = `${substance_obj[j]["function"]}+${func_array[0]}`;
        } else {
          substance_obj[j]["occurrences"] = "right";
          substance_obj[j][
            "function"
          ] = `${substance_obj[j]["function"]}+${func_array[1]}`;
        }
      }
    }
  }
}

function extractSubstances(i) {
  let get_reaction = document.getElementById(`reaction_input_${i}`).value;
  get_reaction = get_reaction.split(/<?->/);
  get_reaction[0] = get_reaction[0]
    .replace(/\+/g, "")
    .replace(/\d+\*|\*\d+/g, "");
  get_reaction[1] = get_reaction[1]
    .replace(/\+/g, "")
    .replace(/\d+\*|\*\d+/g, "");

  return get_reaction;
}

function drawOnlyMeans(iterations) {
  let yMeans = [];

  for (let i = 0; i < sdeAllYIterations[0].length; i++) {
    let ySum = [];

    for (let j = 0; j < sdeAllYIterations.length; j++) {
      if (j == 0) {
        ySum = sdeAllYIterations[j][i];
      } else {
        ySum = ySum.map((a, n) => a + sdeAllYIterations[j][i][n]);
      }
    }
    yMeans.push(ySum.map((a) => a / iterations));
  }

  return yMeans;
}

function showGraphBlocks() {
  $("#calculate-probability").css("display", "inline");
  $("#tooltip-probability").css("display", "block");
  $("#probability").css("display", "inline");
  $("#probability-block").css("display", "inline");
}

$("#calculate-probability").click(function () {
  let intervalBegin = document.getElementById("probability-interval-begin")
    .value;
  let intervalEnd = document.getElementById("probability-interval-end").value;

  let substanceMeanList = [];

  if (sdeAllYIterations.length > 0) {
    for (
      let substance = 0;
      substance < sdeAllYIterations[0].length;
      substance++
    ) {
      let yCount = 0;
      for (
        let iteration = 0;
        iteration < sdeAllYIterations.length;
        iteration++
      ) {
        let lastY =
          sdeAllYIterations[iteration][substance][
            sdeAllYIterations[iteration][substance].length - 1
          ];
        if (lastY <= intervalEnd && lastY >= intervalBegin) {
          yCount++;
        }
      }
      substanceMeanList.push(
        Math.round(((yCount * 100) / sdeAllYIterations.length) * 100) / 100
      );
    }
    var d = document.getElementById("probability-result-block");
    for (let i = 0; i < substanceMeanList.length; i++) {
      d.innerHTML += `<p id="probability-${subs_html_name[i]}" class="probability-result">
                        ${subs_html_name[i]}: ${substanceMeanList[i]}%
                      </p>`;
    }
    $("#probability-result-block").css("display", "block");
    addThreshold([intervalBegin, intervalEnd]);
  } else {
    alert("Apskaičiuokite reakcijas");
  }
});
