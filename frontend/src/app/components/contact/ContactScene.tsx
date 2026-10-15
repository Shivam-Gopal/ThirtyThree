"use client";
import { useEffect, useRef } from "react";

/** Decorative three.js icosahedron + rings. Lazy-loaded, paused offscreen, skipped for reduced motion. */
export default function ContactScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let cancelled = false;
    (async () => {
      const THREE = await import("three");
      if (cancelled) return;
      const w = el.clientWidth || 400, h = el.clientHeight || 400;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
      cam.position.z = 6;
      const mat = new THREE.MeshBasicMaterial({ color: 0xcbb585, wireframe: true });
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), mat);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.01, 8, 96), mat);
      const ring2 = ring.clone(); ring2.rotation.x = 1.2;
      scene.add(ico, ring, ring2);
      let raf = 0, visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
      io.observe(el);
      const loop = () => {
        if (!visible) return;
        ico.rotation.x += 0.003; ico.rotation.y += 0.005; ring.rotation.z += 0.004; ring2.rotation.y += 0.003;
        renderer.render(scene, cam);
        raf = requestAnimationFrame(loop);
      };
      loop();
      stop = () => { cancelAnimationFrame(raf); io.disconnect(); renderer.dispose(); renderer.domElement.remove(); };
    })();
    return () => { cancelled = true; stop(); };
  }, []);
  return <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25" />;
}
