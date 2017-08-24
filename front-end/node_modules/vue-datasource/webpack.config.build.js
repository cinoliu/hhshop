var webpack = require('webpack');

module.exports = require('./webpack.config.js');

module.exports.entry = {
    'vue-datasource': './src/main.js',
}

module.exports.output.library = 'VueDatasourceComponent';
module.exports.output.libraryTarget = 'umd';