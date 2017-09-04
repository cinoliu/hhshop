let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let glob = require('glob');

// js名必须与html的fileName对应
let entry = (() => {
	let obj = {};
	getEntry('src/views/pages/*.pug').forEach(fileName => {
		obj[fileName] = './src/js/' + fileName + '.js';
	});

	return obj;
})();


module.exports = {
	entry: entry,
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: 'js/[name].js',
		// chunkFilename: 'js/[name][id].chunk.js', // 公共代码块
	},
	externals: {
		// 'vue': 'Vue',
		// 'jquery': 'jQuery',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: ExtractTextPlugin.extract({
							fallback: 'vue-style-loader',
							use: 'css-loader!sass-loader',
						}),
					}
				}
            },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
            },
            // 不要使用options配置url-loader webpack会报错
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader?limit=10000&name=img/[name].[hash:7].[ext]',
            },
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader?limit=10000&name=img/[name].[hash:7].[ext]',
            },
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!postcss-loader!sass-loader'
				})
            },
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!postcss-loader'
				})
            },
			{
				test: /\.html$/,
				loader: 'html-loader?attrs=img:src img:data-src'
            },
			{
				test: /\.pug$/,
				loader: 'pug-loader'
            },
        ]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			// 'vue$': '../node_modules/vue'
		}
	},
	devServer: {
		port: 8888,
		historyApiFallback: true,
		stats: 'minimal', // 输入精简信息
		overlay: true, // 将错误显示在html之上
		proxy: {
			'/api': {
				target: 'http://localhost:9999', //测试地址
				secure: false,
				changeOrigin: true,
				// pathRewrite: {'^/api': ''},
			}
		}
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热加载

        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        // }),

        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publicPath

    ],
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
        new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
        new webpack.LoaderOptionsPlugin({
			minimize: true
		})
    ]);
}

console.log(1);

// 自动生存htmlPlugins
getEntry('src/views/pages/*.pug').forEach(fileName => {
	let conf = {
		filename: fileName + '.html', //生成的html存放路径，相对于path
		template: 'src/views/pages/' + fileName + '.pug', //html模板路径
		inject: true,
		hash: true,
		minify: {
			removeComments: true,
			minifyJS: true,
		},
		chunks: [fileName],
	};
	module.exports.plugins.push(new HtmlWebpackPlugin(conf));


	console.log(2);
});

// 获取文件名函数
function getEntry(viewsPath) {
	let files = glob.sync(viewsPath);
	let entries = [];
	let entry, basename, extname;

	for (let i = 0; i < files.length; i++) {
		entry = files[i];
		extname = path.extname(entry); // 扩展名 eg: .html
		basename = path.basename(entry, extname); // eg: index
		entries.push(basename);
	}
	return entries;
}
