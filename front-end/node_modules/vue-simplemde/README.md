# Vue-SimpleMDE
> Markdown Editor component for Vue.js. Support both vue1.0 & vue2.0.

[![NPM](https://nodei.co/npm/vue-simplemde.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-simplemde/)

# Demo
[Demo Page](https://F-loat.github.io/vue-simplemde/)

# Use Setup

## Install vue-simplemde

``` bash
npm install vue-simplemde --save
```

## Use

``` javascript
// import with ES6
import Vue from 'vue'
import VueSimplemde from 'vue-simplemde'

// require with Webpack/Node.js
var Vue = require('vue')
var VueSimplemde = require('vue-simplemde')

// use
Vue.use(VueSimplemde)
```

``` javascript
// or use with component(ES6)
import { markdownEditor } from 'vue-simplemde'

export default {
  components: {
    markdownEditor
  }
}
```

## Examples

### Vue1.0
``` html
<!-- 使用双向绑定修饰符 -->
<markdown-editor :value.sync="content" v-ref:markdown-editor></markdown-editor>
```

### Vue2.0
``` html
<!-- 通过 v-model 控制 value -->
<markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>

<!-- 通过事件控制 value -->
<markdown-editor :value="content" @input="handleInput"></markdown-editor>

<!-- 添加配置 -->
<markdown-editor :configs="configs"></markdown-editor>
```

### Both
``` javascript
import { markdownEditor } from 'vue-simplemde'

// 基础用法
export default {
  components: {
    markdownEditor
  },
  data () {
    return {
      content: '',
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    }
  }
}

// 添加更多配置，获取编辑器对象，添加事件绑定，判断编辑器状态
export default {
  components: {
    markdownEditor
  },
  data () {
    return {
      content: '',
      configs: {
        status: false, // 禁用底部状态栏
        initialValue: 'hellow', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      }
    }
  },
  computed: {
    simplemde () {
      return this.$refs.markdownEditor.simplemde
    }
  },
  mounted: {
    console.log(this.simplemde)
    this.simplemde.togglePreview()

    // 'change'事件已经绑定，可以通过@input指定处理器
    // 如果需要，你可以自行绑定这个列表中的其他事件: https://codemirror.net/doc/manual.html#events
    this.simplemde.codemirror.on('beforeChange', (instance, changeObj) => {
      // do some things
    })

    // 移除SimpleMDE，组件销毁时会自动调用
    this.simplemde = null

    // 一些有用的方法
    this.simplemde.toTextArea()
    this.simplemde.isPreviewActive() // returns boolean
    this.simplemde.isSideBySideActive() // returns boolean
    this.simplemde.isFullscreenActive() // returns boolean
    this.simplemde.clearAutosavedValue() // no returned value
    this.simplemde.markdown(this.content) // returns parsed html
  },
  methods: {
    handleInput () {
      // do some things
    }
  }
}
```

## Editor Theme ([simplemde-theme-base](https://github.com/xcatliu/simplemde-theme-base/wiki/List-of-themes))
> e.g. 使用simplemde-theme-base主题

### install
```
$ npm install --save simplemde-theme-base
```

### use
``` html
<markdown-editor :custom-theme="true"></markdown-editor>
```

``` javascript
import 'simplemde-theme-base/dist/simplemde-theme-base.min.css'
```


## Markdown style
> e.g. 使用Github的markdown样式

[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

### install
```
$ npm install --save github-markdown-css
```

### use
``` html
<markdown-editor preview-class="markdown-body"></markdown-editor>
```

``` javascript
// 使用默认编辑器主题时
require.ensure([], () => require('github-markdown-css'), 'markdown-style')

// 使用自定义编辑器主题时
import 'github-markdown-css'
```

## Configuration

* [中文](doc/configuration_zh.md)
* [English](doc/configuration_en.md)

## Dependencies

* [SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor)
* [Highlight.js](https://github.com/isagalaev/highlight.js)

## Licence

vue-simplemde is open source and released under the MIT Licence.

Copyright (c) 2017 F-loat
