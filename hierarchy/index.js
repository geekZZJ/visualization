const dataSource = './data.json';

(async function () {
  // 数据处理
  const data = await (await fetch(dataSource)).json();
  console.log("data", data)
  // d3.hierarchy(data).sum(...).sort(...)将省份数据按照包含城市的数量，从多到少排序
  const regions = d3.hierarchy(data)
  .sum(d => 1)
  .sort((a, b) => b.value - a.value);
  console.log('regions', regions)

  // d3.pack()将数据映射为一组800宽高范围内的圆形
  const pack = d3.pack()
  .size([800, 800])
  .padding(3);
  const root = pack(regions);

  // 绘制过程
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const TAU = 2 * Math.PI;

  function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const {x, y, r} = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    // arc() 方法创建弧/曲线
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if (children) {
      for (let i = 0; i < children.length; i++) {
        draw(context, children[i]);
      }
    } else {
      const name = node.data.name;
      ctx.fillStyle = textColor;
      ctx.font = '1rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
  }

  draw(context, root);
}());
