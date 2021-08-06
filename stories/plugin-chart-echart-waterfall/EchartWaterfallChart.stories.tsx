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
import React from 'react';
import { D3_FORMAT_OPTIONS } from '@superset-ui/chart-controls';
import { ChartProps, supersetTheme, ThemeProvider } from '@superset-ui/core';
import WaterfallEchart from '../../plugins/plugin-chart-waterfall-echart/src/WaterfallEchart';
import transformProps, { dataStyled, WaterfallEchartProps } from '../../plugins/plugin-chart-waterfall-echart/src/plugin/transformProps';
import { extractTransformProps } from '../utils';
import { EchartsBoxPlotChartProps, TuraWaterfallTransformedProps } from '../../plugins/plugin-chart-waterfall-echart/src/types';
import { echartdata } from '../../plugins/plugin-chart-waterfall-echart/test/__mocks__/echartWaterfallProps';


export const Contoh = () => (
  <div> bismillah</div>
);

export default {
  title: 'Plugins/Echart Waterfall',
  component: WaterfallEchart,
  argTypes: {
    xAxisDataKey: { table: { disable: true } },
    dataKey: { table: { disable: true } },
    error: { table: { disable: true } },
    onBarClick: { table: { disable: true } },
    resetFilters: { table: { disable: true } },
    data: { table: { disable: true } },
    numbersFormat: {
      control: {
        type: 'select',
        options: D3_FORMAT_OPTIONS.map(([option]) => option),
      },
    },
  },
};
/* 
var labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {
    }
  }
}; */



const period_value = [150, 285, 206, 725]
const period_type = [
  'Physical Availability',
  'Utilization',
  'Productivity',
  'Actual Production']
const period = [
  'Production Plan',
  'Production Plan',
  'Production Plan',
  'Actual Production'
]

const base = [0, 200, 500, 153,]

const barData = [1367, 1300, 1208, 1154,]

function baseBar() {
  return base
}

function bar() {
  const _default = '0'
  const _plus = '+'
  const _minus = '-'
  var _temp = []
  const _data = barData.forEach(i => {
    _temp.push(dataStyled('-', i))
  })

  return _temp
}


const option = {
  title: {
    text: '',
    subtext: '',
    sublink: ''
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    show: true,
    data: ['satu', 'dua', 'tiga']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisTick: { show: true, alignWithLabel: true },
    splitLine: { show: false },
    data: ['satu', 'dua', 'tiga', 'empat', 'lima'],
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'hijau',
      type: 'bar',
      stack: 'stack',
      itemStyle: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      },
      emphasis: {
        itemStyle: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)',
        },
        focus: 'series'
      },
      data: baseBar(),
    },
    {
      name: 'base',
      type: 'bar',
      stack: 'stack',
      label: {
        show: true,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: bar(),
    },
  ]
};

console.log(legendTop)
console.log(transformProps)

const Template = args => {
  console.log(args)
  return (
    <ThemeProvider theme={supersetTheme}>
      {/* <WaterfallEchart echartOptions={option} width={400} height={400} {...args}  /> */}
      {/*  <WaterfallEchart  {...args} /> */}
     {/*  <WaterfallEchart echartOptions={option} width={600} height={600} {...args} /> */}
      <WaterfallEchart {...extractTransformProps({ args, props: echartdata, transformProps })} />
    </ThemeProvider>)
};




export const Default = Template.bind({});
Default.args = {
  //...transformProps((legendTop as unknown) as EchartsBoxPlotChartProps),
  ...transformProps((echartdata as unknown) as WaterfallEchartProps),
  //...transformProps((legendTop as unknown) as TuraWaterfallTransformedProps),
  echar: echartdata.queriesData,
};


