import React, { useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

function ProgressBarChart({id, progressBarData}) {
 useEffect(() => {


// Themes end

let chart = am4core.create(id, am4charts.XYChart);
chart.padding(40, 40, 40, 40);

let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;

let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "name";
series.dataFields.valueX = "total_lead";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;

let labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "left";
labelBullet.label.dx = 10;
labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
labelBullet.locationX = 1;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

categoryAxis.sortBySeries = series;
/*chart.data = [
    {
      "name": "Facebook",
      "total_lead": 2255
    },
    {
      "network": "Google+",
      "MAU": 430
    },
    {
      "network": "WeChat",
      "MAU": 100
    },
    {
      "network": "Weibo",
      "MAU": 4310
    },
    {
      "network": "Whatsapp",
      "MAU": 14333
    }
  ]*/

chart.data = progressBarData
 }, [progressBarData]);

 return (

   <div id={id} style={{ width: "100%", height: "250px" }}></div>

 );

}

export default ProgressBarChart;