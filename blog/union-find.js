function UN(arr1){
	this.arr = arr1;
} 
//在p,q之间添加一条连接
UN.prototype.union = function(p,q){
	var pId = this.find(p);
	var qId = this.find(q);
	if(pId == qId)return;
	for(let i=0;i<this.arr.length;i++){
		if(this.arr[i] == qId){
			this.arr[i] = pId;
		}
	}
}
//p所在分量的标识符
UN.prototype.find = function(p){
	return this.arr[p];
}
//如果p,q存在同一连通分量则返回true
UN.prototype.connected = function(p,q){
	if(this.find(p) == this.find(q)){
		return true
	}else{
		return false
	}
}
function consoleArray(arr){
	for(let i=0;i<arr.length;i++){
		console.log(arr[i])
	}
}
var a = [0,1,2,3,4,5,6,7,8];
var testArr = new UN(a);
testArr.union(1,2);
testArr.union(3,4);
testArr.union(1,4);
console.log(testArr.connected(5,6))