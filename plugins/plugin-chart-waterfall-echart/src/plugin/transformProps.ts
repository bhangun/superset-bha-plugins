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
import { ChartProps, DataRecordValue, SetDataMaskHook } from '@superset-ui/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { DEFAULT_FORM_DATA, DEFAULT_LEGEND_FORM_DATA, EchartsWaterfallFormData, LegendOrientation, TuraWaterfallTransformedProps } from '../types';
import { getLegendProps, WaterfallChartData } from '../utils/series';
//import { processNumbers, convertDataForRecharts, createReChartsBarValues, SortingType, Metric } from '../utils';

export type QueryData = {
  [key: string]: number | string;
};

export enum LegendPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Metric = {
  label: string;
};


export const defaultGrid = {
  containLabel: true,
};

export const defaultTooltip = {
  confine: true,
};

export const defaultYAxis = {
  scale: true,
};

export const defaultLegendPadding = {
  [LegendOrientation.Top]: 20,
  [LegendOrientation.Bottom]: 20,
  [LegendOrientation.Left]: 170,
  [LegendOrientation.Right]: 170,
};


export type WaterfallEchartProps = {
  xAxisDataKey: string;
  dataKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  yAxisLabelAngle: number;
  legendPosition: LegendPosition;
  error?: string;
  numbersFormat?: string;
  height: number;
  resetFilters?: Function;
  onBarClick?: Function;
  width: number;
  //data: WaterfallChartData[];
  ///----props waterfallechart
  //formData: FormData;//BoxPlotQueryFormData;
  echartOptions: EChartsOption;
  //emitFilter: boolean;
  //setDataMask: SetDataMaskHook;
  //labelMap: Record<string, DataRecordValue[]>;
  //groupby: string[];
  //selectedValues: Record<number, string>;
};

export type WaterfallChartProps = {
  xAxisDataKey: string;
  dataKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  yAxisLabelAngle: number;
  legendPosition: LegendPosition;
  error?: string;
  numbersFormat?: string;
  height: number;
  resetFilters?: Function;
  onBarClick?: Function;
  width: number;
  data: WaterfallChartData[];
};


type FormData = {
  xAxisColumn: string;
  xAxisLabel: string;
  yAxisLabel: string;
  yAxisLabelAngle: string;
  periodColumn: string;
  queryFields: { metric: string };
  metric: Metric;
  numbersFormat: string;
  legendPosition: LegendPosition;
  orderByChange: SortingType;
  useOrderByChange: boolean;
};


//export default function transformProps(chartProps: ChartProps): WaterfallChartProps {
//export default function transformProps(chartProps: ChartProps): WaterfallEchartProps {
  export default function transformProps(chartProps: ChartProps): TuraWaterfallTransformedProps {

  const { width, height, formData, queriesData } = chartProps;

  const {
    periodColumn,
    xAxisColumn,
    metric,
    numbersFormat,
    legendPosition,
    orderByChange,
    useOrderByChange,
  } = formData as FormData;

  const valueColumn = metric.label;
  const data = queriesData?.[0]?.data as QueryData[];

  /* const rechartsData = convertDataForRecharts(
    periodColumn,
    xAxisColumn,
    valueColumn,
    data,
    orderByChange,
    useOrderByChange,
  ); */

let resultData = null;//createResult()

/*   let resultData = createReChartsBarValues(rechartsData, valueColumn, periodColumn);

  resultData = processNumbers(resultData, metric.label, formData.numbersFormat, formData.numbersFormatDigits);
 */

  const {
    legendOrientation,
    legendType,
    showLegend,
  }: EchartsWaterfallFormData = {
    ...DEFAULT_LEGEND_FORM_DATA,
    ...DEFAULT_FORM_DATA,
    ...formData,
  };

  const axisname = Array()
  const dataTop = Array()
  const dataBottom = Array()

  const columnsLabelMap = new Map<string, DataRecordValue[]>();

  const category = axisname

  const series: SeriesOption[] = [
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
    xAxis: {
      type: 'category',
      splitLine: { show: true },
      data: category
    },
    yAxis: {
      ...defaultYAxis,
      type: 'value',
      // axisLabel: { formatter: numberFormatter },
    },
  }


  return {
    /* dataKey: valueColumn,
    xAxisDataKey: xAxisColumn,
    xAxisLabel: formData.xAxisLabel ?? '',
    yAxisLabel: formData.yAxisLabel ?? '',
    yAxisLabelAngle: -Number(formData.yAxisLabelAngle), */
    width,
    height,
   // legendPosition,
   // numbersFormat,
    //formData,
    echartOptions,
    //setDataMask,
    //data: resultData,
    //onBarClick: () => null,
    //resetFilters: () => null,

    //formData,

    //setDataMask,
    //emitFilter,
    // labelMap,
    //groupby,
    //selectedValues,
  };
}
