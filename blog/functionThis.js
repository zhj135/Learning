// 函数嵌套时，内部函数的this会丢失, 绑定到全局变量
var test = 'global area';
function out() {
	var test = 'inner area';
	var that = this;
	function inner(){
		console.log('inner:::', that.test);
	}
	inner()
}
out();