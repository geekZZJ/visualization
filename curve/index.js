const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

function draw(points, context, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false,
} = {}) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.stroke();
}


function parametric(xFunc, yFunc) {
  return function (start, end, seg = 100, ...args) {
    const points = [];
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      // 计算参数方程组的x
      const x = xFunc(t, ...args);
      // 计算参数方程组的y
      const y = yFunc(t, ...args);
      points.push([x, y]);
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}


// 抛物线参数方程
// const para = parametric(
//   t => 25 * t,
//   t => 25 * t ** 2,
// );
//
// para(-5.5, 5.5).draw(ctx);


// 阿基米德螺旋线
// const helical = parametric(
//   (t, l) => l * t * Math.cos(t),
//   (t, l) => l * t * Math.sin(t),
// );
//
// helical(0, 50, 500, 5).draw(ctx, {strokeStyle: 'blue'});

// 星形线
// const star = parametric(
//   (t, l) => l * Math.cos(t) ** 3,
//   (t, l) => l * Math.sin(t) ** 3,
// );
//
// star(0, Math.PI * 2, 50, 150).draw(ctx, {strokeStyle: 'red'});
