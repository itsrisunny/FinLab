import React, { useEffect, useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function AppPieChart(props) {
  const { options } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = am4core.create(chartRef.current, am4charts.PieChart);
    chart.data = options;

    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);

    chart.innerRadius = am4core.percent(40);

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "val";
    pieSeries.dataFields.category = "castes";
    pieSeries.colors.list = [
        am4core.color("#4372c4"),
        am4core.color("#ed7d31"),
        am4core.color("#a5a5a5"),
        am4core.color("#ffc000"),
        am4core.color("#5a9bd3"),
        am4core.color("#F9F871"),
    ];

    pieSeries.slices.template.stroke = am4core.color("#4a2abb");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 5;

    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.maxWidth = 130;
    pieSeries.labels.template.wrap = true;
    pieSeries.labels.template.fontSize = 12;

    // chart.legend = new am4charts.Legend();
    // chart.legend.labels.template.truncate = false;
    // chart.legend.labels.template.wrap = true;
    // chart.legend.labels.template.fontSize = 16;
    // chart.legend.valueLabels.template.disabled = true;
    // chart.legend.position = "left"; 
    // let markerTemplate = chart.legend.markers.template;
    // markerTemplate.width = 22;
    // markerTemplate.height = 22;

    //chart.exporting.menu = new am4core.ExportMenu();
    
    // Add license attribution
    am4core.addLicense("ch-custom-attribution");

    // Cleanup function
    return () => {
      chart.dispose();
    };
  }, [options]);

  return <div ref={chartRef} style={{ width: "100%", height: "220px" }}></div>;
}

export default AppPieChart;
