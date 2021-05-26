export class Timeline {
  constructor(){
    this.animations = new Set();
    this.finishedAnimaions = new Set();
    this.addTImes = new Map();
    this.requestID = null;
    this.state = "inited"
    this.tick = () => {
      let t = Date.now() - this.startTime;
      for(let animation of this.animations) {
        let {object, property, template, start, end, duration, timingFunction, delay } = animation;
        let addTime = this.addTImes.get(animation);
        if(t < delay + addTime){
          continue;
        }

        let progression = timingFunction((t - delay - addTime)/duration);
        if(t > duration + delay + addTime){
          progression = 1;
          this.animations.delete(animation);
          this.finishedAnimaions.add(animation);
        }

        let value = animation.valueFromProgression(progression);

        object[property] = template(value)
      }
      if(this.animations.size){
        this.requestID = requestAnimationFrame(this.tick)
      } else {
        this.requestID = null;
      }
    }
  }
  // 暂停
  pause(){
    if(this.state !== "playing"){
      return;
    }
    this.state = "paused"
    this.pauseTime = Date.now();
    if(this.requestID !== null){
      cancelAnimationFrame(this.requestID)
      this.requestID = null;
    }
  }
  // 恢复
  resume(){
    if(this.state !== "paused"){
      return;
    }
    this.state = "playing"
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }
  // 开始
  start(){
    if(this.state !== "inited"){
      return;
    }
    this.state = "playing"
    this.startTime += Date.now();
    this.tick();
  }

  // 重启
  reset(){
    if(this.state === "playing"){
      this.pause()
    }
    this.animations = new Set;
    this.finishedAnimaions = new Set;
    this.addTImes = new Map;
    this.requestID = null;
    this.startTime = Dat4e.now();
    this.pauseTime = null;
    this.state = "inited"
  }

  restart(){
    if(this.state === "playing"){
      this.pause()
    }
    for(let animation of this.finishedAnimaions){
      this.animations.add(animation)
    }
    this.finishedAnimaions = new Set()
    this.requestID = null
    this.state = "playing"
    this.startTime = Date.now();
    this.pauseTime = null
    this.tick()
  }

  add(animation, startTime){
    this.animations.add(animation);
    if(this.state === "pa"){

    }
  }

}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
    this.template = template;
  }

  receiveTime(time) {
    let range = (this.endValue - this.startValue)
    let progress = time / this.duration;
    this.object[this.property] = this.startValue + range * time / this.duration
  }
}

// setInterval(() =>{}, 16)

// let tick = () => {
  
//   setTimeout(tick, 16)
// }

// let tick = () => {
  
//   let handler =  requestAnimationFrame(tick)
//   cancelAnimationFrame(handler)
// }
