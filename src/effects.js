// Small, dependency-free visual effects: scroll progress + parallax,
// tap bursts of hearts/petals, and a one-time petal shower.

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Writes --scroll (0..1) and --sy (px scrolled) on <html> once per frame. */
export function startScrollVars() {
  const root = document.documentElement;
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = root.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    root.style.setProperty("--scroll", max > 0 ? (y / max).toFixed(4) : "0");
    root.style.setProperty("--sy", Math.min(y, 1600).toFixed(0));
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

const burstGlyphs = ["♥", "✦", "❀", "♥", "✧"];
const burstColors = ["#f2a33a", "#f7d27a", "#e9737a", "#ffe6a8", "#f59e0b"];

/* A little burst of hearts and petals wherever the guest taps. */
export function startTapBursts() {
  let live = 0;
  const onDown = (e) => {
    if (reduceMotion() || live > 40) return;
    if (e.target.closest("iframe, .intro")) return;
    const n = 8;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const dist = 40 + Math.random() * 50;
      el.className = "burst";
      el.textContent = burstGlyphs[i % burstGlyphs.length];
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.color = burstColors[i % burstColors.length];
      el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
      el.style.setProperty("--r", `${Math.random() * 120 - 60}deg`);
      el.style.fontSize = `${10 + Math.random() * 10}px`;
      document.body.appendChild(el);
      live++;
      el.addEventListener("animationend", () => {
        el.remove();
        live--;
      });
    }
  };
  window.addEventListener("pointerdown", onDown, { passive: true });
  return () => window.removeEventListener("pointerdown", onDown);
}

/* One-time shower of marigold & rose petals (when the invitation opens). */
export function petalShower(count = 46) {
  if (reduceMotion()) return;
  const layer = document.createElement("div");
  layer.className = "shower";
  layer.setAttribute("aria-hidden", "true");
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = burstColors[i % burstColors.length];
    p.style.animationDelay = `${Math.random() * 1.6}s`;
    p.style.animationDuration = `${2.8 + Math.random() * 2.4}s`;
    p.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    p.style.setProperty("--size", `${8 + Math.random() * 10}px`);
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 6000);
}
