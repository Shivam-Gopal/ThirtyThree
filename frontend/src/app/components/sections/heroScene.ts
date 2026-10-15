/**
 * Hero background: particle field + wireframe shapes (Three.js).
 * Loaded with a dynamic import() after first paint, so `three` never blocks the initial load.
 */
import {
  AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, Group, Mesh, MeshBasicMaterial,
  PerspectiveCamera, Points, PointsMaterial, Scene, TorusGeometry, WebGLRenderer,
} from "three";

const CREAM = { r: 0.953, g: 0.933, b: 0.878 };
const GOLD = { r: 0.796, g: 0.71, b: 0.522 };
const BEIGE_HEX = 0xe7dab8;
const CREAM_HEX = 0xf3eee0;

export function initHeroScene(canvas: HTMLCanvasElement, section: HTMLElement): () => void {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  const lowPower = window.innerWidth < 640;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2));

  const size = () => {
    const r = section.getBoundingClientRect();
    return { w: Math.max(r.width, 1), h: Math.max(r.height, 1) };
  };
  let { w, h } = size();
  renderer.setSize(w, h);

  const scene = new Scene();
  const cam = new PerspectiveCamera(60, w / h, 0.1, 1000);
  cam.position.set(0, 0, 80);

  // fewer particles on phones → same look, far less GPU work
  const count = lowPower ? 1800 : 4000;
  const geo = new BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 200;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    const accent = Math.random() > 0.82;
    const c = accent ? GOLD : CREAM;
    const dim = accent ? 1 : 0.72 + Math.random() * 0.28;
    col[i * 3] = c.r * dim; col[i * 3 + 1] = c.g * dim; col[i * 3 + 2] = c.b * dim;
  }
  geo.setAttribute("position", new BufferAttribute(pos, 3));
  geo.setAttribute("color", new BufferAttribute(col, 3));
  const pts = new Points(
    geo,
    new PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.5, depthWrite: false, blending: AdditiveBlending }),
  );
  scene.add(pts);

  const numGroup = new Group();
  [-0.8, 0.8].forEach((x) => {
    const mesh = new Mesh(
      new TorusGeometry(3.5, 0.15, 12, 80),
      new MeshBasicMaterial({ color: BEIGE_HEX, wireframe: true, opacity: 0.16, transparent: true }),
    );
    mesh.position.x = x * 12;
    numGroup.add(mesh);
  });
  numGroup.position.set(30, -10, -30);
  scene.add(numGroup);

  const cubes: { mesh: Mesh; speed: number; rotX: number; rotY: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const s = Math.random() * 2 + 0.5;
    const mesh = new Mesh(
      new BoxGeometry(s, s, s),
      new MeshBasicMaterial({ color: Math.random() > 0.55 ? BEIGE_HEX : CREAM_HEX, wireframe: true, opacity: 0.07 + Math.random() * 0.09, transparent: true }),
    );
    mesh.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    scene.add(mesh);
    cubes.push({ mesh, speed: Math.random() * 0.005 + 0.002, rotX: Math.random() * 0.003, rotY: Math.random() * 0.003 });
  }

  let mouseX = 0, mouseY = 0;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onMove = (e: MouseEvent) => {
    const r = section.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  if (fine) document.addEventListener("mousemove", onMove, { passive: true });

  const onResize = () => {
    ({ w, h } = size());
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  let t = 0;
  let raf: number | null = null;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    t += 0.005;
    pts.rotation.y += 0.0003;
    pts.rotation.x += 0.0001;
    cam.position.x += (mouseX * 8 - cam.position.x) * 0.03;
    cam.position.y += (-mouseY * 4 - cam.position.y) * 0.03;
    cam.lookAt(0, 0, 0);
    numGroup.rotation.y = t * 0.3;
    for (const c of cubes) {
      c.mesh.rotation.x += c.rotX;
      c.mesh.rotation.y += c.rotY;
      c.mesh.position.y += Math.sin(t + c.speed * 100) * c.speed * 0.3;
    }
    renderer.render(scene, cam);
  };
  loop();

  // stop rendering entirely while the hero is off-screen
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (raf === null) loop(); }
    else if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
  });
  io.observe(section);

  return () => {
    if (raf !== null) cancelAnimationFrame(raf);
    io.disconnect();
    document.removeEventListener("mousemove", onMove);
    window.removeEventListener("resize", onResize);
    geo.dispose();
    renderer.dispose();
  };
}
