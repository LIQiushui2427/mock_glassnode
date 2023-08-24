import ReactEcharts from "echarts-for-react"; 
import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { EChartsOption } from "echarts";
import { fetchGlassNodeData } from "../api/glassnode_fetcher";
import { TitleComponentOption as TitleOption } from "echarts";

import IntervalSwitcher from "./intervalSwitcher";

interface DataItem {
  t: string;
  o?: {
      [key: string]: number;
  };
  v?: number;
}

interface ChartProps {
  title : string;
  requestParams: RequestParams;
}

interface RequestParams {
  symbol?: string; // Make the symbol property optional
  class: string;
  data: string;
  interval?: string; // Make the interval property optional
}

const loadingOption = {
  series: [
    {
    }
  ],
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'DataLouder',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'red'
              }
            }
          ]
        }
      }
    ]
  }
};

const loadingChart = <ReactEcharts option={loadingOption} />;

function buildOption(chartData: DataItem[], title: string, requestParams: RequestParams) {
  let keys: string[] = [];
  const xAxisData = chartData.map(item => item.t);
  let series: echarts.SeriesOption[] = [];

  if ('o' in chartData[0] && chartData[0].o) {
    keys = Object.keys(chartData[0].o);
    series = keys
      .filter(key => key !== 't')
      .map(key => ({
        type: 'line',
        name: key,
        data: chartData.map(item => item.o && item.o[key]),
      })) as echarts.SeriesOption[]; // Typecast to SeriesOption[]
  } else if (chartData[0].v !== undefined) {
    keys = requestParams.data.split('_');
    series = [
      {
        type: 'line',
        name: keys[0],
        data: chartData.map(item => item.v!),
      },
    ] as echarts.SeriesOption[];
  }

  const option = {
    title: {
      text: title,
      top: 'bottom',
      textStyle: {
        fontStyle: 20,
        color: '#000000',
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        restore: {},
      },
      top: 'bottom',
    },
    dataZoom: [
      {
      type: 'inside',
      xAxisIndex: 0,
      },
      {
      type : 'slider',
      yAxisIndex: 0,
      },
    ],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      type: 'scroll',
      data: keys,
    },  
    
    xAxis: {
        type: 'category',
        axisLabel: {
          formatter: function (value: string) {
            return value.slice(0, 10);
          }
        },
        boundaryGap: false,
        data: xAxisData,
    },
    yAxis: {
      innerHeight: 100,
      type: 'value',
      scale: true,
      splitArea: {
        show: true
      },
    }, //You need to configure yAxis as needed
    series: series as echarts.SeriesOption[],
  } as echarts.SeriesOption;

  return option;
}

const Chart: React.FC<ChartProps> = ({ title, requestParams }) => {
  const [chartData, setChartData] = useState<DataItem[] | null>(null);
  const [option, setOption] = useState<EChartsOption>(loadingOption);
  const [interval, setIntervalValue] = useState(requestParams.interval || "24h"); // Use a different name for state variable
  const symbol = requestParams.symbol !== undefined ? requestParams.symbol : "btc";
  
  const fetchData = async () => {
    try {
      const response = await fetchGlassNodeData(symbol, requestParams.class, requestParams.data, interval);
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    setOption(loadingOption);
    setChartData(null);
    fetchData();
  }, [requestParams, interval]);

if (chartData === null) {
  return <div>{loadingChart}</div>;
} else {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IntervalSwitcher interval={interval} setInterval={setIntervalValue} />
      <ReactEcharts option={buildOption(chartData, title, requestParams)} style={{ height: '100%', width: '100%' }} />
    </div>  
  );
};
}

export type {ChartProps, RequestParams, DataItem};
export {loadingChart, loadingOption};
export default Chart;
