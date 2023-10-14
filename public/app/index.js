(function () {
  "use strict";

  function draw(Widget, Arg) {
    return (game, entity) => {
      game.World[entity] |= 4 /* Draw */;
      game[2 /* Draw */][entity] = {
        Widget,
        Arg,
      };
    };
  }

  function lifespan(Max = Infinity) {
    return (game, entity) => {
      game.World[entity] |= 4194304 /* Lifespan */;
      game[22 /* Lifespan */][entity] = {
        Max,
        Age: 0,
      };
    };
  }

  let seed = 1;
  function set_seed(new_seed) {
    seed = 198706 * new_seed;
  }
  function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }
  function integer(min = 0, max = 1) {
    return ~~(rand() * (max - min + 1) + min);
  }
  function element(arr) {
    return arr[integer(0, arr.length - 1)];
  }

  let snd_gold = {
    Tracks: [
      {
        Instrument: [5, , , , , , , , [["triangle", 7, 1, 0, 5, 8]]],
        Notes: [86],
      },
      {
        Instrument: [5, , , , , , , , [["triangle", 7, 1, 0, 5, 8]]],
        Notes: [96],
      },
    ],
    Exit: 0,
  };

  function ease_in_cubic(t) {
    return t ** 3;
  }
  function ease_out_quart(t) {
    return 1 - (1 - t) ** 4;
  }

  function widget_damage(game, entity, x, y) {
    let value = game[2 /* Draw */][entity].Arg;
    let lifespan = game[22 /* Lifespan */][entity];
    let relative = lifespan.Age / lifespan.Max;
    game.Context.font = `${value / 125 + 1}vmin Impact`;
    game.Context.textAlign = "center";
    game.Context.fillStyle = `rgba(255,232,198,${ease_out_quart(
      1 - relative,
    )})`;
    game.Context.fillText(
      value.toFixed(0),
      x,
      y - 50 - (ease_out_quart(relative) * value) / 5,
    );
  }

  function widget_gold(game, entity, x, y) {
    let value = game[2 /* Draw */][entity].Arg;
    let lifespan = game[22 /* Lifespan */][entity];
    let relative = lifespan.Age / lifespan.Max;
    game.Context.font = "10vmin Impact";
    game.Context.fillStyle = `rgba(255,255,0,${ease_out_quart(1 - relative)})`;
    game.Context.fillText(
      `+ $${value.toLocaleString("en")}`,
      x + 100,
      y - ease_out_quart(relative) * 150,
    );
  }

  function widget_player_hit(game, entity, x, y) {
    let lifespan = game[22 /* Lifespan */][entity];
    let opacity = 0.4 * ease_in_cubic(1 - lifespan.Age / lifespan.Max);
    game.Context.fillStyle = `rgba(255,79,79,${opacity})`;
    game.Context.fillRect(0, 0, game.Canvas2.width, game.Canvas2.height);
  }

  function cull(Mask) {
    return (game, entity) => {
      game.World[entity] |= 131072 /* Cull */;
      game[17 /* Cull */][entity] = { Mask };
    };
  }

  const Cube = {
    Vertices: Float32Array.from([
      -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
      -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
      -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
      0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
      -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
      -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
    ]),
    Indices: Uint16Array.from([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12,
      14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
    ]),
    Normals: Float32Array.from([
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      0, -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      0, 1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      0, 1, 0,
    ]),
  };

  // The following defined constants and descriptions are directly ported from
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants.
  // Any copyright is dedicated to the Public Domain.
  // http://creativecommons.org/publicdomain/zero/1.0/.
  // Contributors
  // https://developer.mozilla.org/en-US/profiles/Sheppy
  // https://developer.mozilla.org/en-US/profiles/fscholz
  // https://developer.mozilla.org/en-US/profiles/AtiX
  // https://developer.mozilla.org/en-US/profiles/Sebastianz
  // WebGLRenderingContext
  // ==============
  // Clearing buffers
  // Constants passed to WebGLRenderingContext.clear() to clear buffer masks.
  /**
   * Passed to clear to clear the current depth buffer.
   * @constant {number}
   */
  const GL_DEPTH_BUFFER_BIT = 0x00000100;
  /**
   * Passed to clear to clear the current color buffer.
   * @constant {number}
   */
  const GL_COLOR_BUFFER_BIT = 0x00004000;
  // Rendering primitives
  // Constants passed to WebGLRenderingContext.drawElements() or WebGLRenderingContext.drawArrays() to specify what kind of primitive to render.
  /**
   * Passed to drawElements or drawArrays to draw single points.
   * @constant {number}
   */
  const GL_POINTS = 0x0000;
  /**
   * Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
   * @constant {number}
   */
  const GL_LINE_LOOP = 0x0002;
  /**
   * Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
   * @constant {number}
   */
  const GL_TRIANGLES = 0x0004;
  // Buffers
  // Constants passed to WebGLRenderingContext.bufferData(), WebGLRenderingContext.bufferSubData(), WebGLRenderingContext.bindBuffer(), or WebGLRenderingContext.getBufferParameter().
  /**
   * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
   * @constant {number}
   */
  const GL_STATIC_DRAW = 0x88e4;
  /**
   * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often.
   * @constant {number}
   */
  const GL_DYNAMIC_DRAW = 0x88e8;
  /**
   * Passed to bindBuffer or bufferData to specify the type of buffer being used.
   * @constant {number}
   */
  const GL_ARRAY_BUFFER = 0x8892;
  /**
   * Passed to bindBuffer or bufferData to specify the type of buffer being used.
   * @constant {number}
   */
  const GL_ELEMENT_ARRAY_BUFFER = 0x8893;
  // Culling
  // Constants passed to WebGLRenderingContext.cullFace().
  /**
   * Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
   * @constant {number}
   */
  const GL_CULL_FACE = 0x0b44;
  /**
   * Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
   * @constant {number}
   */
  const GL_DEPTH_TEST = 0x0b71;
  // Shaders
  // Constants passed to WebGLRenderingContext.getShaderParameter().
  /**
   * Passed to createShader to define a fragment shader.
   * @constant {number}
   */
  const GL_FRAGMENT_SHADER = 0x8b30;
  /**
   * Passed to createShader to define a vertex shader.
   * @constant {number}
   */
  const GL_VERTEX_SHADER = 0x8b31;
  /**
   * Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error.
   * @constant {number}
   */
  const GL_COMPILE_STATUS = 0x8b81;
  /**
   * Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
   * @constant {number}
   */
  const GL_LINK_STATUS = 0x8b82;
  // WebGL2RenderingContext
  // ==============
  const GL_UNSIGNED_SHORT = 0x1403;
  const GL_FLOAT = 0x1406;

  function render_vox(model, Palette) {
    return (game, entity) => {
      let VAO = game.GL.createVertexArray();
      game.GL.bindVertexArray(VAO);
      game.GL.bindBuffer(GL_ARRAY_BUFFER, game.GL.createBuffer());
      game.GL.bufferData(GL_ARRAY_BUFFER, Cube.Vertices, GL_STATIC_DRAW);
      game.GL.enableVertexAttribArray(1 /* Position */);
      game.GL.vertexAttribPointer(1 /* Position */, 3, GL_FLOAT, false, 0, 0);
      game.GL.bindBuffer(GL_ARRAY_BUFFER, game.GL.createBuffer());
      game.GL.bufferData(GL_ARRAY_BUFFER, Cube.Normals, GL_STATIC_DRAW);
      game.GL.enableVertexAttribArray(2 /* Normal */);
      game.GL.vertexAttribPointer(2 /* Normal */, 3, GL_FLOAT, false, 0, 0);
      game.GL.bindBuffer(GL_ARRAY_BUFFER, game.GL.createBuffer());
      game.GL.bufferData(GL_ARRAY_BUFFER, model, GL_STATIC_DRAW);
      game.GL.enableVertexAttribArray(3 /* Offset */);
      game.GL.vertexAttribPointer(3 /* Offset */, 4, GL_FLOAT, false, 0, 0);
      game.GL.vertexAttribDivisor(3 /* Offset */, 1);
      game.GL.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, game.GL.createBuffer());
      game.GL.bufferData(GL_ELEMENT_ARRAY_BUFFER, Cube.Indices, GL_STATIC_DRAW);
      game.GL.bindVertexArray(null);
      game.World[entity] |= 2 /* Render */;
      game[1 /* Render */][entity] = {
        Kind: 1 /* Instanced */,
        Material: game.MaterialInstanced,
        VAO,
        IndexCount: Cube.Indices.length,
        InstanceCount: model.length / 4,
        Palette,
      };
    };
  }

  const EPSILON = 0.000001;

  function create() {
    let out = new Float32Array(16);
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function invert(out, a) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function multiply(out, a, b) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function from_rotation_translation_scale(out, q, v, s) {
    // Quaternion math
    let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function ortho(out, top, right, bottom, left, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  function get_forward(out, mat) {
    out[0] = mat[8];
    out[1] = mat[9];
    out[2] = mat[10];
    return normalize(out, out);
  }
  function get_translation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }

  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  function transform_point(out, a, m) {
    let x = a[0],
      y = a[1],
      z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.hypot(x, y, z);
  }
  function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }

  function multiply$1(out, a, b) {
    let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function from_euler(out, x, y, z) {
    let halfToRad = (0.5 * Math.PI) / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param out - the receiving quaternion
   * @param a - the first operand
   * @param b - the second operand
   * @param t - interpolation amount, in the range [0-1], between the two inputs
   */
  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
    let omega, cosom, sinom, scale0, scale1;
    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }

  function create_tile(size, colors) {
    let offsets = [];
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        offsets.push(
          x - size / 2 + 0.5,
          0.5,
          y - size / 2 + 0.5,
          rand() > 0.01 ? colors[0] : colors[1],
        );
      }
    }
    return Float32Array.from(offsets);
  }
  function create_block(size, height) {
    let offsets = [];
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < height; z++) {
          offsets.push(
            x - size / 2 + 0.5,
            z - size / 2 + 0.5,
            y - size / 2 + 0.5,
            rand() > 0.4 ? 7 /* mine_ground_1 */ : 8 /* mine_ground_2 */,
          );
        }
      }
    }
    return Float32Array.from(offsets);
  }
  function create_line(from, to, color) {
    let len = length(subtract([], from, to));
    let step = 1 / len;
    let output = [];
    for (let i = 0; i < len; i++) {
      output = output.concat([...lerp([], from, to, step * i), color]);
    }
    return output;
  }

  let main_palette = [
    0.6, 0.4, 0, 0.4, 0.2, 0, 0.14, 0, 0, 0.2, 0.8, 1, 1, 1, 0, 1, 0.8, 0.4,
    0.6, 0.4, 0, 0.2, 0.2, 0.2, 0.53, 0.53, 0.53,
  ];
  let additional_colors = [
    [0.6, 0.4, 0, 0.4, 0.2, 0],
    [0, 0.47, 0, 0, 0.33, 0],
    [0.67, 0, 0, 0.54, 0, 0],
    [0.4, 0.4, 0.4, 0.53, 0.53, 0.53],
  ];
  function get_building_blueprint(game) {
    let palette = [...main_palette, ...element(additional_colors)];
    let has_tall_front_facade = rand() > 0.4;
    let has_windows = rand() > 0.4;
    // let has_pillars = rand() > 0.4;
    let building_size_x = 20 + integer() * 8;
    let building_size_z = 30 + integer(0, 5) * 8;
    let building_size_y = 15 + integer(0, 9); // height
    let porch_size = 8; //7 + integer(0, 2);
    let offsets = [];
    let Children = [];
    // WALLS
    for (let x = 1; x < building_size_x; x++) {
      offsets.push(
        ...create_line(
          [x, 0, building_size_z - 1],
          [x, building_size_y, building_size_z - 1],
          x % 2 ? 9 /* color_1 */ : 10 /* color_2 */,
        ),
      );
    }
    for (let y = 1; y < building_size_z; y++) {
      offsets.push(
        ...create_line(
          [building_size_x, 0, y],
          [
            building_size_x,
            building_size_y * (has_tall_front_facade ? 1.5 : 1),
            y,
          ],
          y % 2 ? 9 /* color_1 */ : 10 /* color_2 */,
        ),
      );
      // ROOF
      offsets.push(
        ...create_line(
          [0, building_size_y, y],
          [building_size_x + 1, building_size_y, y],
          1 /* wood */,
        ),
      );
    }
    // PORCH + FLOOR
    for (let i = -1; i < building_size_x + 3 + porch_size; i++) {
      offsets.push(
        ...create_line(
          [i - 1, 0, 0],
          [i - 1, 0, building_size_z + 2],
          1 /* wood */,
        ),
      );
    }
    if (has_windows && has_tall_front_facade) {
      // WINDOWS
      let window_width = 5;
      let window_height = 4;
      for (
        let offset = window_width;
        offset < building_size_z - window_width - 1;
        offset += window_width * 3
      ) {
        Children.push({
          Rotation: from_euler([], 0, integer(0, 2) * 180, 0),
          Translation: [
            building_size_x + 1,
            building_size_y + window_height / 2,
            building_size_z - offset - window_width / 2,
          ],
          Using: [
            render_vox(game.Models[6 /* WINDOW */]),
            cull(2 /* Render */),
          ],
        });
      }
    } else {
      // BANNER
      let banner_height = 5 + integer(0, 2);
      let bannner_width = ~~(building_size_z * 0.75);
      let banner_offset = ~~((building_size_z - bannner_width) / 2);
      for (let x = 2; x < bannner_width; x++) {
        for (let y = 0; y < banner_height; y++) {
          offsets.push(
            building_size_x + 1,
            ~~(building_size_y * (has_tall_front_facade ? 1.5 : 1)) +
              y -
              ~~(banner_height / 2),
            banner_offset + x,
            rand() > 0.4 || // 40% chance, but only when not on a border
              x == 2 ||
              x == bannner_width - 1 ||
              y == 0 ||
              y == banner_height - 1
              ? 1 /* wood */
              : 2 /* dark_wood */,
          );
        }
      }
    }
    // PORCH ROOF
    for (let i = 0; i < porch_size; i++) {
      offsets.push(
        ...create_line(
          [building_size_x + i + 1, building_size_y * 0.75, 1],
          [
            building_size_x + i + 1,
            building_size_y * 0.75,
            building_size_z + 1,
          ],
          1 /* wood */,
        ),
      );
    }
    // Pillars
    // has_pillars &&
    offsets.push(
      ...create_line(
        [building_size_x + porch_size, 0, 1],
        [building_size_x + porch_size, building_size_y * 0.75, 1],
        1 /* wood */,
      ),
      ...create_line(
        [building_size_x + porch_size, 0, building_size_z],
        [building_size_x + porch_size, building_size_y * 0.75, building_size_z],
        1 /* wood */,
      ),
    );
    // FENCE
    let fence_height = 3;
    offsets.push(
      ...create_line(
        [building_size_x + porch_size, fence_height, 1],
        [building_size_x + porch_size, fence_height, building_size_z],
        1 /* wood */,
      ),
    );
    for (let i = 1; i < building_size_z; i += 2) {
      offsets.push(
        ...create_line(
          [building_size_x + porch_size, 0, i],
          [building_size_x + porch_size, fence_height + 2, i],
          1 /* wood */,
        ),
      );
    }
    // DOOR
    let door_height = 8;
    let door_width = 8;
    for (let i = 0; i < door_width; i++) {
      offsets.push(
        ...create_line(
          [building_size_x + 1, 0, building_size_z - i - 8],
          [building_size_x + 1, door_height, building_size_z - i - 8],
          1 /* wood */,
        ),
      );
    }
    return {
      Blueprint: {
        Translation: [0, 1.5, 0],
        // rotation: from_euler([], 0, 270, 0),
        Using: [render_vox(Float32Array.from(offsets), palette)],
        Children,
      },
      Size_x: building_size_x + 3 + porch_size + 1,
      Size_z: building_size_z + 2,
    };
  }

  function animate(clips) {
    return (game, entity) => {
      let States = {};
      for (let name in clips) {
        let { Keyframes, Flags = 7 /* Default */ } = clips[name];
        let Duration = Keyframes[Keyframes.length - 1].Timestamp;
        States[name] = {
          // One-level-deep copy of the clip's keyframes. When
          // AnimationFlag.Alternate is set, sys_animate recalculates
          // keyframes' timestamps after each alternation. We want to
          // modify copies of the timestamps defined in the clip. It's OK
          // to copy other keyframe properties by reference.
          Keyframes: Keyframes.map((keyframe) => ({ ...keyframe })),
          Flags,
          Duration,
          Time: 0,
        };
      }
      game.World[entity] |= 64 /* Animate */;
      game[6 /* Animate */][entity] = {
        States,
        Current: States[1 /* Idle */],
      };
    };
  }

  let palette = [
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 1.0, 1.0, 0.6, 1.0, 1.0, 0.4,
    1.0, 1.0, 0.2, 1.0, 1.0, 0.0, 0.0, 0.8, 0.0, 0.47, 0.47, 0.47, 0.53, 0.0,
    0.0, 0.4, 0.2, 0.0, 0.0, 1.0, 1.0, 0.93, 0.0, 0.0,
  ];

  function create_gun(game) {
    return {
      Rotation: from_euler([], 270, 0, 0),
      Translation: [0, -3, 0],
      Using: [render_vox(game.Models[4 /* GUN1 */])],
    };
  }

  // colors 2 & 5
  let hat_colors = [
    [0.2, 0.2, 0.2],
    [0.9, 0.9, 0.9],
    [0.53, 0, 0],
    [1, 0, 0],
  ];
  let extra_colors = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 1, 0],
    [0.9, 0, 0],
  ];
  function get_hat_blueprint(game) {
    let hat_palette = palette.slice();
    hat_palette.splice(6, 3, ...element(hat_colors));
    hat_palette.splice(9, 3, ...element(extra_colors));
    let hat_z = integer(2, 3) * 2;
    let hat_x = integer(Math.max(2, hat_z / 2), 5) * 2;
    let top_height = integer(1, 3);
    let top_width = 2; //integer(1, hat_z / 4) * 2;
    let has_extra = top_height > 1;
    let has_sides = rand() > 0.4;
    let offsets = [];
    for (let i = 0; i < hat_z; i++) {
      // BASE
      offsets.push(
        ...create_line(
          [-hat_x / 2 + 0.5, 0, -hat_z / 2 + i + 0.5],
          [hat_x / 2 + 0.5, 0, -hat_z / 2 + i + 0.5],
          2,
        ),
      );
    }
    if (has_sides) {
      // SIDES
      offsets.push(
        ...create_line(
          [hat_x / 2 - 0.5, 1, -hat_z / 2 + 0.5],
          [hat_x / 2 - 0.5, 1, hat_z / 2 + 0.5],
          2,
        ),
        ...create_line(
          [-hat_x / 2 + 0.5, 1, -hat_z / 2 + 0.5],
          [-hat_x / 2 + 0.5, 1, hat_z / 2 + 0.5],
          2,
        ),
      );
    }
    // TOP
    for (let y = 0; y < top_height; y++) {
      for (let x = 0; x < top_width; x++) {
        offsets.push(
          ...create_line(
            [-top_width / 2 + 0.5, y + 1, -top_width / 2 + x + 0.5],
            [top_width / 2 + 0.5, y + 1, -top_width / 2 + x + 0.5],
            has_extra && y == 0 ? 3 : 2,
          ),
        );
      }
    }
    return {
      Translation: [0, 3, 0],
      // Do we need hats rotations?
      // Translation: is_rotated
      //     ? [0, body_height / 2 - 2, hat_height / 2 + 1]
      //     : [0, hat_height / 2 + body_height / 2, 0],
      // Rotation: is_rotated ? from_euler([], 90, 0, 0) : [0, 1, 0, 0],
      Children: [
        {
          Using: [
            render_vox(Float32Array.from(offsets), hat_palette),
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                  },
                ],
              },
              [4 /* Hit */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Translation: [0, 0, 0],
                  },
                  {
                    Timestamp: 0.1,
                    Translation: [0, 2, 0],
                  },
                  {
                    Timestamp: 0.2,
                    Translation: [0, 0, 0],
                  },
                ],
                Flags: 0 /* None */,
              },
              [6 /* Select */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Translation: [0, 0, 0],
                    Rotation: [0, 0, 0, 1],
                  },
                  {
                    Timestamp: 0.1,
                    Translation: [0, 2, 0],
                    Rotation: [0, 1, 0, 0],
                  },
                  {
                    Timestamp: 0.2,
                    Translation: [0, 0, 0],
                    Rotation: [0, 0, 0, -1],
                  },
                ],
                Flags: 0 /* None */,
              },
            }),
          ],
        },
      ],
    };
  }

  let shirt_colors = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ];
  let skin_colors = [
    [1, 0.8, 0.6],
    [0.6, 0.4, 0],
  ];
  let hair_colors = [
    [1, 1, 0],
    [0, 0, 0],
    [0.6, 0.4, 0],
    [0.4, 0, 0],
  ];
  let pants_colors = [
    [0, 0, 0],
    [0.53, 0, 0],
    [0.6, 0.4, 0.2],
    [0.33, 0.33, 0.33],
  ];
  function get_character_blueprint(game) {
    // Create the hat first so that the hat itself can be reproduced with SeedBounty.
    let hat = get_hat_blueprint();
    let character_palette = palette.slice();
    character_palette.splice(0, 3, ...element(shirt_colors));
    character_palette.splice(3, 3, ...element(pants_colors));
    character_palette.splice(12, 3, ...element(skin_colors));
    character_palette.splice(15, 3, ...element(hair_colors));
    return {
      Rotation: [0, 1, 0, 0],
      Using: [
        animate({
          [1 /* Idle */]: {
            Keyframes: [
              {
                Timestamp: 0,
              },
            ],
          },
          [5 /* Die */]: {
            Keyframes: [
              {
                Timestamp: 0,
                Translation: [0, 1, 0],
                Rotation: [0, 1, 0, 0],
              },
              {
                Timestamp: 1,
                Translation: [0, -4, 0],
                Rotation: from_euler([], -90, 0, 0),
                Ease: ease_out_quart,
              },
              {
                Timestamp: 5,
                Translation: [0, -9, 0],
              },
            ],
            Flags: 0 /* None */,
          },
        }),
      ],
      Children: [
        {
          // Projectile spawn point. Must be the first child.
          Translation: [1.5, 0, -5],
        },
        {
          //body
          Using: [
            render_vox(game.Models[0 /* BODY */], character_palette),
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0.0,
                    Rotation: from_euler([], 0, 5, 0),
                  },
                  {
                    Timestamp: 0.5,
                    Rotation: from_euler([], 0, -5, 0),
                  },
                ],
              },
              [2 /* Move */]: {
                Keyframes: [
                  {
                    Timestamp: 0.0,
                    Rotation: from_euler([], 0, 5, 0),
                  },
                  {
                    Timestamp: 0.2,
                    Rotation: from_euler([], 0, -5, 0),
                  },
                ],
              },
            }),
          ],
          Children: [hat],
        },
        {
          // right arm
          Translation: [1.5, 0, 0.5],
          Using: [
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], 5, 0, 0),
                  },
                  {
                    Timestamp: 0.5,
                    Rotation: from_euler([], -5, 0, 0),
                  },
                ],
              },
              [2 /* Move */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], 60, 0, 0),
                  },
                  {
                    Timestamp: 0.2,
                    Rotation: from_euler([], -30, 0, 0),
                  },
                ],
              },
              [3 /* Shoot */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], 50, 0, 0),
                  },
                  {
                    Timestamp: 0.1,
                    Rotation: from_euler([], 90, 0, 0),
                    Ease: ease_out_quart,
                  },
                  {
                    Timestamp: 0.13,
                    Rotation: from_euler([], 110, 0, 0),
                  },
                  {
                    Timestamp: 0.3,
                    Rotation: from_euler([], 0, 0, 0),
                    Ease: ease_out_quart,
                  },
                ],
                Flags: 0 /* None */,
              },
            }),
          ],
          Children: [
            {
              Translation: [0, -1, 0],
              Using: [render_vox(game.Models[3 /* HAND */], character_palette)],
            },
            create_gun(game),
          ],
        },
        {
          // left arm
          Translation: [-1.5, 0, 0.5],
          Using: [
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], -5, 0, 0),
                  },
                  {
                    Timestamp: 0.5,
                    Rotation: from_euler([], 5, 0, 0),
                  },
                ],
              },
              [2 /* Move */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], -30, 0, 0),
                  },
                  {
                    Timestamp: 0.2,
                    Rotation: from_euler([], 60, 0, 0),
                  },
                ],
              },
            }),
          ],
          Children: [
            {
              Translation: [0, -1, 0],
              Using: [render_vox(game.Models[3 /* HAND */], character_palette)],
            },
          ],
        },
        {
          // right foot
          Translation: [0.5, -2, 0.5],
          Using: [
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], 5, 0, 0),
                  },
                  {
                    Timestamp: 1,
                    Rotation: from_euler([], 5, 0, 0),
                  },
                ],
              },
              [2 /* Move */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], -45, 0, 0),
                  },
                  {
                    Timestamp: 0.2,
                    Rotation: from_euler([], 45, 0, 0),
                  },
                ],
              },
            }),
          ],
          Children: [
            {
              Translation: [0, -1.5, 0],
              Using: [render_vox(game.Models[2 /* FOOT */], character_palette)],
            },
          ],
        },
        {
          // left foot
          Translation: [-0.5, -2, 0.5],
          Using: [
            animate({
              [1 /* Idle */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], -5, 0, 0),
                  },
                  {
                    Timestamp: 1,
                    Rotation: from_euler([], -5, 0, 0),
                  },
                ],
              },
              [2 /* Move */]: {
                Keyframes: [
                  {
                    Timestamp: 0,
                    Rotation: from_euler([], 45, 0, 0),
                  },
                  {
                    Timestamp: 0.2,
                    Rotation: from_euler([], -45, 0, 0),
                  },
                ],
              },
            }),
          ],
          Children: [
            {
              Translation: [0, -1.5, 0],
              Using: [render_vox(game.Models[2 /* FOOT */], character_palette)],
            },
          ],
        },
      ],
    };
  }

  /**
   * Add the AudioSource component.
   *
   * @param Idle The name of the clip to play by default, in a loop.
   */
  function audio_source(Idle) {
    return (game, entity) => {
      game.World[entity] |= 32 /* AudioSource */;
      game[5 /* AudioSource */][entity] = {
        Idle,
        Time: 0,
      };
    };
  }

  function collide(Dynamic = true, Size = [1, 1, 1], Flag = 1 /* None */) {
    return (game, EntityId) => {
      game.World[EntityId] |= 256 /* Collide */;
      game[8 /* Collide */][EntityId] = {
        EntityId,
        New: true,
        Dynamic,
        Size,
        Min: [0, 0, 0],
        Max: [0, 0, 0],
        Collisions: [],
        Flags: Flag,
      };
    };
  }

  function navigable(X, Y) {
    return (game, entity) => {
      game.World[entity] |= 1024 /* Navigable */;
      game[10 /* Navigable */][entity] = { X, Y };
    };
  }
  function find_navigable(game, { X, Y }) {
    for (let i = 0; i < game.World.length; i++) {
      if (game.World[i] & 1024 /* Navigable */) {
        if (
          game[10 /* Navigable */][i].X == X &&
          game[10 /* Navigable */][i].Y == Y
        ) {
          return i;
        }
      }
    }
    throw `No entity with coords ${X}, ${Y}.`;
  }

  function get_cactus_blueprint(game) {
    let model = game.Models[1 /* CAC3 */];
    return {
      Translation: [0, integer(2, 5) + 0.5, 0],
      Using: [render_vox(model), cull(2 /* Render */)],
    };
  }

  /**
   * Add EMIT_PARTICLES.
   *
   * @param Lifespan How long particles live for.
   * @param Frequency How often particles spawn.
   * @param SizeStart The initial size of a particle.
   */
  function emit_particles(Lifespan, Frequency) {
    return (game, entity) => {
      game.World[entity] |= 65536 /* EmitParticles */;
      game[16 /* EmitParticles */][entity] = {
        Lifespan,
        Frequency,
        Instances: [],
        SinceLast: 0,
      };
    };
  }

  /**
   *
   * @param Color The color of the light. It will tint the shaded objects taking
   * into account the angle and the distance from the light source. Grayscale can
   * be used to control how dim the light is.
   * @param range The distance at which the light has the same intensity as the
   * default light has at 1 unit away. If range is 0, then the light is a
   * directional light and its position relative to the world origin will be used
   * to compute the light normal.
   */
  function light(color = [1, 1, 1], range = 1) {
    return (game, Entity) => {
      game.World[Entity] |= 16 /* Light */;
      game[4 /* Light */][Entity] = [...color, range ** 2];
    };
  }

  function render_particles(color, size) {
    return (game, entity) => {
      game.World[entity] |= 2 /* Render */;
      game[1 /* Render */][entity] = {
        Kind: 2 /* Particles */,
        Material: game.MaterialParticles,
        Buffer: game.GL.createBuffer(),
        ColorSize: [...color, size],
      };
    };
  }

  function shake(Duration = 0) {
    return (game, entity) => {
      game.World[entity] |= 2097152 /* Shake */;
      game[21 /* Shake */][entity] = {
        Duration,
      };
    };
  }

  function trigger(Action) {
    return (game, entity) => {
      game.World[entity] |= 512 /* Trigger */;
      game[9 /* Trigger */][entity] = {
        Action,
      };
    };
  }

  function get_campfire_blueprint(game) {
    return {
      Translation: [0, 1.5, 0],
      Using: [render_vox(game.Models[5 /* CAMPFIRE */]), cull(2 /* Render */)],
      Children: [
        {
          Using: [
            collide(false, [15, 15, 15]),
            trigger(12 /* HealCampfire */),
            cull(256 /* Collide */ | 512 /* Trigger */),
          ],
          Children: [
            {
              Using: [
                shake(Infinity),
                emit_particles(2, 0.1),
                render_particles([1, 0, 0], 15),
                cull(
                  2097152 /* Shake */ |
                    65536 /* EmitParticles */ |
                    2 /* Render */,
                ),
              ],
            },
            {
              Translation: [0, 3, 0],
              Using: [light([1, 0.5, 0], 3), cull(16 /* Light */)],
            },
          ],
        },
      ],
    };
  }

  function get_gold_blueprint(game) {
    return {
      Translation: [0, 1.5, 0],
      Rotation: from_euler([], 0, integer(0, 3) * 90, 0),
      Using: [
        render_vox(
          Float32Array.from(create_line([-1, 0, 0], [1, 0, 0], 4 /* gold */)),
          main_palette,
        ),
        collide(false, [4, 4, 4]),
        trigger(10 /* CollectGold */),
        audio_source(),
        cull(
          2 /* Render */ |
            256 /* Collide */ |
            512 /* Trigger */ |
            32 /* AudioSource */,
        ),
      ],
      Children: [
        {
          Translation: [0, 3, 0],
          Using: [light([1, 1, 0], 3), cull(16 /* Light */)],
        },
      ],
    };
  }

  function get_block_blueprint(game) {
    let model = create_model();
    return {
      Translation: [0, 1.5, 0],
      Rotation: from_euler([], 0, integer(0, 3) * 90, 0),
      Using: [render_vox(model, main_palette), cull(2 /* Render */)],
    };
  }
  function create_model() {
    let number_of_elements = integer(1, 4);
    let offsets = [];
    for (let x = 0; x < number_of_elements; x++) {
      let y = integer(-1, 1);
      offsets.push(x, 0, y, 0 /* light_wood */);
    }
    return Float32Array.from(offsets);
  }

  function get_rock_blueprint(game) {
    let model = game.Models[7 /* ROCK */];
    return {
      Translation: [0.1, integer(0, 2) + 0.1, 0.1],
      Rotation: from_euler(
        [],
        integer(0, 3) * 90,
        integer(0, 3) * 90,
        integer(0, 3) * 90,
      ),
      Using: [render_vox(model), cull(2 /* Render */)],
    };
  }

  function get_tile_blueprint(
    game,
    is_walkable,
    x = 0,
    y = 0,
    has_gold = true,
    colors = [5 /* desert_ground_1 */, 6 /* desert_ground_2 */],
  ) {
    let tile_model = create_tile(8, colors);
    let tile = {
      Using: [
        render_vox(tile_model, main_palette),
        cull(2 /* Render */),
        audio_source(),
        animate({
          [1 /* Idle */]: {
            Keyframes: [
              {
                Timestamp: 0,
                Translation: [0, 0, 0],
              },
            ],
          },
          [6 /* Select */]: {
            Keyframes: [
              {
                Timestamp: 0,
                Translation: [0, 0, 0],
              },
              {
                Timestamp: 0.1,
                Translation: [0, -0.5, 0],
              },
              {
                Timestamp: 0.2,
                Translation: [0, 0, 0],
              },
            ],
            Flags: 0 /* None */,
          },
        }),
      ],
      Children: [],
    };
    if (!is_walkable) {
      tile.Children.push(
        rand() > 0.5
          ? get_cactus_blueprint(game)
          : rand() > 0.01
          ? get_rock_blueprint(game)
          : get_campfire_blueprint(game),
      );
    } else if (rand() > 0.85) {
      tile.Children.push(get_block_blueprint());
    } else if (has_gold && rand() < 0.01) {
      tile.Children.push(get_gold_blueprint());
    }
    return {
      Rotation: from_euler([], 0, integer(0, 3) * 90, 0),
      Translation: [0, 0, 0],
      Using: [
        collide(
          false,
          [8, 1, 8],
          is_walkable ? 4 /* Navigable */ : 1 /* None */,
        ),
        cull(256 /* Collide */),
        navigable(x, y),
      ],
      Children: [tile],
    };
  }

  function camera_ortho(radius, near, far) {
    return (game, EntityId) => {
      let Projection = ortho(
        create(),
        radius,
        radius * (game.Canvas3.width / game.Canvas3.height),
        -radius,
        -radius * (game.Canvas3.width / game.Canvas3.height),
        near,
        far,
      );
      game.World[EntityId] |= 8 /* Camera */;
      game[3 /* Camera */][EntityId] = {
        EntityId,
        Projection,
        Unproject: invert([], Projection),
        View: create(),
        PV: create(),
      };
    };
  }

  function mimic(Target) {
    return (game, entity) => {
      game.World[entity] |= 32768 /* Mimic */;
      game[15 /* Mimic */][entity] = { Target };
    };
  }

  function select() {
    return (game, entity) => {
      game.World[entity] |= 2048 /* Select */;
      game[11 /* Select */][entity] = {
        Position: [],
      };
    };
  }

  function create_iso_camera(player) {
    return {
      Translation: [0, 200, 0],
      Using: [mimic(player)],
      Children: [
        {
          Translation: [50, 50, 50],
          // Isometric projection: Y 45°, X -35.264°, Z 0°
          Rotation: [-0.28, 0.364, 0.116, 0.88],
          Children: [
            {
              Using: [camera_ortho(25, 1, 500), select(), shake()],
            },
          ],
        },
      ],
    };
  }

  function get_mine_entrance_blueprint(game) {
    let wooden_part_length = 26;
    let half_entrrance_width = 6;
    let half_entrance_height = 14;
    let wooden_part_offset = [
      ...create_line(
        [-2, 2, 0],
        [-2, 2, wooden_part_length * 2],
        8 /* mine_ground_2 */,
      ),
      ...create_line(
        [2, 2, 0],
        [2, 2, wooden_part_length * 2],
        8 /* mine_ground_2 */,
      ),
    ];
    for (let i = 0; i < wooden_part_length; i++) {
      wooden_part_offset.push(
        ...create_line(
          [-half_entrrance_width, 0, i],
          [-half_entrrance_width, half_entrance_height, i],
          i % 2 ? 1 /* wood */ : 0 /* light_wood */,
        ),
        ...create_line(
          [half_entrrance_width, 0, i],
          [half_entrrance_width, half_entrance_height, i],
          i % 2 ? 1 /* wood */ : 0 /* light_wood */,
        ),
        ...create_line(
          [-half_entrrance_width, half_entrance_height, i],
          [half_entrrance_width, half_entrance_height, i],
          i % 2 ? 0 /* light_wood */ : 1 /* wood */,
        ),
      );
    }
    // tracks
    for (let i = 0; i < wooden_part_length * 2; i += 2) {
      wooden_part_offset.push(
        ...create_line([-4, 1, i], [4, 1, i], 0 /* light_wood */),
      );
    }
    return {
      Children: [
        {
          // The mountain.
          ...get_rock_blueprint(game),
          Scale: [4, 4, 4],
        },
        {
          // The wooden part.
          Translation: [4, 0, 0],
          Using: [
            render_vox(Float32Array.from(wooden_part_offset), main_palette),
          ],
        },
        {
          // The trigger.
          Translation: [0, 0, 18],
          Using: [collide(false, [8, 8, 8]), trigger(7 /* GoToMine */)],
        },
      ],
    };
  }

  function player_control() {
    return (game, entity) => {
      game.World[entity] |= 8192 /* PlayerControl */;
      game[13 /* PlayerControl */][entity] = {};
    };
  }

  function health(Max) {
    return (game, entity) => {
      game.World[entity] |= 16384 /* Health */;
      game[14 /* Health */][entity] = {
        Max,
        Current: Max,
      };
    };
  }

  function move(MoveSpeed = 3.5, RotateSpeed = 0.5) {
    return (game, entity) => {
      game.World[entity] |= 128 /* Move */;
      game[7 /* Move */][entity] = {
        MoveSpeed,
        RotateSpeed,
      };
    };
  }

  function npc(Friendly = true, Bounty = false) {
    return (game, entity) => {
      game.World[entity] |= 524288 /* NPC */;
      game[19 /* NPC */][entity] = {
        Friendly,
        Bounty,
        LastShot: 0,
      };
    };
  }

  function shoot() {
    return (game, entity) => {
      game.World[entity] |= 4096 /* Shoot */;
      game[12 /* Shoot */][entity] = {
        Target: null,
      };
    };
  }

  function walking(X = 0, Y = 0) {
    return (game, entity) => {
      game.World[entity] |= 262144 /* Walking */;
      game[18 /* Walking */][entity] = {
        X,
        Y,
        Destination: null,
        Route: [],
        DestinationX: 0,
        DestinationY: 0,
      };
    };
  }

  let snd_baseline = {
    Tracks: [
      {
        Instrument: [
          5,
          "bandpass",
          10,
          3,
          ,
          ,
          ,
          ,
          [["triangle", 7, 2, 2, 8, 8]],
        ],
        Notes: [69, 74, 69, 74, 69],
      },
      {
        Instrument: [
          4,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [false, 2, 1, 1, 6],
            ["sine", 9, 2, 2, 7, 7],
          ],
        ],
        Notes: [
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          41,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          41,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          41,
          ,
          43,
          ,
          ,
          ,
          48,
          ,
          ,
          ,
          48,
          ,
          ,
          ,
          48,
          ,
          43,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          41,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          33,
          ,
          36,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          33,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          38,
        ],
      },
    ],
    Exit: 19.2,
  };

  let snd_wind = {
    Tracks: [
      {
        Instrument: [
          7,
          "lowpass",
          8,
          6,
          true,
          "sine",
          9,
          2,
          [[false, 3, 6, 4, 13]],
        ],
        Notes: [57],
      },
    ],
    Exit: 13,
  };

  function widget_healthbar(game, entity, x, y) {
    // Health bars must be direct children of character containers.
    let parent = game[0 /* Transform */][entity].Parent.EntityId;
    let health = game[14 /* Health */][parent];
    let height = 0.01 * game.Canvas2.height;
    if (game.World[parent] & 8192 /* PlayerControl */) {
      game.Context.fillStyle = "#0f0";
    } else if (
      game.World[parent] & 524288 /* NPC */ &&
      game[19 /* NPC */][parent].Bounty
    ) {
      game.Context.fillStyle = "#ff0";
      height *= 2;
    } else {
      game.Context.fillStyle = "#f00";
    }
    game.Context.fillRect(
      x - 0.05 * game.Canvas2.width,
      y,
      (0.1 * game.Canvas2.width * health.Current) / health.Max,
      height,
    );
  }

  function create_lamp() {
    return {
      Children: [
        {
          Translation: [0, 0, 4],
          Using: [
            render_vox(new Float32Array(4), [1, 0.5, 0]),
            cull(2 /* Render */),
          ],
        },
        {
          Translation: [0, 1, 7],
          Using: [cull(16 /* Light */), light([1, 0.5, 0], 5)],
        },
      ],
    };
  }

  function get_mine_wall_blueprint(game) {
    let tile_model = create_block(8, 6);
    let Children = [
      {
        Using: [render_vox(tile_model, main_palette), cull(2 /* Render */)],
      },
    ];
    if (rand() < 0.1) {
      Children.push(create_lamp());
    }
    return {
      Translation: [0, 4, 0],
      Using: [collide(false, [8, 4, 8], 1 /* None */), cull(256 /* Collide */)],
      Children,
    };
  }

  function world_mine(game) {
    set_seed(game.BountySeed);
    game.Camera = undefined;
    game.World = [];
    game.Grid = [];
    game.GL.clearColor(0.8, 0.3, 0.2, 1);
    let map_size = 30;
    for (let x = 0; x < map_size; x++) {
      game.Grid[x] = [];
      for (let y = 0; y < map_size; y++) {
        if (x == 0 || x == map_size - 1 || y == 0 || y == map_size - 1) {
          game.Grid[x][y] = NaN;
        } else {
          game.Grid[x][y] = Infinity;
        }
      }
    }
    generate_maze(game, [0, map_size - 1], [0, map_size - 1], map_size, 0.3);
    // Ground.
    for (let x = 0; x < map_size; x++) {
      for (let y = 0; y < map_size; y++) {
        let is_walkable = game.Grid[x][y] == Infinity;
        let tile_blueprint = is_walkable
          ? get_tile_blueprint(
              game,
              is_walkable,
              x,
              y,
              true,
              [7 /* mine_ground_1 */, 8 /* mine_ground_2 */],
            )
          : get_mine_wall_blueprint();
        game.Add({
          ...tile_blueprint,
          Translation: [
            (-(map_size / 2) + x) * 8,
            tile_blueprint.Translation[1],
            (-(map_size / 2) + y) * 8,
          ],
        });
      }
    }
    // Directional light and Soundtrack
    game.Add({
      Translation: [1, 2, -1],
      Using: [light([0.5, 0.5, 0.5], 0), audio_source(snd_baseline)],
    });
    // Bandit.
    let x = map_size - 2; //integer(0, map_size);
    let y = map_size - 2; //integer(0, map_size);
    if (game.Grid[x] && game.Grid[x][y] && !isNaN(game.Grid[x][y])) {
      game.Add({
        Scale: [1.5, 1.5, 1.5],
        Translation: [
          (-(map_size / 2) + x) * 8,
          7.5,
          (-(map_size / 2) + y) * 8,
        ],
        Rotation: from_euler([], 0, integer(0, 3) * 90, 0),
        Using: [
          npc(false, true),
          walking(x, y),
          move(integer(12, 16), 0),
          collide(true, [7, 7, 7], 8 /* Attackable */),
          health(5000 * game.ChallengeLevel),
          shoot(),
          audio_source(),
        ],
        Children: [
          (set_seed(game.BountySeed), get_character_blueprint(game)),
          {
            Translation: [0, 10, 0],
            Using: [draw(widget_healthbar)],
          },
        ],
      });
    }
    let cowboys_count = 20;
    for (let i = 0; i < cowboys_count; i++) {
      let x = integer(4, map_size);
      let y = integer(4, map_size);
      if (game.Grid[x] && game.Grid[x][y] && !isNaN(game.Grid[x][y])) {
        game.Add({
          Translation: [
            (-(map_size / 2) + x) * 8,
            4.3 + Math.random(),
            (-(map_size / 2) + y) * 8,
          ],
          Using: [
            npc(false),
            walking(x, y),
            move(integer(8, 15)),
            collide(true, [7, 7, 7], 8 /* Attackable */),
            health(2000 * game.ChallengeLevel),
            shoot(),
            audio_source(),
          ],
          Children: [
            get_character_blueprint(game),
            {
              Translation: [0, 10, 0],
              Using: [draw(widget_healthbar)],
            },
          ],
        });
      }
    }
    // Player.
    set_seed(game.PlayerSeed);
    game.Player = game.Add({
      Translation: [-112, 5, -112],
      Using: [
        player_control(),
        walking(1, 1),
        move(25, 0),
        collide(true, [3, 7, 3], 16 /* Player */),
        health(10000),
        shoot(),
        audio_source(),
      ],
      Children: [
        get_character_blueprint(game),
        {
          Translation: [0, 25, 0],
          Using: [light([1, 1, 1], 20)],
        },
        {
          Translation: [0, 10, 0],
          Using: [draw(widget_healthbar)],
        },
      ],
    });
    // Dio-cube
    game.Add({
      Scale: [map_size * 8, map_size * 2, map_size * 8],
      Translation: [-4, -map_size + 0.49, -4],
      Using: [
        render_vox(
          Float32Array.from([0, 0, 0, 7 /* mine_ground_1 */]),
          main_palette,
        ),
      ],
    });
    // Camera.
    game.Add(create_iso_camera(game.Player));
  }
  function generate_maze(game, [x1, x2], [y1, y2], size, probablity) {
    let width = x2 - x1;
    let height = y2 - y1;
    if (width >= height) {
      // vertical bisection
      if (x2 - x1 > 3) {
        let bisection = Math.ceil((x1 + x2) / 2);
        let max = y2 - 1;
        let min = y1 + 1;
        let randomPassage = ~~(Math.random() * (max - min + 1)) + min;
        let first = false;
        let second = false;
        if (game.Grid[y2][bisection] == Infinity) {
          randomPassage = max;
          first = true;
        }
        if (game.Grid[y1][bisection] == Infinity) {
          randomPassage = min;
          second = true;
        }
        for (let i = y1 + 1; i < y2; i++) {
          if (first && second) {
            if (i == max || i == min) {
              continue;
            }
          } else if (i == randomPassage) {
            continue;
          }
          game.Grid[i][bisection] = Math.random() > probablity ? NaN : Infinity;
        }
        generate_maze(game, [x1, bisection], [y1, y2], size, probablity);
        generate_maze(game, [bisection, x2], [y1, y2], size, probablity);
      }
    } else {
      // horizontal bisection
      if (y2 - y1 > 3) {
        let bisection = Math.ceil((y1 + y2) / 2);
        let max = x2 - 1;
        let min = x1 + 1;
        let randomPassage = ~~(Math.random() * (max - min + 1)) + min;
        let first = false;
        let second = false;
        if (game.Grid[bisection][x2] == Infinity) {
          randomPassage = max;
          first = true;
        }
        if (game.Grid[bisection][x1] == Infinity) {
          randomPassage = min;
          second = true;
        }
        for (let i = x1 + 1; i < x2; i++) {
          if (first && second) {
            if (i == max || i == min) {
              continue;
            }
          } else if (i == randomPassage) {
            continue;
          }
          game.Grid[bisection][i] = Math.random() > probablity ? NaN : Infinity;
        }
        generate_maze(game, [x1, x2], [y1, bisection], size, probablity);
        generate_maze(game, [x1, x2], [bisection, y2], size, probablity);
      }
    }
  }

  function world_desert(game) {
    set_seed(game.BountySeed);
    let map_size = 30;
    let entrance_position_x = integer(20, 25) || 20;
    let entrance_position_z = integer(10, 20) || 10;
    let entrance_width = 4;
    let entrance_length = 6;
    game.Camera = undefined;
    game.World = [];
    game.Grid = [];
    game.GL.clearColor(0.8, 0.3, 0.2, 1);
    for (let x = 0; x < map_size; x++) {
      game.Grid[x] = [];
      for (let y = 0; y < map_size; y++) {
        if (x == 0 || x == map_size - 1 || y == 0 || y == map_size - 1) {
          game.Grid[x][y] = NaN;
        } else {
          game.Grid[x][y] = Infinity;
        }
      }
    }
    generate_maze(game, [0, map_size - 1], [0, map_size - 1], map_size, 0.6);
    for (
      let z = entrance_position_z;
      z < entrance_position_z + entrance_length + 3;
      z++
    ) {
      for (
        let x = entrance_position_x - 1;
        x < entrance_position_x + entrance_width - 1;
        x++
      ) {
        if (
          (x == entrance_position_x - 1 + entrance_width - 2 &&
            z !== entrance_position_z) ||
          z >= entrance_position_z + entrance_length
        ) {
          game.Grid[x][z] = Infinity;
        } else {
          game.Grid[x][z] = NaN;
        }
      }
    }
    // Ground.
    for (let x = 0; x < map_size; x++) {
      for (let y = 0; y < map_size; y++) {
        let is_walkable = game.Grid[x][y] == Infinity;
        let tile_blueprint = get_tile_blueprint(game, is_walkable, x, y);
        game.Add({
          ...tile_blueprint,
          Translation: [
            (-(map_size / 2) + x) * 8,
            tile_blueprint.Translation[1],
            (-(map_size / 2) + y) * 8,
          ],
        });
      }
    }
    // Directional light and Soundtrack
    game.Add({
      Translation: [1, 2, -1],
      Using: [light([0.5, 0.5, 0.5], 0), audio_source(snd_baseline)],
      Children: [
        {
          Using: [audio_source(snd_wind)],
        },
      ],
    });
    // Cowboys.
    let cowboys_count = 20;
    for (let i = 0; i < cowboys_count; i++) {
      let x = integer(4, map_size);
      let y = integer(4, map_size);
      if (game.Grid[x] && game.Grid[x][y] && !isNaN(game.Grid[x][y])) {
        game.Add({
          Translation: [
            (-(map_size / 2) + x) * 8,
            4.3 + Math.random(),
            (-(map_size / 2) + y) * 8,
          ],
          Using: [
            npc(false),
            walking(x, y),
            move(integer(8, 15)),
            collide(true, [7, 7, 7], 8 /* Attackable */),
            health(1500 * game.ChallengeLevel),
            shoot(),
            audio_source(),
          ],
          Children: [
            get_character_blueprint(game),
            {
              Translation: [0, 10, 0],
              Using: [draw(widget_healthbar)],
            },
          ],
        });
      }
    }
    let entrance = get_mine_entrance_blueprint(game);
    game.Add({
      Translation: [
        (-(map_size / 2) + entrance_position_x) * 8 + 4,
        0,
        (-(map_size / 2) + entrance_position_z) * 8 + 4,
      ],
      ...entrance,
    });
    // Player.
    set_seed(game.PlayerSeed);
    game.Player = game.Add({
      Translation: [-112, 5, -112],
      Using: [
        player_control(),
        walking(1, 1),
        move(25, 0),
        collide(true, [3, 7, 3], 16 /* Player */),
        health(10000),
        shoot(),
        audio_source(),
      ],
      Children: [
        get_character_blueprint(game),
        {
          Translation: [0, 25, 0],
          Using: [light([1, 1, 1], 20)],
        },
        {
          Translation: [0, 10, 0],
          Using: [draw(widget_healthbar)],
        },
      ],
    });
    // Dio-cube
    game.Add({
      Scale: [map_size * 8, map_size * 2, map_size * 8],
      Translation: [-4, -map_size + 0.49, -4],
      Using: [
        render_vox(
          Float32Array.from([0, 0, 0, 5 /* desert_ground_1 */]),
          main_palette,
        ),
      ],
    });
    // Camera.
    game.Add(create_iso_camera(game.Player));
  }

  function world_store(game) {
    set_seed(game.PlayerSeed);
    game.Camera = undefined;
    game.World = [];
    game.GL.clearColor(0.9, 0.7, 0.3, 1);
    // Player.
    let player = game.Add({
      Using: [
        animate({
          [1 /* Idle */]: {
            Keyframes: [
              {
                Timestamp: 0,
                Rotation: [0, 0, 0, 1],
              },
              {
                Timestamp: 2,
                Rotation: [0, 1, 0, 0],
              },
              {
                Timestamp: 4,
                Rotation: [0, 0, 0, -1],
              },
            ],
            Flags: 2 /* Loop */,
          },
        }),
      ],
      Children: [get_character_blueprint(game)],
    });
    game.Add(create_iso_camera(player));
    // Directional light.
    game.Add({
      Translation: [1, 1, 1],
      Using: [light([0.5, 0.5, 0.5], 0)],
    });
    // Point light.
    game.Add({
      Translation: [-15, 15, 15],
      Using: [light([1, 1, 1], 25)],
    });
  }

  function get_town_gate_blueprint(game, gate_size, fence_line) {
    let height = 4;
    let map_size = 30;
    let fence_width = (map_size * 8 - gate_size) / 2;
    let fence_offsets = [
      ...create_line(
        [4, height, -map_size * 4],
        [4, height, -map_size * 4 + fence_width],
        1 /* wood */,
      ),
      ...create_line(
        [4, height, -map_size * 4 + fence_width + gate_size],
        [4, height, map_size * 4],
        1 /* wood */,
      ),
    ];
    // gate
    fence_offsets.push(
      ...create_line(
        [4, 0, -map_size * 4 + fence_width],
        [4, gate_size * 1.5, -map_size * 4 + fence_width],
        1 /* wood */,
      ),
      ...create_line(
        [4, 0, -map_size * 4 + fence_width + gate_size],
        [4, gate_size * 1.5, -map_size * 4 + fence_width + gate_size],
        1 /* wood */,
      ),
      ...create_line(
        [4, gate_size * 1.5, -map_size * 4 + fence_width],
        [4, gate_size * 1.5, -map_size * 4 + fence_width + gate_size + 1],
        1 /* wood */,
      ),
    );
    if (game.BountySeed) {
      for (let i = 0; i < gate_size / 8; i++) {
        game.Grid[fence_line][fence_width / 8 + i] = Infinity;
      }
    } else {
      fence_offsets.push(
        ...create_line(
          [4, height, -map_size * 4 + fence_width],
          [4, height, -map_size * 4 + fence_width + gate_size],
          1 /* wood */,
        ),
      );
    }
    for (let i = -(map_size / 2 - 1) * 8; i < (map_size / 2) * 8; i += 8) {
      if (
        i < -map_size * 4 + fence_width ||
        i > -map_size * 4 + fence_width + gate_size
      ) {
        fence_offsets.push(
          ...create_line([4, 0, i], [4, height + 2, i], 1 /* wood */),
        );
      }
    }
    return {
      Translation: [(-(map_size / 2) + fence_line) * 8 - 4, 0, -3],
      Using: [render_vox(Float32Array.from(fence_offsets), main_palette)],
      Children: [
        {
          Translation: [20, 0, 0],
          Using: [collide(false, [8, 8, 800]), trigger(6 /* GoToDesert */)],
        },
      ],
    };
  }

  let snd_music = {
    Tracks: [
      {
        Instrument: [
          5,
          "bandpass",
          10,
          3,
          ,
          ,
          ,
          ,
          [["triangle", 7, 2, 2, 8, 8]],
        ],
        Notes: [
          69,
          74,
          69,
          74,
          69,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          65,
          ,
          ,
          ,
          67,
          ,
          ,
          ,
          62,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          69,
          74,
          69,
          74,
          69,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          65,
          ,
          ,
          ,
          67,
          ,
          ,
          ,
          72,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          69,
          74,
          69,
          74,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          65,
          ,
          ,
          ,
          64,
          ,
          62,
          ,
          60,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          69,
          74,
          69,
          74,
          69,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          67,
          ,
          ,
          ,
          62,
        ],
      },
      {
        Instrument: [
          3,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [false, 2, 1, 1, 6],
            ["sine", 9, 2, 2, 7, 7],
          ],
        ],
        Notes: [
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          41,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          ,
          ,
          43,
          ,
          41,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          41,
          ,
          43,
          ,
          ,
          ,
          48,
          ,
          ,
          ,
          48,
          ,
          ,
          ,
          48,
          ,
          43,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          41,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          33,
          ,
          36,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          33,
          ,
          ,
          ,
          36,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          ,
          ,
          38,
          ,
          38,
        ],
      },
    ],
    Exit: 19.2,
  };

  let snd_neigh = {
    Tracks: [
      {
        Instrument: [
          4,
          "lowpass",
          9,
          5,
          true,
          "sawtooth",
          7,
          9,
          [[false, 7, 3, 3, 7]],
        ],
        Notes: [57],
      },
    ],
    Exit: 9,
  };

  const QUERY =
    1 /* Transform */ | 8192 /* PlayerControl */ | 262144; /* Walking */
  function sys_control_player(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY) == QUERY && game.Camera) {
        update(game, i);
      }
    }
  }
  function update(game, entity) {
    // Player is controllable only in scenes with mouse picking.
    let cursor = game[11 /* Select */][game.Camera.EntityId];
    if (game.Input.d0 && cursor.Hit) {
      if (cursor.Hit.Flags & 4 /* Navigable */) {
        let route = get_route(
          game,
          entity,
          game[10 /* Navigable */][cursor.Hit.EntityId],
        );
        if (route) {
          game[18 /* Walking */][entity].Route = route;
        }
      }
      if (
        cursor.Hit.Flags & 8 /* Attackable */ &&
        game.World[entity] & 4096 /* Shoot */
      ) {
        let other_transform = game[0 /* Transform */][cursor.Hit.EntityId];
        game[12 /* Shoot */][entity].Target = get_translation(
          [],
          other_transform.World,
        );
        game[21 /* Shake */][game.Camera.EntityId].Duration = 0.2;
      }
    }
    if (game.Input.d2 && game.World[entity] & 4096 /* Shoot */) {
      game[12 /* Shoot */][entity].Target = cursor.Position;
      game[21 /* Shake */][game.Camera.EntityId].Duration = 0.2;
    }
  }
  function get_neighbors(game, { X, Y }) {
    let directions = [
      { X: X - 1, Y },
      { X: X + 1, Y },
      { X, Y: Y - 1 },
      { X, Y: Y + 1 },
      { X: X - 1, Y: Y - 1 },
      { X: X + 1, Y: Y - 1 },
      { X: X - 1, Y: Y + 1 },
      { X: X + 1, Y: Y + 1 },
    ];
    // if (diagonal) {
    //     directions.push(
    //     );
    // }
    return directions.filter(
      ({ X, Y }) =>
        X >= 0 && X < game.Grid.length && Y >= 0 && Y < game.Grid[0].length,
    );
  }
  function calculate_distance(game, { X, Y }) {
    // Reset the distance grid.
    for (let x = 0; x < game.Grid.length; x++) {
      for (let y = 0; y < game.Grid[0].length; y++) {
        if (!Number.isNaN(game.Grid[x][y])) {
          game.Grid[x][y] = Infinity;
        }
      }
    }
    game.Grid[X][Y] = 0;
    let frontier = [{ X, Y }];
    let current;
    while ((current = frontier.shift())) {
      if (game.Grid[current.X][current.Y] < 15) {
        for (let cell of get_neighbors(game, current)) {
          if (game.Grid[cell.X][cell.Y] > game.Grid[current.X][current.Y] + 1) {
            game.Grid[cell.X][cell.Y] = game.Grid[current.X][current.Y] + 1;
            frontier.push(cell);
          }
        }
      }
    }
  }
  function get_route(game, entity, destination) {
    let walking = game[18 /* Walking */][entity];
    calculate_distance(game, walking);
    // Bail out early if the destination is not accessible (Infinity) or non-walkable (NaN).
    if (!(game.Grid[destination.X][destination.Y] < Infinity)) {
      return false;
    }
    let route = [];
    while (!(destination.X == walking.X && destination.Y == walking.Y)) {
      route.push(destination);
      let neighbors = get_neighbors(game, destination);
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor_coords = neighbors[i];
        if (
          game.Grid[neighbor_coords.X][neighbor_coords.Y] <
          game.Grid[destination.X][destination.Y]
        ) {
          destination =
            game[10 /* Navigable */][find_navigable(game, neighbor_coords)];
        }
      }
    }
    return route;
  }

  function widget_exclamation(game, entity, x, y) {
    let marker = game[2 /* Draw */][entity].Arg;
    let age = game[22 /* Lifespan */][entity].Age;
    game.Context.font = "10vmin Impact";
    game.Context.textAlign = "center";
    game.Context.fillStyle = "#FFE8C6";
    game.Context.fillText(marker, x, y + Math.sin(age * 5) * 10);
  }

  function world_town(game, is_intro, bounty_collected) {
    set_seed(game.ChallengeSeed);
    let map_size = 30;
    let fence_line = 20;
    let back_fence_line = 1;
    let fence_gate_size = 16;
    let characters_spawning_points = [
      0,
      (map_size / 2) * 30 + map_size / 2,
      (map_size / 2) * 30 + map_size / 2 + 3,
      (map_size / 2 + 3) * 30 + map_size / 2 - 8,
    ];
    game.Camera = undefined;
    game.World = [];
    game.Grid = [];
    game.GL.clearColor(0.8, 0.3, 0.2, 1);
    // Ground.
    for (let x = 0; x < map_size; x++) {
      game.Grid[x] = [];
      for (let y = 0; y < map_size; y++) {
        let is_fence = x == fence_line || x == back_fence_line;
        // cactuses & stones here
        // We set this to true, because we don't want props to be
        // generated on the fence line
        let is_walkable =
          is_fence ||
          x == back_fence_line - 1 ||
          characters_spawning_points.includes(x * 30 + y) ||
          rand() > 0.04;
        game.Grid[x][y] = is_walkable && !is_fence ? Infinity : NaN;
        let tile_blueprint = get_tile_blueprint(game, is_walkable, x, y, false);
        game.Add({
          ...tile_blueprint,
          Translation: [
            (-(map_size / 2) + x) * 8,
            0,
            (-(map_size / 2) + y) * 8,
          ],
        });
      }
    }
    game.Add(get_town_gate_blueprint(game, fence_gate_size, fence_line));
    // Buildings
    let buildings_count = 4;
    let starting_position = 0;
    let building_x_tile = 10;
    for (let i = 0; i < buildings_count; i++) {
      let building_blu = get_building_blueprint(game);
      let building_x = building_blu.Size_x / 8;
      let building_z = building_blu.Size_z / 8;
      if (starting_position + building_z > map_size) {
        break;
      }
      game.Add({
        Translation: [
          (-(map_size / 2) + building_x_tile) * 8 - 1.5,
          0,
          (-(map_size / 2) + starting_position) * 8 - 3.5,
        ],
        Children: [building_blu.Blueprint],
      });
      for (let z = starting_position; z < starting_position + building_z; z++) {
        for (let x = building_x_tile; x < building_x_tile + building_x; x++) {
          game.Grid[x][z] = NaN;
        }
      }
      starting_position += building_blu.Size_z / 8 + integer(1, 2);
    }
    // Cowboys.
    let cowboys_count = 20;
    for (let i = 0; i < cowboys_count; i++) {
      let x = integer(0, map_size);
      let y = integer(0, map_size);
      if (game.Grid[x] && game.Grid[x][y] && !isNaN(game.Grid[x][y])) {
        game.Add({
          Translation: [
            (-(map_size / 2) + x) * 8,
            4.3 + Math.random(),
            (-(map_size / 2) + y) * 8,
          ],
          Using: [npc(), walking(x, y), move(integer(15, 25), 0)],
          Children: [get_character_blueprint(game)],
        });
      }
    }
    if (!game.PlayerXY) {
      game.PlayerXY = { X: map_size / 2, Y: map_size / 2 };
    }
    calculate_distance(game, game.PlayerXY);
    if (is_intro) {
      game.Add({
        Translation: [1, 2, -1],
        Using: [light([0.7, 0.7, 0.7], 0), audio_source(snd_wind)],
      });
      game.Player = game.Add({
        Using: [walking(map_size / 2, map_size / 2)],
      });
    } else {
      // Directional light and Soundtrack
      game.Add({
        Translation: [1, 2, -1],
        Using: [light([0.5, 0.5, 0.5], 0), audio_source(snd_music)],
        Children: [
          {
            Using: [audio_source(snd_neigh)],
          },
          {
            Using: [audio_source(snd_wind)],
          },
        ],
      });
      // Sheriff.
      game.Add({
        Translation: [0, 5, 24],
        Rotation: from_euler([], 0, 90, 0),
        Using: game.BountySeed
          ? []
          : [collide(false, [8, 8, 8]), trigger(5 /* GoToWanted */)],
        Children: [
          get_character_blueprint(game),
          {
            Translation: [0, 10, 0],
            Using: game.BountySeed
              ? []
              : [draw(widget_exclamation, "!"), lifespan()],
          },
        ],
      });
      // Outfitter.
      game.Add({
        Translation: [24, 5, -64],
        Using: [collide(false, [8, 8, 8]), trigger(4 /* GoToStore */)],
        Children: [
          get_character_blueprint(game),
          {
            Translation: [0, 10, 0],
            Using: [draw(widget_exclamation, "$"), lifespan()],
          },
        ],
      });
      // Player.
      let player_position =
        game[0 /* Transform */][find_navigable(game, game.PlayerXY)]
          .Translation;
      set_seed(game.PlayerSeed);
      game.Player = game.Add({
        Translation: [player_position[0], 5, player_position[2]],
        Using: [
          player_control(),
          walking(game.PlayerXY.X, game.PlayerXY.Y),
          move(25, 0),
          collide(true, [3, 7, 3], 16 /* Player */),
          health(10000),
        ],
        Children: [
          get_character_blueprint(game),
          {
            Translation: [0, 25, 0],
            Using: [light([1, 1, 1], 20)],
          },
        ],
      });
      if (bounty_collected) {
        game.Add({
          Using: [draw(widget_gold, bounty_collected), lifespan(4)],
        });
      }
    }
    game.Add({
      ...get_town_gate_blueprint(game, 0, back_fence_line + 1),
      Rotation: from_euler([], 0, 180, 0),
    });
    if (game.Gold > 0 && game.Gold < 10000) {
      game.Grid[back_fence_line][15] = Infinity;
    }
    game.Add({
      Translation: [-120, 5, -120],
      Using: [collide(false, [8, 8, 8]), trigger(6 /* GoToDesert */)],
      Children: [get_character_blueprint(game)],
    });
    game.Add({
      ...get_gold_blueprint(),
      Translation: [56, 1.5, 0],
    });
    // Dio-cube
    game.Add({
      Scale: [map_size * 8, map_size * 2, map_size * 8],
      Translation: [-4, -map_size + 0.49, -4],
      Using: [
        render_vox(
          Float32Array.from([0, 0, 0, 5 /* desert_ground_1 */]),
          main_palette,
        ),
      ],
    });
    // Camera.
    game.Add(create_iso_camera(game.Player));
  }
  function world_intro(game) {
    world_town(game, true);
  }

  function world_wanted(game) {
    set_seed(game.BountySeed);
    game.Camera = undefined;
    game.World = [];
    game.GL.clearColor(0.9, 0.7, 0.3, 1);
    // Bandit.
    game.Add({
      Using: [
        animate({
          [1 /* Idle */]: {
            Keyframes: [
              {
                Timestamp: 0,
                Rotation: [0, 0, 0, 1],
              },
              {
                Timestamp: 2,
                Rotation: [0, 1, 0, 0],
              },
              {
                Timestamp: 4,
                Rotation: [0, 0, 0, -1],
              },
            ],
            Flags: 2 /* Loop */,
          },
        }),
      ],
      Children: [get_character_blueprint(game)],
    });
    // Camera.
    game.Add({
      Translation: [0, 2, 10],
      Using: [camera_ortho(10, 1, 100)],
    });
    // Directional light.
    game.Add({
      Translation: [1, 1, 1],
      Using: [light([0.5, 0.5, 0.5], 0)],
    });
    // Point light.
    game.Add({
      Translation: [-15, 15, 15],
      Using: [light([1, 1, 1], 25)],
    });
  }

  function dispatch(game, action, args) {
    switch (action) {
      case 1 /* CompleteBounty */: {
        game.Audio.close();
        game.Audio = new AudioContext();
        game.WorldFunc = world_town;
        setTimeout(game.WorldFunc, 0, game, false, game.ChallengeLevel * 1000);
        game.Gold += game.ChallengeLevel * 1000;
        window.localStorage.setItem("gold", game.Gold);
        game.ChallengeLevel += 1;
        game.PlayerState = 0 /* Playing */;
        game.PlayerXY = undefined;
        game.BountySeed = 0;
        break;
      }
      case 2 /* EndChallenge */: {
        game.Gold = 0;
        window.localStorage.setItem("gold", game.Gold);
        game.ChallengeLevel = 1;
        game.PlayerState = 0 /* Playing */;
        game.PlayerXY = undefined;
        game.BountySeed = 0;
        game.WorldFunc = world_intro;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 3 /* GoToTown */: {
        game.Audio.close();
        game.Audio = new AudioContext();
        game.WorldFunc = world_town;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 5 /* GoToWanted */: {
        game.PlayerXY = game[18 /* Walking */][game.Player];
        game.BountySeed = game.ChallengeSeed * game.ChallengeLevel - 1;
        game.WorldFunc = world_wanted;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 4 /* GoToStore */: {
        game.MonetizationEnabled = true;
        game.PlayerXY = game[18 /* Walking */][game.Player];
        game.WorldFunc = world_store;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 11 /* ChangePlayerSeed */: {
        if (game.Gold > 998) {
          game.PlayerSeed = Math.random() * 10000;
        }
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 6 /* GoToDesert */: {
        game.Audio.close();
        game.Audio = new AudioContext();
        game.WorldFunc = world_desert;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 7 /* GoToMine */: {
        game.Audio.close();
        game.Audio = new AudioContext();
        game.WorldFunc = game.BountySeed ? world_mine : world_town;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
      case 8 /* Hit */: {
        let [entity, damage] = args;
        game.Add({
          Translation: game[0 /* Transform */][entity].Translation.slice(),
          Using: [draw(widget_damage, damage), lifespan(1)],
        });
        if (game.World[entity] & 8192 /* PlayerControl */) {
          game.Add({
            Using: [draw(widget_player_hit), lifespan(1)],
          });
        }
        break;
      }
      case 10 /* CollectGold */: {
        let [entity] = args;
        let value = integer(100, 1000);
        game.Gold += value;
        window.localStorage.setItem("gold", game.Gold);
        game[5 /* AudioSource */][entity].Trigger = snd_gold;
        game.Add({
          Translation: game[0 /* Transform */][game.Player].Translation.slice(),
          Using: [draw(widget_gold, value), lifespan(1)],
        });
        // Schedule destruction of the gold entity at the beginning of the
        // next frame, so that sys_audio can play the pick-up sfx.
        lifespan(0)(game, entity);
        break;
      }
      case 9 /* Die */: {
        let entity = args[0];
        // If the player is killed.
        if (game.World[entity] & 8192 /* PlayerControl */) {
          game.World[entity] &= ~(
            (
              8192 /* PlayerControl */ |
              16384 /* Health */ |
              128 /* Move */ |
              256
            ) /* Collide */
          );
          game.PlayerState = 2 /* Defeat */;
        } else if (game.World[entity] & 524288 /* NPC */) {
          // If the boss is killed.
          if (game[19 /* NPC */][entity].Bounty) {
            game.PlayerState = 1 /* Victory */;
            // Make all bandits friendly.
            for (let i = 0; i < game.World.length; i++) {
              if (game.World[i] & 524288 /* NPC */) {
                game.World[i] &= ~262144 /* Walking */;
              }
            }
          }
          game.World[entity] &= ~(
            (
              524288 /* NPC */ |
              16384 /* Health */ |
              128 /* Move */ |
              256
            ) /* Collide */
          );
          // This must be the same as character's blueprint's Anim.Die duration.
          setTimeout(() => game.Destroy(entity), 5000);
        }
        break;
      }
      case 12 /* HealCampfire */: {
        let entity = args[0];
        game.Destroy(entity);
        let health = game[14 /* Health */][game.Player];
        health.Current = health.Max;
        break;
      }
      case 13 /* Spend money and GoToTown */: {
        game.Gold -= 999;
        window.localStorage.setItem("gold", game.Gold);
        game.Audio.close();
        game.Audio = new AudioContext();
        game.WorldFunc = world_town;
        setTimeout(game.WorldFunc, 0, game);
        break;
      }
    }
  }

  function transform(
    Translation = [0, 0, 0],
    Rotation = [0, 0, 0, 1],
    Scale = [1, 1, 1],
  ) {
    return (game, EntityId) => {
      game.World[EntityId] |= 1 /* Transform */;
      game[0 /* Transform */][EntityId] = {
        EntityId,
        World: create(),
        Self: create(),
        Translation,
        Rotation,
        Scale,
        Children: [],
        Dirty: true,
      };
    };
  }
  /**
   * Get all component instances of a given type from the current entity and all
   * its children.
   *
   * @param game Game object which stores the component data.
   * @param transform The transform to traverse.
   * @param component Component mask to look for.
   */
  function* components_of_type(game, transform, component) {
    if (game.World[transform.EntityId] & (1 << component)) {
      yield game[component][transform.EntityId];
    }
    for (let child of transform.Children) {
      yield* components_of_type(game, child, component);
    }
  }

  function link(gl, vertex, fragment) {
    let program = gl.createProgram();
    gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, GL_LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }
  function compile(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, GL_COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  let vertex = `#version 300 es\n
    // Matrices: PV, world, self
    uniform mat4 p,q,r;
    // Color palette
    uniform vec3 s[16];

    // Light count
    uniform int t;
    // Light positions
    uniform vec3 u[100];
    // Light details
    uniform vec4 v[100];

    layout(location=${1 /* Position */}) in vec3 k;
    layout(location=${2 /* Normal */}) in vec3 m;
    layout(location=${3 /* Offset */}) in vec4 n;

    // Vertex color
    out vec4 o;

    void main(){
        // World position
        vec4 a=q*vec4(k+n.rgb,1.);
        // World normal
        vec3 b=normalize((vec4(m,0.)* r).rgb);
        gl_Position=p*a;

        // Color
        vec3 c=s[int(n[3])].rgb*.1;
        for(int i=0;i<t;i++){
            if(v[i].a<1.) {
                // A directional light.
                // max(dot()) is the diffuse factor.
                c+=s[int(n[3])].rgb*v[i].rgb*max(dot(b,normalize(u[i])),0.);
            }else{
                // A point light.
                // Light direction
                vec3 ld=u[i]-a.xyz;
                // Distance
                float d=length(ld);
                // max(dot()) is the diffuse factor.
                c+=s[int(n[3])].rgb*v[i].rgb*max(dot(b,normalize(ld)),0.)*v[i].a/(d*d);
            }
        }

        o=vec4(c,1.);
    }
`;
  let fragment = `#version 300 es\n
    precision mediump float;

    // Vertex color
    in vec4 o;
    // Fragment color
    out vec4 z;

    void main(){
        z=o;
    }
`;
  function mat_instanced(GL) {
    let Program = link(GL, vertex, fragment);
    let material = {
      GL,
      Mode: GL_TRIANGLES,
      Program,
      Uniforms: [
        GL.getUniformLocation(Program, "p"),
        GL.getUniformLocation(Program, "q"),
        GL.getUniformLocation(Program, "r"),
        GL.getUniformLocation(Program, "s"),
        GL.getUniformLocation(Program, "t"),
        GL.getUniformLocation(Program, "u"),
        GL.getUniformLocation(Program, "v"),
      ],
    };
    return material;
  }

  let vertex$1 = `#version 300 es\n
    // Projection * View matrix
    uniform mat4 p;
    // [red, green, blue, size]
    uniform vec4 q;

    // [x, y, z, age]
    layout(location=${1 /* Origin */}) in vec4 k;

    // Vertex color
    out vec4 o;

    void main(){
        vec4 a=vec4(k.rgb,1.);
        if(q.a<10.) {
            // It's a projectile.
            a.y+=k.a*2.;
            gl_PointSize=mix(q.a,1.,k.a);
        }else{
            // It's a campfire.
            a.y+=k.a*10.;
            gl_PointSize=mix(q.a,1.,k.a);
        }
        gl_Position=p*a;
        o=mix(vec4(q.rgb,1.),vec4(1.,1.,0.,1.),k.a);
    }
`;
  let fragment$1 = `#version 300 es\n
    precision mediump float;

    // Vertex color
    in vec4 o;
    // Fragment color
    out vec4 z;

    void main(){
        z=o;
    }
`;
  function mat_particles(GL) {
    let Program = link(GL, vertex$1, fragment$1);
    let material = {
      GL,
      Mode: GL_POINTS,
      Program,
      Uniforms: [
        GL.getUniformLocation(Program, "p"),
        GL.getUniformLocation(Program, "q"),
      ],
    };
    return material;
  }

  let vertex$2 = `#version 300 es\n
    // Matrices: PV, world
    uniform mat4 p,q;

    layout(location=${1 /* Position */}) in vec3 k;

    void main(){
        gl_Position=p*q*vec4(k,1.);
    }
`;
  let fragment$2 = `#version 300 es\n
    precision mediump float;
    // Line color
    uniform vec4 r;

    // Fragment color
    out vec4 z;

    void main() {
        z=r;
    }
`;
  function mat_wireframe(GL) {
    let Program = link(GL, vertex$2, fragment$2);
    let material = {
      GL,
      Mode: GL_LINE_LOOP,
      Program,
      Uniforms: [
        GL.getUniformLocation(Program, "p"),
        GL.getUniformLocation(Program, "q"),
        GL.getUniformLocation(Program, "r"),
      ],
    };
    return material;
  }

  const QUERY$1 = 1 /* Transform */ | 4096; /* Shoot */
  function sys_aim(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$1) == QUERY$1) {
        update$1(game, i);
      }
    }
  }
  function update$1(game, entity) {
    let shoot = game[12 /* Shoot */][entity];
    if (shoot.Target) {
      let transform = game[0 /* Transform */][entity];
      let move = game[7 /* Move */][entity];
      let forward = get_forward([], transform.World);
      let forward_theta = Math.atan2(forward[2], forward[0]);
      let dir = subtract([], shoot.Target, transform.Translation);
      let dir_theta = Math.atan2(dir[2], dir[0]);
      move.Yaw = from_euler([], 0, (forward_theta - dir_theta) * 57, 0);
    }
  }

  const QUERY$2 = 1 /* Transform */ | 64; /* Animate */
  function sys_animate(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$2) == QUERY$2) {
        update$2(game, i, delta);
      }
    }
  }
  function update$2(game, entity, delta) {
    let transform = game[0 /* Transform */][entity];
    let animate = game[6 /* Animate */][entity];
    // 1. Switch to the trigger this frame if early exits are allowed.
    let next = animate.Trigger && animate.States[animate.Trigger];
    if (next && animate.Current.Flags & 1 /* EarlyExit */) {
      // We don't reset the current state's timer because the trigger may be
      // the same state as the current. If the states are different, this may
      // result in clips not starting from the first keyframe, which should
      // be generally OK for animations with EarlyExit.
      animate.Current = next;
      animate.Trigger = undefined;
    }
    // 2. Advance the timer.
    animate.Current.Time += delta;
    if (animate.Current.Time > animate.Current.Duration) {
      // The animation will complete this frame. The last keyframe still needs
      // to finish, however.
      animate.Current.Time = animate.Current.Duration;
    }
    // 3. Find the current and the next keyframe.
    let current_keyframe = null;
    let next_keyframe = null;
    for (let keyframe of animate.Current.Keyframes) {
      if (animate.Current.Time <= keyframe.Timestamp) {
        next_keyframe = keyframe;
        break;
      } else {
        current_keyframe = keyframe;
      }
    }
    // 4. Interpolate transform properties between keyframes.
    if (current_keyframe && next_keyframe) {
      let keyframe_duration =
        next_keyframe.Timestamp - current_keyframe.Timestamp;
      let current_keyframe_time =
        animate.Current.Time - current_keyframe.Timestamp;
      let interpolant = current_keyframe_time / keyframe_duration;
      if (next_keyframe.Ease) {
        interpolant = next_keyframe.Ease(interpolant);
      }
      if (current_keyframe.Translation && next_keyframe.Translation) {
        lerp(
          transform.Translation,
          current_keyframe.Translation,
          next_keyframe.Translation,
          interpolant,
        );
        transform.Dirty = true;
      }
      if (current_keyframe.Rotation && next_keyframe.Rotation) {
        slerp(
          transform.Rotation,
          current_keyframe.Rotation,
          next_keyframe.Rotation,
          interpolant,
        );
        transform.Dirty = true;
      }
    }
    // 5. The animation has completed. Determine what to do next.
    if (animate.Current.Time == animate.Current.Duration) {
      animate.Current.Time = 0;
      if (animate.Current.Flags & 4 /* Alternate */) {
        // Reverse the keyframes of the clip and recalculate their timestamps.
        for (let keyframe of animate.Current.Keyframes.reverse()) {
          keyframe.Timestamp = animate.Current.Duration - keyframe.Timestamp;
        }
      }
      if (next) {
        // Switch to the trigger. All clips can be exited from when they
        // finish, regardless of the lack of the EarlyExit flag. The trigger
        // may be the same state as the current.
        animate.Current = next;
        animate.Trigger = undefined;
      } else if (!((animate.Current.Flags & 2) /* Loop */)) {
        animate.Current = animate.States[1 /* Idle */];
      }
    }
  }

  function play_note(audio, instr, note, offset) {
    let time = audio.currentTime + offset;
    let total_duration = 0;
    let master = audio.createGain();
    master.gain.value = (instr[0 /* MasterGainAmount */] / 9) ** 3;
    let lfa, lfo;
    if (instr[5 /* LFOType */]) {
      // Frequency is mapped to [0, 125].
      lfo = audio.createOscillator();
      lfo.type = instr[5 /* LFOType */];
      lfo.frequency.value = (instr[7 /* LFOFreq */] / 3) ** 3;
      // Amount is mapped to [27, 5832].
      lfa = audio.createGain();
      lfa.gain.value = (instr[6 /* LFOAmount */] + 3) ** 3;
      lfo.connect(lfa);
    }
    if (instr[1 /* FilterType */]) {
      let filter = audio.createBiquadFilter();
      filter.type = instr[1 /* FilterType */];
      filter.frequency.value = 2 ** instr[2 /* FilterFreq */];
      filter.Q.value = instr[3 /* FilterQ */] ** 1.5;
      if (lfa && instr[4 /* FilterDetuneLFO */]) {
        lfa.connect(filter.detune);
      }
      master.connect(filter);
      filter.connect(audio.destination);
    } else {
      master.connect(audio.destination);
    }
    for (let source of instr[8 /* Sources */]) {
      let amp = audio.createGain();
      amp.connect(master);
      // Gain Envelope
      let gain_amount = (source[1 /* GainAmount */] / 9) ** 3;
      let gain_attack = (source[2 /* GainAttack */] / 9) ** 3;
      let gain_sustain = (source[3 /* GainSustain */] / 9) ** 3;
      let gain_release = (source[4 /* GainRelease */] / 6) ** 3;
      let gain_duration = gain_attack + gain_sustain + gain_release;
      amp.gain.setValueAtTime(0, time);
      amp.gain.linearRampToValueAtTime(gain_amount, time + gain_attack);
      amp.gain.setValueAtTime(gain_amount, time + gain_attack + gain_sustain);
      amp.gain.exponentialRampToValueAtTime(0.00001, time + gain_duration);
      if (source[0]) {
        let hfo = audio.createOscillator();
        hfo.type = source[0 /* SourceType */];
        hfo.connect(amp);
        // Detune
        // [-1265,1265] i.e. one octave down and one octave up.
        hfo.detune.value = 3 * (source[5 /* DetuneAmount */] - 7.5) ** 3;
        if (lfa && source[6 /* DetuneLFO */]) {
          lfa.connect(hfo.detune);
        }
        // Frequency Envelope
        // Frequency from note number
        let freq = 440 * 2 ** ((note - 69) / 12);
        if (source[7 /* FreqEnabled */]) {
          let freq_attack = (source[8 /* FreqAttack */] / 9) ** 3;
          let freq_sustain = (source[9 /* FreqSustain */] / 9) ** 3;
          let freq_release = (source[10 /* FreqRelease */] / 6) ** 3;
          hfo.frequency.linearRampToValueAtTime(0, time);
          hfo.frequency.linearRampToValueAtTime(freq, time + freq_attack);
          hfo.frequency.setValueAtTime(freq, time + freq_attack + freq_sustain);
          hfo.frequency.exponentialRampToValueAtTime(
            0.00001,
            time + freq_attack + freq_sustain + freq_release,
          );
        } else {
          hfo.frequency.setValueAtTime(freq, time);
        }
        hfo.start(time);
        hfo.stop(time + gain_duration);
      } else {
        let noise = audio.createBufferSource();
        noise.buffer = lazy_noise_buffer(audio);
        noise.loop = true;
        noise.connect(amp);
        noise.start(time);
        noise.stop(time + gain_duration);
      }
      if (gain_duration > total_duration) {
        total_duration = gain_duration;
      }
    }
    if (lfo) {
      lfo.start(time);
      lfo.stop(time + total_duration);
    }
  }
  let noise_buffer;
  function lazy_noise_buffer(audio) {
    if (!noise_buffer) {
      noise_buffer = audio.createBuffer(
        1,
        audio.sampleRate * 2,
        audio.sampleRate,
      );
      let channel = noise_buffer.getChannelData(0);
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;
      }
    }
    return noise_buffer;
  }

  function sys_audio(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if (game.World[i] & 32 /* AudioSource */) {
        update$3(game, i, delta);
      }
    }
  }
  function update$3(game, entity, delta) {
    let audio_source = game[5 /* AudioSource */][entity];
    let can_exit =
      !audio_source.Current || audio_source.Time > audio_source.Current.Exit;
    if (audio_source.Trigger && can_exit) {
      for (let track of audio_source.Trigger.Tracks) {
        for (let i = 0; i < track.Notes.length; i++) {
          if (track.Notes[i]) {
            // The duration of the note, 0.15 seconds, is calculated
            // assuming BPM of 100. That's 60/100 seconds per beat,
            // corresponding to a quarter note, divided by 4 to get an
            // interval of a sixteenth note.
            play_note(game.Audio, track.Instrument, track.Notes[i], i * 0.15);
          }
        }
      }
      audio_source.Current = audio_source.Trigger;
      audio_source.Time = 0;
    } else {
      audio_source.Time += delta;
    }
    // Audio triggers are only valid in the frame they're set; they don't stack
    // up. Otherwise sound effects would go out of sync with the game logic.
    // Reset the trigger to the default or undefined, regardless of whether it
    // triggered a new clip to play.
    audio_source.Trigger = audio_source.Idle;
  }

  const QUERY$3 = 1 /* Transform */ | 8; /* Camera */
  function sys_camera(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$3) == QUERY$3) {
        update$4(game, i);
      }
    }
  }
  function update$4(game, entity) {
    let transform = game[0 /* Transform */][entity];
    let camera = game[3 /* Camera */][entity];
    game.Camera = camera;
    invert(camera.View, transform.World);
    multiply(camera.PV, camera.Projection, camera.View);
  }

  const QUERY$4 = 1 /* Transform */ | 256; /* Collide */
  function sys_collide(game, delta) {
    // Collect all colliders.
    let static_colliders = [];
    let dynamic_colliders = [];
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$4) == QUERY$4) {
        let transform = game[0 /* Transform */][i];
        let collider = game[8 /* Collide */][i];
        // Prepare the collider for this tick's detection.
        collider.Collisions = [];
        if (collider.New) {
          collider.New = false;
          compute_aabb(transform, collider);
        } else if (collider.Dynamic) {
          compute_aabb(transform, collider);
          dynamic_colliders.push(collider);
        } else {
          static_colliders.push(collider);
        }
      }
    }
    for (let i = 0; i < dynamic_colliders.length; i++) {
      check_collisions(
        dynamic_colliders[i],
        static_colliders,
        static_colliders.length,
      );
      check_collisions(dynamic_colliders[i], dynamic_colliders, i);
    }
  }
  /**
   * Check for collisions between a dynamic collider and other colliders. Length
   * is used to control how many colliders to check against. For collisions
   * with static colliders, length should be equal to colliders.length, since
   * we want to consider all static colliders in the scene. For collisions with
   * other dynamic colliders, we only need to check a pair of colliders once.
   * Varying length allows to skip half of the NxN checks matrix.
   *
   * @param game The game instance.
   * @param collider The current collider.
   * @param colliders Other colliders to test against.
   * @param length How many colliders to check.
   */
  function check_collisions(collider, colliders, length) {
    for (let i = 0; i < length; i++) {
      let other = colliders[i];
      if (intersect_aabb(collider, other)) {
        collider.Collisions.push(other);
        other.Collisions.push(collider);
      }
    }
  }
  function compute_aabb(transform, collide) {
    let world_position = get_translation([], transform.World);
    let half = scale([], collide.Size, 0.5);
    subtract(collide.Min, world_position, half);
    add(collide.Max, world_position, half);
  }
  function intersect_aabb(a, b) {
    return (
      a.Min[0] < b.Max[0] &&
      a.Max[0] > b.Min[0] &&
      a.Min[1] < b.Max[1] &&
      a.Max[1] > b.Min[1] &&
      a.Min[2] < b.Max[2] &&
      a.Max[2] > b.Min[2]
    );
  }

  const QUERY$5 = 1 /* Transform */ | 524288 /* NPC */ | 262144; /* Walking */
  function sys_control_ai(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$5) == QUERY$5) {
        update$5(game, i, delta);
      }
    }
  }
  function update$5(game, entity, delta) {
    let walking = game[18 /* Walking */][entity];
    let is_friendly = game[19 /* NPC */][entity].Friendly;
    let can_shoot = game[19 /* NPC */][entity].LastShot <= 0;
    let player_walking = game[18 /* Walking */][game.Player];
    let distance_to_player = Math.abs(
      game.Grid[walking.X][walking.Y] -
        game.Grid[player_walking.X][player_walking.Y],
    );
    let route = [];
    if (!walking.Route.length && !walking.Destination) {
      if (is_friendly || distance_to_player > 5) {
        let destination_depth = integer(1, 15);
        while (destination_depth == game.Grid[walking.X][walking.Y]) {
          destination_depth = integer(1, 15);
        }
        route = get_random_route(game, entity, destination_depth);
      } else {
        route = get_route(game, game.Player, walking);
        if (route) {
          route.pop();
          route.pop();
          route = route.reverse();
        }
      }
      if (route && route.length > 1) {
        walking.Route = route;
      }
    }
    if (!is_friendly && game.World[entity] & 4096 /* Shoot */) {
      if (distance_to_player < 4 && can_shoot) {
        game[12 /* Shoot */][entity].Target =
          game[0 /* Transform */][game.Player].Translation;
        game[19 /* NPC */][entity].LastShot = 0.5;
        walking.Route = [];
      } else {
        game[19 /* NPC */][entity].LastShot -= delta;
      }
    }
  }
  function get_random_route(game, entity, destination_depth) {
    let walking = game[18 /* Walking */][entity];
    let current_cell = game[10 /* Navigable */][find_navigable(game, walking)];
    let current_depth = game.Grid[walking.X][walking.Y];
    let modifier = destination_depth > current_depth ? 1 : -1;
    let route = [];
    if (!(current_depth < 16)) {
      return false;
    }
    while (destination_depth !== current_depth) {
      if (route.length > 10) {
        return false;
      }
      route.push(current_cell);
      let neighbors = get_neighbors(game, current_cell).sort(
        () => 0.5 - Math.random(),
      );
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor_coords = neighbors[i];
        if (
          game.Grid[neighbor_coords.X][neighbor_coords.Y] ==
          current_depth + 1 * modifier
        ) {
          current_cell =
            game[10 /* Navigable */][find_navigable(game, neighbor_coords)];
          current_depth = game.Grid[current_cell.X][current_cell.Y];
          break;
        }
      }
    }
    return route.reverse();
  }

  const QUERY$6 =
    1 /* Transform */ |
    256 /* Collide */ |
    128 /* Move */ |
    1048576; /* Projectile */
  function sys_control_projectile(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$6) == QUERY$6) {
        update$6(game, i);
      }
    }
  }
  function update$6(game, entity) {
    let projectile = game[20 /* Projectile */][entity];
    let move = game[7 /* Move */][entity];
    let collide = game[8 /* Collide */][entity];
    if (collide.Collisions.length > 0) {
      game.Destroy(entity);
      for (let collider of collide.Collisions) {
        if (game.World[collider.EntityId] & 16384 /* Health */) {
          game[14 /* Health */][collider.EntityId].Damage =
            Math.random() * projectile.Damage +
            Math.random() * projectile.Damage;
        }
      }
    } else {
      // Always move in the projectile's front direction.
      move.Direction = get_forward([], game[0 /* Transform */][entity].World);
    }
  }

  const QUERY$7 = 1 /* Transform */ | 131072; /* Cull */
  function sys_cull(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$7) == QUERY$7 && game.Camera) {
        update$7(game, i);
      }
    }
  }
  let position = [0, 0, 0];
  function update$7(game, entity) {
    let cull = game[17 /* Cull */][entity];
    get_translation(position, game[0 /* Transform */][entity].World);
    transform_point(position, position, game.Camera.View);
    if (
      // m11 of the ortho projection matrix is defined as 1/right. Cull
      // transforms to the left and to the right of the frustum, with a padding.
      Math.abs(position[0]) > 1 / game.Camera.Projection[0] + 8 ||
      // m22 of the ortho projection matrix is defined as 1/top. Cull
      // transforms above and below the frustum, with a padding.
      Math.abs(position[1]) > 1 / game.Camera.Projection[5] + 8
    ) {
      game.World[entity] &= ~cull.Mask;
    } else {
      game.World[entity] |= cull.Mask;
    }
  }

  const QUERY$8 = 1 /* Transform */ | 4; /* Draw */
  function sys_draw(game, delta) {
    game.Context.clearRect(0, 0, game.Canvas2.width, game.Canvas2.height);
    let position = [];
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$8) == QUERY$8) {
        // World position.
        get_translation(position, game[0 /* Transform */][i].World);
        // NDC position.
        transform_point(position, position, game.Camera.PV);
        game[2 /* Draw */][i].Widget(
          game,
          i,
          0.5 * (position[0] + 1) * game.Canvas3.width,
          0.5 * (-position[1] + 1) * game.Canvas3.height,
        );
      }
    }
  }

  let counter = document.getElementById("fps");
  function sys_framerate(game, delta) {
    if (counter) {
      counter.textContent = (1 / delta).toFixed();
    }
  }

  const QUERY$9 = 16384; /* Health */
  function sys_health(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$9) == QUERY$9) {
        update$8(game, i);
      }
    }
  }
  function update$8(game, entity) {
    let health = game[14 /* Health */][entity];
    if (health.Damage) {
      dispatch(game, 8 /* Hit */, [entity, health.Damage]);
      health.Current -= health.Damage;
      health.Damage = 0;
      for (let animate of components_of_type(
        game,
        game[0 /* Transform */][entity],
        6 /* Animate */,
      )) {
        animate.Trigger = 4 /* Hit */;
      }
    }
    if (health.Current <= 0) {
      health.Current = 0;
      dispatch(game, 9 /* Die */, [entity]);
      for (let animate of components_of_type(
        game,
        game[0 /* Transform */][entity],
        6 /* Animate */,
      )) {
        animate.Trigger = 5 /* Die */;
      }
    }
  }

  const QUERY$a = 1 /* Transform */ | 4194304; /* Lifespan */
  function sys_lifespan(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$a) == QUERY$a) {
        update$9(game, i, delta);
      }
    }
  }
  function update$9(game, entity, delta) {
    let lifespan = game[22 /* Lifespan */][entity];
    lifespan.Age += delta;
    if (lifespan.Age > lifespan.Max) {
      game.Destroy(entity);
    }
  }

  const QUERY$b = 1 /* Transform */ | 32768; /* Mimic */
  function sys_mimic(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$b) == QUERY$b) {
        let follower_transform = game[0 /* Transform */][i];
        let follower_mimic = game[15 /* Mimic */][i];
        let target_transform = game[0 /* Transform */][follower_mimic.Target];
        let target_world_position = get_translation([], target_transform.World);
        // XXX Follower must be a top-level transform for this to work.
        follower_transform.Translation = lerp(
          [],
          follower_transform.Translation,
          target_world_position,
          0.1,
        );
        follower_transform.Dirty = true;
      }
    }
  }

  const QUERY$c = 1 /* Transform */ | 128; /* Move */
  function sys_move(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$c) == QUERY$c) {
        update$a(game, i, delta);
      }
    }
  }
  function update$a(game, entity, delta) {
    let transform = game[0 /* Transform */][entity];
    let move = game[7 /* Move */][entity];
    if (move.Direction) {
      scale(move.Direction, move.Direction, move.MoveSpeed * delta);
      add(transform.Translation, transform.Translation, move.Direction);
      transform.Dirty = true;
      move.Direction = undefined;
      for (let animate of components_of_type(
        game,
        transform,
        6 /* Animate */,
      )) {
        animate.Trigger = 2 /* Move */;
      }
    } else {
      for (let animate of components_of_type(
        game,
        transform,
        6 /* Animate */,
      )) {
        animate.Trigger = 1 /* Idle */;
      }
    }
    if (move.Yaw) {
      // Yaw is applied relative to the world space.
      multiply$1(transform.Rotation, move.Yaw, transform.Rotation);
      transform.Dirty = true;
      move.Yaw = undefined;
    }
  }

  const QUERY$d = 1 /* Transform */ | 128 /* Move */ | 262144; /* Walking */
  function sys_navigate(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$d) == QUERY$d) {
        update$b(game, i);
      }
    }
  }
  function update$b(game, entity) {
    let walking = game[18 /* Walking */][entity];
    if (!walking.Destination) {
      if (walking.Route.length) {
        let dest = walking.Route.pop();
        let destination_entity = find_navigable(game, dest);
        walking.DestinationX = dest.X;
        walking.DestinationY = dest.Y;
        walking.Destination =
          game[0 /* Transform */][destination_entity].Translation;
      }
    }
    if (walking.Destination) {
      let transform = game[0 /* Transform */][entity];
      let world_destination = [
        walking.Destination[0],
        transform.Translation[1],
        walking.Destination[2],
      ];
      let dir = subtract([], world_destination, transform.Translation);
      if (length(dir) < 1) {
        walking.X = walking.DestinationX;
        walking.Y = walking.DestinationY;
        walking.Destination = null;
      }
      let move = game[7 /* Move */][entity];
      move.Direction = normalize(dir, dir);
      let forward = get_forward([], transform.World);
      let forward_theta = Math.atan2(forward[2], forward[0]);
      let dir_theta = Math.atan2(dir[2], dir[0]);
      move.Yaw = from_euler([], 0, (forward_theta - dir_theta) * 57, 0);
    }
  }

  const QUERY$e = 1 /* Transform */ | 65536; /* EmitParticles */
  function sys_particles(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$e) == QUERY$e) {
        update$c(game, i, delta);
      }
    }
  }
  function update$c(game, entity, delta) {
    let emitter = game[16 /* EmitParticles */][entity];
    let transform = game[0 /* Transform */][entity];
    emitter.SinceLast += delta;
    if (emitter.SinceLast > emitter.Frequency) {
      emitter.SinceLast = 0;
      let origin = get_translation([], transform.World);
      // Push [x, y, z, age].
      emitter.Instances.push(...origin, 0);
    }
    // A flat continuous array of particle data, from which a Float32Array
    // is created in sys_render and sent as a vertex attribute array.
    for (let i = 0; i < emitter.Instances.length; ) {
      emitter.Instances[i + 3] += delta / emitter.Lifespan;
      if (emitter.Instances[i + 3] > 1) {
        emitter.Instances.splice(i, 4);
      } else {
        i += 4;
      }
    }
  }

  function sys_performance(game, delta, target) {
    if (target) {
      target.textContent = `${delta.toFixed(1)} ms`;
    }
  }

  const QUERY$f = 1 /* Transform */ | 2; /* Render */
  const LIGHTS = 1 /* Transform */ | 16; /* Light */
  function sys_render(game, delta) {
    game.GL.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    let light_positions = [];
    let light_details = [];
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & LIGHTS) == LIGHTS) {
        let transform = game[0 /* Transform */][i];
        let position = get_translation([], transform.World);
        light_positions.push(...position);
        light_details.push(...game[4 /* Light */][i]);
      }
    }
    // Keep track of the current material to minimize switching.
    let current_material = null;
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$f) == QUERY$f) {
        let transform = game[0 /* Transform */][i];
        let render = game[1 /* Render */][i];
        if (render.Material !== current_material) {
          current_material = render.Material;
          game.GL.useProgram(current_material.Program);
          game.GL.uniformMatrix4fv(
            current_material.Uniforms[0],
            false,
            game.Camera.PV,
          );
          switch (render.Kind) {
            case 1 /* Instanced */:
              game.GL.uniform1i(
                current_material.Uniforms[4 /* LightCount */],
                light_positions.length / 3,
              );
              game.GL.uniform3fv(
                current_material.Uniforms[5 /* LightPositions */],
                light_positions,
              );
              game.GL.uniform4fv(
                current_material.Uniforms[6 /* LightDetails */],
                light_details,
              );
              break;
          }
        }
        switch (render.Kind) {
          case 0 /* Basic */:
            draw_basic(game, transform, render);
            break;
          case 1 /* Instanced */:
            draw_instanced(game, transform, render);
            break;
          case 2 /* Particles */: {
            let emitter = game[16 /* EmitParticles */][i];
            if (emitter.Instances.length) {
              draw_particles(game, render, emitter);
            }
            break;
          }
        }
      }
    }
  }
  function draw_basic(game, transform, render) {
    game.GL.uniformMatrix4fv(
      render.Material.Uniforms[1 /* World */],
      false,
      transform.World,
    );
    game.GL.uniform4fv(render.Material.Uniforms[2 /* Color */], render.Color);
    game.GL.bindVertexArray(render.VAO);
    game.GL.drawElements(
      render.Material.Mode,
      render.Count,
      GL_UNSIGNED_SHORT,
      0,
    );
    game.GL.bindVertexArray(null);
  }
  function draw_instanced(game, transform, render) {
    game.GL.uniformMatrix4fv(
      render.Material.Uniforms[1 /* World */],
      false,
      transform.World,
    );
    game.GL.uniformMatrix4fv(
      render.Material.Uniforms[2 /* Self */],
      false,
      transform.Self,
    );
    game.GL.uniform3fv(
      render.Material.Uniforms[3 /* Palette */],
      render.Palette || game.Palette,
    );
    game.GL.bindVertexArray(render.VAO);
    game.GL.drawElementsInstanced(
      render.Material.Mode,
      render.IndexCount,
      GL_UNSIGNED_SHORT,
      0,
      render.InstanceCount,
    );
    game.GL.bindVertexArray(null);
  }
  function draw_particles(game, render, emitter) {
    game.GL.uniform4fv(
      render.Material.Uniforms[1 /* Detail */],
      render.ColorSize,
    );
    game.GL.bindBuffer(GL_ARRAY_BUFFER, render.Buffer);
    game.GL.bufferData(
      GL_ARRAY_BUFFER,
      Float32Array.from(emitter.Instances),
      GL_DYNAMIC_DRAW,
    );
    game.GL.enableVertexAttribArray(1 /* Origin */);
    game.GL.vertexAttribPointer(1 /* Origin */, 4, GL_FLOAT, false, 4 * 4, 0);
    game.GL.drawArrays(render.Material.Mode, 0, emitter.Instances.length / 4);
  }

  function raycast_aabb(colliders, origin, direction) {
    let nearest_t = Infinity;
    let nearest_i = null;
    for (let i = 0; i < colliders.length; i++) {
      let t = distance(origin, direction, colliders[i]);
      if (t < nearest_t) {
        nearest_t = t;
        nearest_i = i;
      }
    }
    if (nearest_i !== null) {
      return colliders[nearest_i];
    }
  }
  function distance(origin, direction, aabb) {
    let max_lo = -Infinity;
    let min_hi = +Infinity;
    for (let i = 0; i < 3; i++) {
      let lo = (aabb.Min[i] - origin[i]) / direction[i];
      let hi = (aabb.Max[i] - origin[i]) / direction[i];
      if (lo > hi) {
        [lo, hi] = [hi, lo];
      }
      if (hi < max_lo || lo > min_hi) {
        return Infinity;
      }
      if (lo > max_lo) max_lo = lo;
      if (hi < min_hi) min_hi = hi;
    }
    return max_lo > min_hi ? Infinity : max_lo;
  }

  let snd_click = {
    Tracks: [
      {
        Instrument: [7, "lowpass", 8, 8, , , , , [["sine", 4, 1, 0, 3, 8]]],
        Notes: [69],
      },
    ],
    Exit: 0.2,
  };

  const QUERY$g = 1 /* Transform */ | 8 /* Camera */ | 2048; /* Select */
  const TARGET = 1 /* Transform */ | 256; /* Collide */
  const ANIMATED = 4 /* Navigable */ | 16; /* Player */
  function sys_select(game, delta) {
    let colliders = [];
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & TARGET) == TARGET) {
        if (game[8 /* Collide */][i].Flags !== 1 /* None */) {
          colliders.push(game[8 /* Collide */][i]);
        }
      }
    }
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$g) == QUERY$g) {
        update$d(game, i, colliders);
      }
    }
  }
  function update$d(game, entity, colliders) {
    let transform = game[0 /* Transform */][entity];
    let camera = game[3 /* Camera */][entity];
    let select = game[11 /* Select */][entity];
    let x = (game.Input.mx / game.Canvas3.width) * 2 - 1;
    // In the browser, +Y is down. Invert it, so that in NDC it's up.
    let y = -(game.Input.my / game.Canvas3.height) * 2 + 1;
    let origin = [x, y, -1];
    let target = [x, y, 1];
    let direction = [0, 0, 0];
    transform_point(origin, origin, camera.Unproject);
    transform_point(origin, origin, transform.World);
    transform_point(target, target, camera.Unproject);
    transform_point(target, target, transform.World);
    subtract(direction, target, origin);
    normalize(direction, direction);
    select.Hit = raycast_aabb(colliders, origin, direction);
    // Check where the ray intersects the {point: [0, 5, 0], normal: [0, 1, 0]}
    // plane, i.e. the plane on which player's projectiles move.
    let t = (5 - origin[1]) / direction[1];
    add(select.Position, origin, scale(direction, direction, t));
    if (select.Hit && select.Hit.Flags & ANIMATED && game.Input.d0) {
      let transform = game[0 /* Transform */][select.Hit.EntityId];
      for (let animate of components_of_type(
        game,
        transform,
        6 /* Animate */,
      )) {
        animate.Trigger = 6 /* Select */;
      }
      for (let audio of components_of_type(
        game,
        transform,
        5 /* AudioSource */,
      )) {
        audio.Trigger = snd_click;
      }
    }
  }

  const QUERY$h = 1 /* Transform */ | 2097152; /* Shake */
  function sys_shake(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$h) == QUERY$h) {
        update$e(game, i, delta);
      }
    }
  }
  function update$e(game, entity, delta) {
    let shake = game[21 /* Shake */][entity];
    if (shake.Duration > 0) {
      shake.Duration -= delta;
      let transform = game[0 /* Transform */][entity];
      transform.Translation = [
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ];
      transform.Dirty = true;
      if (shake.Duration <= 0) {
        shake.Duration = 0;
        transform.Translation = [0, 0, 0];
      }
    }
  }

  function create_flash() {
    return {
      Using: [light([1, 1, 1], 5), lifespan(0.2)],
    };
  }

  function projectile(Damage) {
    return (game, entity) => {
      game.World[entity] |= 1048576 /* Projectile */;
      game[20 /* Projectile */][entity] = {
        Damage,
      };
    };
  }

  function create_projectile(damage, speed, color, size) {
    return {
      Using: [
        collide(true),
        projectile(damage),
        lifespan(3),
        move(speed),
        light(color, 2),
      ],
      Children: [
        {
          Scale: [0.3, 0.3, 0.3],
          Using: [render_vox(new Float32Array(4), color)],
        },
        {
          Using: [
            shake(5),
            emit_particles(1, 0.08),
            render_particles(color, size),
          ],
        },
      ],
    };
  }

  let snd_shoot1 = {
    Tracks: [
      {
        Instrument: [
          5,
          "lowpass",
          10,
          4,
          ,
          ,
          ,
          ,
          [
            [false, 10, 0, 0, 5],
            ["sine", 7, 0, 2, 2, 8],
          ],
        ],
        Notes: [57],
      },
    ],
    Exit: 0.2,
  };

  let snd_shoot2 = {
    Tracks: [
      {
        Instrument: [4, "lowpass", 10, 4, , , , , [[false, 10, 0, 0, 5]]],
        Notes: [57],
      },
    ],
    Exit: 0.2,
  };

  const QUERY$i = 1 /* Transform */ | 4096; /* Shoot */
  function sys_shoot(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$i) == QUERY$i) {
        update$f(game, i);
      }
    }
  }
  function update$f(game, entity) {
    let shoot = game[12 /* Shoot */][entity];
    if (shoot.Target) {
      let transform = game[0 /* Transform */][entity];
      let projectile;
      let snd_shoot;
      if (game.World[entity] & 8192 /* PlayerControl */) {
        projectile = create_projectile(500, 40, [1, 1, 1], 9);
        snd_shoot = snd_shoot1;
      } else {
        projectile = create_projectile(300, 30, [1, 0, 0], 7);
        snd_shoot = snd_shoot2;
      }
      let Translation = get_translation(
        [],
        transform.Children[0].Children[0].World,
      );
      game.Add({
        ...projectile,
        Translation,
        // Use the parent's rotation, since it's top-level, to avoid
        // get_rotation which is expensive in terms of code size.
        Rotation: transform.Rotation.slice(),
      });
      game.Add({
        ...create_flash(),
        Translation,
      });
      for (let audio of components_of_type(
        game,
        transform,
        5 /* AudioSource */,
      )) {
        audio.Trigger = snd_shoot;
      }
      for (let animate of components_of_type(
        game,
        transform,
        6 /* Animate */,
      )) {
        animate.Trigger = 3 /* Shoot */;
      }
    }
    shoot.Target = null;
  }

  const QUERY$j = 1; /* Transform */
  function sys_transform(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$j) == QUERY$j) {
        update$g(game[0 /* Transform */][i]);
      }
    }
  }
  function update$g(transform) {
    if (transform.Dirty) {
      transform.Dirty = false;
      set_children_as_dirty(transform);
      from_rotation_translation_scale(
        transform.World,
        transform.Rotation,
        transform.Translation,
        transform.Scale,
      );
      if (transform.Parent) {
        multiply(transform.World, transform.Parent.World, transform.World);
      }
      invert(transform.Self, transform.World);
    }
  }
  function set_children_as_dirty(transform) {
    for (let child of transform.Children) {
      child.Dirty = true;
      set_children_as_dirty(child);
    }
  }

  const QUERY$k = 1 /* Transform */ | 256 /* Collide */ | 512; /* Trigger */
  function sys_trigger(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
      if ((game.World[i] & QUERY$k) == QUERY$k) {
        update$h(game, i);
      }
    }
  }
  function update$h(game, entity) {
    let collisions = game[8 /* Collide */][entity].Collisions;
    for (let collide of collisions) {
      if (game.World[collide.EntityId] & 8192 /* PlayerControl */) {
        game.World[entity] &= ~512 /* Trigger */;
        dispatch(game, game[9 /* Trigger */][entity].Action, [entity]);
      }
    }
  }

  function Defeat(state) {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
        ">
            YOU DIE
            <div style="
                font: italic 5vmin serif;
            ">
                You earned $${state.Gold.toLocaleString("en")}.
            </div>
        </div>

        <div onclick="$(${2 /* EndChallenge */});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Try Again
        </div>
    `;
  }

  function Intro() {
    return `
        <div style="
            width: 66%;
            margin: 10vh auto;
        ">
            BACK<br>COUNTRY
            <div onclick="$(${3 /* GoToTown */});" style="
                font: italic bold small-caps 15vmin serif;
                border-top: 20px solid #d45230;
            ">
                Play Now
            </div>
            <div style="
                font: italic 5vmin serif;
            ">
                Earn as much money as you can in today's challenge.
            </div>
        </div>
    `;
  }

  function Playing(state) {
    return `
        <div style="
            margin: 3vmin 4vmin;
            font: 10vmin Impact;
        ">
            $${state.Gold.toLocaleString("en")}
        </div>
    `;
  }

  function Store(state) {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
            color: #222;
        ">
            GENERAL STORE
        </div>

        <div onclick="$(${11 /* ChangePlayerSeed */});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 15%;
            left: 10%;
        ">
            ${
              state.Gold > 998
                ? "Change Outfit"
                : `
                        <s>Change Outfit</s>
                        <div style="font: italic 5vmin serif;">
                            Not enough gold!
                        </div>
                    `
            }
        </div>

        <div onclick="$(${
          state.Gold > 998 ? 13 : 3 /* Spend money and GoToTown */
        });" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            ${state.Gold > 998 ? "Confirm - 999$" : "Close"}
        </div>
    `;
  }

  function Victory() {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
        ">
            WELL DONE
        </div>

        <div onclick="$(${1 /* CompleteBounty */});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Collect Bounty
        </div>
    `;
  }

  function Wanted(state) {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
            color: #222;
        ">
            WANTED
            <div style="font-size: 7vmin;">
                REWARD $${state.ChallengeLevel},000
            </div>
        </div>
        <div onclick="$(${3 /* GoToTown */});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Accept Quest
        </div>
    `;
  }

  function App(state) {
    if (state.WorldFunc == world_intro) {
      return Intro();
    }
    if (state.WorldFunc == world_store) {
      return Store(state);
    }
    if (state.WorldFunc == world_wanted) {
      return Wanted(state);
    }
    if (state.PlayerState == 1 /* Victory */) {
      return Victory();
    }
    if (state.PlayerState == 2 /* Defeat */) {
      return Defeat(state);
    }
    return Playing(state);
  }

  let prev;
  function sys_ui(game, delta) {
    let next = App(game);
    if (next !== prev) {
      game.UI.innerHTML = prev = next;
    }
  }

  var _a,
    _b,
    _c,
    _d,
    _e,
    _f,
    _g,
    _h,
    _j,
    _k,
    _l,
    _m,
    _o,
    _p,
    _q,
    _r,
    _s,
    _t,
    _u,
    _v,
    _w,
    _x,
    _y;
  const MAX_ENTITIES = 10000;
  class Game {
    constructor() {
      this.Grid = [];
      this[_a] = [];
      this[_b] = [];
      this[_c] = [];
      this[_d] = [];
      this[_e] = [];
      this[_f] = [];
      this[_g] = [];
      this[_h] = [];
      this[_j] = [];
      this[_k] = [];
      this[_l] = [];
      this[_m] = [];
      this[_o] = [];
      this[_p] = [];
      this[_q] = [];
      this[_r] = [];
      this[_s] = [];
      this[_t] = [];
      this[_u] = [];
      this[_v] = [];
      this[_w] = [];
      this[_x] = [];
      this[_y] = [];
      this.Audio = new AudioContext();
      this.UI = document.querySelector("main");
      this.Input = {
        mx: 0,
        my: 0,
      };
      this.WorldFunc = world_intro;
      // Today's timestamp. Changes every midnight, 00:00 UTC.
      this.ChallengeSeed = ~~(Date.now() / (24 * 60 * 60 * 1000));
      this.PlayerSeed = this.ChallengeSeed;
      this.ChallengeLevel = 1;
      this.BountySeed = 0;
      this.PlayerState = 0 /* Playing */;
      this.Gold = parseInt(window.localStorage.getItem("gold") ?? 0, 10);
      this.MonetizationEnabled = true;
      this.Models = [];
      this.Palette = palette;
      this.RAF = 0;
      this.World = [];
      document.addEventListener("visibilitychange", () =>
        document.hidden ? this.Stop() : this.Start(),
      );
      this.Canvas3 = document.querySelector("canvas");
      this.Canvas2 = document.querySelector("canvas + canvas");
      this.Canvas3.width = this.Canvas2.width = window.innerWidth;
      this.Canvas3.height = this.Canvas2.height = window.innerHeight;
      this.GL = this.Canvas3.getContext("webgl2");
      this.Context = this.Canvas2.getContext("2d");
      for (let name in this.GL) {
        // @ts-ignore
        if (typeof this.GL[name] == "function") {
          // @ts-ignore
          this.GL[name.match(/^..|[A-Z]|([1-9].*)/g).join("")] = this.GL[name];
        }
      }
      this.UI.addEventListener("contextmenu", (evt) => evt.preventDefault());
      this.UI.addEventListener("mousedown", (evt) => {
        this.Input[`d${evt.button}`] = 1;
      });
      this.UI.addEventListener("mousemove", (evt) => {
        this.Input.mx = evt.offsetX;
        this.Input.my = evt.offsetY;
      });
      this.GL.enable(GL_DEPTH_TEST);
      this.GL.enable(GL_CULL_FACE);
      this.MaterialWireframe = mat_wireframe(this.GL);
      this.MaterialInstanced = mat_instanced(this.GL);
      this.MaterialParticles = mat_particles(this.GL);
    }
    CreateEntity(mask = 0) {
      for (let i = 0; i < MAX_ENTITIES; i++) {
        if (!this.World[i]) {
          this.World[i] = mask;
          return i;
        }
      }
      throw new Error("No more entities available.");
    }
    Update(delta) {
      let cpu = performance.now();
      sys_lifespan(this, delta);
      // Player input and AI.
      sys_select(this);
      sys_control_player(this);
      sys_control_ai(this, delta);
      sys_control_projectile(this);
      // Game logic.
      sys_navigate(this);
      sys_aim(this);
      sys_particles(this, delta);
      sys_shake(this, delta);
      // Animation and movement.
      sys_animate(this, delta);
      sys_move(this, delta);
      sys_transform(this);
      // Post-transform logic.
      sys_collide(this);
      sys_trigger(this);
      sys_shoot(this);
      sys_health(this);
      sys_mimic(this);
      sys_cull(this);
      sys_audio(this, delta);
      sys_camera(this);
      // CPU Performance.
      sys_performance(
        this,
        performance.now() - cpu,
        document.querySelector("#cpu"),
      );
      let gpu = performance.now();
      sys_render(this);
      sys_draw(this);
      sys_ui(this);
      // GPU Performance.
      sys_performance(
        this,
        performance.now() - gpu,
        document.querySelector("#gpu"),
      );
      sys_framerate(this, delta);
      this.Input.d0 = 0;
      this.Input.d2 = 0;
    }
    Start() {
      let last = performance.now();
      let tick = (now) => {
        let delta = (now - last) / 1000;
        this.Update(delta);
        last = now;
        this.RAF = requestAnimationFrame(tick);
      };
      this.Stop();
      this.Audio.resume();
      tick(last);
    }
    Stop() {
      this.Audio.suspend();
      cancelAnimationFrame(this.RAF);
    }
    Add({ Translation, Rotation, Scale, Using = [], Children = [] }) {
      let entity = this.CreateEntity(0 /* Transform */);
      transform(Translation, Rotation, Scale)(this, entity);
      for (let mixin of Using) {
        mixin(this, entity);
      }
      let entity_transform = this[0 /* Transform */][entity];
      for (let subtree of Children) {
        let child = this.Add(subtree);
        let child_transform = this[0 /* Transform */][child];
        child_transform.Parent = entity_transform;
        entity_transform.Children.push(child_transform);
      }
      return entity;
    }
    Destroy(entity) {
      let mask = this.World[entity];
      if (mask & 1 /* Transform */) {
        for (let child of this[0 /* Transform */][entity].Children) {
          this.Destroy(child.EntityId);
        }
      }
      this.World[entity] = 0;
    }
  }
  (_a = 0) /* Transform */,
    (_b = 1) /* Render */,
    (_c = 2) /* Draw */,
    (_d = 3) /* Camera */,
    (_e = 4) /* Light */,
    (_f = 5) /* AudioSource */,
    (_g = 6) /* Animate */,
    (_h = 7) /* Move */,
    (_j = 8) /* Collide */,
    (_k = 9) /* Trigger */,
    (_l = 10) /* Navigable */,
    (_m = 11) /* Select */,
    (_o = 12) /* Shoot */,
    (_p = 13) /* PlayerControl */,
    (_q = 14) /* Health */,
    (_r = 15) /* Mimic */,
    (_s = 16) /* EmitParticles */,
    (_t = 17) /* Cull */,
    (_u = 18) /* Walking */,
    (_v = 19) /* NPC */,
    (_w = 20) /* Projectile */,
    (_x = 21) /* Shake */,
    (_y = 22) /* Lifespan */;

  function load(path) {
    return fetch(path)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        let buffer_array = new Uint16Array(buffer);
        let model_data = [];
        let i = 0;
        while (i < buffer_array.length) {
          let Size = [0, 0, 0];
          let model_start = i + 1;
          let model_length = buffer_array[i];
          let model_end = model_start + model_length;
          let model = [];
          for (i = model_start; i < model_end; i++) {
            let voxel = buffer_array[i];
            model.push(
              (voxel & 15) >> 0,
              (voxel & 240) >> 4,
              (voxel & 3840) >> 8,
              (voxel & 61440) >> 12,
            );
          }
          for (let j = 0; j < model.length; j++) {
            if (Size[j % 4] < model[j] + 1) {
              Size[j % 4] = model[j] + 1;
            }
          }
          model_data.push(
            new Float32Array(model).map((val, idx) => {
              switch (idx % 4) {
                case 0:
                  return val - Size[0] / 2 + 0.5;
                case 1:
                  return val - Size[1] / 2 + 0.5;
                case 2:
                  return val - Size[2] / 2 + 0.5;
                default:
                  return val;
              }
            }),
          );
        }
        return model_data;
      });
  }

  let game = new Game();
  // @ts-ignore
  window.$ = (...args) => dispatch(game, ...args);
  // @ts-ignore
  window.game = game;
  load("./app/models.tfu").then((models) => {
    game.Models = models;
    world_intro(game);
    game.Start();
  });
})();
