学习笔记


// 
Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e => ({name:e.children[1].innerText, url:e.children[1].children[0].href}))


let N = 65536

function s(arr){
	return arr[0] * N**3 + arr[1] * N**2 + arr[2] * N*1 + arr[3]
}

// div#a.b .c[id=x]
let val1 = [0, 1, 3, 1]  
console.log('div#a.b',s(val1)); // "div#a.b" 4295163905
// #a:not(#b) 
let val2 = [0, 2, 0, 0] 
console.log('#a:not(#b)',s(val2)); // "#a:not(#b)" 8589934592
// *.a 
let val3 = [0, 0, 1, 0] 
console.log('*.a',s(val3));  // "*.a" 65536
// div.a 
let val4 = [0, 0, 1, 1] 
console.log('div.a',s(val4));  // "div.a" 65537

结论
#a:not(#b) > div#a.b > div.a > *.a


为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

自己思考，和不建议使用是树结构的某些伪类

first-line
 CSS pseudo-element （CSS伪元素）在某 block-level element （块级元素）的第一行应用样式。第一行的长度取决于很多因素，包括元素宽度，文档宽度和文本的文字大小。
 
 因为这个因素过多，浏览器渲染会很影响性能
 
 
 #学号:G20200447080028
 #班期:第8期
 #小组:第2组
 #作业&总结链接:https://github.com/Kcite/Frontend-08-Template/tree/main/Week%2011