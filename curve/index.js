import {Vector2D} from './vector2d.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
// 将原点移动到画布中间
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

/**
 * 绘制正多边形
 * @param edges 边数
 * @param x 起点x
 * @param y 起点y
 * @param step 一条边的长度
 * @returns {*[]}
 */
function regularShape(edges = 3, x, y, step) {
  const ret = [];
  // 外角角度
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
}


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

draw(regularShape(3, 128, 128, 100));
draw(regularShape(6, -64, 128, 50));

draw(regularShape(11, -64, -64, 30));
draw(regularShape(60, 128, -64, 6));
