var A = function(){
	this.a = 1
}
A.prototype.b = 2
var aObj = new A();
console.log(aObj.prototype)
//undefined 只有构造函数才有原型对象，实例没有
console.log(aObj.b)
//aObj没有b属性，所以到原型链中查找b，在A.prototype中找到

//利用Object.create()实现继承
function Shape(x,y){
	this.x = x;
	this.y = y;
}
Shape.prototype.move = function(x,y){
	this.x += x;
	this.y += y;
}
function Rectangle(x,y,z,p){
	Shape.call(this,x,y) //    => this.tempMethod=Shape;this.tempMethod(x,y);   
	this.z = z;
	this.p = p;
}
Rectangle.prototype = Object.create(Shape.prototype)
var rect = new Rectangle(1,2,3,4)
console.log(rect instanceof Rectangle)
console.log(rect instanceof Shape)
rect.move(1,2)
console.log(rect.x)
