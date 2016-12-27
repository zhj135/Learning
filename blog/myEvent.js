//模拟事件的发布和订阅
function MyEvent(){
	this.events = {};

	this.on = function(event,callBack){
		if(typeof callBack !== "function"){
			console.log('请传入正确的回调函数')
		}else{
			if(events[event] === undefined){
				this.events[event] = [callBack]
			}else{
				this.events[event].push(callBack)
			}
		}
	};

	this.emit = function(event,args){
		if(!this.events[event]){
			console.log('此事件不存在')
		}else{
			this.events[event].forEach(function(func){
				func(args)
			})
		}
		
	}

	this.off = function(event){
		delete this.events[event]
	}
};
var myEvent = new MyEvent();
myEvent.on('abc',function(x){
	console.log(x)
})
myEvent.emit('abc','success')
