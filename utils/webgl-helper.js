// 获取canvas
const getCanvas = (id) => {
  return document.getElementById(id);
};

// 设置canvas尺寸为满屏
const resizeCanvas = (canvas, width, height) => {
  canvas.width = width ? width : window.innerWidth;
  canvas.height = height ? height : window.innerHeight;
};

// 获取webgl绘图环境
const getWebGLContext = (canvas) => {
  return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
};

// 创建着色器
const createShader = (gl, shaderType, shaderSource) => {
  // 创建着色器对象
  const shader = gl.createShader(shaderType);
  // 将源码分配给着色器对象
  gl.shaderSource(shader, shaderSource);
  // 编译着色器程序
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

/**
 *
 * @param {*} gl webgl绘图环境
 * @param {*} type 着色器类型
 * @param {*} str 着色器源码
 * @returns 返回着色器对象
 */
const createShaderFromString = (gl, type, str) => {
  return createShader(gl, type, str);
};

// 创建着色器程序
const createSimpleProgram = (gl, vertexShader, fragmentShader) => {
  if (!vertexShader || !fragmentShader) {
    console.warn("着色器不能为空");
    return;
  }
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

// 创建着色器对象和着色器程序
const createProgramFromString = (gl, vertexString, fragmentString) => {
  // 创建顶点着色器
  const vertexShader = createShaderFromString(
    gl,
    gl.VERTEX_SHADER,
    vertexString
  );
  // 创建片元着色器
  const fragmentShader = createShaderFromString(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentString
  );

  // 创建着色器程序
  return createSimpleProgram(gl, vertexShader, fragmentShader);
};
