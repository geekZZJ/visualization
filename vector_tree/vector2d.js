export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(x, y);
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  // 与x轴的夹角
  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  // 叉乘
  cross(v) {
    return this.x * v.y - v.x * this.y;
  }

  // 点乘
  dot(v) {
    return this.x * v.x + v.y * this.y;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  // 向量旋转
  rotate(rad) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c - y * s;
    this.y = x * s + y * c;

    return this;
  }
}
