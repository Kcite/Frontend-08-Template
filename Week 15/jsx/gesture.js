

export class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties){
    let event = new Event(type);
    for(let name in properties){
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false;

    let contexts = new Map();

    
  }
}


let element = document.documentElement;

element.addEventListener("mousedown", event => {
  start(event)
  let mousemove = event => {
    move(event);
  }
  let mouseup = enent => {
    end(event)
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup);
  }
  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
})

let contexts = new Map();

element.addEventListener("touchstart", event=>{
  for(let touch of event.changedTouches){
    contexts[touch.identifier] = Object.create(null);
    start(touch, contexts[touch.identifier]);
  }
})

element.addEventListener("touchmove", event=>{
  for(let touch of event.changedTouches){
    move(touch, contexts[touch.identifier]);
  }
})

element.addEventListener("touchend", event=>{
  for(let touch of event.changedTouches){
    end(touch, contexts[touch.identifier]);
    delete contexts[touch.identifier]
  }
})

element.addEventListener("touchcancel", event=>{
  for(let touch of event.changedTouches){
    cacel(touch,  contexts[touch.identifier]);
    delete contexts[touch.identifier]
  }
})

// let handler;
// let startX, startY;
// let isPan = false, isTap = true, isPress = false;

let start = (point, context) =>{
  element.dispatchEvent(new CustomEvent("start", {
    startX: point.clientX,
    startY: point.clientY,
    clientX: point.clientX,
    clientY: point.clientX
  }))
  context.startX = point.clientX, context.startY = point.clientY;
  context.moves = [];
  context.isTap = true;
  context.isPan = false;
  context.isPress = false;
  context.timoutHander = setTimeout(() => {
    if(context.isPan){
      return;
    }
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.handler = null;
    element.dispatchEvent(new CustomEvent("pressstart", {}))
  }, 500)
}

let move = (point, context) =>{
  let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

  if(!isPan && dx ** 2 + dy ** 2 > 100){
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log("panstart");
    clearTimeout(handler)
  }

  if(isPan){
    console.log(dx, dy)
    console.log("pan")
  }

  // console.log("move", point.clientX, point.clientY)
}

let end = (point) =>{
  if(isTap){
    console.log("tap");
    clearTimeout(handler)
  }
  if(isPan){
    console.log("panend");
  }
  if(isPress){
    console.log("presssend");
  }
  // console.log("end", point.clientX, point.clientY)
}

let cancel = (point) =>{
  // console.log("cancel", point.clientX, point.clientY)
}


class Listener {
  constructor
} 