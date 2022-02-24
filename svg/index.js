const dataSource = './data.json';

(async function () {
  // 数据处理
  const data = await (await fetch(dataSource)).json();
  console.log("data", data)
  // d3.hierarchy(data).sum(...).sort(...)将省份数据按照包含城市的数量，从多到少排序
  const regions = d3.hierarchy(data)
  .sum(d => 1)
  .sort((a, b) => b.value - a.value);

  // d3.pack()将数据映射为一组800宽高范围内的圆形
  const pack = d3.pack()
  .size([800, 800])
  .padding(3);
  const root = pack(regions);

  // 绘制过程
  const svgroot = document.querySelector('svg');

  function draw(parent, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const {x, y, r} = node;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fillStyle);
    parent.appendChild(circle);

      if (children) {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      for (let i = 0; i < children.length; i++) {
        draw(group, children[i], {fillStyle, textColor});
      }
      parent.appendChild(group);
    } else {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('fill', textColor);
      text.setAttribute('font-family', 'Arial');
      text.setAttribute('font-size', '1rem');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.textContent = node.data.name;
      parent.appendChild(text);
    }
  }

  draw(svgroot, root);
}());
