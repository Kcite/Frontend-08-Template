学习笔记

产生式 BNF

<语法结构名>

if 函数 语法结构

基础结构
	终结符
复合结构
	非终结符
: 字符串 终结符
* 重复多次
| 或
+ 至少一次

1+2*3

( 1 + 2 ) * 3

<Expression> := 

<AddtiveExpression>::= <AddtiveExpression>"+"<MultiplicativeExpression>|<AddtiveExpression>"-"<MultiplicativeExpression>|<MultiplicativeExpression>

<MultiplicativeExpression>::= <AtomicExpression> | <MultiplicativeExpression>"*"<AtomicExpression>|<MultiplicativeExpression>"/"<AtomicExpression>

<AtomicExpression>::= "(" <AddtiveExpression> ")" | <Number>

图灵完备性


计算机语言

类型


我想说的

练习：尽可能寻找你知道的计算机语言，尝试把它们分类

在学校认知的计算机语言分类
1、机器语言：机器语言就是计算机内部最原始的一些二进制代码，机器语言占用内存很少，执行速度很快，但是不同型号的计算机，所用的机器语言不同，无法共用。
2、汇编语言：汇编语言是人们所设计的，使用特定的命令来编写，计算机运行时要使用转码器把它转变为机器语言，然后才能执行，但汇编语言仍然比较复杂，需要大量记忆。
3、高级语言：高级语言是比较容易使用的语言，例如C语言等，是与计算机型号无关，而且接近人类的自然语言，使用也比较容易。
课程中的分类
形式语言--用途
数据描述语言	JSON、HTML
编程语言	Python Java PHP

表达方式
声明式语言	HTML CSS
命令式语言 JavaScript

写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码。

function str2utf8(str) {
    encoder = new TextEncoder('utf8');
    return encoder.encode(str);
}

练习：用 JavaScript 去设计狗咬人的代码
//人
class Man {
	constructor(name){
		this.name = name;
		this.hp = 100; // 生命值
	},
	// 收到伤害
	hurt(damage) {
		this.hp -= damage;
		
	}
}
// 狗
class Dog {
	constructor(){
		this.ad = 5; // 物理攻击力
	},
	// 攻击-咬
	bite() {
		return thid.ad;
	}
}

let man = new Man('受害者');
let dog = new Dog();

man.hurt(dog.bite());


找出 JavaScript 标准里面所有具有特殊行为的对象

Array：Array 的 length 属性根据最大的下标自动发生变化。
Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
bind 后的 function：跟原来的函数相关联。