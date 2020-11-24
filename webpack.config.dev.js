const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const projectConfig = require('./projectConfig')
const {port ,host ,proxy} = projectConfig
module.exports = WebpackMerge(webpackConfig,{
    devtool:"cheap-module-eval-source-map",// 开发环境配置
    devServer:{
        port:port,
        host:host,
        open:true,
        hot:true,
        overlay:{erros:true},
        // noInfo:true,
        // headers:{
        //     "Access-Control-Allow-Origin":"*"
        // },
        // hotOnly:false,
        // disableHostCheck:true,
        proxy: {
            ...proxy
        }
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})
