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

//React中ReactPureComponent继承ReactComponent的方式
function People(name,age){
	this.name = name;
	this.age = age;
}
People.prototype.sayName = function(){
	console.log('my name is ' + this.name)
}
function Teacher(name,age,subject){
	this.name = name;
	this.age = age;
	this.subject = subject;
}
var ComponentDummy = function(){};
ComponentDummy.prototype = People.prototype;
Teacher.prototype = new ComponentDummy();
Teacher.prototype.constructor = Teacher;
var t1 = new Teacher('wnag',40,'math');
t1.sayName();
console.log(t1.constructor)