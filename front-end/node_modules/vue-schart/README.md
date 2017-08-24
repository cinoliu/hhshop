
# vue-schart 

>  :bar_chart: Vue.js wrapper for sChart.js

<p>
  <a href="https://www.npmjs.com/package/vue-schart"><img src="https://img.shields.io/npm/dm/vue-schart.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-schart"><img src="https://img.shields.io/npm/v/vue-schart.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-schart"><img src="https://img.shields.io/npm/l/vue-schart.svg" alt="License"></a>
  <br>
</p>

Support vue.js 1.x & 2.x

## Usage
Install:

```
npm install vue-schart -S
```

Use in component:

```javascript
<template>
    <div id="app">
        <schart :canvasId="canvasId"
			:type="type"
			:width="width"
			:height="height"
			:data="data"
			:options="options"
		></schart>
    </div>
</template>
import Schart from 'vue-schart';
export default {
	data() {
		return {
			canvasId: 'myCanvas',
			type: 'bar',
			width: 500,
			height: 400,
			data: [
				{name: '2014', value: 1342},
				{name: '2015', value: 2123},
				{name: '2016', value: 1654},
				{name: '2017', value: 1795},
			],
			options: {
				title: 'Total sales of stores in recent years'
			}
		}
	},
    components:{
		Schart
	}
}
```
## Options

Refer to [the documentation for sChart.js](http://open.omwteam.com/sChart/en.html).

## Demo
[click here](http://open.omwteam.com/sChart/demo.html)

![demo](http://open.omwteam.com/sChart/static/img/demo.jpg)

## License
[MIT license](https://github.com/lin-xin/vue-schart/blob/master/LICENCE).