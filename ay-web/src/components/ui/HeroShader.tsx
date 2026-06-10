"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Vertex shader ────────────────────────────────────────────────────────────
// Displaces the surface with layered value noise so the geometry
// breathes like a living sculpture.
const vertexShader = /* glsl */ `
  uniform float u_time;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  // Compact value noise — cheap and smooth
  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  float vnoise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 157.0 + 113.0 * p.z;
    return mix(
      mix(mix(hash(n+0.0),   hash(n+1.0),   f.x),
          mix(hash(n+157.0), hash(n+158.0), f.x), f.y),
      mix(mix(hash(n+113.0), hash(n+114.0), f.x),
          mix(hash(n+270.0), hash(n+271.0), f.x), f.y),
      f.z
    );
  }

  void main() {
    vNormal = normalMatrix * normal;

    float t = u_time * 0.13;

    // Two octaves — macro swell + fine ripple
    float d  = vnoise(position * 0.20 + vec3(t,        t * 0.65, t * 0.45)) * 0.90;
          d += vnoise(position * 0.48 + vec3(t * 1.25, t * 0.38, t * 0.85)) * 0.38;
          d -= 0.55;  // center around zero
    vDisp = d;

    vec3 displaced = position + normal * d;
    vec4 mvPos     = modelViewMatrix * vec4(displaced, 1.0);
    vViewDir       = normalize(-mvPos.xyz);

    gl_Position = projectionMatrix * mvPos;
  }
`;

// ─── Fragment shader ──────────────────────────────────────────────────────────
// Chromatic / iridescent Fresnel: edges glow with slowly-shifting spectrum,
// surface stays near-white. Desaturated enough to feel premium, not garish.
const fragmentShader = /* glsl */ `
  uniform float u_time;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  // Standard hue-to-RGB wheel
  vec3 hue2rgb(float h) {
    return clamp(
      abs(fract(vec3(h, h + 0.333, h + 0.667)) * 6.0 - 3.0) - 1.0,
      0.0, 1.0
    );
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    // Fresnel rim
    float ndv     = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.6);

    // Soft key light
    vec3  L       = normalize(vec3(0.8, 1.4, 0.9));
    float diffuse = dot(N, L) * 0.5 + 0.5;

    // ── Chromatic color ────────────────────────────────────────────────
    // Hue driven by normal orientation (Y-dominant) + slow time drift.
    // This makes the spectrum cycle through warm amber → violet → electric
    // blue as the shape rotates — like iridescent glass or a hologram.
    float hue = N.y * 0.22 + N.x * 0.09 + u_time * 0.038;
    vec3 spectral = hue2rgb(hue);

    // Desaturate to 44 % — vivid enough to read, refined enough to stay premium
    float luma = dot(spectral, vec3(0.299, 0.587, 0.114));
    spectral   = mix(vec3(luma), spectral, 0.44);

    // ── Surface brightness ─────────────────────────────────────────────
    float bright = mix(0.15, 0.90, diffuse);
          bright = mix(bright, 1.0, fresnel * 0.88);
          bright += vDisp * 0.05;
          bright = clamp(bright, 0.05, 1.0);

    // Base white, then inject chroma at the Fresnel rim + a whisper on surface
    vec3 col = vec3(bright);
    float chromaMask = fresnel * 0.62 + diffuse * 0.07;
    col = mix(col, spectral * bright * 1.12, chromaMask);
    col = clamp(col, 0.0, 1.0);

    // Alpha: transparent core, luminous edges
    float a = mix(0.04, 0.86, fresnel);
          a += diffuse * 0.08;
          a  = clamp(a, 0.0, 0.90);

    gl_FragColor = vec4(col, a);
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const DPR = Math.min(window.devicePixelRatio, 2);

    // ── Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene & camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000);
    camera.position.z = 30;

    // ── Clock
    const clock = new THREE.Clock();

    // ── Uniforms
    const uniforms = {
      u_time:       { value: 0.0 },
      u_frame:      { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(W, H).multiplyScalar(DPR) },
      u_mouse:      { value: new THREE.Vector2(0.5, 0.5) },
    };

    // ── Geometry: TorusKnot — sculptural, non-literal, elegant
    const geometry = new THREE.TorusKnotGeometry(6.5, 2.3, 256, 32);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side:        THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    // Position behind the right (LiveDemo) column; scale so it doesn't
    // bleed into the text area at typical desktop widths.
    mesh.position.set(12, 0.5, 0);
    mesh.scale.setScalar(0.78);
    scene.add(mesh);

    // ── Mouse tracking — normalized [0,1], y-flipped
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const smoothMouse = new THREE.Vector2(0.5, 0.5);

    // ── Accumulated base rotation (so mouse tilt doesn't compound)
    let baseRotX = 0;
    let baseRotY = 0;

    // ── Render loop
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      uniforms.u_time.value  = clock.getElapsedTime();
      uniforms.u_frame.value += 1.0;

      // Ease mouse toward target
      smoothMouse.lerp(targetMouse, 0.04);
      uniforms.u_mouse.value.copy(smoothMouse);

      // Very slow auto-rotation
      baseRotX += 0.0007;
      baseRotY += 0.0011;

      // Mouse adds a gentle non-accumulating tilt
      mesh.rotation.x = baseRotX + (smoothMouse.y - 0.5) * 0.30;
      mesh.rotation.y = baseRotY + (smoothMouse.x - 0.5) * 0.45;

      renderer.render(scene, camera);
    };

    tick();

    // ── Event: resize
    const onResize = () => {
      if (!container) return;
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.u_resolution.value.set(w, h).multiplyScalar(dpr);
    };

    // ── Event: mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.set(
        (e.clientX - rect.left)  / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      );
    };

    window.addEventListener("resize",    onResize,    { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Cleanup
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
      // hidden on mobile — content readability takes priority
      className="absolute inset-0 pointer-events-none hidden sm:block"
      style={{ opacity: 0.52 }}
      aria-hidden="true"
    />
  );
}
