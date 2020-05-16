let chart;
let tList;
let colors = [];
var legendData = [];

function createCharts(am4core, weakEuler) {
  am4core.useTheme(am4themes_animated);
  chart = am4core.create("chartdiv", am4charts.XYChart);

  let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.title.text = "Laikas";

  let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = "Koncentracija";

  if (weakEuler) {
    xAxis.title.text = "Intervalas";
    yAxis.title.text = "Pasikartojimai";
  }

  chart.scrollbarX = new am4charts.XYChartScrollbar();
}

function addLegend(showOnlyMean, sde) {
  chart.legend = new am4charts.Legend();
  chart.legend.position = "bottom";
  chart.legend.scrollable = true;

  chart.legend.markers.template.width = 20;
  chart.legend.markers.template.height = 1;

  if (!showOnlyMean && sde) {
    chart.legend.data = window.legendData;
  } else {
    chart.legend.itemContainers.template.events.on("over", function (event) {
      processOver(event.target.dataItem.dataContext);
    });

    chart.legend.itemContainers.template.events.on("out", function (event) {
      processOut(event.target.dataItem.dataContext);
    });
  }
}

function addToChart(y, t, substance_obj, showOnlyMeans, sde, allIterations) {
  colors = [];
  for (let i = 0; i < substance_obj.length; i++) {
    colors.push(substance_obj[i]["color"]);
    let legendObject = {
      name: "Medžiaga " + substance_obj[i]["name"],
      fill: colors[i],
    };
    if (!legendData.some((data) => data.name === legendObject.name)) {
      legendData.push(legendObject);
    }
  }
  tList = t;
  seriesAllList = [];
  for (let j = 0; j < y.length; j++) {
    let yList = y[j];
    let seriesList = [];
    for (let i = 0; i < yList.length; i++) {
      seriesList.push(
        createSeries(
          i,
          "Medžiaga " + substance_obj[i]["name"],
          yList[i],
          colors[i],
          showOnlyMeans,
          sde
        )
      );
    }
    seriesAllList.push(seriesList);
  }
  if (allIterations) {
    addMean(allIterations);
  }
}

function addThreshold(threshold) {
  let series = [];
  for (let i = 0; i < threshold.length; i++) {
    let data = new Array(tList.length).fill(threshold[i]);
    series[i] = createSeries(
      "Threshold",
      "Intervalas",
      data,
      "#000",
      false,
      true,
      true
    );
    series[i].hiddenInLegend = true;
  }
  chart.legend.data = window.legendData;
}

function createSeries(s, name, y, color, showOnlyMeans, sde, threshold, mean) {
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value" + s;
  series.dataFields.valueX = "time";
  series.name = name;
  series.properties.stroke = am4core.color(color);
  if (mean || threshold) {
    series.strokeWidth = 2;
    series.properties.strokeOpacity = 1;
  } else if (!showOnlyMeans && sde) {
    series.strokeWidth = 1;
    series.properties.strokeOpacity = 0.5;
  } else {
    series.strokeWidth = 1;
    series.properties.strokeOpacity = 1;
  }

  if (threshold) {
    series.strokeDasharray = 7;
    series.strokeWidth = 2;
  }

  addFeatures(series);

  let data = [];
  for (let i = 0; i < y.length - 1; i++) {
    let dataItem = { time: tList[i] };
    dataItem["value" + s] = y[i];
    data.push(dataItem);
  }
  series.data = data;

  return series;
}

function addMean(allIterations) {
  let meanSeries = [];
  for (let substance = 0; substance < allIterations[0].length; substance++) {
    let yList = [];
    for (let n = 0; n < allIterations[0][substance].length; n++) {
      let value = 0;
      for (let iteration = 0; iteration < allIterations.length; iteration++) {
        value += allIterations[iteration][substance][n];
      }
      yList.push(value / allIterations.length);
    }
    meanSeries.push(
      createSeries("Mean", "Vidurkis ", yList, "#000", false, true, false, true)
    );
  }

  let legendObject = {
    name: "Vidurkis",
    fill: "#000",
  };
  if (!legendData.some((data) => data.name === legendObject.name)) {
    legendData.push(legendObject);
  }
}

function addFeatures(series) {
  let segment = series.segments.template;
  segment.interactionsEnabled = true;

  let hoverState = segment.states.create("hover");
  hoverState.properties.strokeWidth = 3;

  let dimmed = segment.states.create("dimmed");
  dimmed.properties.stroke = am4core.color("#d3d3d3");

  segment.events.on("over", function (event) {
    processOver(event.target.parent.parent.parent);
  });

  segment.events.on("out", function (event) {
    processOut(event.target.parent.parent.parent);
  });

  // Set it on chart's container
  chart.svgContainer.htmlElement.style.height = "900px";
}

function processOver(hoveredSeries) {
  hoveredSeries.toFront();

  hoveredSeries.segments.each(function (segment) {
    segment.setState("hover");
  });

  chart.series.each(function (series) {
    if (series != hoveredSeries) {
      series.segments.each(function (segment) {
        segment.setState("dimmed");
      });
      series.bulletsContainer.setState("dimmed");
    }
  });
}

function processOut(hoveredSeries) {
  chart.series.each(function (series) {
    series.segments.each(function (segment) {
      segment.setState("default");
    });
    series.bulletsContainer.setState("default");
  });
}
