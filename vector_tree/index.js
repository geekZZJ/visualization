import {Vector2D} from './vector2d.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 移动原点，坐标变换
ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.lineCap = 'round';

/**
 * 画树枝
 * @param context canvas2D上下文
 * @param v0 起始向量
 * @param length 当前树枝长度
 * @param thickness 当前树枝的粗细
 * @param dir 当前树枝的方向，用与x轴的夹角表示
 * @param bias 随机偏向因子
 */
function drawBranch(context, v0, length, thickness, dir, bias) {
  const v = new Vector2D().rotate(dir).scale(length);
  const v1 = v0.copy().add(v);

  context.lineWidth = thickness;
  context.beginPath();
  context.moveTo(...v0);
  context.lineTo(...v1);
  context.stroke();

  if (thickness > 2) {
    const left = dir + 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    const right = dir - 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }

  // 假如随机因子
  // if (thickness > 2) {
  //   const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
  //   drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
  //   const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
  //   drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  // }

  // if (thickness < 5 && Math.random() < 0.3) {
  //   context.save();
  //   context.strokeStyle = '#c72c35';
  //   context.lineWidth = Math.random() * 6 + 3;
  //   context.beginPath();
  //   context.moveTo(...v1);
  //   context.lineTo(v1.x, v1.y - 2);
  //   context.stroke();
  //   context.restore();
  // }
}


const v0 = new Vector2D(256, 0);
drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
