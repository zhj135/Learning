//写一个mul函数调用时将生成以下输出:
// console.log(mul(2)(3)(4)); // output : 24
// console.log(mul(4)(3)(4)); // output : 48
function mul(x){
	var result = function(y){
		return mul(x*y);
	}
	result.valueOf = function(){
		return x;
	}
	return result
}
console.log(mul(2)(3)(4)(5))
