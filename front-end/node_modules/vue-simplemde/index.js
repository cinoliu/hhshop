/**
 * vue-simplemde
 * @author F-loat
 */

var markdownEditor = require('./markdown-editor.vue');

var VueSimplemde = {
  markdownEditor: markdownEditor,
  install: function(Vue) {
    Vue.component('markdown-editor', markdownEditor);
  },
};

module.exports = VueSimplemde;
