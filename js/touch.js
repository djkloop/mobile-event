function transform(el, attr, val) {

  if (!el.transform) {
    el.transform = {};
  }
  if (val === void 0) {
    return el.transform[attr];
  }
  el.transform[attr] = val;
  var str = "";
  for (const s in el.transform) {
    if (el.transform.hasOwnProperty(s)) {
      const element = el.transform[s];
      switch (s) {
        case "rotate":
        case "rotateX":
        case "rotateY":
        case "rotateZ":
        case "skewX":
        case "skewY":
          str += s + "(" + element + "deg) ";
          break;
        case "scale":
        case "scaleX":
        case "scaleY":
          str += s + "(" + element + ") ";
          break;
        case "translateX":
        case "translateY":
        case "translateZ":
          str += s + "(" + element + "px) ";
          break;
      }
    }
  }
  el.style.WebkitTransform = el.style.transform = str;
}

function tap(el, fn) {
  var startPoint = {};
  el.addEventListener('touchstart', function (e) {
    startPoint = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
  })

  el.addEventListener('touchmove', function (e) {
    startPoint = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
  })

  el.addEventListener('touchend', function (e) {
    var nowPoint = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    if ((Math.abs(nowPoint.x - startPoint.x) < 5) && (Math.abs(nowPoint.y - startPoint.y) < 5)) {
      fn && fn.call(el, e);
    }
  })
}

function css(el, attr, val) {
  var transformAttr = ["rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "scaleX", "scaleY",
    "translateX", "translateY", "translateZ"
  ];
  if (transformAttr.indexOf(attr) >= 0) {
    return transform(el, attr, val);
  }
  if (val === void 0) {
    val = getComputedStyle(el)[attr];
    val = parseFloat(val);
    return val;
  }
  if (attr === "opacity") {
    el.style[attr] = val;
  } else {
    el.style[attr] = val + 'px';
  }
}