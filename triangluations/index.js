import { earcut } from "../common/earcut.js";

const vertices = [
  [-0.7, 0.5],
  [-0.4, 0.3],
  [-0.25, 0.71],
  [-0.1, 0.56],
  [-0.1, 0.13],
  [0.4, 0.21],
  [0, -0.6],
  [-0.3, -0.3],
  [-0.6, -0.3],
  [-0.45, 0.0],
];

const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// 顶点着色器
const vertex = `
  attribute vec2 position;

  void main(){
    gl_PointSize = 1.0;
    gl_Position = vec4(position,1.0,1.0);
  }
`;

// 片元着色器
const fragment = `
  precision mediump float;

  void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`;

// 创建 WebGLShader 着色器对象
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const points = vertices.flat();
const triangles = earcut(points);
// console.log(triangles);

const position = new Float32Array(points);
const cells = new Uint16Array(triangles);

// 定义好的数据写入 WebGL 缓冲区
const pointBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

// 获取顶点着色器中的的position
const vPosition = gl.getAttribLocation(program, "position");
// 给变量设置长度和类型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活这个变量
gl.enableVertexAttribArray(vPosition);

const cellsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.LINE_STRIP, cells.length, gl.UNSIGNED_SHORT, 0);