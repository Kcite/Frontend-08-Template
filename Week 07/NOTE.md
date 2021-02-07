学习笔记

#学号:G20200447080028
#班期:第8期
#小组:第2组
#作业&总结链接:https://github.com/Kcite/Frontend-08-Template/tree/main/Week%2007


完成 StringToNumber 和 NumberToString 两个函数



尝试找出 JavaScript 引擎里面 Realm 所有的对象，使用一个 JS 数据可视化的框架去做一个可视化。提交至 GitHub。


execution Context

i:()

code evaluation state

function

realm
内置对象的领域或者王国

VariableEnvironment

Function



在最新的标准（9.0）中，JavaScript 引入了一个新概念 Realm，它的中文意思是“国度”“领域”“范围”。

但在实际的前端开发中，通过 iframe 等方式创建多 window 环境并非罕见的操作，所以，促成了新概念 Realm 的引入。

Realm 中包含一组完整的内置对象，而且是复制关系。

格外注意的问题，比如 instanceOf 几乎是失效的。

g6


const iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"
var b1 = iframe.contentWindow.b; // This is the object created in the iframe, which is the object in different Realms
var b2 = {};
console.log(typeof b1, typeof b2); //object, both are objects.
objectconsole.log(b1 instanceof Object, b2 instanceof Object); //false true The object created in the iframe is different from the current built-in object Object.
