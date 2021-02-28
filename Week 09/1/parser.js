// 全局变量
let currentToken = null;
let currentAttribute = null; // 属性

let stack = [{
	type: "document",
	children: []
}];
let currentTextNode = null;

function emit(token) {
	// if (token.type != "text") {
	// 	console.log(token);
	// 	return;
	// }
	let top = stack[stack.length - 1];

	if (token.type == "startTag") {
		let element = {
			type: "element",
			children: [],
			attributes: []
		};

		element.tagName = token.tagName;

		for (let p in token) {
			if (p != "type" && p != "tagName") {
				element.attributes.push({
					name: p,
					value: token[p]
				})
			}
		}

		top.children.push(element);
		element.parent = top;

		if (!token.isSelfClosing) {
			stack.push(element);
		}

		currentTextNode = null;
	} else if (token.type = "endTag") {
		if (top.tagName != token.tagName) {
			throw new Error("Tag start end doesn't match!")
		} else {
			//
			stack.pop();
		}
		currentTextNode = null;

	} else if (token.type == "text") {
		if (currentTextNode == null) {
			currentTextNode = {
				type: "text",
				content: ""
			}
			tup.children.push(currentTextNode);
		}

		currentTextNode.content += token.content;
	}
}

const EOF = Symbol("EOF");

// 
function data(c) {
	if (c == "<") {
		return tagOpen;
	} else if (c == EOF) {
		emit({
			type: "EOF"
		})
		return;
	} else {
		emit({
			type: "text",
			content: c
		})
		return data;
	}
}

// 开始标签
function tagOpen(c) {
	if (c == '/') {
		return endTagOpen;
	} else if (c.match(/^[a-zA-Z]$/)) {
		// 开始标签
		currentToken = {
			type: "startTag",
			tagName: ""
		}
		return tagName(c);
	} else {
		return;
	}
}

// 结束标签
function endTagOpen(c) {
	if (c.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: "endTag",
			tagName: ""
		}
		return tagName(c);
	} else if (c == ">") {

	} else if (c == EOF) {

	} else {

	}
}

// 标签名称
function tagName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == '/') {
		return selfClosingStartTag;
	} else if (c.match(/^[a-zA-Z]$/)) {
		currentToken.tagName += c
		return tagName;
	} else if (c == ">") {
		emit(currentToken);
		return data;
	} else {
		currentToken.tagName += c;
		return tagName;
	}
}

// 属性
function beforeAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == '/' || c == ">" || c == DOF) {
		return afterAttributeName(c);
	} else if (c == "=") {

	} else {
		currentAttribute = {
			name: "",
			value: ""
		}
		return attributeName(c);
	}
}

function attributeName(c) {
	if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
		// 属性结束
		return afterAttributeName(c);
	} else if (c == "=") {
		// 属性值
		return beforeAttributeValue;
	} else if (c == "\u0000") {

	} else if (c == "\"" || c == "'" || c == "<") {

	} else {
		currentAttribute.name += c;
		return attributeName;
	}
}

function beforeAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
		return beforeAttributeValue;
	} else if (c == "\"") {
		return doubleQuotedAttributeValue;
	} else if (c == "\'") {
		return singleQuotedAttributeValue;
	} else if (c == ">") {

	} else {
		return UnquotedAttributeValue(c);
	}
}

function doubleQuotedAttributeValue(c) {
	if (c == "\"") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeValue;
	} else if (c == "\u0000") {

	} else if (c == EOF) {

	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function singleQuotedAttributeValue(c) {
	if (c == "\'") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeValue;
	} else if (c == "\u0000") {

	} else if (c == EOF) {

	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function afterQuotedAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == "/") {
		return selfClosingStartTag;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == EOF) {

	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function UnquotedAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return beforeAttributeName;
	} else if (c == "/") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return selfClosingStartTag;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == "\u0000") {

	} else if (c == "\'" || c == "'" || c == "<" || c == "=" || c == "`") {

	} else if (c == EOF) {

	} else {
		currentAttribute.value += c;
		return UnquotedAttributeValue;
	}
}

// 自封闭标签
function selfClosingStartTag() {
	if (c == ">") {
		currentToken.isSelfClosing = true;
		emit(currentToken);
		return data;
	} else if (c == EOF) {

	} else {

	}
}

function afterAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return afterAttributeName;
	} else if (c == "/") {
		return selfClosingStartTag;
	} else if (c == "=") {
		return beforeAttributeValue;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == EOF) {

	} else {
		currentToken[currentAttribute.name] = currentAttribute.value;
		currentAttribute = {
			name: "",
			value: ""
		}
		return attributeName(c);
	}
}


module.exports.parseHTML = function parseHTML(html) {
	let state = data;
	for (let c of html) {
		state = state(c);
	}
	state = state(EOF);
	// console.log(stack[0]);
	return stack[0];
}
