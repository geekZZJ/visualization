const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);


function draw(points, strokeStyle = 'black', fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.stroke();
}

// 画圆
// 把圆分成60份
// const TAU_SEGMENTS = 60;
// const TAU = Math.PI * 2;
//
// function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
//   const ang = Math.min(TAU, endAng - startAng);
//   const ret = ang === TAU ? [] : [[x0, y0]];
//   const segments = Math.round(TAU_SEGMENTS * ang / TAU);
//   for (let i = 0; i <= segments; i++) {
//     const x = x0 + radius * Math.cos(startAng + ang * i / segments);
//     const y = y0 + radius * Math.sin(startAng + ang * i / segments);
//     ret.push([x, y]);
//   }
//   return ret;
// }

// draw(arc(0, 0, 100));


// 椭圆
// const TAU_SEGMENTS = 60;
// const TAU = Math.PI * 2;
//
// function ellipse(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
//   const ang = Math.min(TAU, endAng - startAng);
//   const ret = ang === TAU ? [] : [[x0, y0]];
//   const segments = Math.round(TAU_SEGMENTS * ang / TAU);
//   for (let i = 0; i <= segments; i++) {
//     const x = x0 + radiusX * Math.cos(startAng + ang * i / segments);
//     const y = y0 + radiusY * Math.sin(startAng + ang * i / segments);
//     ret.push([x, y]);
//   }
//   return ret;
// }
//
// draw(ellipse(0, 0, 100, 50));

// 抛物线
const LINE_SEGMENTS = 60;

function parabola(x0, y0, p, min, max) {
  const ret = [];
  for (let i = 0; i <= LINE_SEGMENTS; i++) {
    const s = i / LINE_SEGMENTS;
    const t = min * (1 - s) + max * s;
    const x = x0 + 2 * p * t ** 2;
    const y = y0 + 2 * p * t;
    ret.push([x, y]);
  }
  return ret;
}

draw(parabola(0, 0, 5.5, -10, 10));
