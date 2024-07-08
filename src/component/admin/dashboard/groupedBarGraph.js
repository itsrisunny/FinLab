import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function GroupedBarGraph({ data }) {
  useEffect(() => {



    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.fontSize = 11;

    // Set date format for category axis
    categoryAxis.dateFormatter.inputDateFormat = "dd-MM-yyyy";
    categoryAxis.dateFormatter.dateFormat = "dd-MM-yy"; // Desired date format
    

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Customize the value axis
    valueAxis.renderer.minWidth = 10; // Set the minimum width of the axis
    valueAxis.renderer.labels.template.fontSize = 12; // Set font size for axis labels
    valueAxis.renderer.labels.template.fill = am4core.color("#333"); // Set color for axis labels
    valueAxis.renderer.grid.template.strokeOpacity = 0.1; // Set opacity of grid lines
    
    // Create series
 
    function createSeries(field, name, color) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "category";
      series.name = name;
      series.columns.template.width = am4core.percent(40);
      series.fill = am4core.color(color); // Set custom fill color for the series
      
      // Enable tooltips
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#fff"); // Tooltip background color
      series.tooltip.label.fill = am4core.color("#000"); // Tooltip text color
      
     /* chart.data.forEach(dataItem => {
        console.log("",dataItem);
        if (dataItem.category !== undefined) {
          dataItem.category = formatDate(dataItem.category);
        }
      });   */

      return series;
    }

    // Create series for each data series
    Object.keys(data[0]).forEach((key, index) => {
      if (key !== 'category') {
        let color; // Set custom color based on the series
        if (key === 'Applied Amount') {
          color = '#4571bd'; // Custom color for Series1
        } else if (key === 'Approved Amount') {
          color = '#ec7c33'; // Custom color for Series2
        } 
        else if (key === 'Disbursed Amount') {
          color = '#a4a3a4'; // Custom color for Series2
        } 
        else if (key === 'Other') {
          color = '#fbc404'; // Custom color for Series2
        } else {
          color = '#0000ff'; // Default color for other series
        }
        createSeries(key, key,color);
      }
    });

    // Add legend
    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "left";
    // chart.legend.valign = "top";
    // chart.legend.labels.template.fontSize = 12;
    // let markerTemplate = chart.legend.markers.template;
    // markerTemplate.width = 12;
    // markerTemplate.height = 12;

    // Rotate chart container
    // chart.plotContainer.rotation = 90;

    // Dispose chart when unmounting
    return () => {
      chart.dispose();
    };



  }, [data]);

  return <div id="chartdiv" style={{ width: "100%", height: "205px" }}></div>;
}

export default GroupedBarGraph;
