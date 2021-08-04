/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//import { colorScheme } from '@superset-ui/chart-controls/src/sections';
import { CategoricalColorNamespace, //ChartProps, 
  DataRecordValue, getMetricLabel, getNumberFormatter, getTimeFormatter, //TimeseriesDataRecord 
} from '@superset-ui/core';
import { EChartsOption, LegendComponentOption, SeriesOption } from 'echarts';
//import { CallbackDataParams } from 'echarts/types/src/util/types';
import { TIMESERIES_CONSTANTS } from '../constants';
import { BoxPlotChartTransformedProps, BoxPlotQueryFormData, defaultGrid, defaultTooltip, defaultYAxis, DEFAULT_FORM_DATA, DEFAULT_LEGEND_FORM_DATA, 
  EchartsBoxPlotChartProps, 
  EchartsWaterfallFormData, 
  LegendOrientation, LegendType, 
  //WaterfallSeriesDataItemOption 
} from '../types';

import {extractGroupbyLabel, getColtypesMapping} from '../utils/series';


export function getLegendProps(
  type: LegendType,
  orientation: LegendOrientation,
  show: boolean,
  zoomable = false,
): LegendComponentOption | LegendComponentOption[] {
  const legend: LegendComponentOption | LegendComponentOption[] = {
    orient: [LegendOrientation.Top, LegendOrientation.Bottom].includes(orientation)
      ? 'horizontal'
      : 'vertical',
    show,
    type,
  };
  switch (orientation) {
    case LegendOrientation.Left:
      legend.left = 0;
      break;
    case LegendOrientation.Right:
      legend.right = 0;
      legend.top = zoomable ? TIMESERIES_CONSTANTS.legendRightTopOffset : 0;
      break;
    case LegendOrientation.Bottom:
      legend.bottom = 0;
      break;
    case LegendOrientation.Top:
    default:
      legend.top = 0;
      legend.right = zoomable ? TIMESERIES_CONSTANTS.legendTopRightOffset : 0;
      break;
  }
  return legend;
}

//export default function transformProps(chartProps: ChartProps) {

  export default function transformProps(
    chartProps: EchartsBoxPlotChartProps,
  ): BoxPlotChartTransformedProps {
    const { width, height, formData, 
      hooks, filterState, queriesData 
    } = chartProps;
    const { data = [] } = queriesData[0];
    const { setDataMask = () => {} } = hooks;
    const coltypeMapping = getColtypesMapping(queriesData[0]);
    const {
      colorScheme,
      groupby = [],
      metrics: formdataMetrics = [],
      numberFormat,
      dateFormat,
    //  xTicksLayout,
      emitFilter,
    } = formData as BoxPlotQueryFormData;

  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your TuraWaterfall.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  console.log('formData via TransformProps.ts', formData);

  const {
    legendOrientation,
    legendType,
    showLegend,
  }: EchartsWaterfallFormData = {
    ...DEFAULT_LEGEND_FORM_DATA,
    ...DEFAULT_FORM_DATA,
    ...formData,
  };

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const numberFormatter = getNumberFormatter(numberFormat);
  
  const metricLabels = formdataMetrics.map(getMetricLabel);

  const columnsLabelMap = new Map<string, DataRecordValue[]>();

  const transformedData = data
    .map((datum: any) => {
      const groupbyLabel = extractGroupbyLabel({
        datum,
        groupby,
        coltypeMapping,
        timeFormatter: getTimeFormatter(dateFormat),
      });
      return metricLabels.map(metric => {
        const name = metricLabels.length === 1 ? groupbyLabel : `${groupbyLabel}, ${metric}`;
        return {
          name,
          value: [
            datum[`${metric}__min`],
            datum[`${metric}__q1`],
            datum[`${metric}__median`],
            datum[`${metric}__q3`],
            datum[`${metric}__max`],
            datum[`${metric}__mean`],
            datum[`${metric}__count`],
            datum[`${metric}__outliers`],
          ],
          itemStyle: {
            color: colorFn(groupbyLabel),
            opacity: 0.6,
            borderColor: colorFn(groupbyLabel),
          },
        };
      });
    })
    .flatMap(row => row);

    const selectedValues = (filterState.selectedValues || []).reduce(
      (acc: Record<string, number>, selectedValue: string) => {
        const index = transformedData.findIndex(({ name }) => name === selectedValue);
        return {
          ...acc,
          [index]: selectedValue,
        };
      },
      {},
    );

/*   let axisLabel;
  if (xTicksLayout === '45°') axisLabel = { rotate: -45 };
  else if (xTicksLayout === '90°') axisLabel = { rotate: -90 };
  else if (xTicksLayout === 'flat') axisLabel = { rotate: 0 };
  else if (xTicksLayout === 'staggered') axisLabel = { rotate: -45 };
  else axisLabel = { show: true };
 */
  console.log('--------1--------')
  console.log(queriesData[0].colnames)
  console.log(queriesData[0].data)
  console.log(coltypeMapping)
//console.log('--------2--------')
  console.log(formData)
  //console.log('---------3-------')
  console.log(transformedData)
  console.log('---------4-------'+transformedData[0].itemStyle.color)

  const name = queriesData[0].colnames[0]
  const  topValuesName = queriesData[0].colnames[1]
  const  bottomValuesName = queriesData[0].colnames[2]

  //function getAxis(){
    
    console.log(name)
    const axisname = Array()
    const dataTop = Array()
    const dataBottom = Array()
    queriesData[0].data.map(v => {
      axisname.push(v[name])
      dataTop.push(v[topValuesName])
      dataBottom.push(v[bottomValuesName])
    })
    //return axisname
  //}

  const category = axisname //getAxis();

  const series: SeriesOption[] =  [
    {
        name: 'Bottom Value',
        type: 'bar',
        stack: 'total',
        itemStyle: {
           borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
        emphasis: {
            itemStyle: {
                borderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            }
        },
        /*data: transformedData*/
        data: dataBottom //[0, 1000, 1400, 2800, 300, 0]
    },
    {
        name: 'Top Value',
        type: 'bar',
        stack: 'total',
        label: {
            show: true,
            position: 'inside'
        },
        data: dataTop //[2900, 1200, 300, 200, 900, 300]
    }
]

/* 
  const option = {
    title: {
        text: '深圳月最低生活费组成（单位:元）',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/AjQH99che'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            data: [2900, 1200, 300, 200, 900, 300]
        }
    ]
}; */

  /* const series_waterfall: SeriesOption[] = [
    {
      name: 'bottom',
      type: 'bar',
      data: [0, 1700, 1400, 1200, 300, 0],//transformedData,
      tooltip: {
        formatter: (param: CallbackDataParams) => {
          // @ts-ignore
          const {
            value,
            name,
          }: {
            value: [number, number, number, number, number, number, number, number, number[]];
            name: string;
          } = param;
          const headline = name ? `<p><strong>${name}</strong></p>` : '';
          const stats = [
            `Max: ${numberFormatter(value[5])}`,
            `3rd Quartile: ${numberFormatter(value[4])}`,
            `Mean: ${numberFormatter(value[6])}`,
            `Median: ${numberFormatter(value[3])}`,
            `1st Quartile: ${numberFormatter(value[2])}`,
            `Min: ${numberFormatter(value[1])}`,
            `# Observations: ${numberFormatter(value[7])}`,
          ];
          if (value[8].length > 0) {
            stats.push(`# Outliers: ${numberFormatter(value[8].length)}`);
          }
          return headline + stats.join('<br/>');
        },
      },
    },
    {
      name: 'top',
      type: 'bar',
      data: [2900, 1200, 300, 200, 900, 300],//transformedData,
      tooltip: {
        formatter: (param: CallbackDataParams) => {
          // @ts-ignore
          const {
            value,
            name,
          }: {
            value: [number, number, number, number, number, number, number, number, number[]];
            name: string;
          } = param;
          const headline = name ? `<p><strong>${name}</strong></p>` : '';
          const stats = [
            `Max: ${numberFormatter(value[5])}`,
            `3rd Quartile: ${numberFormatter(value[4])}`,
            `Mean: ${numberFormatter(value[6])}`,
            `Median: ${numberFormatter(value[3])}`,
            `1st Quartile: ${numberFormatter(value[2])}`,
            `Min: ${numberFormatter(value[1])}`,
            `# Observations: ${numberFormatter(value[7])}`,
          ];
          if (value[8].length > 0) {
            stats.push(`# Outliers: ${numberFormatter(value[8].length)}`);
          }
          return headline + stats.join('<br/>');
        },
      },
    }
  ]; */
  

  const echartOptions: EChartsOption = {
    grid: {
      ...defaultGrid,
    },
    tooltip: {
      ...defaultTooltip,
      trigger: 'axis',
    },
    legend: {
      ...getLegendProps(legendType, legendOrientation, showLegend),
      data: Array.from(columnsLabelMap.keys()),
    },
   series,
    //series_waterfall,
    xAxis: {
      type: 'category',
      splitLine: {show: true},
      data: category
  },
    yAxis: {
      ...defaultYAxis,
      type: 'value',
      axisLabel: { formatter: numberFormatter },
    },
  }

  const labelMap = data.reduce((acc: Record<string, DataRecordValue[]>, datum) => {
    const label = extractGroupbyLabel({
      datum,
      groupby,
      coltypeMapping,
      timeFormatter: getTimeFormatter(dateFormat),
    });
    return {
      ...acc,
      [label]: groupby.map(col => datum[col]),
    };
  }, {});

  return {
    formData,
    width,
    height,
    echartOptions,
    setDataMask,
    emitFilter,
    labelMap,
    groupby,
    selectedValues,
  };
}

