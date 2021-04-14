// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
// import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Include the theme as candy
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "12",
//   },
//   {
//     label: "CSS",
//     value: "34",
//   },
//   {
//     label: "Javascript",
//     value: "18",
//   },
// ];

// STEP 3 - Creating the JSON object to store the chart configurations

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const ChartComponent = ({
  data
}) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        // caption
        caption: "Stars Per Language",
        // theme: "fusion",
        theme: "candy",
        //decimals : 1;
        decimals: 0,
        doughnutRadius: "45%",
        // paletteColors: "#f0db4f",
        showPercentValues: 0,
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {
    ...chartConfigs
  }
  />;
};

export default ChartComponent;