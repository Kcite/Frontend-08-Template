import { Component } from "./framework.js"
export class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render(){
    // console.log(this.attributes.src);
    this.root = document.createElement("div")
    this.root.classList.add("carousel");
    for (let record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;

      this.root.appendChild(child);
    }

    let position = 0;
    
    let w = (710/1.1);
    console.log(w);

    this.root.addEventListener("mousedown", event => {
      let children = this.root.children;
      let startX = event.clientX, startY = event.clientY;

      let move = event => {
        let x = event.clientX - startX, y = event.clientY - startY;
        let current = position - ((x - x % w) / w); 

        for(let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length

          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${- pos * w + offset * w + x % w}px)`
        }
      }

      let up = event => {
        let x = event.clientX - startX, y = event.clientY - startY;
        position = position - Math.round(x / w);
        for(let offset of [0, - Math.sign(Math.round(x / w) - x + (w / 2) * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length

          children[pos].style.transition = ""
          children[pos].style.transform = `translateX(${- pos * w + offset * w}px)`
        }
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
      }

      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })

    return this.root;
  }
  mountTo(parent){
    parent.appendChild(this.render());
  }
}
