// Kodo fragmentas paimtas iš https://www.amcharts.com/demos/column-with-rotated-series/ pateikto pavyzdžio

function draw(objectList, substanceObjectList) {
  chartList = [];
  Array.from(document.getElementsByClassName("graph")).forEach(function (item) {
    document.getElementById(item.id).style.height = "300px";
    let matches = item.id.match(/(\d+)/);
    let i = 0;
    if (matches) {
      i = matches[0];
    }

    let chart = am4core.create(item.id, am4charts.XYChart);
    chartList.push(chart);
    let iChart = 0;
    if (chartList) {
      iChart = chartList.length - 1;
    }

    chartList[iChart].scrollbarX = new am4core.Scrollbar();

    chartList[iChart].data = objectList[i];

    categoryAxis = chartList[iChart].xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "interval";
    categoryAxis.title.text = "Intervalas";

    let valueAxis = chartList[iChart].yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Pasikartojimai";

    let series = chartList[iChart].series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "amount";
    series.dataFields.categoryX = "interval";
    series.stroke = "#d3d3d3";
    series.fill = substanceObjectList[i]["color"];

    if (objectList[i].length < 5)
      series.columns.template.width = am4core.percent(20);

    chartList[iChart].titles.create().text =
      "Medžiaga " + substanceObjectList[i]["name"];
  });
}
