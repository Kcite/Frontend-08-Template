import {Component} from "./framework"
import {enableGesture} from "./gesture.js"

export class Carousel extends Component {
  constructor(){
    super();
    this.attributes = Object.create(null)
  }

  setAttribute(name, value){
    this.attributes[name] = value;
  }

  render(){
    this.root = document.createElement("div");
    this.root.classList.add("carousel")
    for(let record of this.attributes.src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${record}')`
      this.root.appendChild(child)
    }

    let children = this.root.children;

    let position = 0;
  }
}