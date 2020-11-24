/**
 * 项目配置集合
 **/

const path = require('path');
const projectConfig={
    port: 8089,  //端口
    host:'127.0.0.1', // host
    entry:path.resolve(__dirname,'src/main.js'),  // 入口文件,
    mode:process.env.NODE_ENV || 'development' , // 环境
    alias:{ //静态文件路径别名配置
        //'vue$':'vue/dist/vue.esm.js',  // 防止依赖 VUE 版本不一致
        '@src':path.resolve(__dirname,'src'), // 项目主目录
        '@utils':path.resolve(__dirname,'src/utils'), // 全局方法 、store
        '@pages':path.resolve(__dirname,'src/pages'), // 页面入口
        '@router':path.resolve(__dirname,'src/router'), // 路由管理
        '@public':path.resolve(__dirname,'src/public'), // 静态资源文件
        '@httpServer':path.resolve(__dirname,'src/httpServer'), // API 管理
        '@components':path.resolve(__dirname,'src/components'), // 通用组件库
    },
    proxy: {  //自定义代理配置集合
        '/uc':{
            target: 'http://j-dev.ihdwork.com',
            changeOrigin: true
        },
        '/screen':{
            target: 'http://j-dev.ihdwork.com',
            changeOrigin: true
        }
    }
}
module.exports=projectConfig