function createElement(type, attributes, ...children) {
  let element;
  if(typeof type === "string"){
    element = new ElementWrapper(type);
    // element = document.createElement(type);
  } else {
    element = new type;
  }
  for(let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  for(let child of children) {
    if(typeof child === "string"){
      child = new TextWrapper(child);
      // child = document.createTextNode(child);
    }
    element.appendChild(child);
  }
  return element;
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    // this.root.appendChild(child);
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}

class Carousel {
  constructor() {
    this.root = document.createElement("div");
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}


class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    // this.root.appendChild(child);
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}

let a = <div id="a">
  <span>a</span>
  <span>b</span>
  <span>c</span>
</div>

// document.body.appendChild(a);

a.mountTo(document.body);