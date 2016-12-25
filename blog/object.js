//利用Object.create()实现继承
// function Shape(x,y){
// 	this.x = x;
// 	this.y = y;
// }
// Shape.prototype.move = function(x,y){
// 	this.x += x;
// 	this.y += y;
// }
// function Rectangle(x,y,z,p){
// 	Shape.call(this,x,y) //    => this.tempMethod=Shape;this.tempMethod(x,y);   
// 	this.z = z;
// 	this.p = p;
// }
// Rectangle.prototype = Object.create(Shape.prototype)
// var rect = new Rectangle(1,2,3,4)
// console.log(rect instanceof Rectangle)
// console.log(rect instanceof Shape)
// rect.move(1,2)
// console.log(rect.x)
//利用ES 6 class关键字实现继承
class Person{
	constructor(name,age){
		this.name = name;
		this.age = age;
	}
	getAge(){
		console.log(this.age)
	}
}
class Teacher extends Person{
	constructor(name,age,subject){
		super(name,age)
		this.subject = subject
	}
	getSubject(){
		console.log(this.subject)
	}
}
var obj = new Teacher('jue',23,'Math')
obj.getSubject();
