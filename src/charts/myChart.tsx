import ReactEcharts from "echarts-for-react"; 
import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { EChartsOption } from "echarts";
import { fetchGlassNodeData } from "../api/glassnode_fetcher";


interface DataItem {
  t: string;
  o: {
      [key: string]: number;
  };
}
interface ChartProps {
  requestParams: RequestParams;
}

interface RequestParams {
  class: string;
  data: string;
}
const Chart: React.FC<ChartProps> = ({ requestParams }) => {
  const [chartData, setChartData] = useState<DataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);

    fetchGlassNodeData(requestParams.class, requestParams.data)
        .then(response => {
          console.log("response", response);
            setChartData(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
}, [requestParams]);
  if (chartData === null) {
    return <div>chartData is Null...</div>;
  }
  // console.log("chartData", chartData);
  const keys = Object.keys(chartData[0].o); // Assuming all items have the same keys
  // console.log("keys", keys);
  const xAxisData = chartData.map(item => item.t);
  // console.log("xAxisData", xAxisData)
  const series = keys.map(key => ({
    type: 'line',
    name: key,
    data: chartData.map(item => item.o[key]),
  })) as echarts.SeriesOption[]; //Typecast to SeriesOption[]

  const option = {
    title: {
      text: 'Test the plot'
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        restore: {},
      }
    },
    dataZoom: [
      {
      xAxisIndex: 0,
      },
      {
      yAxisIndex: 0,
      },
    ],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      type: 'scroll',
      data: keys
    },  
    
    xAxis: {
        type: 'category',
        axisLabel: {
          formatter: function (value: string) {
            return value.slice(0, 10) + '\n' + value.slice(11, 19);
          }
        },
        boundaryGap: false,
        data: xAxisData,
    },
    yAxis: {}, //You need to configure yAxis as needed
    series: series,
  };

return <ReactEcharts option={option} />;
}

export default Chart;