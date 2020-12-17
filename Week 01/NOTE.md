学习笔记

编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动

讲讲 position float display 各有哪些取值，它们互相之间会如何影响？

position
用于指定一个元素在文档中的定位方式
static
relative	相对定位元素
absolute	绝对定位元素
fixed			绝对定位元素
sticky		粘性定位元素

float
用于指定一个元素在
left
right
none
inline-start
inline-end

display
可以设置元素的内部和外部显示类型
none
block
inline
list-item

table
inline-block

flex

gird




JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？

HTML 中，如何写一个值为 “a”=‘b’ 的属性值？

编写一个快速排序代码，并且用动画演示它的过程。
arr.sort([compareFunction])
用原地算法对数组的元素进行排序，并返回数组。
默认排序是将元素转换为字符串，然后比较它们的UTF-16代码单元值序列构建的
let numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

使用映射改善排序
基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});

【关于我】
大家好，我是李飞，一个90后，
【关于工作】
目前在太原从事前端开发一职，主要使用uni.app开发跨平台软件
【工作之外】
工作之外我会打打游戏，撸撸猫。
【给我 10 分钟，我希望与你分享…】
给我10分钟，我希望与你分享如何用uni.app快速开发一个微信小程序。
结束语
希望和大家一起愉快学习。