## 通用中后台 前端框架

#### 项目介绍
通用 vue 前端项目框架 

CND 引入 vue vuex vue-router echarts ant-design-vue

#### 软件架构
 node 10 +
 webpack 4.X +
 vue 2.X + 
 ant-design-vue + Echarts 4.X
 
#### 使用说明

1. 安装依赖  npm i
2. 启动项目  npm start , 首次启动项目 ，需先运行 npm run build:dll
3. 生产环境打包 npm run build 
4. 依赖资源单独打包  npm run build:dll ,将 antd 与 echarts 单独打包
#### 目录结构

eg:
* dist-----生产环境打包文件目录  
* src：    
    * httpServer-----API 请求相关
    * components-----项目内通用组件目录
    * layout-----页面layout容器
    * pages-----主页面目录
    * public-----静态资源目录
    * router-----路由管理
    * utils-----全局方法目录
        * store-----全局状态管理
    * app.vue-----页面主入口
    * style-----公共样式管理
        * base.less-----初始化样式
        * common.less-----全局样式表
    * main.js-----项目打包主入口
* babel.config.js-----babel 配置

* webpack.config.dev.js-----开发环境打包入口
* webpack.config.js-----webpack公共配置
* webpack.config.prod.js-----生产环境打包入口
        

