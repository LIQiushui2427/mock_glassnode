import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { EChartsOption,YAXisComponentOption as YAxisOption} from "echarts";
import ReactEcharts from 'echarts-for-react';

import { fetchGlassNodeData } from "../api/glassnode_fetcher";
import { loadingOption, loadingChart,ChartProps, RequestParams, DataItem } from './myChart';
import CompareChartDropDown from './compareChartDropDown';
import {dict} from '../dataConfig/tickersCompare';



const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4']

const keys = Object.keys(dict);

const buildOptionWithChartData = (data: Record<string, DataItem[]>): EChartsOption => {
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
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[index % colors.length]
      }
    },
    axisLabel: {
      formatter: "{value}"
    }
  }));

  const seriesConfigs: echarts.SeriesOption[] = keys
  .filter(key => data[key] !== undefined)
  .map(key => {
    const seriesData: number[] = [];
    data[key].forEach(item => {
      const sum = Object.values(item.o).reduce((acc, value) => acc + value, 0);
      seriesData.push(sum);
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
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: yAxisConfigs as YAxisOption[],
    dataZoom: [
      {xAxisIndex: 0,},
      {yAxisIndex: 0,},
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

const CompareChart: React.FC= () => {
    const [chartData, setChartData] =  useState<Record<string, DataItem[]>>({});
    const [option, setOption] = useState<EChartsOption>(loadingOption); // Initialize with empty option

    const handleLineSelect = async (lineName: string) => {
      if (chartData[lineName] !== undefined) {
          // Line already exists, remove it
          const updatedChartData = { ...chartData };
          delete updatedChartData[lineName];
          setChartData(updatedChartData);
      } else {
          try {
              const response = await fetchGlassNodeData(dict[lineName].class, dict[lineName].data);
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
  
    useEffect(() => {
      if (Object.keys(chartData).length === 0) {
        console.log("chartData is null", chartData);
      }
      else {
        console.log("chartData is not null", chartData);
        const newOption = buildOptionWithChartData(chartData);
        setOption(newOption);
      }
    }, [chartData]);
    
    if (chartData === null) {
      return <div>{loadingChart}</div>
    }
    return (
      <div>
        <div>
          <CompareChartDropDown handleLineSelect = {handleLineSelect}/>
        </div>
          <ReactEcharts option={option} />
      </div>
  );

  };
  
  export default CompareChart;
