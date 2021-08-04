## @superset-ui/plugin-chart-tura-waterfall

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-tura-waterfall.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-tura-waterfall)

This plugin provides Tura Waterfall for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to
lookup this chart throughout the app.

```js
import TuraWaterfallChartPlugin from '@superset-ui/plugin-chart-tura-waterfall';

new TuraWaterfallChartPlugin().configure({ key: 'tura-waterfall' }).register();
```

Then use it via `SuperChart`. See
[storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-tura-waterfall)
for more details.

```js
<SuperChart
  chartType="tura-waterfall"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── TuraWaterfall.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```
