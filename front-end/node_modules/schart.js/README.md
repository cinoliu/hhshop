# sChart.js
> :bar_chart: *Small &amp; simple HTML5 charts*

<p>
  <a href="https://www.npmjs.com/package/schart.js"><img src="https://img.shields.io/npm/dm/schart.js.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/schart.js"><img src="https://img.shields.io/npm/v/schart.js.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/schart.js"><img src="https://img.shields.io/npm/l/schart.js.svg" alt="License"></a>
  <br>
</p>

## Demo
[click here](http://open.omwteam.com/sChart/demo.html)

![demo](http://open.omwteam.com/sChart/static/img/demo.jpg)

## Doc
- [中文文档](http://open.omwteam.com/sChart/index.html)
- [English](http://open.omwteam.com/sChart/en.html)

## Chart Types
The following chart types are implemented:

- Bar Charts
- Line Charts
- Pie Charts
- Ring Charts

## Usage
Install:
```
npm install schart.js
```

Create a Canvas element with an id attribute, width and height:

```html
<canvas id="canvas" width="500" height="400"></canvas>
```

Initialize the chart using Javascript:

```js
new sChart(canvasId, type, data, options)
```

Take bar charts for example:

```js
// Bar Charts
var data = [
    {name:'2014', value:2260},
    {name:'2015', value:1170},
    {name:'2016', value:970},
    {name:'2017', value:1450}
]
new sChart('canvas', 'bar', data, {
    title: '商店近年营业总额'		// The title of a bar chart
});
```

## Options

#### title
String.The title of chart.
Default is null.

#### titleColor
String.Title Color.
Default is '#000000'.

#### titlePosition
String.Title position.
Default is 'top'.

#### bgColor
String.The background color of chart.
Default is '#ffffff'.

#### padding
Number.Inside margin of chart.
Default is 50.

#### yEqual
Number.The number of points on the Y axis.
Default is 5.

#### fillColor
String.The color of bar chart or line chart.
Default is '#1E9FFF'.

#### axisColor
String.The color of the coordinate axis.
Default is '#666666'.

#### contentColor
String.The color of the horizontal lines of the content.
Default is '#eeeeee'.

#### radius
Number.The radius of a pie chart or ring chart.
Default is 100.

#### innerRadius
Number.The inner radius of a ring chart.
Default is 700.

#### colorList
Array.The color list of a pie chart or ring chart.
Default is ['#1E9FFF', '#13CE66', '#F7BA2A', '#FF4949', '#72f6ff'];

#### legendColor
String.The color of the legend text.
Default is '#000000'.

#### legendTop
Number.Legend position of top.
Default is 40.

## Relevant
[vue-schart](https://github.com/lin-xin/vue-schart) : Vue.js wrapper for sChart.js

## License
[MIT license](https://github.com/lin-xin/sChart.js/blob/master/LICENCE).