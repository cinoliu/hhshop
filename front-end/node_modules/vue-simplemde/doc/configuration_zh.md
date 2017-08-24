## [SimpleMDE 配置](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration)

- **autoDownloadFontAwesome**: 如果设置为 `true`，强制下载Font Awesome (用于图标)，如果设置为 `false`，阻止下载，默认值为 `undefined`，这将智能检查字体是否已经包括Font Awesome，然后进行相应操作。
- **autofocus**: 如果设置为 `true`，将自动聚焦编辑器，默认值为 `false`。
- **autosave**: *自动保存已经输入的文本，下次打开时会进行加载，文本提交时会清空保存的内容。*
  - **enabled**: 如果设置为 `true`将自动保存输入的文本，默认值为 `false`。
  - **delay**: 自动保存的间隔时间，单位为毫秒，默认值为 `10000` (10s)。
  - **uniqueId**: 你必须设置一个唯一的字符串标识符来与其他网站的SimpleMDE存储做区分。
- **blockStyles**: 自定义文本样式块某些按钮的行为。
  - **bold** 可以设置为 `**` 或 `__`，默认值为 `**`。
  - **code** 可以设置为  ```` ``` ```` 或 `~~~`，默认值为 ```` ``` ````。
  - **italic** 可以设置为 `*` 或 `_`，默认值为 `*`。
- **element**: 要绑定的textarea元素，默认值为文档中的第一个textarea元素。
- **forceSync**: 如果设置为 `true`，在SimpleMDE中改变文本将立即同步至原textarea元素，默认值为 `false`。
- **hideIcons**: 需要隐藏的图标名称数组，可用于隐藏默认显示的特定图标，而不完全自定义工具栏。
- **indentWithTabs**: 如果设置为 `false`，用空格代替制表符缩进，默认值为 `true`。
- **initialValue**: 编辑器初始值。
- **insertTexts**: 通过带两个元素的数组来自定义插入文本按钮的行为，第一个元素将在光标或高亮显示之前插入，第二个元素将在之后插入。例如，链接的默认值： `['[', '](http://)']`。
  - horizontalRule
  - image
  - link
  - table
- **lineWrapping**: 如果设置为 `false`，禁用自动换行，默认值为 `true`。
- **parsingConfig**: Markdown解析配置。
  - **allowAtxHeaderWithoutSpace**: 如果设置为 `true`将不渲染`#`后的空格，默认值为 `false`。
  - **strikethrough**: 如果设置为 `false`将不对GFM语法进行解析，默认值为 `true`。
  - **underscoresBreakWords**: 如果设置为 `true`将使用下划线作为分隔符，默认值为 `false`。
- **placeholder**: 自定义占位符。
- **previewRender**: 自定义Markdown解析器，预览时调用。
- **promptURLs**: 如果设置为 `true`将出现一个JS警告窗口来获取链接或图片的网址，默认值为 `false`。
- **renderingConfig**: Markdown渲染配置。
  - **singleLineBreaks**: 如果设置为 `false`将禁用解析GFM换行符，默认值为 `true`。
  - **codeSyntaxHighlighting**: 如果设置为 `true`，将使用[highlight.js](https://github.com/isagalaev/highlight.js)进行高亮显示，默认值为 `false`。要使用这个功能，你必须在你的网页中引入highlight.js。 原版需像下面这样手动引入，本插件已集成highlight.js无需再次引入。<br>`<script src='https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js'></script>`<br>`<link rel='stylesheet' href='https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css'>`
- **shortcuts**: 快捷键，默认值为[快捷键数组](#keyboard-shortcuts)。
- **showIcons**: 图标名称数组，可用于显示默认隐藏的特定图标，而不完全自定义工具栏。
- **spellChecker**: 如果设置为 `false`将禁用拼写检查，默认值为 `true`。
- **status**: 如果设置为 `false`，隐藏状态栏。默认值为包含内置状态栏项目的数组。
  - 也可以设置状态栏项的数组并重新排序。你甚至可以自定义状态栏项目。
- **styleSelectedText**: 如果设置为 `false`将移除被选择文本的`CodeMirror-selectedtext`类，默认值为 `true`。
- **tabSize**: 自定义tab大小，默认值为 `2`。
- **toolbar**: 如果设置为 `false`将隐藏工具栏，默认值为[图标数组](#toolbar-icons)。
- **toolbarTips**: 如果设置为 `false`将不显示工具栏提示，默认值为 `true`。

```JavaScript
// 以下大多数选项为非默认行为
export default {
  data () {
    return {
      configs: {
        autofocus: true,
        autosave: {
          enabled: true,
          uniqueId: 'MyUniqueID',
          delay: 1000
        },
        blockStyles: {
          bold: '__',
          italic: '_'
        },
        element: document.getElementById('MyID'),
        forceSync: true,
        hideIcons: ['guide', 'heading'],
        indentWithTabs: false,
        initialValue: 'Hello world!',
        insertTexts: {
          horizontalRule: ['', '\n\n-----\n\n'],
          image: ['![](http://', ')'],
          link: ['[', '](http://)'],
          table: ['', '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n']
        },
        lineWrapping: false,
        parsingConfig: {
          allowAtxHeaderWithoutSpace: true,
          strikethrough: false,
          underscoresBreakWords: true
        },
        placeholder: 'Type here...',
        previewRender: function(plainText) {
          return customMarkdownParser(plainText) // 返回HTML自定义解析器
        },
        previewRender: function(plainText, preview) { // 异步方法
          setTimeout(function () {
            preview.innerHTML = customMarkdownParser(plainText)
          }, 250)
          return '加载中...'
        },
        promptURLs: true,
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true
        },
        shortcuts: {
          drawTable: 'Cmd-Alt-T'
        },
        showIcons: ['code', 'table'],
        spellChecker: false,
        status: false,
        status: ['autosave', 'lines', 'words', 'cursor'], // Optional usage
        status: ['autosave', 'lines', 'words', 'cursor', {
          className: 'keystrokes',
          defaultValue: function(el) {
            this.keystrokes = 0
            el.innerHTML = '0 Keystrokes'
          },
          onUpdate: function(el) {
            el.innerHTML = ++this.keystrokes + ' Keystrokes'
          }
        }], // Another optional usage, with a custom status bar item that counts keystrokes
        styleSelectedText: false,
        tabSize: 4,
        toolbar: false,
        toolbarTips: false
      }
    }
  }
}
```

#### 工具栏

下面是内置的工具栏图标（只有一些默认启用），你可以根据喜好重新排列。如果按钮有快捷键，将自动显示提示（即如果把`action`设置为`toggleBold`，`title`设置`加粗`，最终的提示文本将为`加粗（Ctrl-B）`）。

此外，你可以在工具栏数组中任意两个图标之间添加一个分离线`'|'`。

name | action | title<br>className
:--- | :----- | :--------------
bold | toggleBold | 加粗<br>fa fa-bold
italic | toggleItalic | 斜体<br>fa fa-italic
strikethrough | toggleStrikethrough | 删除线<br>fa fa-strikethrough
heading | toggleHeadingSmaller | 标题<br>fa fa-header
heading-smaller | toggleHeadingSmaller | 缩小标题<br>fa fa-header
heading-bigger | toggleHeadingBigger | 增大标题<br>fa fa-lg fa-header
heading-1 | toggleHeading1 | 大标题<br>fa fa-header fa-header-x fa-header-1
heading-2 | toggleHeading2 | 中等标题<br>fa fa-header fa-header-x fa-header-2
heading-3 | toggleHeading3 | 小标题<br>fa fa-header fa-header-x fa-header-3
code | toggleCodeBlock | 代码块<br>fa fa-code
quote | toggleBlockquote | 引用<br>fa fa-quote-left
unordered-list | toggleUnorderedList | 无序列表<br>fa fa-list-ul
ordered-list | toggleOrderedList | 有序列表<br>fa fa-list-ol
clean-block | cleanBlock | 清除格式<br>fa fa-eraser fa-clean-block
link | drawLink | 插入链接<br>fa fa-link
image | drawImage | 插入图片<br>fa fa-picture-o
table | drawTable | 插入表格<br>fa fa-table
horizontal-rule | drawHorizontalRule | 插入水平线<br>fa fa-minus
preview | togglePreview | 预览<br>fa fa-eye no-disable
side-by-side | toggleSideBySide | 全屏预览<br>fa fa-columns no-disable no-mobile
fullscreen | toggleFullScreen | 全屏<br>fa fa-arrows-alt no-disable no-mobile
guide | [跳转链接](https://simplemde.com/markdown-guide) | Markdown引导<br>fa fa-question-circle

使用`toolbar`选项自定义工具栏：

```JavaScript
// 仅自定义现有按钮的顺序
export default {
  data () {
    return {
      configs: {
        toolbar: ['bold', 'italic', 'heading', '|', 'quote']
      }
    }
  }
}

// 自定义所有信息和/或添加你的图标
export default {
  data () {
    return {
      configs: {
        toolbar: [{
            name: 'bold',
            action: SimpleMDE.toggleBold,
            className: 'fa fa-bold',
            title: '加粗'
          },
          {
            name: 'custom',
            action: function customFunction (editor) {
              // 添加你的代码
            },
            className: 'fa fa-star',
            title: '自定义按钮'
          },
          '|' // 分隔符
          ...
        ]
      }
    }
  }
}
```

#### 快捷键

SimpleMDE带有预定义键盘快捷键的数组，可以用一个配置选项改变。默认的列表如下：

快捷键 | 操作
:------- | :-----
*Cmd-'* | '引用'
*Cmd-B* | '加粗'
*Cmd-E* | '清除格式'
*Cmd-H* | '缩小标题'
*Cmd-I* | '斜体'
*Cmd-K* | '插入链接'
*Cmd-L* | '插入无序列表'
*Cmd-P* | '预览'
*Cmd-Alt-C* | '插入代码块'
*Cmd-Alt-I* | '插入图片'
*Cmd-Alt-L* | '插入有序列表'
*Shift-Cmd-H* | '增大标题'
*F9* | '全屏预览'
*F11* | '全屏'

可以只修改部分快捷键，其他保持不变：

```JavaScript
export default {
  data () {
    return {
      configs: {
        shortcuts: {
          'toggleOrderedList': 'Ctrl-Alt-K', // 改变插入有序列表的快捷
          'toggleCodeBlock': null, // 不绑定插入代码块的快捷键
          'drawTable': 'Cmd-Alt-T' // 绑定没有预设快捷键的操作，插入表格
        }
      }
    }
  }
}
```

快捷键会在平台之间自动转换。如果你定义一个快捷键为“Cmd-B”，在PC机上的快捷键将更改为“Ctrl-B”。反之亦然。

可以绑定的操作列表与[工具栏按钮](#toolbar-icons)的内置操作列表相同。

#### 高度

改变最小高度:

```CSS
.markdown-editor .CodeMirror, .markdown-editor .CodeMirror-scroll {
  min-height: 200px;
}
```

设置高度为一个固定值:

```CSS
.markdown-editor .CodeMirror {
  height: 300px;
}
```