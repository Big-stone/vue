
vue借鉴了angular与react,集成了他们的优点

框架与库的区别:库需要调用方法,框架需要按照它规定的模式去写方法

vue基于组件式开发

v-if 会将元素隐藏

v-show 只是给元素设置了一个display:none;

v-bind:给没有对应指令的属性绑定数据  简化语法 :disabled

v-on：绑定事件 简化语法 @click

router-view起占位作用

vue-resource支持promise语法获取到数据以后直接赋给data中的数据，绑定到页面渲染

webpack基于node

webpack版本2.4.1 打包时出口文件路径需要写成绝对路径,无法使用相对路径,解决方案如下。

var path = require('path')
module.exports = {
    
    entry: './app.js',//打包的入口文件
    // 设置打包以后的文件存储的位置
    output: {
        path:path.resolve(__dirname, './bin'), //打包文件存储的目录
        filename: 'build.js' //打包的文件名
    }
}
