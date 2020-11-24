const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const projectConfig = require('./projectConfig')
const {entry, mode, alias} = projectConfig
const isDev = mode === 'development' ? true : false
module.exports = {
    entry: [
        'babel-polyfill',
        entry || path.resolve(__dirname, 'src/main.js'),
    ] ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js',
        chunkFilename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js'
    },
    mode: mode,
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: "thread-loader",
                    options: {
                        workers: 2,
                        workerParallelJobs: 20,
                        workerNodeArgs: ['--max-old-space-size=1024'],
                        poolRespawn: false,
                        poolTimeout: 2000,
                        poolParallelJobs: 100,
                    }
                }, {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                overrideBrowserslist: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                            })]
                        }
                    },
                    'less-loader'
                ] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            publicPath: '../',
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 5,
                            publicPath: '../',
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].min.[ext]'
                                }
                            },
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            ...alias
        },
        extensions: ['*', '.js', '.jsx', '.vue']
    },
    externals: {
        "vue":"Vue",
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            path: './dist'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : "css/[name].[hash:8].css",
            chunkFilename: isDev ? 'css/[name].css' : "css/[name].[hash:8].css",
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./static/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './static/*.js'),
            publicPath: './static',
            outputPath: './static'
        })
    ],
}