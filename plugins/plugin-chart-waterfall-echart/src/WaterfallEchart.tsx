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
import React, { useEffect, createRef, useCallback } from 'react';
// import { styled } from '@superset-ui/core';
import {
  EventHandlers, 
  //TuraWaterfallProps, 
  TuraWaterfallTransformedProps,
  // TuraWaterfallStylesProps, 
} from './types';
import Echart from './components/Echart';


// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

/* const Styles = styled.div<TuraWaterfallStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-y: scroll;

  h3 {
    /* You can use your props to control CSS! */
/*     font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]};
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  } */
//`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function WaterfallEchart(props: TuraWaterfallTransformedProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { // data, 
    //eventHandlers, 
    height,
    width,
    echartOptions,
    setDataMask,
    labelMap,
    groupby,
    selectedValues,
    formData,
  } = props;

  const rootElem = createRef<HTMLDivElement>();

  const handleChange = useCallback(
    (values: string[]) => {
      if (!formData.emitFilter) {
        return;
      }

      const groupbyValues = values.map(value => labelMap[value]);

      setDataMask({
        extraFormData: {
          filters:
            values.length === 0
              ? []
              : groupby.map((col, idx) => {
                  const val = groupbyValues.map(v => v[idx]);
                  if (val === null || val === undefined)
                    return {
                      col,
                      op: 'IS NULL',
                    };
                  return {
                    col,
                    op: 'IN',
                    val: val as (string | number | boolean)[],
                  };
                }),
        },
        filterState: {
          value: groupbyValues.length ? groupbyValues : null,
          selectedValues: values.length ? values : null,
        },
      });
    },
    [groupby, labelMap, setDataMask, selectedValues],
  );
  
  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  const eventHandlers: EventHandlers = {
    click: propsclick => {
      const { name } = propsclick;
      const values = Object.values(selectedValues);

      console.log(values)

      if (values.includes(name)) {
        handleChange(values.filter(v => v !== name));
      } else {
        handleChange([...values, name]);
      }
    },
  };

  return (
    /* <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <h3>{props.headerText}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </Styles> */
    

    <Echart
      height={height}
      width={width}
      echartOptions={echartOptions}
      eventHandlers={eventHandlers}
      selectedValues={selectedValues}
    />
  );
}



