import { Component, createElement} from "./framework.js"

import { Carousel} from "./carousel"
import {Timeline, Animation} from "./animation"

let d = [
  "https://xixiaruan.com/127477B4-2061-40AD-81BD-E43C20516980.jpeg",
  "https://xixiaruan.com/44C54040-643D-4CB4-B348-317892463679.jpeg",
  "https://xixiaruan.com/4CD4FDE3-57EC-4D32-8AE7-B9327F58E3A6.jpeg",
  "https://xixiaruan.com/BF26876A-FAAE-4A82-B304-B49FFF823669.jpeg"
]

let a = <Carousel src={d} />
a.mountTo(document.body);

let tl = new Timeline();

window.tl = tl;
window.animation = new Animation({ set a(v){console.log(v)}}, "a", 0, 100, 1000, null);
