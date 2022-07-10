import { Vector2D } from "./vector2d.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { width, height } = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

function draw(
  context,
  points,
  { fillStyle = "black", close = false, rule = "nonzero" } = {}
) {
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  context.fillStyle = fillStyle;
  context.fill(rule);
}

const points = [new Vector2D(0, 100)];
for (let i = 1; i <= 4; i++) {
  const p = points[0].copy().rotate(i * Math.PI * 0.4);
  points.push(p);
}

const polygon = [...points];

// 绘制正五边形
// ctx.save();
// draw(ctx, polygon);
// ctx.restore();

const stars = [
  points[0],
  points[2],
  points[4],
  points[1],
  points[3],
];

// 绘制正五角星
ctx.save();
draw(ctx, stars);
ctx.restore();
