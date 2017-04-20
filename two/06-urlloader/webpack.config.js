//这个文件就是一个普通的node模块

// 打包 css中引用图片

// 1 下载url-loader
// 2 配置webpack.config   要去处理的文件类型




var path = require('path')
module.exports = {
    entry: './app.js',//打包的入口文件
    // 设置打包以后的文件存储的位置
    output: {
        path:path.resolve(__dirname, './bin'), //打包文件存储的目录
        filename: 'build.js' //打包的文件名
    },
    module:{
        loaders: [
            {
                test: /\.css$/,//配置后缀名
                //css-loader 处理样式文件中的url()
                //style-loader 作用是把css代码插入到网页中
                loader: 'style-loader!css-loader!autoprefixer-loader'//loader执行顺序是从右到左
            },
            {
                //设置处理不同类型的文件
                test: /\.(jpg|gif|png)$/,//配置后缀名
                loader: 'url-loader'//loader执行顺序是从右到左
            }
        ]
    }
}
