//这个文件就是一个普通的node模块

//一  配置热加载服务器

//1 下载 webpack-dev-server   实时打包、实时刷新浏览器，开启服务器，自动打开浏览器
    
//cnpm install webpack-dev-server --save-dev

//2 下载html-webpack-plugin  会把打包好的js，插入到页面上

//cnpm install html-webpack-plugin --save-dev


//3 配置package.json中的scripts
//"dev": "webpack-dev-server --inline --hot --open --port 3000"

//4 运行  npm run dev
//报错   Error: Cannot find module 'webpack'
//本地安装webpack
// npm install webpack --save-dev


//5 运行还报错  Error: `output.path` needs to be an absolute path or `/`.
//webpack.config.js 中的output.path不可以是相对路径

//6 运行起来，但是没有显示页面，因为dev-server默认打开的页面是index.html


//7 此时运行html，没有执行js代码

//8 打包好的js插入页面   -- html-webpack-plugin



//二 配置es6==》es5
//1 
// webpack2.0 默认支持es6的模块化语法 import/export

// - 下载

// cnpm install babel-core babel-loader babel-preset-es2015 --save-dev
//包装能够转换.vue文件中的es6语法
// cnpm install babel-plugin-transform-runtime --save-dev

"use strict"; //让webpack能够使用es6语法


let path = require('path');

let htmlWebpackPlugin = require('html-webpack-plugin');

let webpack = require('webpack');

module.exports = {
    entry: './src/app.js',//打包的入口文件
    // 设置打包以后的文件存储的位置
    output: {
        path:path.resolve(__dirname, 'dist'), //打包文件存储的目录
        filename: 'build.js' //打包的文件名
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,           //排除指定内容
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,//配置后缀名
                //css-loader 处理样式文件中的url()
                //style-loader 作用是把css代码插入到网页中
                loader: 'style-loader!css-loader!autoprefixer-loader'//loader执行顺序是从右到左
            },
            {
                //设置处理不同类型的文件
                test: /\.(jpg|gif|png|eot|svg|ttf|woff|otf)$/,//配置后缀名
                loader: 'url-loader?limit=90000'//loader执行顺序是从右到左

                //loader:'url-loader?limit=20480'
                //limit 单位是字节
                //limit的作用,如果图片小于20480图片会自动被编译成base64的字符串
                //如果大于20480 不会被编译成base64字符串 并且依赖于file-loader会把图片复制到输出目录
            }
        ]
    },
    plugins: [
    new htmlWebpackPlugin({
        title: '页面标题',  //生成页面标题
        filename: 'index.html',  //生成在内存中的文件的名字
        template: 'template.html'  //根据指定的文件生成内容--作用模板
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
        babel: {
                presets: ['es2015'],
                plugins: ['transform-runtime']   //为了转换.vue中的es6的语法
        }
        }
    })
    ]
}
