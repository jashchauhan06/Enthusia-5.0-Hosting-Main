"use client"

import { useEffect, useRef } from "react"

const vertSrc = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`

// OPTIMIZATION: Reduced loop count from 50 (5e1) to 25 (2.5e1)
const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

// robust tanh fallback
float tanh1(float x){ float e = exp(2.0*x); return (e-1.0)/(e+1.0); }
vec4 tanh4(vec4 v){ return vec4(tanh1(v.x), tanh1(v.y), tanh1(v.z), tanh1(v.w)); }

void main(){
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r  = vec3(u_res, max(u_res.x, u_res.y));
  float t = u_time;

  vec4 o = vec4(0.0);

  vec3 p = vec3(0.0);
  vec3 v = vec3(1.0, 2.0, 6.0);
  float i = 0.0, z = 1.0, d = 1.0, f = 1.0;

  // Reduced iterations for performance
  for ( ; i++ < 2.5e1;
        o.rgb += (cos((p.x + z + v) * 0.1) + 1.0) / d / f / z )
  {
    p = z * normalize(FC * 2.0 - r.xyy);

    vec4 m = cos((p + sin(p)).y * 0.4 + vec4(0.0, 33.0, 11.0, 0.0));
    p.xz = mat2(m) * p.xz;

    p.x += t / 0.2;

    z += ( d = length(cos(p / v) * v + v.zxx / 7.0) /
           ( f = 2.0 + d / exp(p.y * 0.2) ) );
  }

  o = tanh4(0.2 * o);
  o.a = 1.0;
  fragColor = o;
}`

export default function ShaderDemo_ATC() {
    const ref = useRef(null)
    const preRef = useRef(null)

    useEffect(() => {
        const canvas = ref.current
        const pre = preRef.current
        if (!canvas || !pre) return

        const gl = canvas.getContext("webgl2", {
            premultipliedAlpha: false,
            powerPreference: "low-power" // Hint to user browser to save battery
        })
        if (!gl) { pre.textContent = "WebGL2 not available"; return }

        const compile = (type, src) => {
            const sh = gl.createShader(type);
            gl.shaderSource(sh, src);
            gl.compileShader(sh)
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
                throw new Error(gl.getShaderInfoLog(sh) || "compile error")
            return sh
        }
        const link = (vs, fs) => {
            const p = gl.createProgram()
            gl.attachShader(p, compile(gl.VERTEX_SHADER, vs))
            gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs))
            gl.linkProgram(p)
            if (!gl.getProgramParameter(p, gl.LINK_STATUS))
                throw new Error(gl.getProgramInfoLog(p) || "link error")
            return p
        }

        let prog
        try { prog = link(vertSrc, fragSrc) }
        catch (e) { pre.textContent = "Shader error:\n" + e.message; return }

        gl.useProgram(prog)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

        const uRes = gl.getUniformLocation(prog, "u_res")
        const uTime = gl.getUniformLocation(prog, "u_time")

        const resize = () => {
            // OPTIMIZATION: Hardcoded to 1 (or even 0.5 for very low end) 
            // instead of using high-DPI devicePixelRatio
            const dpr = 0.8;
            const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr)
            const h = Math.floor((canvas.clientHeight || window.innerHeight) * dpr)
            if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
            gl.viewport(0, 0, w, h)
            gl.uniform2f(uRes, w, h)
        }
        const onResize = () => { resize() }
        window.addEventListener("resize", onResize, { passive: true })
        resize()

        let raf = 0
        let lastTime = 0
        const fpsInterval = 1000 / 30; // OPTIMIZATION: Cap at 30 FPS

        const draw = (currentTime) => {
            raf = requestAnimationFrame(draw)

            // Throttle FPS
            const elapsed = currentTime - lastTime;
            if (elapsed < fpsInterval) return;

            lastTime = currentTime - (elapsed % fpsInterval);

            // Use performance.now() / 1000 for smooth u_time
            const t = currentTime / 1000
            gl.uniform1f(uTime, t)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
        }

        raf = requestAnimationFrame(draw)

        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
    }, [])

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block", background: "#000" }} />
            <pre ref={preRef} style={{ position: "absolute", top: 8, left: 8, color: "#0f0", whiteSpace: "pre-wrap" }} />
        </div>
    )
}
