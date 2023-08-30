import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { EChartsOption,YAXisComponentOption as YAxisOption} from "echarts";
import ReactEcharts from 'echarts-for-react';

import { fetchGlassNodeData } from "../api/glassnode_fetcher";
import { loadingOption, loadingChart,ChartProps, RequestParams, DataItem } from './myChart';
import CompareChartDropDown from './compareChartDropDown';
import {dict} from '../dataConfig/tickersCompare';

import IntervalSwitcher from "./intervalSwitcher";

const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272', 
                '#FC8452', '#9A60B4', '#1F78C1', '#E5CF0D', '#F0805A',];

const keys = Object.keys(dict);

const buildOptionWithChartData = (symbol: string, data: Record<string, DataItem[]>): EChartsOption => {
  const keys = Object.keys(data);
  // console.log("keys", keys);
  const firstKey = keys[0];
  // console.log("firstKey", firstKey);
  const xAxisData = data[firstKey].map(item => item.t);
  // console.log("xAxisData", xAxisData);
  const yAxisConfigs =  Object.keys(data).map((key, index) => ({
    type: 'value',
    name: key,
    position: index === 0 ? 'left' : 'right',
    alignTicks: {
      alignWithLabel: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[index % colors.length]
      }
    },
    max: 'dataMax',
    min : 'dataMin',
    axisLabel: {
      formatter: "{value}"
    }
  }));

  const seriesConfigs: echarts.SeriesOption[] = keys
  .filter(key => data[key] && Array.isArray(data[key]) && data[key].length > 0) // Filter out invalid data
  .map(key => {
    const seriesData: number[] = [];
    
    data[key].forEach(item => {
      if ('o' in item && item.o) {
        const sum = Object.values(item.o).reduce((acc, value) => acc + value, 0);
        seriesData.push(sum);
      } else if ('v' in item && item.v !== undefined) {
        seriesData.push(item.v);
      }
    });

    // console.log("seriesData", seriesData);
    return {
      type: 'line',
      name: key, // Use data item's name as the line name
      data: seriesData,
      yAxisIndex: keys.indexOf(key), // Map yAxis index to series based on index
    };
  });

// console.log("seriesConfigs", seriesConfigs);
const legendData: string[] = seriesConfigs.map(seriesConfig => seriesConfig.name) as string[];
// console.log("legendData", legendData);


  const option: EChartsOption = {
    title: {
      text: 'Compare Chart',
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          xAxisIndex: 'none',
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
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
    yAxis: yAxisConfigs as YAxisOption[],
    dataZoom: [
      {xAxisIndex: 0, filterMode: 'filter', zoomOnMouseWheel:true, },
      {xAxisIndex: 0, type: 'inside', filterMode: 'filter', zoomOnMouseWheel:true,},
      {yAxisIndex: 0, filterMode: 'empty', zoomOnMouseWheel:true, },
    ],
    graphic: {
      $action: 'remove',
    },
    legend: {
      type: 'scroll',
      data: legendData,
      top: 30,
    },  
    series: seriesConfigs,
  };
    return option;
  };

  interface CompareChartProps {
    symbol?: string;
  }

  function CompareChart({ symbol }: CompareChartProps) {
    const [chartData, setChartData] = useState<Record<string, DataItem[]>>({});
    const [option, setOption] = useState<EChartsOption>(loadingOption);
    const [interval, setIntervalValue] = useState<string>('24h'); // Use a different name for state variable
    const symbol_ = symbol === undefined ? 'btc' : symbol;
  
    const handleLineSelect = async (lineName: string) => {
      setOption(loadingOption);
      if (chartData[lineName] !== undefined) {
          // Line already exists, remove it
          const updatedChartData = { ...chartData };
          delete updatedChartData[lineName];
          setChartData(updatedChartData);
      } else {
          try {
              const response = await fetchGlassNodeData(symbol_, dict[lineName].class, dict[lineName].data, interval);
              const newData = response.data;
              setChartData(prevData => ({
                  ...prevData,
                  [lineName]: newData,
              }));
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
    };
  
    const fetchChartDataWithInterval = async (newInterval: string) => {
      try {
        setOption(loadingOption);
        const newData = await Promise.all(
          Object.keys(chartData).map(async (lineName) => {
            const response = await fetchGlassNodeData(
              symbol_,
              dict[lineName].class,
              dict[lineName].data,
              newInterval
            );
            return { lineName, data: response.data };
          })
        );
  
        const updatedChartData = newData.reduce((acc, { lineName, data }) => {
          acc[lineName] = data;
          return acc;
        }, {} as Record<string, DataItem[]>);
  
        setChartData(updatedChartData);
      } catch (error) {
        console.error('Error fetching data with interval:', error);
      }
    };
  
    useEffect(() => {
      if (Object.keys(chartData).length === 0) {
        console.log('chartData is null', chartData);
      } else {
        console.log('chartData is not null', chartData);
        const newOption = buildOptionWithChartData(symbol_, chartData);
        setOption(newOption);
      }
    }, [chartData, symbol_]);
  
    useEffect(() => {
      fetchChartDataWithInterval(interval); // Fetch chart data with the new interval
    }, [interval]);
  
    if (chartData === null) {
      return <div>{loadingChart}</div>;
    }
  
    return (
      <div>
        <div>
          <CompareChartDropDown handleLineSelect={handleLineSelect} />
        </div>
        <ReactEcharts
          option={option}
          lazyUpdate={true}
          style={{ height: '70vh', width: '100%' }}
        />
        <IntervalSwitcher interval={interval} setInterval={setIntervalValue} />
      </div>
    );
  }
  
  export default CompareChart;
  