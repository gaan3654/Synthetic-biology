let chart;
let tList;
let sde = false;
let colors = [];
var legendData = [];

function createCharts(am4core, sdeValue) {
  // VALUE DOES NOT GET SET
  sde = sdeValue;
  console.log("sde", sde);

  am4core.useTheme(am4themes_animated);
  chart = am4core.create("chartdiv", am4charts.XYChart);

  let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.title.text = "Time";

  let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = "Concentration";

  chart.scrollbarX = new am4charts.XYChartScrollbar();
}

function addLegend(showOnlyMean, sde) {
  console.log("showOnlyMean", legendData);
  chart.legend = new am4charts.Legend();
  chart.legend.position = "right";
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

function addToChart(y, t, substance_obj, allIterations) {
  colors = [];
  for (let i = 0; i < substance_obj.length; i++) {
    console.log("substance_obj", substance_obj[i]);
    colors.push(substance_obj[i]["color"]);
    let legendObject = {
      name: "Medžiaga " + subs_html_name[i],
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
        createSeries(i, "Medžiaga " + subs_html_name[i], yList[i], colors[i])
      );
    }
    seriesAllList.push(seriesList);
  }
  if (allIterations) {
    console.log(allIterations);
    addMean(seriesAllList, allIterations);
  }
}

function addThreshold(threshold) {
  let series = [];
  for (let i = 0; i < threshold.length; i++) {
    let data = new Array(tList.length).fill(threshold[i]);
    series[i] = createSeries("Threshold", "Intervalas", data, "#000", true);
    series[i].hiddenInLegend = true;
  }
  chart.legend.data = window.legendData;
}

// Create series
function createSeries(s, name, y, color, threshold) {
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value" + s;
  series.dataFields.valueX = "time";
  series.name = name;
  series.strokeWidth = 1;
  series.properties.stroke = am4core.color(color);
  // series.legendSettings.labelText = "[{stroke}]{name}[/]";

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

function meanOfSeries(seriesList, meanSeries, y) {
  let data = [];
  for (let i = 0; i < y[0].length - 1; i++) {
    let value = 0;
    for (let s = 0; s < seriesList.length; s++) {
      console.log(subs_html_name[s]);
      console.log(seriesList[s]);
      console.log(seriesList[s].data.length);
      console.log(seriesList[s].data[i]);
      console.log(seriesList[s].data[i]["Medžiaga " + subs_html_name[s]]);
      value += seriesList[s].data[i]["Medžiaga " + subs_html_name[s]];
    }

    let dataItem = { time: tList[i] };
    dataItem["valueMean"] = value / seriesList.length;
    data.push(dataItem);
  }
  meanSeries.data = data;
}

function addMean(seriesList, y) {
  let meanSeries = chart.series.push(new am4charts.LineSeries());
  meanSeries.dataFields.valueY = "valueMean";
  meanSeries.dataFields.valueX = "time";
  meanSeries.name = "Mean";
  addFeatures(meanSeries);
  meanSeries.strokeWidth = 2;
  meanOfSeries(seriesList, meanSeries, y);

  meanSeries.tooltipText =
    "Time: [bold]{valueX}[/]\nConcentration: [bold]{categoryY}[/]";
  meanSeries.tooltip.pointerOrientation = "vertical";
  meanSeries.tooltip.background.cornerRadius = 20;
  meanSeries.tooltip.background.fillOpacity = 0.5;
  meanSeries.tooltip.label.padding(12, 12, 12, 12);
}

function addFeatures(series) {
  let segment = series.segments.template;
  segment.interactionsEnabled = true;

  let hoverState = segment.states.create("hover");
  hoverState.properties.strokeWidth = 3;

  let dimmed = segment.states.create("dimmed");
  // dimmed.properties.stroke = am4core.color("#0adada");
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
