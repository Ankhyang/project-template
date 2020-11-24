const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = WebpackMerge(webpackConfig,{
    devtool:"cheap-module-source-map",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'common'
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.(js|jsx)$/i,
            include:/src/,
            sourceMap: true,
            parallel: 4,
        })],
    },
    plugins:[
        new HardSourceWebpackPlugin(), //牛批新技术，不再需要dll

       // 打包文件详情分析 ，调试完毕即可删除
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8989, // 显示各模块包大小
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            }
        )
    ]
})
