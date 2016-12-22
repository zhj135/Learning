//动态连通性问题
//union-find.js中union操作需要对数组进行一次遍历，当数据量大时比较耗时，故利用树结构进行优化
//同样用数组表示初始状态的连通分量，不同的是，数组每项包含的是一个树
function UN(arr1){
	this.arr = arr1;
} 
//在p,q之间添加一条连接：将其中一棵树的根节点作为另一棵树的子节点进行合并。
UN.prototype.union = function(p,q){
	if(this.root(q) == this.root(p))return;
	var i = this.root(q)
	this.arr[i] = this.root(p)
}
//查找p所在分量的标识符
UN.prototype.find = function(p){
	return this.arr[p];
}
//查找p所在分量的根节点
UN.prototype.root = function(p){
	while(p != this.find(p)){
		p = this.find(p)
	}
	return this.find(p)
}
//判断是否是同一连通分量：如果p,q的根节点相同，则返回true
UN.prototype.connected = function(p,q){
	if(this.root(p) == this.root(q)){
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
//测试
var a = [0,1,2,3,4,5,6,7,8];
var testArr = new UN(a);
testArr.union(1,7)
testArr.union(5,7)
console.log(testArr.connected(1,5))