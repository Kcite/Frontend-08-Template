/**
 * 编写一个 match 函数。
 * 它接收两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。
 * 这个元素你可以认为它一定会在一棵 DOM 树里面。
 * 通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。
 * （不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）
 * 以下是一个调用的例子。
 * selector 选择器		复杂选择器
 * element HTML元素
 * */
function match(selector, element) {

	if (!selector || !element.attributes) {
		return false;
	}

	let selectLists = selector.split(" ").reverse();
	// console.log('selectLists', selectLists); // ["#id.class","div"] 复合选择器
	let selectList = selectLists[0].match(/(#|.)?[\w]+/g);
	// console.log('selectList', selectList);
	if (selectList.length > 1) {
		// 简单选择器
		for (let i = 0; i < selectList.length; i++) {
			if (!match(selectList[i], element)) {
				console.log(1);
				return false;
			}
		}
		return true;

	}
	
	if (selector.charAt(0) == "#") {
		// attributes 属性返回该元素所有属性节点的一个实时集合（NamedNodeMap） 不是一个数组
		console.log(1, element.attributes);
		console.log(1, element.attributes['id']);
		console.log(1, element.attributes['id'].name);
		console.log(1, element.attributes['id'].value);
		let attr = element.attributes;
		console.log(selector.replace("#", ""));

		if (element.attributes['id'].value === selector.replace("#", "")) {
			console.log(2);
			return true;
		}

	} else if (selector.charAt(0) == ".") {

		if (element.attributes['class']) {
			let attr = element.attributes['class'].name === 'class';
			if (attr) {
				console.log(1, element.attributes['class'].name);
				console.log(1, element.attributes['class'].value);

				return element.attributes['class'].value.split(" ").some((value) => {
					return value === selector.replace(".", '');
				});

				// if (element.attributes['class'].value === selector.replace(".", "")) {
				// 	console.log(3);
				// 	return true;
				// }
			}
		}

	} else {
		// element.tagName 会输出 大写
		// 使用toLowerCase转换小写进行比较
		if (element.tagName && element.tagName.toLowerCase === selector.toLowerCase) {
			return true;
		}
	}
}


console.log(match("div#a.b", document.getElementById("id")));
// console.log(match("div #id.class", document.getElementById("id")));

// parent
// children
