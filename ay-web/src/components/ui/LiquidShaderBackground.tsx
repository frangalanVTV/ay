"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_intensity;   // saturation + v-contrast boost  [0 – 3]
  uniform float u_hue;         // hue rotation in radians        [0 – 2π]

  // ── Hue rotation via Rodrigues around the (1,1,1) grey axis ────────────────
  vec3 hueShift(vec3 col, float angle) {
    vec3  k = vec3(0.57735026918);
    float c = cos(angle);
    float s = sin(angle);
    return col * c + cross(k, col) * s + k * dot(k, col) * (1.0 - c);
  }

  mat2 rot2d(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

  float r(float a, float b) {
    return fract(sin(dot(vec2(a, b), vec2(12.9898, 78.233))) * 43758.5453);
  }

  float h(float a) {
    return fract(sin(a * 1016.6794) * 43758.5453);
  }

  float noise3(vec3 x) {
    vec3  p = floor(x);
    vec3  f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    return mix(
      mix(mix(h(n      ), h(n +   1.0), f.x), mix(h(n +  57.0), h(n +  58.0), f.x), f.y),
      mix(mix(h(n+113.0), h(n + 114.0), f.x), mix(h(n + 170.0), h(n + 171.0), f.x), f.y),
      f.z
    );
  }

  vec3 dnoise2f(vec2 p) {
    float i = floor(p.x), j = floor(p.y);
    float u = p.x - i, v = p.y - j;
    float du = 30.0 * u * u * (u * (u - 2.0) + 1.0);
    float dv = 30.0 * v * v * (v * (v - 2.0) + 1.0);
    u = u * u * u * (u * (u * 6.0 - 15.0) + 10.0);
    v = v * v * v * (v * (v * 6.0 - 15.0) + 10.0);
    float a = r(i,       j      );
    float b = r(i + 1.0, j      );
    float c = r(i,       j + 1.0);
    float d = r(i + 1.0, j + 1.0);
    float k0 = a, k1 = b - a, k2 = c - a, k3 = a - b - c + d;
    return vec3(k0 + k1*u + k2*v + k3*u*v, du*(k1 + k3*v), dv*(k2 + k3*u));
  }

  float fbm(vec2 uv) {
    vec2  p        = uv;
    float slowTime = u_time * 0.06;
    float f = 0.0, dx = 0.0, dz = 0.0, w = 0.5;
    for (int i = 0; i < 10; ++i) {
      vec3 n = dnoise2f(uv);
      dx += n.y; dz += n.z;
      f  += w * n.x / (1.0 + dx*dx + dz*dz);
      w  *= 0.86;
      uv *= 1.16;
      uv *= rot2d(1.25 * noise3(vec3(p * 0.1, 0.12 * slowTime))
                + 0.75 * noise3(vec3(p * 0.1, 0.20 * slowTime)));
    }
    return f;
  }

  float fbmLow(vec2 uv) {
    float f = 0.0, dx = 0.0, dz = 0.0, w = 0.5;
    for (int i = 0; i < 4; ++i) {
      vec3 n = dnoise2f(uv);
      dx += n.y; dz += n.z;
      f  += w * n.x / (1.0 + dx*dx + dz*dz);
      w  *= 0.75;
      uv *= 1.5;
    }
    return f;
  }

  void main() {
    vec2 uv = 1.0 - 2.0 * (gl_FragCoord.xy / u_resolution.xy);
    uv.y   /= u_resolution.x / u_resolution.y;

    float t   = u_time * 0.06;
    vec2 denom = length(uv * 2.5) * (uv * 30.0);
    vec2 rv    = uv / (denom + sign(denom) * 1e-4 + 1e-5);

    uv *= rot2d(0.3 * t);
    float val = 0.5 * fbm(uv * 2.0 * fbmLow(length(uv) + rv - t));
    uv *= rot2d(-0.6 * t);

    // ── intensity drives v-contrast: more push → sharper cloud edges ──────────
    float vScale = 0.7 + u_intensity * 0.65;   // [0.7 … 2.65]
    float v = 0.5 * fbm(uv * val * 8.0) + 0.02 * r(uv.x, uv.y);
    v  = 1.6 * v;
    v *= 5.5 * vScale;
    v  = v / (1.0 + v);
    v  = smoothstep(0.12, 0.92, v);

    vec3 skyLight  = vec3(0.74, 0.88, 1.00);
    vec3 skyMid    = vec3(0.42, 0.70, 0.96);
    vec3 blueDeep  = vec3(0.10, 0.32, 0.68);
    vec3 warmWhite = vec3(0.96, 0.98, 0.93);

    vec3 col = mix(skyLight, skyMid,    smoothstep(0.12, 0.58, v));
         col = mix(col,      blueDeep,  smoothstep(0.52, 0.95, v) * 0.55);
         col = mix(col,      warmWhite, smoothstep(0.68, 1.00, v) * 0.38);
         col = mix(vec3(0.65, 0.85, 1.0), col, 0.88);

    // ── saturation boost via intensity ─────────────────────────────────────────
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, max(u_intensity, 0.0));

    // ── hue rotation ───────────────────────────────────────────────────────────
    col = hueShift(col, u_hue);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export interface LiquidShaderBackgroundProps {
  opacity?:   number;   // CSS opacity, 0–1
  intensity?: number;   // shader saturation + contrast boost, 0–3
  hue?:       number;   // hue rotation in degrees, 0–360
}

export function LiquidShaderBackground({
  opacity   = 0.60,
  intensity = 1.40,
  hue       = 0,
}: LiquidShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs so the tick loop always reads the latest prop values without re-mounting
  const intensityRef = useRef(intensity);
  const hueRef       = useRef((hue * Math.PI) / 180);

  useEffect(() => { intensityRef.current = intensity; }, [intensity]);
  useEffect(() => { hueRef.current = (hue * Math.PI) / 180; }, [hue]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 640) return;

    const W   = container.clientWidth;
    const H   = container.clientHeight;
    const DPR = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock  = new THREE.Clock();

    const uniforms = {
      u_time:       { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(W * DPR, H * DPR) },
      u_mouse:      { value: new THREE.Vector2(0.5, 0.5) },
      u_intensity:  { value: intensityRef.current },
      u_hue:        { value: hueRef.current },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.u_time.value      = clock.getElapsedTime();
      uniforms.u_intensity.value = intensityRef.current;
      uniforms.u_hue.value       = hueRef.current;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w * dpr, h * dpr);
    };

    const onMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(
        e.clientX  / window.innerWidth,
        1.0 - e.clientY / window.innerHeight,
      );
    };

    window.addEventListener("resize",    onResize,    { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none hidden sm:block"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
