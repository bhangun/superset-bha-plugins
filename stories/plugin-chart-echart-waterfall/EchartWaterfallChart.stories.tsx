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
import transformProps, { WaterfallEchartProps } from '../../plugins/plugin-chart-waterfall-echart/src/plugin/transformProps';
import { legendTop } from '../../plugins/plugin-chart-waterfall/test/__mocks__/waterfallProps';
import { extractTransformProps } from '../utils';
import { EchartsBoxPlotChartProps, TuraWaterfallTransformedProps } from '../../plugins/plugin-chart-waterfall-echart/src/types';


export const Contoh = () =>(
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

const option = {
  title: {
    text: '阶梯瀑布图',
    subtext: 'From ExcelHome',
    sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
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
    axisTick: { show: false },
    splitLine: { show: false },
    data: ['satu', 'dua', 'tiga', 'empat', 'lima']
    /*data: function () {
        var list = [];
        for (var i = 1; i <= 11; i++) {
            list.push('11月' + i + '日');
        }
        return list;
    }()*/
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
      data: [0, 1367, 1000, 153, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
    },
    {
      name: 'base',
      type: 'bar',
      stack: 'stack',
      label: {
        show: true,
        //label: labelOption,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: [1367, '-', '-', 100, '-', 135, 178, 286, '-', '-', '-']
    },
    {
      name: 'merah',
      type: 'bar',
      stack: 'stack',
      color: '#f34',
      label: {
        show: true,
       // label: labelOption,
        position: 'bottom',
        color: '#f34'
      },
      emphasis: {
        focus: 'series'
      },
      data: ['-', '-', 300, 1208, 154, '-', '-', '-', 119, 361, 203]
    },
    {
      name: 'Kuning',
      type: 'bar',
      stack: 'stack',
      color: '#6e5',
      label: {
        show: true,
       // label: labelOption,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: ['-', 320, '-', 200, 200, 335, 178, 286, '-', '-', '-']
    },

  ]
};

console.log(legendTop)
console.log(transformProps)

const Template = args => (
  <ThemeProvider theme={supersetTheme}>
    {/* <WaterfallEchart echartOptions={option} width={400} height={400} {...args}  /> */}
   {/*  <WaterfallEchart  {...args} /> */}
    <WaterfallEchart echartOptions={option} width={400} height={400} {...extractTransformProps({ args, props: legendTop, transformProps })} />
  </ThemeProvider>
);




export const Default = Template.bind({});
Default.args = {
  //...transformProps((legendTop as unknown) as EchartsBoxPlotChartProps),
 //...transformProps((legendTop as unknown) as WaterfallEchartProps),
  //...transformProps((legendTop as unknown) as TuraWaterfallTransformedProps),
  echar: legendTop.queriesData,
};


