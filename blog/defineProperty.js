// Object.defineProperty(obj, prop, descriptor)
// 可以定义或修改指定对象的属性
// descriptor为数据描述符，存取描述符之一
// 数据描述符合存取描述符都有的两个属性：configurable(属性描述符是否能被改变或删除) enumerable(属性是否能被遍历出)
// 数据描述符：value（属性的值）,writable（属性是否能被赋值运算改变）
// 存取描述符：set,get方法
var o = {};
var content;
Object.defineProperty(o,'v1',{
	configurable:true,
	enumerable:true,
	get:function(){
		return content
	},
	set:function(value){
		content = value;
	}
})
o.v1 = 2;
//此时content与v1总是相同