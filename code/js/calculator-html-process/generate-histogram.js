function genetareHistogramData(N, substance_obj, iterations) {
  let yIterations = [];
  let objectList = [];
  let substanceObjectList = [];
  let index = 0;
  for (let i = 0; i < 2; i++) {
    if (i > 0) {
      index = N - 1;
    }
    for (
      let substance = 0;
      substance < sdeAllYIterations[0].length;
      substance++
    ) {
      let substanceY = [];
      let dataObject = [];
      for (
        let iteration = 0;
        iteration < sdeAllYIterations.length;
        iteration++
      ) {
        substanceY.push(sdeAllYIterations[iteration][substance][index]);
      }
      let min = Math.min.apply(Math, substanceY);
      let max = Math.max.apply(Math, substanceY);
      yIterations.push(substanceY);
      let [thresholds, amounts] = generateDistribution(
        substanceY,
        min,
        max,
        iterations
      );
      for (let i = 0; i < thresholds.length; i++) {
        let object = {};
        object["interval"] = thresholds[i];
        object["amount"] = amounts[i];
        dataObject.push(object);
      }

      if (i == 1 && substance == 0) {
        $("#graph-title-1").css("display", "block");
        $("#graph-title-2").css("display", "block");
        $("#graphs").css("display", "inline");
        $("#graph-container").css("width", "48%");
        $("#graph-container-right").css("width", "48%");
      }
      if (objectList.length != 0) {
        if (i == 1) {
          addGraph(
            "graph-container-right",
            substance + sdeAllYIterations[0].length
          );
          graphList.push(
            "chartdiv" + (substance + sdeAllYIterations[0].length)
          );
        } else {
          addGraph("graph-container", substance);
          graphList.push("chartdiv" + substance);
        }
      }
      objectList.push(dataObject);
      substanceObjectList.push(substance_obj[substance]);
    }
  }
  draw(objectList, substanceObjectList);
  return yIterations;
}

function generateDistribution(y, min, max, iterations) {
  let interval = max / 100;
  let distribution = generateDistributionIntervals(
    min,
    max,
    interval,
    iterations
  );

  for (let i = 0; i < y.length; i++) {
    for (let j = 0; j < distribution.length; j++) {
      if (y[i] >= distribution[j]["min"] && y[i] < distribution[j]["max"]) {
        distribution[j]["count"] += 1;
        break;
      }
    }
  }

  let threshtolds = [];
  let amounts = [];
  for (let i = 0; i < distribution.length; i++) {
    threshtolds.push(distribution[i]["min"]);
    amounts.push(distribution[i]["count"]);
  }
  return [threshtolds, amounts];
}

function generateDistributionIntervals(min, max, interval, iterations) {
  let distribution = [];
  while (max > min) {
    let distributionObject = {};
    distributionObject["min"] = min;
    distributionObject["max"] = min + interval;
    distributionObject["count"] = 0;
    min += interval;
    distribution.push(distributionObject);
  }
  if (max === min) {
    let distributionObject = {};
    distributionObject["min"] = min;
    distributionObject["max"] = min + interval;
    distributionObject["count"] = iterations;
    min += interval;
    distribution.push(distributionObject);
  }
  return distribution;
}
