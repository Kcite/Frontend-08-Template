import { Component, createElement} from "./framework.js"

class Carousel extends Component {
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
      // child.style.display = "none";

      this.root.appendChild(child);
    }

    let position = 0;
    
    let w = (710/1.1);
    console.log(w);

    this.root.addEventListener("mousedown", event => {
      // console.log("mousedown");
      let children = this.root.children;
      let startX = event.clientX, startY = event.clientY;

      let move = event => {
        // console.log("mousemove");
        let x = event.clientX - startX, y = event.clientY - startY;
        let current = position - ((x - x % w) / w); 

        for(let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length

          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${- pos * w + offset * w + x % w}px)`
        }
        // console.log(x, y);
      }

      let up = event => {
        // console.log("mouseup");
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


    /*let currentIndex = 0;
    setInterval(() =>{
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = "none";
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`
      setTimeout(()=>{
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        next.style.transform = `translateX(${- nextIndex * 100}%)`

        currentIndex = nextIndex;
      }, 16)
    }, 3000)*/
    return this.root;
  }
  mountTo(parent){
    parent.appendChild(this.render());
  }
}

let d = [
  "https://xixiaruan.com/127477B4-2061-40AD-81BD-E43C20516980.jpeg",
  "https://xixiaruan.com/44C54040-643D-4CB4-B348-317892463679.jpeg",
  "https://xixiaruan.com/4CD4FDE3-57EC-4D32-8AE7-B9327F58E3A6.jpeg",
  "https://xixiaruan.com/BF26876A-FAAE-4A82-B304-B49FFF823669.jpeg"
]

let a = <Carousel src={d} />
// document.body.appendChild(a);

a.mountTo(document.body);