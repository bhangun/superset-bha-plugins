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
import {
  QueryFormData, supersetTheme, TimeseriesDataRecord,
  DataRecordValue,
  QueryFormMetric,
  SetDataMaskHook,
  ChartDataResponseResult,
  ChartProps,
} from '@superset-ui/core';
import { EChartsOption } from 'echarts';
import { TooltipMarker } from 'echarts/types/src/util/format';
import { SymbolOptionMixin } from 'echarts/types/src/util/types';

export type EchartsStylesProps = {
  height: number;
  width: number;
};

export interface EchartsProps {
  height: number;
  width: number;
  echartOptions: EChartsOption;
  eventHandlers?: EventHandlers;
  selectedValues?: Record<number, string>;
  forceClear?: boolean;
}

export enum ForecastSeriesEnum {
  Observation = '',
  ForecastTrend = '__yhat',
  ForecastUpper = '__yhat_upper',
  ForecastLower = '__yhat_lower',
}

export type ForecastSeriesContext = {
  name: string;
  type: ForecastSeriesEnum;
};

export enum LegendOrientation {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum LegendType {
  Scroll = 'scroll',
  Plain = 'plain',
}

export type ProphetValue = {
  marker: TooltipMarker;
  observation?: number;
  forecastTrend?: number;
  forecastLower?: number;
  forecastUpper?: number;
};

export type EchartsLegendFormData = {
  legendMargin: number | null | string;
  legendOrientation: LegendOrientation;
  legendType: LegendType;
  showLegend: boolean;
};

export type EventHandlers = Record<string, { (props: any): void }>;

export enum LabelPositionEnum {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
  Inside = 'inside',
  InsideLeft = 'insideLeft',
  InsideRight = 'insideRight',
  InsideTop = 'insideTop',
  InsideBottom = 'insideBottom',
  InsideTopLeft = 'insideTopLeft',
  InsideBottomLeft = 'insideBottomLeft',
  InsideTopRight = 'insideTopRight',
  InsideBottomRight = 'insideBottomRight',
}
type WaterfallColumnConfig = Record<string, { waterfallMetricMaxValue?: number }>;

export enum EchartsWaterfallLabelType {
  Value = 'value',
  KeyValue = 'key_value',
}


export type EchartsWaterfallFormData = QueryFormData &
  EchartsLegendFormData & {
    colorScheme?: string;
    columnConfig?: WaterfallColumnConfig;
    currentOwnValue?: string[] | null;
    currentValue?: string[] | null;
    defaultValue?: string[] | null;
    groupby: string[];
    labelType: EchartsWaterfallLabelType;
    labelPosition: LabelPositionEnum;
    metrics: QueryFormMetric[];
    showLabels: boolean;
    isCircle: boolean;
    numberFormat: string;
    dateFormat: string;
    emitFilter: boolean;
  };

export interface TuraWaterfallStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface TuraWaterfallCustomizeProps {
  headerText: string;
}

export type TuraWaterfallQueryFormData = QueryFormData &
  TuraWaterfallStylesProps &
  TuraWaterfallCustomizeProps;



// @ts-ignore
export const DEFAULT_LEGEND_FORM_DATA: EchartsLegendFormData = {
  legendMargin: null,
  legendOrientation: LegendOrientation.Top,
  legendType: LegendType.Scroll,
  showLegend: false,
}

// @ts-ignore
export const DEFAULT_FORM_DATA: EchartsWaterfallFormData = {
  ...DEFAULT_LEGEND_FORM_DATA,
  groupby: [],
  labelType: EchartsWaterfallLabelType.Value,
  labelPosition: LabelPositionEnum.Top,
  legendOrientation: LegendOrientation.Top,
  legendType: LegendType.Scroll,
  numberFormat: 'SMART_NUMBER',
  showLabels: true,
  emitFilter: false,
  dateFormat: 'smart_date',
  isCircle: false,
}

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

export interface WaterfallSeriesDataItemOption extends SymbolOptionMixin {
}


export type TuraWaterfallProps = TuraWaterfallStylesProps &
  TuraWaterfallCustomizeProps & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
    formData: EchartsWaterfallFormData;
    height: number;
    width: number;
    echartOptions: EChartsOption;
    setDataMask: SetDataMaskHook;
    labelMap: Record<string, DataRecordValue[]>;
    groupby: string[];
    selectedValues: Record<number, string>;
  };

export interface TuraWaterfallTransformedProps {
  formData: TuraWaterfallQueryFormData;
  height: number;
  width: number;
  echartOptions: EChartsOption;
  emitFilter: boolean;
  setDataMask: SetDataMaskHook;
  labelMap: Record<string, DataRecordValue[]>;
  groupby: string[];
  selectedValues: Record<number, string>;
}

export type BoxPlotQueryFormData = QueryFormData & {
  numberFormat?: string;
  whiskerOptions?: BoxPlotFormDataWhiskerOptions;
  xTickLayout?: BoxPlotFormXTickLayout;
  emitFilter: boolean;
};

export type BoxPlotFormDataWhiskerOptions =
  | 'Tukey'
  | 'Min/max (no outliers)'
  | '2/98 percentiles'
  | '9/91 percentiles';

export type BoxPlotFormXTickLayout = '45°' | '90°' | 'auto' | 'flat' | 'staggered';

export interface EchartsBoxPlotChartProps extends ChartProps {
  formData: BoxPlotQueryFormData;
  queriesData: ChartDataResponseResult[];
}

export interface BoxPlotChartTransformedProps {
  formData: BoxPlotQueryFormData;
  height: number;
  width: number;
  echartOptions: EChartsOption;
  emitFilter: boolean;
  setDataMask: SetDataMaskHook;
  labelMap: Record<string, DataRecordValue[]>;
  groupby: string[];
  selectedValues: Record<number, string>;
}
