(function () {
  "use strict";
  var e = Math.abs,
    t = Math.atan2,
    n = Math.sin;
  function i(e, t) {
    return (n, i) => {
      (n.World[i] |= 4), (n[2][i] = { Widget: e, Arg: t });
    };
  }
  function a(e = 1 / 0) {
    return (t, n) => {
      (t.World[n] |= 4194304), (t[22][n] = { Max: e, Age: 0 });
    };
  }
  function r(e) {
    Qt = 198706 * e;
  }
  function o() {
    return (Qt = (16807 * Qt) % 2147483647), (Qt - 1) / 2147483646;
  }
  function l(e = 0, t = 1) {
    return ~~(o() * (t - e + 1) + e);
  }
  function s(e) {
    return e[l(0, e.length - 1)];
  }
  function d(e) {
    return e ** 3;
  }
  function m(e) {
    return 1 - (1 - e) ** 4;
  }
  function y(e, t, n, i) {
    let a = e[2][t].Arg,
      r = e[22][t],
      o = r.Age / r.Max;
    (e.Context.font = `${a / 125 + 1}vmin Impact`),
      (e.Context.textAlign = "center"),
      (e.Context.fillStyle = `rgba(255,232,198,${m(1 - o)})`),
      e.Context.fillText(a.toFixed(0), n, i - 50 - (m(o) * a) / 5);
  }
  function g(e, t, n, i) {
    let a = e[2][t].Arg,
      r = e[22][t],
      o = r.Age / r.Max;
    (e.Context.font = "10vmin Impact"),
      (e.Context.fillStyle = `rgba(255,255,0,${m(1 - o)})`),
      e.Context.fillText(
        `+ $${a.toLocaleString("en")}`,
        n + 100,
        i - 150 * m(o),
      );
  }
  function u(e, t, n, i) {
    let a = e[22][t],
      r = 0.4 * d(1 - a.Age / a.Max);
    (e.Context.fillStyle = `rgba(255,79,79,${r})`),
      e.Context.fillRect(0, 0, e.Canvas2.width, e.Canvas2.height);
  }
  function T(e) {
    return (t, n) => {
      (t.World[n] |= 131072), (t[17][n] = { Mask: e });
    };
  }
  function f(e, t) {
    return (n, i) => {
      let a = n.GL.createVertexArray();
      n.GL.bindVertexArray(a),
        n.GL.bindBuffer(on, n.GL.createBuffer()),
        n.GL.bufferData(on, Zt.Vertices, an),
        n.GL.enableVertexAttribArray(1),
        n.GL.vertexAttribPointer(1, 3, un, !1, 0, 0),
        n.GL.bindBuffer(on, n.GL.createBuffer()),
        n.GL.bufferData(on, Zt.Normals, an),
        n.GL.enableVertexAttribArray(2),
        n.GL.vertexAttribPointer(2, 3, un, !1, 0, 0),
        n.GL.bindBuffer(on, n.GL.createBuffer()),
        n.GL.bufferData(on, e, an),
        n.GL.enableVertexAttribArray(3),
        n.GL.vertexAttribPointer(3, 4, un, !1, 0, 0),
        n.GL.vertexAttribDivisor(3, 1),
        n.GL.bindBuffer(ln, n.GL.createBuffer()),
        n.GL.bufferData(ln, Zt.Indices, an),
        n.GL.bindVertexArray(null),
        (n.World[i] |= 2),
        (n[1][i] = {
          Kind: 1,
          Material: n.MaterialInstanced,
          VAO: a,
          IndexCount: Zt.Indices.length,
          InstanceCount: e.length / 4,
          Palette: t,
        });
    };
  }
  function h() {
    let e = new Float32Array(16);
    return (e[0] = 1), (e[5] = 1), (e[10] = 1), (e[15] = 1), e;
  }
  function c(e, t) {
    let n = t[0],
      i = t[1],
      a = t[2],
      r = t[3],
      o = t[4],
      l = t[5],
      s = t[6],
      d = t[7],
      m = t[8],
      y = t[9],
      g = t[10],
      u = t[11],
      T = t[12],
      f = t[13],
      h = t[14],
      c = t[15],
      C = n * l - i * o,
      p = n * s - a * o,
      W = n * d - r * o,
      G = i * s - a * l,
      U = i * d - r * l,
      x = a * d - r * s,
      A = m * f - y * T,
      L = m * h - g * T,
      S = m * c - u * T,
      R = y * h - g * f,
      I = y * c - u * f,
      M = g * c - u * h,
      v = C * M - p * I + W * R + G * S - U * L + x * A;
    return v
      ? ((v = 1 / v),
        (e[0] = (l * M - s * I + d * R) * v),
        (e[1] = (a * I - i * M - r * R) * v),
        (e[2] = (f * x - h * U + c * G) * v),
        (e[3] = (g * U - y * x - u * G) * v),
        (e[4] = (s * S - o * M - d * L) * v),
        (e[5] = (n * M - a * S + r * L) * v),
        (e[6] = (h * W - T * x - c * p) * v),
        (e[7] = (m * x - g * W + u * p) * v),
        (e[8] = (o * I - l * S + d * A) * v),
        (e[9] = (i * S - n * I - r * A) * v),
        (e[10] = (T * U - f * W + c * C) * v),
        (e[11] = (y * W - m * U - u * C) * v),
        (e[12] = (l * L - o * R - s * A) * v),
        (e[13] = (n * R - i * L + a * A) * v),
        (e[14] = (f * p - T * G - h * C) * v),
        (e[15] = (m * G - y * p + g * C) * v),
        e)
      : null;
  }
  function C(e, t, n) {
    let i = t[0],
      a = t[1],
      r = t[2],
      o = t[3],
      l = t[4],
      s = t[5],
      d = t[6],
      m = t[7],
      y = t[8],
      g = t[9],
      u = t[10],
      T = t[11],
      f = t[12],
      h = t[13],
      c = t[14],
      C = t[15],
      p = n[0],
      W = n[1],
      G = n[2],
      U = n[3];
    return (
      (e[0] = p * i + W * l + G * y + U * f),
      (e[1] = p * a + W * s + G * g + U * h),
      (e[2] = p * r + W * d + G * u + U * c),
      (e[3] = p * o + W * m + G * T + U * C),
      (p = n[4]),
      (W = n[5]),
      (G = n[6]),
      (U = n[7]),
      (e[4] = p * i + W * l + G * y + U * f),
      (e[5] = p * a + W * s + G * g + U * h),
      (e[6] = p * r + W * d + G * u + U * c),
      (e[7] = p * o + W * m + G * T + U * C),
      (p = n[8]),
      (W = n[9]),
      (G = n[10]),
      (U = n[11]),
      (e[8] = p * i + W * l + G * y + U * f),
      (e[9] = p * a + W * s + G * g + U * h),
      (e[10] = p * r + W * d + G * u + U * c),
      (e[11] = p * o + W * m + G * T + U * C),
      (p = n[12]),
      (W = n[13]),
      (G = n[14]),
      (U = n[15]),
      (e[12] = p * i + W * l + G * y + U * f),
      (e[13] = p * a + W * s + G * g + U * h),
      (e[14] = p * r + W * d + G * u + U * c),
      (e[15] = p * o + W * m + G * T + U * C),
      e
    );
  }
  function p(e, t, n, i) {
    let a = t[0],
      r = t[1],
      o = t[2],
      l = t[3],
      s = a + a,
      d = r + r,
      m = o + o,
      y = a * s,
      g = a * d,
      u = a * m,
      T = r * d,
      f = r * m,
      h = o * m,
      c = l * s,
      C = l * d,
      p = l * m,
      W = i[0],
      G = i[1],
      U = i[2];
    return (
      (e[0] = (1 - (T + h)) * W),
      (e[1] = (g + p) * W),
      (e[2] = (u - C) * W),
      (e[3] = 0),
      (e[4] = (g - p) * G),
      (e[5] = (1 - (y + h)) * G),
      (e[6] = (f + c) * G),
      (e[7] = 0),
      (e[8] = (u + C) * U),
      (e[9] = (f - c) * U),
      (e[10] = (1 - (y + T)) * U),
      (e[11] = 0),
      (e[12] = n[0]),
      (e[13] = n[1]),
      (e[14] = n[2]),
      (e[15] = 1),
      e
    );
  }
  function W(e, t, n, i, a, r, o) {
    let l = 1 / (a - n),
      s = 1 / (i - t),
      d = 1 / (r - o);
    return (
      (e[0] = -2 * l),
      (e[1] = 0),
      (e[2] = 0),
      (e[3] = 0),
      (e[4] = 0),
      (e[5] = -2 * s),
      (e[6] = 0),
      (e[7] = 0),
      (e[8] = 0),
      (e[9] = 0),
      (e[10] = 2 * d),
      (e[11] = 0),
      (e[12] = (a + n) * l),
      (e[13] = (t + i) * s),
      (e[14] = (o + r) * d),
      (e[15] = 1),
      e
    );
  }
  function G(e, t) {
    return (e[0] = t[8]), (e[1] = t[9]), (e[2] = t[10]), R(e, e);
  }
  function U(e, t) {
    return (e[0] = t[12]), (e[1] = t[13]), (e[2] = t[14]), e;
  }
  function A(e, t, n) {
    return (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), (e[2] = t[2] + n[2]), e;
  }
  function L(e, t, n) {
    return (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), (e[2] = t[2] - n[2]), e;
  }
  function S(e, t, n) {
    return (e[0] = t[0] * n), (e[1] = t[1] * n), (e[2] = t[2] * n), e;
  }
  function R(e, t) {
    var n = Math.sqrt;
    let i = t[0],
      a = t[1],
      r = t[2],
      o = i * i + a * a + r * r;
    return (
      0 < o && (o = 1 / n(o)),
      (e[0] = t[0] * o),
      (e[1] = t[1] * o),
      (e[2] = t[2] * o),
      e
    );
  }
  function I(e, t, n) {
    let i = t[0],
      a = t[1],
      r = t[2],
      o = n[3] * i + n[7] * a + n[11] * r + n[15];
    return (
      (o = o || 1),
      (e[0] = (n[0] * i + n[4] * a + n[8] * r + n[12]) / o),
      (e[1] = (n[1] * i + n[5] * a + n[9] * r + n[13]) / o),
      (e[2] = (n[2] * i + n[6] * a + n[10] * r + n[14]) / o),
      e
    );
  }
  function M(e) {
    let t = e[0],
      n = e[1],
      i = e[2];
    return Math.hypot(t, n, i);
  }
  function v(e, n, i, a) {
    let t = n[0],
      r = n[1],
      o = n[2];
    return (
      (e[0] = t + a * (i[0] - t)),
      (e[1] = r + a * (i[1] - r)),
      (e[2] = o + a * (i[2] - o)),
      e
    );
  }
  function P(e, t, n) {
    let i = t[0],
      a = t[1],
      r = t[2],
      o = t[3],
      l = n[0],
      s = n[1],
      d = n[2],
      m = n[3];
    return (
      (e[0] = i * m + o * l + a * d - r * s),
      (e[1] = a * m + o * s + r * l - i * d),
      (e[2] = r * m + o * d + i * s - a * l),
      (e[3] = o * m - i * l - a * s - r * d),
      e
    );
  }
  function D(e, t, i, a) {
    var r = Math.cos,
      o = Math.PI;
    let l = (0.5 * o) / 180;
    (t *= l), (i *= l), (a *= l);
    let s = n(t),
      d = r(t),
      m = n(i),
      g = r(i),
      u = n(a),
      T = r(a);
    return (
      (e[0] = s * g * T - d * m * u),
      (e[1] = d * m * T + s * g * u),
      (e[2] = d * g * u - s * m * T),
      (e[3] = d * g * T + s * m * u),
      e
    );
  }
  function Y(e, i, a, r) {
    var t = Math.acos;
    let o,
      l,
      s,
      d,
      m,
      y = i[0],
      g = i[1],
      u = i[2],
      T = i[3],
      f = a[0],
      h = a[1],
      c = a[2],
      C = a[3];
    return (
      (l = y * f + g * h + u * c + T * C),
      0 > l && ((l = -l), (f = -f), (h = -h), (c = -c), (C = -C)),
      1 - l > Tn
        ? ((o = t(l)), (s = n(o)), (d = n((1 - r) * o) / s), (m = n(r * o) / s))
        : ((d = 1 - r), (m = r)),
      (e[0] = d * y + m * f),
      (e[1] = d * g + m * h),
      (e[2] = d * u + m * c),
      (e[3] = d * T + m * C),
      e
    );
  }
  function b(e, t) {
    let n = [];
    for (let i = 0; i < e; i++)
      for (let a = 0; a < e; a++)
        n.push(i - e / 2 + 0.5, 0.5, a - e / 2 + 0.5, 0.01 < o() ? t[0] : t[1]);
    return Float32Array.from(n);
  }
  function E(e, t) {
    let n = [];
    for (let i = 0; i < e; i++)
      for (let a = 0; a < e; a++)
        for (let r = 0; r < t; r++)
          n.push(
            i - e / 2 + 0.5,
            r - e / 2 + 0.5,
            a - e / 2 + 0.5,
            0.4 < o() ? 7 : 8,
          );
    return Float32Array.from(n);
  }
  function X(e, t, n) {
    let a = M(L([], e, t)),
      r = 1 / a,
      o = [];
    for (let l = 0; l < a; l++) o = o.concat([...v([], e, t, r * l), n]);
    return o;
  }
  function F(e) {
    let t = [...fn, ...s(hn)],
      n = 0.4 < o(),
      i = 0.4 < o(),
      a = 20 + 8 * l(),
      r = 30 + 8 * l(0, 5),
      d = 15 + l(0, 9),
      m = 8,
      g = [],
      u = [];
    for (let t = 1; t < a; t++)
      g.push(...X([t, 0, r - 1], [t, d, r - 1], t % 2 ? 9 : 10));
    for (let t = 1; t < r; t++)
      g.push(...X([a, 0, t], [a, d * (n ? 1.5 : 1), t], t % 2 ? 9 : 10)),
        g.push(...X([0, d, t], [a + 1, d, t], 1));
    for (let t = -1; t < a + 3 + m; t++)
      g.push(...X([t - 1, 0, 0], [t - 1, 0, r + 2], 1));
    if (i && n) {
      let t = 5,
        n = 4;
      for (let i = t; i < r - t - 1; i += 15)
        u.push({
          Rotation: D([], 0, 180 * l(0, 2), 0),
          Translation: [a + 1, d + n / 2, r - i - t / 2],
          Using: [f(e.Models[6]), T(2)],
        });
    } else {
      let e = 5 + l(0, 2),
        t = ~~(0.75 * r),
        i = ~~((r - t) / 2);
      for (let r = 2; r < t; r++)
        for (let l = 0; l < e; l++)
          g.push(
            a + 1,
            ~~(d * (n ? 1.5 : 1)) + l - ~~(e / 2),
            i + r,
            0.4 < o() || 2 == r || r == t - 1 || 0 == l || l == e - 1 ? 1 : 2,
          );
    }
    for (let t = 0; t < m; t++)
      g.push(...X([a + t + 1, 0.75 * d, 1], [a + t + 1, 0.75 * d, r + 1], 1));
    g.push(
      ...X([a + m, 0, 1], [a + m, 0.75 * d, 1], 1),
      ...X([a + m, 0, r], [a + m, 0.75 * d, r], 1),
    );
    let h = 3;
    g.push(...X([a + m, 3, 1], [a + m, 3, r], 1));
    for (let t = 1; t < r; t += 2)
      g.push(...X([a + m, 0, t], [a + m, 5, t], 1));
    let c = 8,
      C = 8;
    for (let t = 0; t < C; t++)
      g.push(...X([a + 1, 0, r - t - 8], [a + 1, c, r - t - 8], 1));
    return {
      Blueprint: {
        Translation: [0, 1.5, 0],
        Using: [f(Float32Array.from(g), t)],
        Children: u,
      },
      Size_x: a + 3 + m + 1,
      Size_z: r + 2,
    };
  }
  function w(e) {
    return (t, n) => {
      let i = {};
      for (let a in e) {
        let { Keyframes: t, Flags: n = 7 } = e[a],
          r = t[t.length - 1].Timestamp;
        i[a] = {
          Keyframes: t.map((e) => ({ ...e })),
          Flags: n,
          Duration: r,
          Time: 0,
        };
      }
      (t.World[n] |= 64), (t[6][n] = { States: i, Current: i[1] });
    };
  }
  function B(e) {
    return {
      Rotation: D([], 270, 0, 0),
      Translation: [0, -3, 0],
      Using: [f(e.Models[4])],
    };
  }
  function V(e) {
    let t = cn.slice();
    t.splice(6, 3, ...s(Cn)), t.splice(9, 3, ...s(pn));
    let n = 2 * l(2, 3),
      a = 2 * l(Math.max(2, n / 2), 5),
      r = l(1, 3),
      d = 2,
      m = 1 < r,
      y = 0.4 < o(),
      g = [];
    for (let t = 0; t < n; t++)
      g.push(
        ...X(
          [-a / 2 + 0.5, 0, -n / 2 + t + 0.5],
          [a / 2 + 0.5, 0, -n / 2 + t + 0.5],
          2,
        ),
      );
    y &&
      g.push(
        ...X([a / 2 - 0.5, 1, -n / 2 + 0.5], [a / 2 - 0.5, 1, n / 2 + 0.5], 2),
        ...X(
          [-a / 2 + 0.5, 1, -n / 2 + 0.5],
          [-a / 2 + 0.5, 1, n / 2 + 0.5],
          2,
        ),
      );
    for (let t = 0; t < r; t++)
      for (let e = 0; e < d; e++)
        g.push(
          ...X(
            [-d / 2 + 0.5, t + 1, -d / 2 + e + 0.5],
            [d / 2 + 0.5, t + 1, -d / 2 + e + 0.5],
            m && 0 == t ? 3 : 2,
          ),
        );
    return {
      Translation: [0, 3, 0],
      Children: [
        {
          Using: [
            f(Float32Array.from(g), t),
            w({
              [1]: { Keyframes: [{ Timestamp: 0 }] },
              [4]: {
                Keyframes: [
                  { Timestamp: 0, Translation: [0, 0, 0] },
                  { Timestamp: 0.1, Translation: [0, 2, 0] },
                  { Timestamp: 0.2, Translation: [0, 0, 0] },
                ],
                Flags: 0,
              },
              [6]: {
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
                Flags: 0,
              },
            }),
          ],
        },
      ],
    };
  }
  function _(e) {
    let t = V(),
      n = cn.slice();
    return (
      n.splice(0, 3, ...s(Wn)),
      n.splice(3, 3, ...s(xn)),
      n.splice(12, 3, ...s(Gn)),
      n.splice(15, 3, ...s(Un)),
      {
        Rotation: [0, 1, 0, 0],
        Using: [
          w({
            [1]: { Keyframes: [{ Timestamp: 0 }] },
            [5]: {
              Keyframes: [
                {
                  Timestamp: 0,
                  Translation: [0, 1, 0],
                  Rotation: [0, 1, 0, 0],
                },
                {
                  Timestamp: 1,
                  Translation: [0, -4, 0],
                  Rotation: D([], -90, 0, 0),
                  Ease: m,
                },
                { Timestamp: 5, Translation: [0, -9, 0] },
              ],
              Flags: 0,
            },
          }),
        ],
        Children: [
          { Translation: [1.5, 0, -5] },
          {
            Using: [
              f(e.Models[0], n),
              w({
                [1]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 0, 5, 0) },
                    { Timestamp: 0.5, Rotation: D([], 0, -5, 0) },
                  ],
                },
                [2]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 0, 5, 0) },
                    { Timestamp: 0.2, Rotation: D([], 0, -5, 0) },
                  ],
                },
              }),
            ],
            Children: [t],
          },
          {
            Translation: [1.5, 0, 0.5],
            Using: [
              w({
                [1]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 5, 0, 0) },
                    { Timestamp: 0.5, Rotation: D([], -5, 0, 0) },
                  ],
                },
                [2]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 60, 0, 0) },
                    { Timestamp: 0.2, Rotation: D([], -30, 0, 0) },
                  ],
                },
                [3]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 50, 0, 0) },
                    { Timestamp: 0.1, Rotation: D([], 90, 0, 0), Ease: m },
                    { Timestamp: 0.13, Rotation: D([], 110, 0, 0) },
                    { Timestamp: 0.3, Rotation: D([], 0, 0, 0), Ease: m },
                  ],
                  Flags: 0,
                },
              }),
            ],
            Children: [
              { Translation: [0, -1, 0], Using: [f(e.Models[3], n)] },
              B(e),
            ],
          },
          {
            Translation: [-1.5, 0, 0.5],
            Using: [
              w({
                [1]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], -5, 0, 0) },
                    { Timestamp: 0.5, Rotation: D([], 5, 0, 0) },
                  ],
                },
                [2]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], -30, 0, 0) },
                    { Timestamp: 0.2, Rotation: D([], 60, 0, 0) },
                  ],
                },
              }),
            ],
            Children: [{ Translation: [0, -1, 0], Using: [f(e.Models[3], n)] }],
          },
          {
            Translation: [0.5, -2, 0.5],
            Using: [
              w({
                [1]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 5, 0, 0) },
                    { Timestamp: 1, Rotation: D([], 5, 0, 0) },
                  ],
                },
                [2]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], -45, 0, 0) },
                    { Timestamp: 0.2, Rotation: D([], 45, 0, 0) },
                  ],
                },
              }),
            ],
            Children: [
              { Translation: [0, -1.5, 0], Using: [f(e.Models[2], n)] },
            ],
          },
          {
            Translation: [-0.5, -2, 0.5],
            Using: [
              w({
                [1]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], -5, 0, 0) },
                    { Timestamp: 1, Rotation: D([], -5, 0, 0) },
                  ],
                },
                [2]: {
                  Keyframes: [
                    { Timestamp: 0, Rotation: D([], 45, 0, 0) },
                    { Timestamp: 0.2, Rotation: D([], -45, 0, 0) },
                  ],
                },
              }),
            ],
            Children: [
              { Translation: [0, -1.5, 0], Using: [f(e.Models[2], n)] },
            ],
          },
        ],
      }
    );
  }
  function K(e) {
    return (t, n) => {
      (t.World[n] |= 32), (t[5][n] = { Idle: e, Time: 0 });
    };
  }
  function N(e = !0, t = [1, 1, 1], n = 1) {
    return (i, a) => {
      (i.World[a] |= 256),
        (i[8][a] = {
          EntityId: a,
          New: !0,
          Dynamic: e,
          Size: t,
          Min: [0, 0, 0],
          Max: [0, 0, 0],
          Collisions: [],
          Flags: n,
        });
    };
  }
  function q(e, t) {
    return (n, i) => {
      (n.World[i] |= 1024), (n[10][i] = { X: e, Y: t });
    };
  }
  function z(e, { X: t, Y: n }) {
    for (let a = 0; a < e.World.length; a++)
      if (1024 & e.World[a] && e[10][a].X == t && e[10][a].Y == n) return a;
    throw `No entity with coords ${t}, ${n}.`;
  }
  function k(e) {
    let t = e.Models[1];
    return { Translation: [0, l(2, 5) + 0.5, 0], Using: [f(t), T(2)] };
  }
  function j(e, t) {
    return (n, i) => {
      (n.World[i] |= 65536),
        (n[16][i] = { Lifespan: e, Frequency: t, Instances: [], SinceLast: 0 });
    };
  }
  function H(e = [1, 1, 1], t = 1) {
    return (n, i) => {
      (n.World[i] |= 16), (n[4][i] = [...e, t ** 2]);
    };
  }
  function O(e, t) {
    return (n, i) => {
      (n.World[i] |= 2),
        (n[1][i] = {
          Kind: 2,
          Material: n.MaterialParticles,
          Buffer: n.GL.createBuffer(),
          ColorSize: [...e, t],
        });
    };
  }
  function $(e = 0) {
    return (t, n) => {
      (t.World[n] |= 2097152), (t[21][n] = { Duration: e });
    };
  }
  function Q(e) {
    return (t, n) => {
      (t.World[n] |= 512), (t[9][n] = { Action: e });
    };
  }
  function J(e) {
    return {
      Translation: [0, 1.5, 0],
      Using: [f(e.Models[5]), T(2)],
      Children: [
        {
          Using: [N(!1, [15, 15, 15]), Q(12), T(768)],
          Children: [
            { Using: [$(1 / 0), j(2, 0.1), O([1, 0, 0], 15), T(2162690)] },
            { Translation: [0, 3, 0], Using: [H([1, 0.5, 0], 3), T(16)] },
          ],
        },
      ],
    };
  }
  function Z(e) {
    return {
      Translation: [0, 1.5, 0],
      Rotation: D([], 0, 90 * l(0, 3), 0),
      Using: [
        f(Float32Array.from(X([-1, 0, 0], [1, 0, 0], 4)), fn),
        N(!1, [4, 4, 4]),
        Q(10),
        K(),
        T(802),
      ],
      Children: [{ Translation: [0, 3, 0], Using: [H([1, 1, 0], 3), T(16)] }],
    };
  }
  function ee(e) {
    let t = te();
    return {
      Translation: [0, 1.5, 0],
      Rotation: D([], 0, 90 * l(0, 3), 0),
      Using: [f(t, fn), T(2)],
    };
  }
  function te() {
    let e = l(1, 4),
      t = [];
    for (let n, i = 0; i < e; i++) (n = l(-1, 1)), t.push(i, 0, n, 0);
    return Float32Array.from(t);
  }
  function ne(e) {
    let t = e.Models[7];
    return {
      Translation: [0.1, l(0, 2) + 0.1, 0.1],
      Rotation: D([], 90 * l(0, 3), 90 * l(0, 3), 90 * l(0, 3)),
      Using: [f(t), T(2)],
    };
  }
  function ie(e, t, n = 0, i = 0, a = !0, r = [5, 6]) {
    let s = b(8, r),
      d = {
        Using: [
          f(s, fn),
          T(2),
          K(),
          w({
            [1]: { Keyframes: [{ Timestamp: 0, Translation: [0, 0, 0] }] },
            [6]: {
              Keyframes: [
                { Timestamp: 0, Translation: [0, 0, 0] },
                { Timestamp: 0.1, Translation: [0, -0.5, 0] },
                { Timestamp: 0.2, Translation: [0, 0, 0] },
              ],
              Flags: 0,
            },
          }),
        ],
        Children: [],
      };
    return (
      t
        ? 0.85 < o()
          ? d.Children.push(ee())
          : a && 0.01 > o() && d.Children.push(Z())
        : d.Children.push(0.5 < o() ? k(e) : 0.01 < o() ? ne(e) : J(e)),
      {
        Rotation: D([], 0, 90 * l(0, 3), 0),
        Translation: [0, 0, 0],
        Using: [N(!1, [8, 1, 8], t ? 4 : 1), T(256), q(n, i)],
        Children: [d],
      }
    );
  }
  function ae(e, t, n) {
    return (i, a) => {
      let r = W(
        h(),
        e,
        e * (i.Canvas3.width / i.Canvas3.height),
        -e,
        -e * (i.Canvas3.width / i.Canvas3.height),
        t,
        n,
      );
      (i.World[a] |= 8),
        (i[3][a] = {
          EntityId: a,
          Projection: r,
          Unproject: c([], r),
          View: h(),
          PV: h(),
        });
    };
  }
  function re(e) {
    return (t, n) => {
      (t.World[n] |= 32768), (t[15][n] = { Target: e });
    };
  }
  function oe() {
    return (e, t) => {
      (e.World[t] |= 2048), (e[11][t] = { Position: [] });
    };
  }
  function le(e) {
    return {
      Translation: [0, 200, 0],
      Using: [re(e)],
      Children: [
        {
          Translation: [50, 50, 50],
          Rotation: [-0.28, 0.364, 0.116, 0.88],
          Children: [{ Using: [ae(25, 1, 500), oe(), $()] }],
        },
      ],
    };
  }
  function se(e) {
    let t = 26,
      n = 6,
      a = 14,
      r = [...X([-2, 2, 0], [-2, 2, 52], 8), ...X([2, 2, 0], [2, 2, 52], 8)];
    for (let o = 0; o < t; o++)
      r.push(
        ...X([-n, 0, o], [-n, a, o], o % 2 ? 1 : 0),
        ...X([n, 0, o], [n, a, o], o % 2 ? 1 : 0),
        ...X([-n, a, o], [n, a, o], o % 2 ? 0 : 1),
      );
    for (let t = 0; t < 52; t += 2) r.push(...X([-4, 1, t], [4, 1, t], 0));
    return {
      Children: [
        { ...ne(e), Scale: [4, 4, 4] },
        { Translation: [4, 0, 0], Using: [f(Float32Array.from(r), fn)] },
        { Translation: [0, 0, 18], Using: [N(!1, [8, 8, 8]), Q(7)] },
      ],
    };
  }
  function de() {
    return (e, t) => {
      (e.World[t] |= 8192), (e[13][t] = {});
    };
  }
  function me(e) {
    return (t, n) => {
      (t.World[n] |= 16384), (t[14][n] = { Max: e, Current: e });
    };
  }
  function ye(e = 3.5, t = 0.5) {
    return (n, i) => {
      (n.World[i] |= 128), (n[7][i] = { MoveSpeed: e, RotateSpeed: t });
    };
  }
  function ge(e = !0, t = !1) {
    return (n, i) => {
      (n.World[i] |= 524288),
        (n[19][i] = { Friendly: e, Bounty: t, LastShot: 0 });
    };
  }
  function ue() {
    return (e, t) => {
      (e.World[t] |= 4096), (e[12][t] = { Target: null });
    };
  }
  function Te(e = 0, t = 0) {
    return (n, i) => {
      (n.World[i] |= 262144),
        (n[18][i] = {
          X: e,
          Y: t,
          Destination: null,
          Route: [],
          DestinationX: 0,
          DestinationY: 0,
        });
    };
  }
  function fe(e, t, n, i) {
    let a = e[0][t].Parent.EntityId,
      r = e[14][a],
      o = 0.01 * e.Canvas2.height;
    8192 & e.World[a]
      ? (e.Context.fillStyle = "#0f0")
      : 524288 & e.World[a] && e[19][a].Bounty
      ? ((e.Context.fillStyle = "#ff0"), (o *= 2))
      : (e.Context.fillStyle = "#f00"),
      e.Context.fillRect(
        n - 0.05 * e.Canvas2.width,
        i,
        (0.1 * e.Canvas2.width * r.Current) / r.Max,
        o,
      );
  }
  function he() {
    return {
      Children: [
        {
          Translation: [0, 0, 4],
          Using: [f(new Float32Array(4), [1, 0.5, 0]), T(2)],
        },
        { Translation: [0, 1, 7], Using: [T(16), H([1, 0.5, 0], 5)] },
      ],
    };
  }
  function ce(e) {
    let t = E(8, 6),
      n = [{ Using: [f(t, fn), T(2)] }];
    return (
      0.1 > o() && n.push(he()),
      {
        Translation: [0, 4, 0],
        Using: [N(!1, [8, 4, 8], 1), T(256)],
        Children: n,
      }
    );
  }
  function Ce(e) {
    r(e.BountySeed),
      (e.Camera = void 0),
      (e.World = []),
      (e.Grid = []),
      e.GL.clearColor(0.8, 0.3, 0.2, 1);
    let t = 30;
    for (let n = 0; n < t; n++) {
      e.Grid[n] = [];
      for (let i = 0; i < t; i++)
        e.Grid[n][i] = 0 == n || 29 == n || 0 == i || 29 == i ? NaN : 1 / 0;
    }
    pe(e, [0, 29], [0, 29], 30, 0.3);
    for (let n = 0; n < t; n++)
      for (let i = 0; i < t; i++) {
        let t = e.Grid[n][i] == 1 / 0,
          a = t ? ie(e, t, n, i, !0, [7, 8]) : ce();
        e.Add({
          ...a,
          Translation: [8 * (-15 + n), a.Translation[1], 8 * (-15 + i)],
        });
      }
    e.Add({ Translation: [1, 2, -1], Using: [H([0.5, 0.5, 0.5], 0), K(An)] });
    let n = 28,
      a = 28;
    e.Grid[28] &&
      e.Grid[28][a] &&
      !isNaN(e.Grid[28][a]) &&
      e.Add({
        Scale: [1.5, 1.5, 1.5],
        Translation: [104, 7.5, 8 * (-15 + a)],
        Rotation: D([], 0, 90 * l(0, 3), 0),
        Using: [
          ge(!1, !0),
          Te(28, a),
          ye(l(12, 16), 0),
          N(!0, [7, 7, 7], 8),
          me(5e3 * e.ChallengeLevel),
          ue(),
          K(),
        ],
        Children: [
          (r(e.BountySeed), _(e)),
          { Translation: [0, 10, 0], Using: [i(fe)] },
        ],
      });
    let o = 20;
    for (let n = 0; n < o; n++) {
      let n = l(4, t),
        a = l(4, t);
      e.Grid[n] &&
        e.Grid[n][a] &&
        !isNaN(e.Grid[n][a]) &&
        e.Add({
          Translation: [8 * (-15 + n), 4.3 + Math.random(), 8 * (-15 + a)],
          Using: [
            ge(!1),
            Te(n, a),
            ye(l(8, 15)),
            N(!0, [7, 7, 7], 8),
            me(2e3 * e.ChallengeLevel),
            ue(),
            K(),
          ],
          Children: [_(e), { Translation: [0, 10, 0], Using: [i(fe)] }],
        });
    }
    r(e.PlayerSeed),
      (e.Player = e.Add({
        Translation: [-112, 5, -112],
        Using: [
          de(),
          Te(1, 1),
          ye(25, 0),
          N(!0, [3, 7, 3], 16),
          me(1e4),
          ue(),
          K(),
        ],
        Children: [
          _(e),
          { Translation: [0, 25, 0], Using: [H([1, 1, 1], 20)] },
          { Translation: [0, 10, 0], Using: [i(fe)] },
        ],
      })),
      e.Add({
        Scale: [240, 60, 240],
        Translation: [-4, -30 + 0.49, -4],
        Using: [f(Float32Array.from([0, 0, 0, 7]), fn)],
      }),
      e.Add(le(e.Player));
  }
  function pe(e, [t, n], [a, r], i, o) {
    var l = Math.ceil;
    let s = n - t,
      d = r - a;
    if (s >= d) {
      if (3 < n - t) {
        let s = l((t + n) / 2),
          d = r - 1,
          m = a + 1,
          y = ~~(Math.random() * (d - m + 1)) + m,
          g = !1,
          u = !1;
        e.Grid[r][s] == 1 / 0 && ((y = d), (g = !0)),
          e.Grid[a][s] == 1 / 0 && ((y = m), (u = !0));
        for (let t = a + 1; t < r; t++) {
          if (g && u) {
            if (t == d || t == m) continue;
          } else if (t == y) continue;
          e.Grid[t][s] = Math.random() > o ? NaN : 1 / 0;
        }
        pe(e, [t, s], [a, r], i, o), pe(e, [s, n], [a, r], i, o);
      }
    } else if (3 < r - a) {
      let s = l((a + r) / 2),
        d = n - 1,
        m = t + 1,
        y = ~~(Math.random() * (d - m + 1)) + m,
        g = !1,
        u = !1;
      e.Grid[s][n] == 1 / 0 && ((y = d), (g = !0)),
        e.Grid[s][t] == 1 / 0 && ((y = m), (u = !0));
      for (let a = t + 1; a < n; a++) {
        if (g && u) {
          if (a == d || a == m) continue;
        } else if (a == y) continue;
        e.Grid[s][a] = Math.random() > o ? NaN : 1 / 0;
      }
      pe(e, [t, n], [a, s], i, o), pe(e, [t, n], [s, r], i, o);
    }
  }
  function We(e) {
    r(e.BountySeed);
    let t = 30,
      n = l(20, 25) || 20,
      a = l(10, 20) || 10,
      o = 4,
      s = 6;
    (e.Camera = void 0),
      (e.World = []),
      (e.Grid = []),
      e.GL.clearColor(0.8, 0.3, 0.2, 1);
    for (let n = 0; n < t; n++) {
      e.Grid[n] = [];
      for (let i = 0; i < t; i++)
        e.Grid[n][i] = 0 == n || 29 == n || 0 == i || 29 == i ? NaN : 1 / 0;
    }
    pe(e, [0, 29], [0, 29], 30, 0.6);
    for (let t = a; t < a + s + 3; t++)
      for (let i = n - 1; i < n + o - 1; i++)
        e.Grid[i][t] =
          (i == n - 1 + o - 2 && t !== a) || t >= a + s ? 1 / 0 : NaN;
    for (let n = 0; n < t; n++)
      for (let i = 0; i < t; i++) {
        let t = e.Grid[n][i] == 1 / 0,
          a = ie(e, t, n, i);
        e.Add({
          ...a,
          Translation: [8 * (-15 + n), a.Translation[1], 8 * (-15 + i)],
        });
      }
    e.Add({
      Translation: [1, 2, -1],
      Using: [H([0.5, 0.5, 0.5], 0), K(An)],
      Children: [{ Using: [K(Ln)] }],
    });
    let d = 20;
    for (let n = 0; n < d; n++) {
      let n = l(4, t),
        a = l(4, t);
      e.Grid[n] &&
        e.Grid[n][a] &&
        !isNaN(e.Grid[n][a]) &&
        e.Add({
          Translation: [8 * (-15 + n), 4.3 + Math.random(), 8 * (-15 + a)],
          Using: [
            ge(!1),
            Te(n, a),
            ye(l(8, 15)),
            N(!0, [7, 7, 7], 8),
            me(1500 * e.ChallengeLevel),
            ue(),
            K(),
          ],
          Children: [_(e), { Translation: [0, 10, 0], Using: [i(fe)] }],
        });
    }
    let m = se(e);
    e.Add({ Translation: [8 * (-15 + n) + 4, 0, 8 * (-15 + a) + 4], ...m }),
      r(e.PlayerSeed),
      (e.Player = e.Add({
        Translation: [-112, 5, -112],
        Using: [
          de(),
          Te(1, 1),
          ye(25, 0),
          N(!0, [3, 7, 3], 16),
          me(1e4),
          ue(),
          K(),
        ],
        Children: [
          _(e),
          { Translation: [0, 25, 0], Using: [H([1, 1, 1], 20)] },
          { Translation: [0, 10, 0], Using: [i(fe)] },
        ],
      })),
      e.Add({
        Scale: [240, 60, 240],
        Translation: [-4, -30 + 0.49, -4],
        Using: [f(Float32Array.from([0, 0, 0, 5]), fn)],
      }),
      e.Add(le(e.Player));
  }
  function Ge(e) {
    r(e.PlayerSeed),
      (e.Camera = void 0),
      (e.World = []),
      e.GL.clearColor(0.9, 0.7, 0.3, 1);
    let t = e.Add({
      Using: [
        w({
          [1]: {
            Keyframes: [
              { Timestamp: 0, Rotation: [0, 0, 0, 1] },
              { Timestamp: 2, Rotation: [0, 1, 0, 0] },
              { Timestamp: 4, Rotation: [0, 0, 0, -1] },
            ],
            Flags: 2,
          },
        }),
      ],
      Children: [_(e)],
    });
    e.Add(le(t)),
      e.Add({ Translation: [1, 1, 1], Using: [H([0.5, 0.5, 0.5], 0)] }),
      e.Add({ Translation: [-15, 15, 15], Using: [H([1, 1, 1], 25)] });
  }
  function Ue(e, t, n) {
    let i = 4,
      a = 30,
      r = (8 * a - t) / 2,
      o = [
        ...X([4, 4, 4 * -a], [4, 4, 4 * -a + r], 1),
        ...X([4, 4, 4 * -a + r + t], [4, 4, 4 * a], 1),
      ];
    if (
      (o.push(
        ...X([4, 0, 4 * -a + r], [4, 1.5 * t, 4 * -a + r], 1),
        ...X([4, 0, 4 * -a + r + t], [4, 1.5 * t, 4 * -a + r + t], 1),
        ...X([4, 1.5 * t, 4 * -a + r], [4, 1.5 * t, 4 * -a + r + t + 1], 1),
      ),
      e.BountySeed)
    )
      for (let a = 0; a < t / 8; a++) e.Grid[n][r / 8 + a] = 1 / 0;
    else o.push(...X([4, 4, 4 * -a + r], [4, 4, 4 * -a + r + t], 1));
    for (let l = 8 * -(a / 2 - 1); l < 8 * (a / 2); l += 8)
      (l < 4 * -a + r || l > 4 * -a + r + t) &&
        o.push(...X([4, 0, l], [4, 6, l], 1));
    return {
      Translation: [8 * (-(a / 2) + n) - 4, 0, -3],
      Using: [f(Float32Array.from(o), fn)],
      Children: [
        { Translation: [20, 0, 0], Using: [N(!1, [8, 8, 800]), Q(6)] },
      ],
    };
  }
  function xe(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & In) == In && e.Camera && Ae(e, n);
  }
  function Ae(e, t) {
    let n = e[11][e.Camera.EntityId];
    if (e.Input.d0 && n.Hit) {
      if (4 & n.Hit.Flags) {
        let i = Re(e, t, e[10][n.Hit.EntityId]);
        i && (e[18][t].Route = i);
      }
      if (8 & n.Hit.Flags && 4096 & e.World[t]) {
        let i = e[0][n.Hit.EntityId];
        (e[12][t].Target = U([], i.World)),
          (e[21][e.Camera.EntityId].Duration = 0.2);
      }
    }
    e.Input.d2 &&
      4096 & e.World[t] &&
      ((e[12][t].Target = n.Position),
      (e[21][e.Camera.EntityId].Duration = 0.2));
  }
  function Le(e, { X: t, Y: n }) {
    let i = [
      { X: t - 1, Y: n },
      { X: t + 1, Y: n },
      { X: t, Y: n - 1 },
      { X: t, Y: n + 1 },
      { X: t - 1, Y: n - 1 },
      { X: t + 1, Y: n - 1 },
      { X: t - 1, Y: n + 1 },
      { X: t + 1, Y: n + 1 },
    ];
    return i.filter(
      ({ X: t, Y: n }) =>
        0 <= t && t < e.Grid.length && 0 <= n && n < e.Grid[0].length,
    );
  }
  function Se(e, { X: t, Y: n }) {
    var i = Number.isNaN;
    for (let a = 0; a < e.Grid.length; a++)
      for (let t = 0; t < e.Grid[0].length; t++)
        i(e.Grid[a][t]) || (e.Grid[a][t] = 1 / 0);
    e.Grid[t][n] = 0;
    let a,
      r = [{ X: t, Y: n }];
    for (; (a = r.shift()); )
      if (15 > e.Grid[a.X][a.Y])
        for (let t of Le(e, a))
          e.Grid[t.X][t.Y] > e.Grid[a.X][a.Y] + 1 &&
            ((e.Grid[t.X][t.Y] = e.Grid[a.X][a.Y] + 1), r.push(t));
  }
  function Re(e, t, n) {
    let i = e[18][t];
    if ((Se(e, i), !(e.Grid[n.X][n.Y] < 1 / 0))) return !1;
    let a = [];
    for (; n.X != i.X || n.Y != i.Y; ) {
      a.push(n);
      let t = Le(e, n);
      for (let a, r = 0; r < t.length; r++)
        (a = t[r]), e.Grid[a.X][a.Y] < e.Grid[n.X][n.Y] && (n = e[10][z(e, a)]);
    }
    return a;
  }
  function Ie(e, t, i, a) {
    let r = e[2][t].Arg,
      o = e[22][t].Age;
    (e.Context.font = "10vmin Impact"),
      (e.Context.textAlign = "center"),
      (e.Context.fillStyle = "#FFE8C6"),
      e.Context.fillText(r, i, a + 10 * n(5 * o));
  }
  function Me(e, t, n) {
    r(e.ChallengeSeed);
    let s = 30,
      d = 20,
      m = 1,
      y = 16,
      u = [0, 465, 468, 547];
    (e.Camera = void 0),
      (e.World = []),
      (e.Grid = []),
      e.GL.clearColor(0.8, 0.3, 0.2, 1);
    for (let i = 0; i < s; i++) {
      e.Grid[i] = [];
      for (let t = 0; t < s; t++) {
        let n = i == d || i == m,
          a = n || i == m - 1 || u.includes(30 * i + t) || 0.04 < o();
        e.Grid[i][t] = a && !n ? 1 / 0 : NaN;
        let r = ie(e, a, i, t, !1);
        e.Add({ ...r, Translation: [8 * (-15 + i), 0, 8 * (-15 + t)] });
      }
    }
    e.Add(Ue(e, y, d));
    let T = 4,
      h = 0,
      c = 10;
    for (let a = 0; a < T; a++) {
      let t = F(e),
        n = t.Size_x / 8,
        i = t.Size_z / 8;
      if (h + i > s) break;
      e.Add({
        Translation: [8 * (-15 + c) - 1.5, 0, 8 * (-15 + h) - 3.5],
        Children: [t.Blueprint],
      });
      for (let t = h; t < h + i; t++)
        for (let i = c; i < c + n; i++) e.Grid[i][t] = NaN;
      h += t.Size_z / 8 + l(1, 2);
    }
    let C = 20;
    for (let a = 0; a < C; a++) {
      let t = l(0, s),
        n = l(0, s);
      e.Grid[t] &&
        e.Grid[t][n] &&
        !isNaN(e.Grid[t][n]) &&
        e.Add({
          Translation: [8 * (-15 + t), 4.3 + Math.random(), 8 * (-15 + n)],
          Using: [ge(), Te(t, n), ye(l(15, 25), 0)],
          Children: [_(e)],
        });
    }
    if ((e.PlayerXY || (e.PlayerXY = { X: 15, Y: 15 }), Se(e, e.PlayerXY), t))
      e.Add({ Translation: [1, 2, -1], Using: [H([0.7, 0.7, 0.7], 0), K(Ln)] }),
        (e.Player = e.Add({ Using: [Te(15, 15)] }));
    else {
      e.Add({
        Translation: [1, 2, -1],
        Using: [H([0.5, 0.5, 0.5], 0), K(Sn)],
        Children: [{ Using: [K(Rn)] }, { Using: [K(Ln)] }],
      }),
        e.Add({
          Translation: [0, 5, 24],
          Rotation: D([], 0, 90, 0),
          Using: e.BountySeed ? [] : [N(!1, [8, 8, 8]), Q(5)],
          Children: [
            _(e),
            {
              Translation: [0, 10, 0],
              Using: e.BountySeed ? [] : [i(Ie, "!"), a()],
            },
          ],
        }),
        e.Add({
          Translation: [24, 5, -64],
          Using: [N(!1, [8, 8, 8]), Q(4)],
          Children: [
            _(e),
            { Translation: [0, 10, 0], Using: [i(Ie, "$"), a()] },
          ],
        });
      let t = e[0][z(e, e.PlayerXY)].Translation;
      r(e.PlayerSeed),
        (e.Player = e.Add({
          Translation: [t[0], 5, t[2]],
          Using: [
            de(),
            Te(e.PlayerXY.X, e.PlayerXY.Y),
            ye(25, 0),
            N(!0, [3, 7, 3], 16),
            me(1e4),
          ],
          Children: [
            _(e),
            { Translation: [0, 25, 0], Using: [H([1, 1, 1], 20)] },
          ],
        })),
        n && e.Add({ Using: [i(g, n), a(4)] });
    }
    e.Add({ ...Ue(e, 0, m + 1), Rotation: D([], 0, 180, 0) }),
      0 < e.Gold && 1e4 > e.Gold && (e.Grid[m][15] = 1 / 0),
      e.Add({
        Translation: [-120, 5, -120],
        Using: [N(!1, [8, 8, 8]), Q(6)],
        Children: [_(e)],
      }),
      e.Add({ ...Z(), Translation: [56, 1.5, 0] }),
      e.Add({
        Scale: [240, 60, 240],
        Translation: [-4, -30 + 0.49, -4],
        Using: [f(Float32Array.from([0, 0, 0, 5]), fn)],
      }),
      e.Add(le(e.Player));
  }
  function ve(e) {
    Me(e, !0);
  }
  function Pe(e) {
    r(e.BountySeed),
      (e.Camera = void 0),
      (e.World = []),
      e.GL.clearColor(0.9, 0.7, 0.3, 1),
      e.Add({
        Using: [
          w({
            [1]: {
              Keyframes: [
                { Timestamp: 0, Rotation: [0, 0, 0, 1] },
                { Timestamp: 2, Rotation: [0, 1, 0, 0] },
                { Timestamp: 4, Rotation: [0, 0, 0, -1] },
              ],
              Flags: 2,
            },
          }),
        ],
        Children: [_(e)],
      }),
      e.Add({ Translation: [0, 2, 10], Using: [ae(10, 1, 100)] }),
      e.Add({ Translation: [1, 1, 1], Using: [H([0.5, 0.5, 0.5], 0)] }),
      e.Add({ Translation: [-15, 15, 15], Using: [H([1, 1, 1], 25)] });
  }
  function De(e, t, n) {
    switch (t) {
      case 1: {
        e.Audio.close(),
          (e.Audio = new AudioContext()),
          (e.WorldFunc = Me),
          setTimeout(e.WorldFunc, 0, e, !1, 1e3 * e.ChallengeLevel),
          (e.Gold += 1e3 * e.ChallengeLevel),
          (e.ChallengeLevel += 1),
          (e.PlayerState = 0),
          (e.PlayerXY = void 0),
          (e.BountySeed = 0);
        break;
      }
      case 2: {
        (e.Gold = 0),
          (e.ChallengeLevel = 1),
          (e.PlayerState = 0),
          (e.PlayerXY = void 0),
          (e.BountySeed = 0),
          (e.WorldFunc = ve),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 3: {
        e.Audio.close(),
          (e.Audio = new AudioContext()),
          (e.WorldFunc = Me),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 5: {
        (e.PlayerXY = e[18][e.Player]),
          (e.BountySeed = e.ChallengeSeed * e.ChallengeLevel - 1),
          (e.WorldFunc = Pe),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 4: {
        (e.MonetizationEnabled =
          document.monetization && "started" == document.monetization.state),
          (e.PlayerXY = e[18][e.Player]),
          (e.WorldFunc = Ge),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 11: {
        e.MonetizationEnabled && (e.PlayerSeed = 1e4 * Math.random()),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 6: {
        e.Audio.close(),
          (e.Audio = new AudioContext()),
          (e.WorldFunc = We),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 7: {
        e.Audio.close(),
          (e.Audio = new AudioContext()),
          (e.WorldFunc = e.BountySeed ? Ce : Me),
          setTimeout(e.WorldFunc, 0, e);
        break;
      }
      case 8: {
        let [t, r] = n;
        e.Add({
          Translation: e[0][t].Translation.slice(),
          Using: [i(y, r), a(1)],
        }),
          8192 & e.World[t] && e.Add({ Using: [i(u), a(1)] });
        break;
      }
      case 10: {
        let [t] = n,
          r = l(100, 1e3);
        (e.Gold += r),
          (e[5][t].Trigger = Jt),
          e.Add({
            Translation: e[0][e.Player].Translation.slice(),
            Using: [i(g, r), a(1)],
          }),
          a(0)(e, t);
        break;
      }
      case 9: {
        let t = n[0];
        if (8192 & e.World[t]) (e.World[t] &= -24961), (e.PlayerState = 2);
        else if (524288 & e.World[t]) {
          if (e[19][t].Bounty) {
            e.PlayerState = 1;
            for (let t = 0; t < e.World.length; t++)
              524288 & e.World[t] && (e.World[t] &= -262145);
          }
          (e.World[t] &= -541057), setTimeout(() => e.Destroy(t), 5e3);
        }
        break;
      }
      case 12: {
        let t = n[0];
        e.Destroy(t);
        let i = e[14][e.Player];
        i.Current = i.Max;
      }
    }
  }
  function Ye(e = [0, 0, 0], t = [0, 0, 0, 1], n = [1, 1, 1]) {
    return (i, a) => {
      (i.World[a] |= 1),
        (i[0][a] = {
          EntityId: a,
          World: h(),
          Self: h(),
          Translation: e,
          Rotation: t,
          Scale: n,
          Children: [],
          Dirty: !0,
        });
    };
  }
  function* be(e, t, n) {
    e.World[t.EntityId] & (1 << n) && (yield e[n][t.EntityId]);
    for (let i of t.Children) yield* be(e, i, n);
  }
  function Ee(e, t, n) {
    let i = e.createProgram();
    if (
      (e.attachShader(i, Xe(e, dn, t)),
      e.attachShader(i, Xe(e, sn, n)),
      e.linkProgram(i),
      !e.getProgramParameter(i, yn))
    )
      throw new Error(e.getProgramInfoLog(i));
    return i;
  }
  function Xe(e, t, n) {
    let i = e.createShader(t);
    if (
      (e.shaderSource(i, n), e.compileShader(i), !e.getShaderParameter(i, mn))
    )
      throw new Error(e.getShaderInfoLog(i));
    return i;
  }
  function Fe(e) {
    let t = Ee(e, Mn, vn),
      n = {
        GL: e,
        Mode: nn,
        Program: t,
        Uniforms: [
          e.getUniformLocation(t, "p"),
          e.getUniformLocation(t, "q"),
          e.getUniformLocation(t, "r"),
          e.getUniformLocation(t, "s"),
          e.getUniformLocation(t, "t"),
          e.getUniformLocation(t, "u"),
          e.getUniformLocation(t, "v"),
        ],
      };
    return n;
  }
  function we(e) {
    let t = Ee(e, Pn, Dn),
      n = {
        GL: e,
        Mode: en,
        Program: t,
        Uniforms: [e.getUniformLocation(t, "p"), e.getUniformLocation(t, "q")],
      };
    return n;
  }
  function Be(e) {
    let t = Ee(e, Yn, bn),
      n = {
        GL: e,
        Mode: tn,
        Program: t,
        Uniforms: [
          e.getUniformLocation(t, "p"),
          e.getUniformLocation(t, "q"),
          e.getUniformLocation(t, "r"),
        ],
      };
    return n;
  }
  function Ve(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & En) == En && Ke(e, n);
  }
  function Ke(e, n) {
    let i = e[12][n];
    if (i.Target) {
      let a = e[0][n],
        r = e[7][n],
        o = G([], a.World),
        l = t(o[2], o[0]),
        s = L([], i.Target, a.Translation),
        d = t(s[2], s[0]);
      r.Yaw = D([], 0, 57 * (l - d), 0);
    }
  }
  function Ne(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & Xn) == Xn && qe(e, n, t);
  }
  function qe(e, t, n) {
    let i = e[0][t],
      a = e[6][t],
      r = a.Trigger && a.States[a.Trigger];
    r && 1 & a.Current.Flags && ((a.Current = r), (a.Trigger = void 0)),
      (a.Current.Time += n),
      a.Current.Time > a.Current.Duration &&
        (a.Current.Time = a.Current.Duration);
    let o = null,
      l = null;
    for (let i of a.Current.Keyframes)
      if (a.Current.Time <= i.Timestamp) {
        l = i;
        break;
      } else o = i;
    if (o && l) {
      let e = l.Timestamp - o.Timestamp,
        t = a.Current.Time - o.Timestamp,
        n = t / e;
      l.Ease && (n = l.Ease(n)),
        o.Translation &&
          l.Translation &&
          (v(i.Translation, o.Translation, l.Translation, n), (i.Dirty = !0)),
        o.Rotation &&
          l.Rotation &&
          (Y(i.Rotation, o.Rotation, l.Rotation, n), (i.Dirty = !0));
    }
    if (a.Current.Time == a.Current.Duration) {
      if (((a.Current.Time = 0), 4 & a.Current.Flags))
        for (let e of a.Current.Keyframes.reverse())
          e.Timestamp = a.Current.Duration - e.Timestamp;
      r
        ? ((a.Current = r), (a.Trigger = void 0))
        : !(2 & a.Current.Flags) && (a.Current = a.States[1]);
    }
  }
  function ze(e, t, n, i) {
    let a = e.currentTime + i,
      r = 0,
      o = e.createGain();
    o.gain.value = (t[0] / 9) ** 3;
    let l, s;
    if (
      (t[5] &&
        ((s = e.createOscillator()),
        (s.type = t[5]),
        (s.frequency.value = (t[7] / 3) ** 3),
        (l = e.createGain()),
        (l.gain.value = (t[6] + 3) ** 3),
        s.connect(l)),
      t[1])
    ) {
      let n = e.createBiquadFilter();
      (n.type = t[1]),
        (n.frequency.value = 2 ** t[2]),
        (n.Q.value = t[3] ** 1.5),
        l && t[4] && l.connect(n.detune),
        o.connect(n),
        n.connect(e.destination);
    } else o.connect(e.destination);
    for (let s of t[8]) {
      let t = e.createGain();
      t.connect(o);
      let i = (s[1] / 9) ** 3,
        d = (s[2] / 9) ** 3,
        m = (s[3] / 9) ** 3,
        y = (s[4] / 6) ** 3,
        g = d + m + y;
      if (
        (t.gain.setValueAtTime(0, a),
        t.gain.linearRampToValueAtTime(i, a + d),
        t.gain.setValueAtTime(i, a + d + m),
        t.gain.exponentialRampToValueAtTime(1e-5, a + g),
        s[0])
      ) {
        let i = e.createOscillator();
        (i.type = s[0]),
          i.connect(t),
          (i.detune.value = 3 * (s[5] - 7.5) ** 3),
          l && s[6] && l.connect(i.detune);
        let r = 440 * 2 ** ((n - 69) / 12);
        if (s[7]) {
          let e = (s[8] / 9) ** 3,
            t = (s[9] / 9) ** 3,
            n = (s[10] / 6) ** 3;
          i.frequency.linearRampToValueAtTime(0, a),
            i.frequency.linearRampToValueAtTime(r, a + e),
            i.frequency.setValueAtTime(r, a + e + t),
            i.frequency.exponentialRampToValueAtTime(1e-5, a + e + t + n);
        } else i.frequency.setValueAtTime(r, a);
        i.start(a), i.stop(a + g);
      } else {
        let n = e.createBufferSource();
        (n.buffer = ke(e)),
          (n.loop = !0),
          n.connect(t),
          n.start(a),
          n.stop(a + g);
      }
      g > r && (r = g);
    }
    s && (s.start(a), s.stop(a + r));
  }
  function ke(e) {
    if (!Fn) {
      Fn = e.createBuffer(1, 2 * e.sampleRate, e.sampleRate);
      let t = Fn.getChannelData(0);
      for (let e = 0; e < t.length; e++) t[e] = 2 * Math.random() - 1;
    }
    return Fn;
  }
  function je(e, t) {
    for (let n = 0; n < e.World.length; n++) 32 & e.World[n] && He(e, n, t);
  }
  function He(e, t, n) {
    let i = e[5][t],
      a = !i.Current || i.Time > i.Current.Exit;
    if (i.Trigger && a) {
      for (let t of i.Trigger.Tracks)
        for (let n = 0; n < t.Notes.length; n++)
          t.Notes[n] && ze(e.Audio, t.Instrument, t.Notes[n], 0.15 * n);
      (i.Current = i.Trigger), (i.Time = 0);
    } else i.Time += n;
    i.Trigger = i.Idle;
  }
  function Oe(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & wn) == wn && $e(e, n);
  }
  function $e(e, t) {
    let n = e[0][t],
      i = e[3][t];
    (e.Camera = i), c(i.View, n.World), C(i.PV, i.Projection, i.View);
  }
  function Qe(e, t) {
    let n = [],
      a = [];
    for (let r = 0; r < e.World.length; r++)
      if ((e.World[r] & Bn) == Bn) {
        let t = e[0][r],
          i = e[8][r];
        (i.Collisions = []),
          i.New
            ? ((i.New = !1), Ze(t, i))
            : i.Dynamic
            ? (Ze(t, i), a.push(i))
            : n.push(i);
      }
    for (let r = 0; r < a.length; r++) Je(a[r], n, n.length), Je(a[r], a, r);
  }
  function Je(e, t, n) {
    for (let a, r = 0; r < n; r++)
      (a = t[r]), et(e, a) && (e.Collisions.push(a), a.Collisions.push(e));
  }
  function Ze(e, t) {
    let n = U([], e.World),
      i = S([], t.Size, 0.5);
    L(t.Min, n, i), A(t.Max, n, i);
  }
  function et(e, t) {
    return (
      e.Min[0] < t.Max[0] &&
      e.Max[0] > t.Min[0] &&
      e.Min[1] < t.Max[1] &&
      e.Max[1] > t.Min[1] &&
      e.Min[2] < t.Max[2] &&
      e.Max[2] > t.Min[2]
    );
  }
  function tt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & Vn) == Vn && nt(e, n, t);
  }
  function nt(t, n, i) {
    let a = t[18][n],
      r = t[19][n].Friendly,
      o = 0 >= t[19][n].LastShot,
      s = t[18][t.Player],
      d = e(t.Grid[a.X][a.Y] - t.Grid[s.X][s.Y]),
      m = [];
    if (!a.Route.length && !a.Destination) {
      if (r || 5 < d) {
        let e = l(1, 15);
        for (; e == t.Grid[a.X][a.Y]; ) e = l(1, 15);
        m = it(t, n, e);
      } else
        (m = Re(t, t.Player, a)), m && (m.pop(), m.pop(), (m = m.reverse()));
      m && 1 < m.length && (a.Route = m);
    }
    !r &&
      4096 & t.World[n] &&
      (4 > d && o
        ? ((t[12][n].Target = t[0][t.Player].Translation),
          (t[19][n].LastShot = 0.5),
          (a.Route = []))
        : (t[19][n].LastShot -= i));
  }
  function it(e, t, n) {
    let i = e[18][t],
      a = e[10][z(e, i)],
      r = e.Grid[i.X][i.Y],
      o = n > r ? 1 : -1,
      l = [];
    if (!(16 > r)) return !1;
    for (; n !== r; ) {
      if (10 < l.length) return !1;
      l.push(a);
      let t = Le(e, a).sort(() => 0.5 - Math.random());
      for (let n, l = 0; l < t.length; l++)
        if (((n = t[l]), e.Grid[n.X][n.Y] == r + 1 * o)) {
          (a = e[10][z(e, n)]), (r = e.Grid[a.X][a.Y]);
          break;
        }
    }
    return l.reverse();
  }
  function at(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & _n) == _n && rt(e, n);
  }
  function rt(e, t) {
    let n = e[20][t],
      i = e[7][t],
      a = e[8][t];
    if (0 < a.Collisions.length) {
      e.Destroy(t);
      for (let t of a.Collisions)
        16384 & e.World[t.EntityId] &&
          (e[14][t.EntityId].Damage =
            Math.random() * n.Damage + Math.random() * n.Damage);
    } else i.Direction = G([], e[0][t].World);
  }
  function ot(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & Kn) == Kn && e.Camera && lt(e, n);
  }
  function lt(t, n) {
    let i = t[17][n];
    U(Nn, t[0][n].World),
      I(Nn, Nn, t.Camera.View),
      e(Nn[0]) > 1 / t.Camera.Projection[0] + 8 ||
      e(Nn[1]) > 1 / t.Camera.Projection[5] + 8
        ? (t.World[n] &= ~i.Mask)
        : (t.World[n] |= i.Mask);
  }
  function st(e, t) {
    e.Context.clearRect(0, 0, e.Canvas2.width, e.Canvas2.height);
    let n = [];
    for (let a = 0; a < e.World.length; a++)
      (e.World[a] & qn) == qn &&
        (U(n, e[0][a].World),
        I(n, n, e.Camera.PV),
        e[2][a].Widget(
          e,
          a,
          0.5 * (n[0] + 1) * e.Canvas3.width,
          0.5 * (-n[1] + 1) * e.Canvas3.height,
        ));
  }
  function dt(e, t) {
    zn && (zn.textContent = (1 / t).toFixed());
  }
  function mt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & kn) == kn && yt(e, n);
  }
  function yt(e, t) {
    let n = e[14][t];
    if (n.Damage) {
      De(e, 8, [t, n.Damage]), (n.Current -= n.Damage), (n.Damage = 0);
      for (let n of be(e, e[0][t], 6)) n.Trigger = 4;
    }
    if (0 >= n.Current) {
      (n.Current = 0), De(e, 9, [t]);
      for (let n of be(e, e[0][t], 6)) n.Trigger = 5;
    }
  }
  function gt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & jn) == jn && ut(e, n, t);
  }
  function ut(e, t, n) {
    let i = e[22][t];
    (i.Age += n), i.Age > i.Max && e.Destroy(t);
  }
  function Tt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      if ((e.World[n] & Hn) == Hn) {
        let t = e[0][n],
          i = e[15][n],
          a = e[0][i.Target],
          r = U([], a.World);
        (t.Translation = v([], t.Translation, r, 0.1)), (t.Dirty = !0);
      }
  }
  function ft(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & On) == On && ht(e, n, t);
  }
  function ht(e, t, n) {
    let i = e[0][t],
      a = e[7][t];
    if (a.Direction) {
      S(a.Direction, a.Direction, a.MoveSpeed * n),
        A(i.Translation, i.Translation, a.Direction),
        (i.Dirty = !0),
        (a.Direction = void 0);
      for (let t of be(e, i, 6)) t.Trigger = 2;
    } else for (let t of be(e, i, 6)) t.Trigger = 1;
    a.Yaw &&
      (P(i.Rotation, a.Yaw, i.Rotation), (i.Dirty = !0), (a.Yaw = void 0));
  }
  function ct(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & $n) == $n && Ct(e, n);
  }
  function Ct(e, n) {
    let i = e[18][n];
    if (!i.Destination && i.Route.length) {
      let t = i.Route.pop(),
        n = z(e, t);
      (i.DestinationX = t.X),
        (i.DestinationY = t.Y),
        (i.Destination = e[0][n].Translation);
    }
    if (i.Destination) {
      let a = e[0][n],
        r = [i.Destination[0], a.Translation[1], i.Destination[2]],
        o = L([], r, a.Translation);
      1 > M(o) &&
        ((i.X = i.DestinationX),
        (i.Y = i.DestinationY),
        (i.Destination = null));
      let l = e[7][n];
      l.Direction = R(o, o);
      let s = G([], a.World),
        d = t(s[2], s[0]),
        m = t(o[2], o[0]);
      l.Yaw = D([], 0, 57 * (d - m), 0);
    }
  }
  function pt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & Qn) == Qn && Wt(e, n, t);
  }
  function Wt(e, t, n) {
    let a = e[16][t],
      r = e[0][t];
    if (((a.SinceLast += n), a.SinceLast > a.Frequency)) {
      a.SinceLast = 0;
      let e = U([], r.World);
      a.Instances.push(...e, 0);
    }
    for (let r = 0; r < a.Instances.length; )
      (a.Instances[r + 3] += n / a.Lifespan),
        1 < a.Instances[r + 3] ? a.Instances.splice(r, 4) : (r += 4);
  }
  function Gt(e, t, n) {
    n && (n.textContent = `${t.toFixed(1)} ms`);
  }
  function Ut(e, t) {
    e.GL.clear(16640);
    let n = [],
      a = [];
    for (let r = 0; r < e.World.length; r++)
      if ((e.World[r] & Zn) == Zn) {
        let t = e[0][r],
          i = U([], t.World);
        n.push(...i), a.push(...e[4][r]);
      }
    let r = null;
    for (let o = 0; o < e.World.length; o++)
      if ((e.World[o] & Jn) == Jn) {
        let t = e[0][o],
          i = e[1][o];
        if (i.Material !== r)
          switch (
            ((r = i.Material),
            e.GL.useProgram(r.Program),
            e.GL.uniformMatrix4fv(r.Uniforms[0], !1, e.Camera.PV),
            i.Kind)
          ) {
            case 1:
              e.GL.uniform1i(r.Uniforms[4], n.length / 3),
                e.GL.uniform3fv(r.Uniforms[5], n),
                e.GL.uniform4fv(r.Uniforms[6], a);
          }
        switch (i.Kind) {
          case 0:
            xt(e, t, i);
            break;
          case 1:
            At(e, t, i);
            break;
          case 2: {
            let t = e[16][o];
            t.Instances.length && Lt(e, i, t);
            break;
          }
        }
      }
  }
  function xt(e, t, n) {
    e.GL.uniformMatrix4fv(n.Material.Uniforms[1], !1, t.World),
      e.GL.uniform4fv(n.Material.Uniforms[2], n.Color),
      e.GL.bindVertexArray(n.VAO),
      e.GL.drawElements(n.Material.Mode, n.Count, gn, 0),
      e.GL.bindVertexArray(null);
  }
  function At(e, t, n) {
    e.GL.uniformMatrix4fv(n.Material.Uniforms[1], !1, t.World),
      e.GL.uniformMatrix4fv(n.Material.Uniforms[2], !1, t.Self),
      e.GL.uniform3fv(n.Material.Uniforms[3], n.Palette || e.Palette),
      e.GL.bindVertexArray(n.VAO),
      e.GL.drawElementsInstanced(
        n.Material.Mode,
        n.IndexCount,
        gn,
        0,
        n.InstanceCount,
      ),
      e.GL.bindVertexArray(null);
  }
  function Lt(e, t, n) {
    e.GL.uniform4fv(t.Material.Uniforms[1], t.ColorSize),
      e.GL.bindBuffer(on, t.Buffer),
      e.GL.bufferData(on, Float32Array.from(n.Instances), rn),
      e.GL.enableVertexAttribArray(1),
      e.GL.vertexAttribPointer(1, 4, un, !1, 16, 0),
      e.GL.drawArrays(t.Material.Mode, 0, n.Instances.length / 4);
  }
  function St(e, n, a) {
    let r = 1 / 0,
      o = null;
    for (let l, t = 0; t < e.length; t++)
      (l = Rt(n, a, e[t])), l < r && ((r = l), (o = t));
    if (null !== o) return e[o];
  }
  function Rt(e, t, n) {
    let a = -Infinity,
      r = +Infinity;
    for (let o = 0; 3 > o; o++) {
      let i = (n.Min[o] - e[o]) / t[o],
        l = (n.Max[o] - e[o]) / t[o];
      if ((i > l && ([i, l] = [l, i]), l < a || i > r)) return 1 / 0;
      i > a && (a = i), l < r && (r = l);
    }
    return a > r ? 1 / 0 : a;
  }
  function It(e, t) {
    let n = [];
    for (let a = 0; a < e.World.length; a++)
      (e.World[a] & ni) == ni && 1 !== e[8][a].Flags && n.push(e[8][a]);
    for (let a = 0; a < e.World.length; a++)
      (e.World[a] & ti) == ti && Mt(e, a, n);
  }
  function Mt(e, n, i) {
    let a = e[0][n],
      r = e[3][n],
      o = e[11][n],
      l = 2 * (e.Input.mx / e.Canvas3.width) - 1,
      s = 2 * -(e.Input.my / e.Canvas3.height) + 1,
      d = [l, s, -1],
      m = [l, s, 1],
      y = [0, 0, 0];
    I(d, d, r.Unproject),
      I(d, d, a.World),
      I(m, m, r.Unproject),
      I(m, m, a.World),
      L(y, m, d),
      R(y, y),
      (o.Hit = St(i, d, y));
    let g = (5 - d[1]) / y[1];
    if (
      (A(o.Position, d, S(y, y, g)), o.Hit && o.Hit.Flags & ii && e.Input.d0)
    ) {
      let t = e[0][o.Hit.EntityId];
      for (let n of be(e, t, 6)) n.Trigger = 6;
      for (let n of be(e, t, 5)) n.Trigger = ei;
    }
  }
  function vt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & ai) == ai && Pt(e, n, t);
  }
  function Pt(e, t, n) {
    let i = e[21][t];
    if (0 < i.Duration) {
      i.Duration -= n;
      let a = e[0][t];
      (a.Translation = [
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ]),
        (a.Dirty = !0),
        0 >= i.Duration && ((i.Duration = 0), (a.Translation = [0, 0, 0]));
    }
  }
  function Dt() {
    return { Using: [H([1, 1, 1], 5), a(0.2)] };
  }
  function Yt(e) {
    return (t, n) => {
      (t.World[n] |= 1048576), (t[20][n] = { Damage: e });
    };
  }
  function bt(e, t, n, i) {
    return {
      Using: [N(!0), Yt(e), a(3), ye(t), H(n, 2)],
      Children: [
        { Scale: [0.3, 0.3, 0.3], Using: [f(new Float32Array(4), n)] },
        { Using: [$(5), j(1, 0.08), O(n, i)] },
      ],
    };
  }
  function Et(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & li) == li && Xt(e, n);
  }
  function Xt(e, t) {
    let n = e[12][t];
    if (n.Target) {
      let n,
        i,
        a = e[0][t];
      8192 & e.World[t]
        ? ((n = bt(500, 40, [1, 1, 1], 9)), (i = ri))
        : ((n = bt(300, 30, [1, 0, 0], 7)), (i = oi));
      let r = U([], a.Children[0].Children[0].World);
      e.Add({ ...n, Translation: r, Rotation: a.Rotation.slice() }),
        e.Add({ ...Dt(), Translation: r });
      for (let t of be(e, a, 5)) t.Trigger = i;
      for (let t of be(e, a, 6)) t.Trigger = 3;
    }
    n.Target = null;
  }
  function Ft(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & si) == si && wt(e[0][n]);
  }
  function wt(e) {
    e.Dirty &&
      ((e.Dirty = !1),
      Bt(e),
      p(e.World, e.Rotation, e.Translation, e.Scale),
      e.Parent && C(e.World, e.Parent.World, e.World),
      c(e.Self, e.World));
  }
  function Bt(e) {
    for (let t of e.Children) (t.Dirty = !0), Bt(t);
  }
  function Vt(e, t) {
    for (let n = 0; n < e.World.length; n++)
      (e.World[n] & di) == di && Kt(e, n);
  }
  function Kt(e, t) {
    let n = e[8][t].Collisions;
    for (let i of n)
      8192 & e.World[i.EntityId] &&
        ((e.World[t] &= -513), De(e, e[9][t].Action, [t]));
  }
  function Nt(e) {
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
                You earned $${e.Gold.toLocaleString("en")}.
            </div>
        </div>

        <div onclick="$(${2});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Try Again
        </div>
    `;
  }
  function qt() {
    return `
        <div style="
            width: 66%;
            margin: 10vh auto;
        ">
            BACK<br>COUNTRY
            <div onclick="$(${3});" style="
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
  function zt(e) {
    return `
        <div style="
            margin: 3vmin 4vmin;
            font: 10vmin Impact;
        ">
            $${e.Gold.toLocaleString("en")}
        </div>
    `;
  }
  function kt(e) {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
            color: #222;
        ">
            GENERAL STORE
        </div>

        <div onclick="$(${11});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 15%;
            left: 10%;
        ">
            ${
              e.MonetizationEnabled
                ? "Change Outfit"
                : `
                        <s>Change Outfit</s>
                        <div style="font: italic 5vmin serif;">
                            Become a Coil subscriber!
                        </div>
                    `
            }
        </div>

        <div onclick="$(${3});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Confirm
        </div>
    `;
  }
  function jt() {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
        ">
            WELL DONE
        </div>

        <div onclick="$(${1});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Collect Bounty
        </div>
    `;
  }
  function Ht(e) {
    return `
        <div style="
            width: 66%;
            margin: 5vh auto;
            text-align: center;
            color: #222;
        ">
            WANTED
            <div style="font-size: 7vmin;">
                REWARD $${e.ChallengeLevel},000
            </div>
        </div>
        <div onclick="$(${3});" style="
            font: italic bold small-caps 7vmin serif;
            position: absolute;
            bottom: 5%;
            right: 10%;
        ">
            Accept Quest
        </div>
    `;
  }
  function Ot(e) {
    return e.WorldFunc == ve
      ? qt()
      : e.WorldFunc == Ge
      ? kt(e)
      : e.WorldFunc == Pe
      ? Ht(e)
      : 1 == e.PlayerState
      ? jt()
      : 2 == e.PlayerState
      ? Nt(e)
      : zt(e);
  }
  function $t(e, t) {
    let n = Ot(e);
    n !== mi && (e.UI.innerHTML = mi = n);
  }
  let Qt = 1,
    Jt = {
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
  const Zt = {
      Vertices: Float32Array.from([
        -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
        0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5,
        0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
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
    },
    en = 0,
    tn = 2,
    nn = 4,
    an = 35044,
    rn = 35048,
    on = 34962,
    ln = 34963,
    sn = 35632,
    dn = 35633,
    mn = 35713,
    yn = 35714,
    gn = 5123,
    un = 5126,
    Tn = 1e-6;
  let fn = [
      0.6, 0.4, 0, 0.4, 0.2, 0, 0.14, 0, 0, 0.2, 0.8, 1, 1, 1, 0, 1, 0.8, 0.4,
      0.6, 0.4, 0, 0.2, 0.2, 0.2, 0.53, 0.53, 0.53,
    ],
    hn = [
      [0.6, 0.4, 0, 0.4, 0.2, 0],
      [0, 0.47, 0, 0, 0.33, 0],
      [0.67, 0, 0, 0.54, 0, 0],
      [0.4, 0.4, 0.4, 0.53, 0.53, 0.53],
    ],
    cn = [
      1, 1, 1, 1, 1, 1, 1, 1, 0.8, 1, 1, 0.6, 1, 1, 0.4, 1, 1, 0.2, 1, 1, 0, 0,
      0.8, 0, 0.47, 0.47, 0.47, 0.53, 0, 0, 0.4, 0.2, 0, 0, 1, 1, 0.93, 0, 0,
    ],
    Cn = [
      [0.2, 0.2, 0.2],
      [0.9, 0.9, 0.9],
      [0.53, 0, 0],
      [1, 0, 0],
    ],
    pn = [
      [0, 0, 0],
      [1, 1, 1],
      [1, 1, 0],
      [0.9, 0, 0],
    ],
    Wn = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    Gn = [
      [1, 0.8, 0.6],
      [0.6, 0.4, 0],
    ],
    Un = [
      [1, 1, 0],
      [0, 0, 0],
      [0.6, 0.4, 0],
      [0.4, 0, 0],
    ],
    xn = [
      [0, 0, 0],
      [0.53, 0, 0],
      [0.6, 0.4, 0.2],
      [0.33, 0.33, 0.33],
    ],
    An = {
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
              [!1, 2, 1, 1, 6],
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
    },
    Ln = {
      Tracks: [
        {
          Instrument: [
            7,
            "lowpass",
            8,
            6,
            !0,
            "sine",
            9,
            2,
            [[!1, 3, 6, 4, 13]],
          ],
          Notes: [57],
        },
      ],
      Exit: 13,
    },
    Sn = {
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
              [!1, 2, 1, 1, 6],
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
    },
    Rn = {
      Tracks: [
        {
          Instrument: [
            4,
            "lowpass",
            9,
            5,
            !0,
            "sawtooth",
            7,
            9,
            [[!1, 7, 3, 3, 7]],
          ],
          Notes: [57],
        },
      ],
      Exit: 9,
    };
  const In = 270337;
  let Mn = `#version 300 es\n
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

    layout(location=${1}) in vec3 k;
    layout(location=${2}) in vec3 m;
    layout(location=${3}) in vec4 n;

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
`,
    vn = `#version 300 es\n
    precision mediump float;

    // Vertex color
    in vec4 o;
    // Fragment color
    out vec4 z;

    void main(){
        z=o;
    }
`,
    Pn = `#version 300 es\n
    // Projection * View matrix
    uniform mat4 p;
    // [red, green, blue, size]
    uniform vec4 q;

    // [x, y, z, age]
    layout(location=${1}) in vec4 k;

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
`,
    Dn = `#version 300 es\n
    precision mediump float;

    // Vertex color
    in vec4 o;
    // Fragment color
    out vec4 z;

    void main(){
        z=o;
    }
`,
    Yn = `#version 300 es\n
    // Matrices: PV, world
    uniform mat4 p,q;

    layout(location=${1}) in vec3 k;

    void main(){
        gl_Position=p*q*vec4(k,1.);
    }
`,
    bn = `#version 300 es\n
    precision mediump float;
    // Line color
    uniform vec4 r;

    // Fragment color
    out vec4 z;

    void main() {
        z=r;
    }
`;
  const En = 4097,
    Xn = 65;
  let Fn;
  const wn = 9,
    Bn = 257,
    Vn = 786433,
    _n = 1048961,
    Kn = 131073;
  let Nn = [0, 0, 0];
  const qn = 5;
  let zn = document.getElementById("fps");
  const kn = 16384,
    jn = 4194305,
    Hn = 32769,
    On = 129,
    $n = 262273,
    Qn = 65537,
    Jn = 3,
    Zn = 17;
  let ei = {
    Tracks: [
      {
        Instrument: [7, "lowpass", 8, 8, , , , , [["sine", 4, 1, 0, 3, 8]]],
        Notes: [69],
      },
    ],
    Exit: 0.2,
  };
  const ti = 2057,
    ni = 257,
    ii = 20,
    ai = 2097153;
  let ri = {
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
              [!1, 10, 0, 0, 5],
              ["sine", 7, 0, 2, 2, 8],
            ],
          ],
          Notes: [57],
        },
      ],
      Exit: 0.2,
    },
    oi = {
      Tracks: [
        {
          Instrument: [4, "lowpass", 10, 4, , , , , [[!1, 10, 0, 0, 5]]],
          Notes: [57],
        },
      ],
      Exit: 0.2,
    };
  const li = 4097,
    si = 1,
    di = 769;
  let mi;
  var yi,
    x,
    gi,
    ui,
    Ti,
    fi,
    hi,
    ci,
    Ci,
    pi,
    Wi,
    Gi,
    Ui,
    xi,
    Ai,
    Li,
    Si,
    Ri,
    Ii,
    Mi,
    vi,
    Pi,
    Di;
  (yi = 0),
    (x = 1),
    (gi = 2),
    (ui = 3),
    (Ti = 4),
    (fi = 5),
    (hi = 6),
    (ci = 7),
    (Ci = 8),
    (pi = 9),
    (Wi = 10),
    (Gi = 11),
    (Ui = 12),
    (xi = 13),
    (Ai = 14),
    (Li = 15),
    (Si = 16),
    (Ri = 17),
    (Ii = 18),
    (Mi = 19),
    (vi = 20),
    (Pi = 21),
    (Di = 22);
  let Yi = new (class e {
    constructor() {
      for (let e in ((this.Grid = []),
      (this[yi] = []),
      (this[x] = []),
      (this[gi] = []),
      (this[ui] = []),
      (this[Ti] = []),
      (this[fi] = []),
      (this[hi] = []),
      (this[ci] = []),
      (this[Ci] = []),
      (this[pi] = []),
      (this[Wi] = []),
      (this[Gi] = []),
      (this[Ui] = []),
      (this[xi] = []),
      (this[Ai] = []),
      (this[Li] = []),
      (this[Si] = []),
      (this[Ri] = []),
      (this[Ii] = []),
      (this[Mi] = []),
      (this[vi] = []),
      (this[Pi] = []),
      (this[Di] = []),
      (this.Audio = new AudioContext()),
      (this.UI = document.querySelector("main")),
      (this.Input = { mx: 0, my: 0 }),
      (this.WorldFunc = ve),
      (this.ChallengeSeed = ~~(Date.now() / 86400000)),
      (this.PlayerSeed = this.ChallengeSeed),
      (this.ChallengeLevel = 1),
      (this.BountySeed = 0),
      (this.PlayerState = 0),
      (this.Gold = 0),
      (this.MonetizationEnabled = !1),
      (this.Models = []),
      (this.Palette = cn),
      (this.RAF = 0),
      (this.World = []),
      document.addEventListener("visibilitychange", () =>
        document.hidden ? this.Stop() : this.Start(),
      ),
      (this.Canvas3 = document.querySelector("canvas")),
      (this.Canvas2 = document.querySelector("canvas + canvas")),
      (this.Canvas3.width = this.Canvas2.width = window.innerWidth),
      (this.Canvas3.height = this.Canvas2.height = window.innerHeight),
      (this.GL = this.Canvas3.getContext("webgl2")),
      (this.Context = this.Canvas2.getContext("2d")),
      this.GL))
        "function" == typeof this.GL[e] &&
          (this.GL[e.match(/^..|[A-Z]|([1-9].*)/g).join("")] = this.GL[e]);
      this.UI.addEventListener("contextmenu", (e) => e.preventDefault()),
        this.UI.addEventListener("mousedown", (e) => {
          this.Input[`d${e.button}`] = 1;
        }),
        this.UI.addEventListener("mousemove", (e) => {
          (this.Input.mx = e.offsetX), (this.Input.my = e.offsetY);
        }),
        this.GL.enable(2929),
        this.GL.enable(2884),
        (this.MaterialWireframe = Be(this.GL)),
        (this.MaterialInstanced = Fe(this.GL)),
        (this.MaterialParticles = we(this.GL));
    }
    CreateEntity(e = 0) {
      for (let t = 0; t < 1e4; t++)
        if (!this.World[t]) return (this.World[t] = e), t;
      throw new Error("No more entities available.");
    }
    Update(e) {
      let t = performance.now();
      gt(this, e),
        It(this),
        xe(this),
        tt(this, e),
        at(this),
        ct(this),
        Ve(this),
        pt(this, e),
        vt(this, e),
        Ne(this, e),
        ft(this, e),
        Ft(this),
        Qe(this),
        Vt(this),
        Et(this),
        mt(this),
        Tt(this),
        ot(this),
        je(this, e),
        Oe(this),
        Gt(this, performance.now() - t, document.querySelector("#cpu"));
      let n = performance.now();
      Ut(this),
        st(this),
        $t(this),
        Gt(this, performance.now() - n, document.querySelector("#gpu")),
        dt(this, e),
        (this.Input.d0 = 0),
        (this.Input.d2 = 0);
    }
    Start() {
      let e = performance.now(),
        t = (n) => {
          let i = (n - e) / 1e3;
          this.Update(i), (e = n), (this.RAF = requestAnimationFrame(t));
        };
      this.Stop(), this.Audio.resume(), t(e);
    }
    Stop() {
      this.Audio.suspend(), cancelAnimationFrame(this.RAF);
    }
    Add({
      Translation: e,
      Rotation: t,
      Scale: n,
      Using: i = [],
      Children: a = [],
    }) {
      let r = this.CreateEntity(0);
      Ye(e, t, n)(this, r);
      for (let o of i) o(this, r);
      let o = this[0][r];
      for (let r of a) {
        let e = this.Add(r),
          t = this[0][e];
        (t.Parent = o), o.Children.push(t);
      }
      return r;
    }
    Destroy(e) {
      let t = this.World[e];
      if (1 & t) for (let t of this[0][e].Children) this.Destroy(t.EntityId);
      this.World[e] = 0;
    }
  })();
  (window.$ = (...e) => De(Yi, ...e)),
    (window.game = Yi),
    (function t(e) {
      return fetch(e)
        .then((e) => e.arrayBuffer())
        .then((e) => {
          let t = new Uint16Array(e),
            n = [],
            a = 0;
          for (; a < t.length; ) {
            let e = [0, 0, 0],
              i = a + 1,
              r = t[a],
              o = i + r,
              l = [];
            for (a = i; a < o; a++) {
              let e = t[a];
              l.push(
                (15 & e) >> 0,
                (240 & e) >> 4,
                (3840 & e) >> 8,
                (61440 & e) >> 12,
              );
            }
            for (let t = 0; t < l.length; t++)
              e[t % 4] < l[t] + 1 && (e[t % 4] = l[t] + 1);
            n.push(
              new Float32Array(l).map((t, n) => {
                switch (n % 4) {
                  case 0:
                    return t - e[0] / 2 + 0.5;
                  case 1:
                    return t - e[1] / 2 + 0.5;
                  case 2:
                    return t - e[2] / 2 + 0.5;
                  default:
                    return t;
                }
              }),
            );
          }
          return n;
        });
    })("./app/models.tfu").then((e) => {
      (Yi.Models = e), ve(Yi), Yi.Start();
    });
})();
