//1.定义了名为info的装饰器
function info(target) {
  //2.为目标添加静态属性
  target.info = "person info";
}
//3.为Person类应用info装饰器
@info
class Person {}

//4.打印Person的静态属性info
console.log(Person.info);
export { Person };
