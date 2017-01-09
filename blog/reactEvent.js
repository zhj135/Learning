//React中事件如何传递参数
//React官方文档中并没有与之相关的信息，百度谷歌之后整理了一套解决方案
class MyMission extends Component{
	constructor(props){
		super(props)
		this.state={
			open:false,
			progress:[false,false,false,false,false],
			missionDetail:''
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(value,event){
		console.log(value,event)
	}
	render(){
		return (
			<div onClick={this.handleClick.bind(this,1)}>
				...
            </div>
         )
	}
}
// Step1：
// 此时没有传递任何参数，但handleClick中仍可有参数e
// e是React根据W3C标准提供的虚构事件（synthetic event），使我们不用担心浏览器的兼容性问题
handleClick(e){
	e.stopPropagation();
	e.preventDefault();
}
<div onClick={this.handleClick}>
	...
</div>
// Step2:
//若要传递参数，可使用ES5提供的Function.prototype.bind()或ES6的箭头函数
// bind()函数会创建一个新的函数，bind()的第一个参数就是新函数执行时的this值，bind()也接受预设的参数
// fun.bind(thisArg[, arg1[, arg2[, ...]]])
// 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
handleClick(value){
	console.log(value)//  1
}
<div onClick={this.handleClick.bind(this,1)}> 
	...
</div>
<div onClick={()=>{this.handleClick(1)}}> 
	...
</div>
// Step3:
//如果要同时传递参数和React虚拟事件e，那该怎么做呢？
handleClick(value,e){
	console.log(value,e)
}
<div onClick={this.handleClick.bind(this,1)}>
	...
</div>
//此时，第二个参数e就是React的虚拟事件


// 参考：
//Function.prototype.bind() 
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//ES6箭头函数
//http://es6.ruanyifeng.com/#docs/function#箭头函数