var sdeAllYIterations = [];

$("#submit").click(function () {
  $("#calculate-probability").css("display", "inline");
  $("#probability").css("display", "inline");
  var int_begin = parseFloat(document.getElementById("int_begins").value);
  var int_end = parseFloat(document.getElementById("int_ends").value);
  var N = parseInt(document.getElementById("n_inp").value);
  let timeCoordinate = [];
  let catalyzation = 0;
  let iterations = 1;
  let iterationsObject = document.getElementById("iterations");
  let showOnlyMean = false;
  let sde = iterationsObject != null;
  if (sde) {
    iterations = parseInt(iterationsObject.value);
    catalyzation = document.getElementById("reaction_cat").value;
    showOnlyMean = document.getElementById("show-only-mean").checked;
  }

  //Į objektą talpinami duomenis apie medžiagas:
  // Vietą masyvę; Pradinę koncentraciją; Spalvą;
  // Pasikartojimų kiekį; Buvimą kairėje ar dešinėje reakcijos pusėse
  // ---------------------------------------------------------------------------------------------------
  sdeAllYIterations = [];

  createCharts(am4core, false);
  for (let i = 0; i < iterations; i++) {
    var substance_obj = [];
    let possition = 0;
    let objectArray = [];
    for (let i = 0; i < reactions_id.length; i++) {
      var get_reaction = document.getElementById(`reaction_input_${i}`).value;
      get_reaction = get_reaction.split(/<?->/);
      get_reaction[0] = get_reaction[0]
        .replace(/\+/g, "")
        .replace(/\d+\*|\*\d+/g, "");
      get_reaction[1] = get_reaction[1]
        .replace(/\+/g, "")
        .replace(/\d+\*|\*\d+/g, "");
      let reaction_left = get_reaction[0].split("");
      let reaction_right = get_reaction[1].split("");

      var func_array = [
        document.getElementById(`reaction_side${i}_${reaction_left[0]}_L`)
          .value,
        document.getElementById(`reaction_side${i}_${reaction_right[0]}_R`)
          .value,
      ];

      //Padaryti, kad surastų medžiagų raides ir tik jas paimtų, o ne tiesiog visas raides
      var substance_array = [];

      let tmp = func_array[0];
      while (tmp.match(alphabet_pattern)) {
        substance_array.push(tmp.match(alphabet_pattern)[0]);
        tmp = tmp.replace(tmp.match(alphabet_pattern)[0], "");
      }

      var skip = "no";
      for (let i = 0; i < substance_array.length; i++) {
        //Nepridedamos dulikuotos medžiagų reikšmės
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
        //Sutikus medžiagą pirmą kartą, jos reikšmės inicializuojamos
        if (!objectArray.includes(substance_array[i], 0)) {
          var obj = {};
          obj[substance_array[i]] = `y[${possition++}][0]`;
          obj[`initial_conc`] = parseFloat(
            document.getElementById(`${substance_array[i]}`).value
          );
          obj["color"] = document.getElementById(
            `color${substance_array[i]}`
          ).value;
          obj["repetitions"] = 1;

          if (
            get_reaction[0].match(new RegExp(substance_array[i], "g")) &&
            get_reaction[1].match(new RegExp(substance_array[i], "g"))
          ) {
            obj["occurrences"] = "both";
            obj["function"] = `${func_array[0]}` + "+" + `${func_array[1]}`;
          } else if (
            get_reaction[0].match(new RegExp(substance_array[i], "g"))
          ) {
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
    }
    initializeValues(N, int_begin, int_end, substance_obj);

    let [yy, tt] = solution(substance_obj);

    sdeAllYIterations.push(yy);
    timeCoordinate.length == 0 ? (timeCoordinate = tt) : timeCoordinate;
  }

  if (showOnlyMean) {
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

    addToChart([yMeans], timeCoordinate, substance_obj);
  } else {
    if (iterations < 201) {
      addToChart(sdeAllYIterations, timeCoordinate, substance_obj);
      console.log("hello 100");
    } else if (iterations < 1001) {
      console.log("hello 1000");
      let y = [];
      for (let i = 0; i < sdeAllYIterations.length; i += 10) {
        y.push(sdeAllYIterations[i]);
      }
      addToChart(y, timeCoordinate, substance_obj);
    } else if (iterations < 10001) {
      console.log("hello 10000");
      let y = [];
      for (let i = 0; i < sdeAllYIterations.length; i += 100) {
        y.push(sdeAllYIterations[i]);
      }
      addToChart(y, timeCoordinate, substance_obj);
    } else {
      console.log("hello else");
      let y = [];
      for (let i = 0; i < sdeAllYIterations.length; i += 500) {
        y.push(sdeAllYIterations[i]);
        if (y.length > 100) {
          break;
        }
      }
      addToChart(y, timeCoordinate, substance_obj);
    }
  }
  addLegend(showOnlyMean, sde);
});

// $("#show-only-mean").click(function () {
//   let constraint = document.getElementById("iterations").value;
//   console.log(constraint);
//   var isReadOnly = false;
//   if (constraint > 1000) {
//     console.log("constraint");
//     document.getElementById("show-only-mean").checked = true;
//     var isReadOnly = true;
//   }
// });

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
        // console.log("last y", lastY, "substance", substance);
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
      // Reikia sugalvoti kaip atvaizduoti šiuos rezultatus
      d.innerHTML += `<p>${subs_html_name[i]}: ${substanceMeanList[i]}%</p>`;
    }
    $("#probability-result-block").css("display", "block");
    addThreshold([intervalBegin, intervalEnd]);
  } else {
    alert("Apskaičiuokite reakcijas");
  }
});
