function createChart(am4core, yList, tList) {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  let chart = am4core.create("chartdiv", am4charts.XYChart);

  // Create axes
  let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.title.text = "Time";
  let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = "Concentration";

  let seriesList = [];
  for (let i = 0; i < yList.length; i++) {
    seriesList.push(createSeries(i, "Medžiaga #" + i, yList[i]));
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

  function addFeatures(series) {
    let segment = series.segments.template;
    segment.interactionsEnabled = true;

    let hoverState = segment.states.create("hover");
    hoverState.properties.strokeWidth = 3;

    let dimmed = segment.states.create("dimmed");
    dimmed.properties.stroke = am4core.color("#dadada");

    segment.events.on("over", function(event) {
      processOver(event.target.parent.parent.parent);
    });

    segment.events.on("out", function(event) {
      processOut(event.target.parent.parent.parent);
    });
  }

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.yAxis = yAxis;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "right";
  chart.legend.scrollable = true;
  chart.legend.itemContainers.template.events.on("over", function(event) {
    processOver(event.target.dataItem.dataContext);
  });

  chart.legend.itemContainers.template.events.on("out", function(event) {
    processOut(event.target.dataItem.dataContext);
  });

  function processOver(hoveredSeries) {
    hoveredSeries.toFront();

    hoveredSeries.segments.each(function(segment) {
      segment.setState("hover");
    });

    chart.series.each(function(series) {
      if (series != hoveredSeries) {
        series.segments.each(function(segment) {
          segment.setState("dimmed");
        });
        series.bulletsContainer.setState("dimmed");
      }
    });
  }

  function processOut(hoveredSeries) {
    chart.series.each(function(series) {
      series.segments.each(function(segment) {
        segment.setState("default");
      });
      series.bulletsContainer.setState("default");
    });
  }
  chart.dispose();
}
