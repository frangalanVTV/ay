"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ── Star shaders ────────────────────────────────────────────────────────────

const starVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  uniform float u_time;
  varying float vAlpha;
  void main() {
    vAlpha = 0.35 + 0.65 * abs(sin(u_time * aSpeed + aPhase));
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (180.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const starFrag = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = (1.0 - smoothstep(0.15, 0.5, d)) * vAlpha;
    if (a < 0.02) discard;
    gl_FragColor = vec4(0.82, 0.91, 1.0, a);
  }
`;

// ── Floating signo data ─────────────────────────────────────────────────────

type FloatingSigno = {
  group: THREE.Group;
  baseY: number;
  speed: number;   // world-units rise per viewport-height scrolled
  phase: number;
  dir: number;     // rotation direction
};

// ── Shooting star data ──────────────────────────────────────────────────────

type ShootingStar = {
  line: THREE.Line;
  mat: THREE.LineBasicMaterial;
  geo: THREE.BufferGeometry;
  active: boolean;
  progress: number;
  duration: number;
  startX: number;
  startY: number;
  z: number;
  dirX: number;
  dirY: number;
  length: number;
};

export function CosmicCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const mobile = W < 768;
    const DPR = Math.min(window.devicePixelRatio, mobile ? 1.5 : 2);

    // ── Renderer ──────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !mobile,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      // WebGL unavailable — page still works via CSS background
      return;
    }
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    renderer.setClearColor(0x010b1f, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.transform = "translateZ(0)";
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010b1f);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 300);
    camera.position.z = 6;

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x334488, 2.5));

    const lights: [number, number, [number, number, number]][] = [
      [0xff88ff, 3.5, [-4,  2,  4]],  // magenta: left top front
      [0x44ddff, 3.5, [ 4, -1,  4]],  // cyan: right bottom front
      [0xffffff, 4.0, [ 0,  6, -5]],  // white rim: top back
      [0x8855ff, 2.0, [ 0, -4,  2]],  // violet: below
      [0xff4488, 2.0, [ 3,  3, -3]],  // pink: back right
    ];
    lights.forEach(([color, intensity, pos]) => {
      const l = new THREE.DirectionalLight(color, intensity);
      l.position.set(...pos);
      scene.add(l);
    });

    // Strong white fill light right at the camera — ensures front faces are always lit
    const frontFill = new THREE.PointLight(0xffffff, 8.0, 35);
    frontFill.position.set(0, 0, 7);
    scene.add(frontFill);

    // ── Iridescent material ───────────────────────────────────────────────
    const iridescentMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x0d1540),  // subtle blue self-glow so logo is never fully dark
      metalness: 0.08,
      roughness: 0.14,                      // slight roughness → broad soft specular, visible at all angles
      transparent: true,
      opacity: 1.0,
      iridescence: 1.0,
      iridescenceIOR: 1.85,
      iridescenceThicknessRange: [120, 620] as [number, number],
      clearcoat: 0.85,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide,
    });

    // ── Logo group ────────────────────────────────────────────────────────
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    let logoReady = false;
    let logoBaseScale = 1.0;

    const loader = new GLTFLoader();
    loader.load(
      "/3D/AY.glb",
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.material = iridescentMat;
          }
        });

        // Center and scale to fill ~65% of viewport
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const halfW = halfH * camera.aspect;
        // Logo is a wide text mark (17.9 × 2.0 units) — scale by width, not by max dim.
        // Target: fill 62% of viewport width on desktop, 78% on mobile.
        const fillFrac = mobile ? 0.78 : 0.62;
        const s = (halfW * 2 * fillFrac) / size.x;
        model.scale.setScalar(s);
        // logoBaseScale stays at 1.0 — model.scale already normalises to viewport.
        // Tick animates logoGroup.scale 1.0 → 0.11 for the hero→header handoff.

        logoGroup.add(model);
        logoReady = true;
      },
      undefined,
      (err) => console.warn("GLB load error:", err),
    );

    // ── Floating "!" signs ───────────────────────────────────────────────────
    // signo.glb = isolated "!" mark, native bbox ~9.9 × 2.0 × 8.3 units
    const SIGNO_CONFIGS: Omit<FloatingSigno, "group">[] = [
      { baseY: -5.5, speed: 2.6, phase: 0.0, dir:  1 },
      { baseY: -8.0, speed: 3.4, phase: 1.4, dir: -1 },
      { baseY:-11.0, speed: 2.0, phase: 2.7, dir:  1 },
      { baseY: -4.5, speed: 1.7, phase: 0.9, dir: -1 },
      { baseY:-13.5, speed: 3.8, phase: 3.2, dir:  1 },
      { baseY: -7.0, speed: 2.3, phase: 1.9, dir: -1 },
    ];
    // Spread signs across the horizontal field (placed at varying X and slightly behind scene)
    const SIGNO_X   = [-4.2,  3.6, -2.5,  5.0, -5.8,  1.8];
    const SIGNO_Z   = [ -3,   -4,   -3,   -5,   -4,   -3  ];
    const SIGNO_SCL = [0.12, 0.16, 0.10, 0.18, 0.11, 0.14];

    const floatingSignos: FloatingSigno[] = [];
    const signoMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x0a1030),
      metalness: 0.08,
      roughness: 0.18,
      transparent: true,
      opacity: 0.72,
      iridescence: 0.9,
      iridescenceIOR: 1.75,
      iridescenceThicknessRange: [100, 550] as [number, number],
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });

    const signoLoader = new GLTFLoader();
    signoLoader.load(
      "/3D/signo.glb",
      (gltf) => {
        // Center the template mesh around its bbox
        const template = gltf.scene;
        const bbox = new THREE.Box3().setFromObject(template);
        const bCenter = bbox.getCenter(new THREE.Vector3());
        template.position.sub(bCenter);

        SIGNO_CONFIGS.forEach((cfg, i) => {
          const clone = template.clone(true);
          clone.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) mesh.material = signoMat;
          });
          clone.scale.setScalar(SIGNO_SCL[i]);
          clone.position.set(SIGNO_X[i], cfg.baseY, SIGNO_Z[i]);
          scene.add(clone);
          floatingSignos.push({ group: clone, ...cfg });
        });
      },
      undefined,
      (err) => console.warn("signo.glb load error:", err),
    );

    // ── Stars ─────────────────────────────────────────────────────────────
    const STARS = mobile ? 1200 : 1800;
    const sPos  = new Float32Array(STARS * 3);
    const sSize = new Float32Array(STARS);
    const sPhase = new Float32Array(STARS);
    const sSpeed = new Float32Array(STARS);

    for (let i = 0; i < STARS; i++) {
      const r = 30 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sPos[i * 3 + 2] = r * Math.cos(phi);
      sSize[i]  = 0.25 + Math.random() * 1.5;
      sPhase[i] = Math.random() * Math.PI * 2;
      sSpeed[i] = Math.random() < 0.08
        ? (1.5 + Math.random() * 2.0) // rare fast twinkling
        : (0.08 + Math.random() * 0.35);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    starGeo.setAttribute("aSize",    new THREE.BufferAttribute(sSize, 1));
    starGeo.setAttribute("aPhase",   new THREE.BufferAttribute(sPhase, 1));
    starGeo.setAttribute("aSpeed",   new THREE.BufferAttribute(sSpeed, 1));
    const starMat = new THREE.ShaderMaterial({
      uniforms: { u_time: { value: 0 } },
      vertexShader: starVert,
      fragmentShader: starFrag,
      transparent: true,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── Shooting stars ────────────────────────────────────────────────────
    const NUM_SHOOTERS = 3;
    const shooters: ShootingStar[] = Array.from({ length: NUM_SHOOTERS }, () => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      line.visible = false;
      scene.add(line);
      return { line, mat, geo, active: false, progress: 0, duration: 0, startX: 0, startY: 0, z: 0, dirX: 0, dirY: 0, length: 0 };
    });

    const launchShooter = () => {
      const ss = shooters.find((s) => !s.active);
      if (!ss) return;
      const dist = camera.position.z + 28;
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
      const halfW = halfH * camera.aspect;
      // Start near top edge
      ss.startX = (Math.random() * 2 - 1) * halfW * 0.8;
      ss.startY = halfH * (0.3 + Math.random() * 0.5);
      ss.z = -(dist - camera.position.z);
      // Direction: mostly downward with slight horizontal drift
      const angle = Math.PI * (0.55 + Math.random() * 0.3);
      ss.length = 4 + Math.random() * 5;
      ss.dirX = Math.cos(angle) * ss.length;
      ss.dirY = Math.sin(angle) * ss.length;
      ss.duration = 0.65 + Math.random() * 0.45;
      ss.progress = 0;
      ss.active = true;
      ss.line.visible = true;
    };

    let shootTimer = 0;
    let nextShoot = 7 + Math.random() * 10;

    // ── State ─────────────────────────────────────────────────────────────
    let scrollProg = 0;
    let rawScrollY = 0;
    let mouseX = 0, mouseY = 0;
    let targetMX = 0, targetMY = 0;
    let touchPrevX = 0, touchPrevY = 0;
    let autoRot = -0.25;  // starts slightly angled; auto-spin carries it forward from here
    let currentScale = 1.0;
    let currentPosX = 0, currentPosY = 0;

    // ── Header logo handoff helper ─────────────────────────────────────────
    const updateHeaderLogo = (prog: number) => {
      const el = document.getElementById("header-logo") as HTMLElement | null;
      if (el) el.style.opacity = String(Math.min(1, Math.max(0, (prog - 0.72) / 0.28)));
    };

    // ── Events ────────────────────────────────────────────────────────────
    const onScroll = () => {
      rawScrollY = window.scrollY;
      scrollProg = Math.min(rawScrollY / window.innerHeight, 1.0);
      updateHeaderLogo(scrollProg);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchPrevX = e.touches[0].clientX;
      touchPrevY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchPrevX;
      const dy = e.touches[0].clientY - touchPrevY;
      targetMX += dx * 0.007;
      targetMY -= dy * 0.007;
      // clamp
      targetMX = Math.max(-1, Math.min(1, targetMX));
      targetMY = Math.max(-1, Math.min(1, targetMY));
      touchPrevX = e.touches[0].clientX;
      touchPrevY = e.touches[0].clientY;
    };

    window.addEventListener("scroll",     onScroll,     { passive: true });
    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });

    // ── Compute world-space header position ───────────────────────────────
    const headerTarget = () => {
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const halfW = halfH * camera.aspect;
      return {
        x: -halfW + halfW * 0.11,
        y:  halfH - halfH * 0.14,
        scale: 0.11,
      };
    };

    // ── Tick ──────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse
      mouseX += (targetMX - mouseX) * 0.04;
      mouseY += (targetMY - mouseY) * 0.04;

      // Stars
      starMat.uniforms.u_time.value = elapsed;
      starField.rotation.y  = mouseX * 0.015 + elapsed * 0.00025;
      starField.rotation.x  = mouseY * 0.010 - scrollProg * 0.12;

      // Logo scroll animation (ease-in-out quad)
      const p = scrollProg;
      const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      const ht = headerTarget();
      const tX = ht.x * ep;
      const tY = ht.y * ep;
      const tScale = logoBaseScale * (1.0 - ep * (1.0 - ht.scale));

      currentPosX += (tX - currentPosX) * 0.07;
      currentPosY += (tY - currentPosY) * 0.07;
      currentScale += (tScale - currentScale) * 0.07;
      logoGroup.position.set(currentPosX, currentPosY, 0);
      logoGroup.scale.setScalar(currentScale);

      // Logo rotation: auto spin + mouse, damped by scroll (so it calms down in header)
      autoRot += 0.005;
      const mi = Math.max(0, 1.0 - ep * 0.9); // mouse influence fades as logo moves to corner
      const tRY = autoRot + mouseX * 0.55 * mi;
      const tRX = mouseY * 0.28 * mi;
      logoGroup.rotation.y += (tRY - logoGroup.rotation.y) * 0.04;
      logoGroup.rotation.x += (tRX - logoGroup.rotation.x) * 0.04;

      // Logo opacity: solid until 75% scroll, then fade out by 95%
      if (logoReady) {
        const fade = Math.max(0, 1.0 - Math.max(0, (ep - 0.72) / 0.28));
        iridescentMat.opacity = fade;
      }

      // Shooting stars
      shootTimer += delta;
      if (shootTimer >= nextShoot) {
        launchShooter();
        shootTimer = 0;
        nextShoot = 7 + Math.random() * 14;
      }
      for (const ss of shooters) {
        if (!ss.active) continue;
        ss.progress += delta / ss.duration;
        if (ss.progress >= 1.0) {
          ss.active = false;
          ss.line.visible = false;
          ss.mat.opacity = 0;
          continue;
        }
        // Fade: ramp in 0→20%, hold 20→60%, ramp out 60→100%
        const o = ss.progress < 0.2 ? ss.progress / 0.2
          : ss.progress < 0.6 ? 1.0
          : 1.0 - (ss.progress - 0.6) / 0.4;
        ss.mat.opacity = o * 0.88;

        const headX = ss.startX + ss.dirX * ss.progress;
        const headY = ss.startY + ss.dirY * ss.progress;
        const tailFrac = Math.min(ss.progress, 0.35);
        const tailX = ss.startX + ss.dirX * (ss.progress - tailFrac);
        const tailY = ss.startY + ss.dirY * (ss.progress - tailFrac);

        const pos = ss.geo.attributes.position as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;
        arr[0] = tailX; arr[1] = tailY; arr[2] = ss.z;
        arr[3] = headX; arr[4] = headY; arr[5] = ss.z;
        pos.needsUpdate = true;
      }

      // Floating "!" signs — rise with scroll, gentle bob + slow spin
      if (floatingSignos.length > 0) {
        const scrollDrive = rawScrollY / window.innerHeight;
        for (const si of floatingSignos) {
          si.group.position.y = si.baseY + scrollDrive * si.speed + Math.sin(elapsed * 0.45 + si.phase) * 0.12;
          si.group.rotation.y = elapsed * 0.18 * si.dir + si.phase;
          si.group.rotation.x = Math.sin(elapsed * 0.22 + si.phase) * 0.12;
        }
      }

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll",     onScroll);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("resize",     onResize);
      starGeo.dispose();
      starMat.dispose();
      iridescentMat.dispose();
      signoMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
