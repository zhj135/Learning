//Dijkstra的双栈表达式求值算法
function Evaluate(str){
	this.str = str;
}
Evaluate.prototype.qiuZhi = function(){
	var str = this.str;
	var arr = str.split('')
	var signStack = [];
	var valueStack = [];
	while(arr.length>0){
		var temp = arr.shift();
		if(temp == '+' || temp == '-' || temp == '*' || temp == '/'){
			signStack.push(temp);
		}else if(temp == '('){
			continue;
		}else if(temp == ')'){
			 var v1 = valueStack.pop();
			 var v2 = valueStack.pop();
			 var sign = signStack.pop();
			 var result;
			 switch(sign){
			 	case '+':
			 		result = v1 + v2;valueStack.push(result);continue;
			 	case '-':
			 		result = v1 - v2;valueStack.push(result);continue;
			 	case '*':
			 		result = v1 * v2;valueStack.push(result);continue;
			 	case '/':
			 		result = v1 / v2;valueStack.push(result);continue;
			 	default:
			 		console.log(sign)
			 		console.log('存在未识别符号，程序退出');
			 		return;
			 }
		}else {
			temp = parseInt(temp);
			if(isNaN(temp)){
				console.log('转化数字失败，程序退出');
				return;
			}
			valueStack.push(temp);
		}
	}
	if(isNaN(valueStack[0])){
		console.log('存在不符合运算规则情况，程序退出')
		return
	}
	console.log("result: ")
	console.log(valueStack[0])
}

var str1 = "(1*2)*3)";
var test = new Evaluate(str1)
test.qiuZhi()

//算法原理：利用一个数值栈，一个符号栈来实现基本的加减乘除
//已知缺陷：因为利用右括号来判定是否进行运算，所以必须加上括号

//拓展知识点：
	//字符串转化为数组，数组转化为字符串
	// var arr = str.split('')
	// var s = arr.join('')