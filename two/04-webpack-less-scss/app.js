//webpack app.js build.js
//把app.js 以及app.js中引用到的模块,打包到build.js中
//如果app.js和模块的代码发生变化,需要重新打包


//加载css模块

// 你可能需要一个合适的loader处理 这种文件类型
// You may need an appropriate loader to handle this file type.
// require('./style.css');

// 加载less
// require('./xxx.less');
// 加载scss
require('./xxx.scss');


//实现页面上的加法运算

//使用模块中提供的加法功能,导入模块
//webpack2默认支持es6语法
const math = require('./math');//可省略.js

//获取元素

let span = document.getElementById('result');

//给按钮注册事件
let btn = document.getElementById('btn');

btn.onclick = function() {
    let t1 = document.getElementById('txt1').value;
    let t2 = document.getElementById('txt2').value;

    span.innerHTML = math.add(t1, t2);
}