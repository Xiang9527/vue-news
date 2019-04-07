var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry:{
        main: './src/main.js',
        vendors:['vue','vue-router','moment','axios'],
    },
    output:{
        path: path.resolve(__dirname, 'dir'),
        filename: 'js/[name]_[chunkhash:6].js',
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // loader:'style-loader!css-loader!autoprefixer-loader'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader"
                })
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096,//以上生成文件，否則base64
                    name:'asset/[name].[ext]'
                }
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins:[
        new UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendors','mainifest']//紀錄使用與第三方包的依賴
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new ExtractTextPlugin("css/[name]_[contenthash:6].css"),
    ],
}