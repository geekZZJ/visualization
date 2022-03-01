import {Vector2D} from './vector2d';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 移动原点，坐标变换
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

// ctx.lineCap = 'round';

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
}
