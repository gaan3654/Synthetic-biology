let chart;
let yList;
let tList;
let sde = false;
// function initializeChart(am4core) {}

function createCharts(am4core, sdeValue) {
  // VALUE DOES NOT GET SET
  sde = sdeValue;
  console.log(sde);
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  chart = am4core.create("chartdiv", am4charts.XYChart);

  // Create axes
  let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.title.text = "Time";
  let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = "Concentration";

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.yAxis = yAxis;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "right";
  chart.legend.scrollable = true;
  chart.legend.itemContainers.template.events.on("over", function (event) {
    processOver(event.target.dataItem.dataContext);
  });

  chart.legend.itemContainers.template.events.on("out", function (event) {
    processOut(event.target.dataItem.dataContext);
  });
}

function addToChart(y, t) {
  yList = y;
  tList = t;
  let seriesList = [];
  for (let i = 0; i < yList.length; i++) {
    seriesList.push(createSeries(i, "Medžiaga " + subs_html_name[i], yList[i]));
  }
  if (sde) {
    console.log(sde);
    addMean(seriesList, y);
  }
}

// Create series
function createSeries(s, name, y) {
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value" + s;
  series.dataFields.valueX = "time";
  series.name = name;

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
      value += seriesList[s].data[i]["value" + s];
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
  dimmed.properties.stroke = am4core.color("#0adada");

  segment.events.on("over", function (event) {
    processOver(event.target.parent.parent.parent);
  });

  segment.events.on("out", function (event) {
    processOut(event.target.parent.parent.parent);
  });
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
