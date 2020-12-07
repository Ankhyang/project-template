const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const terserPlugin = new TerserPlugin({
    parallel: 4,
    extractComments: true,
    terserOptions: {
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] //移除console
        }
    }
});
module.exports = WebpackMerge(webpackConfig,{
    devtool:"cheap-module-source-map",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 1000,
                    name: 'common'
                }
            }
        },
        minimize: true,
        minimizer: [
            terserPlugin,
        ],
    },
    plugins:[
        new OptimizeCssAssetsPlugin()
    ]
})
