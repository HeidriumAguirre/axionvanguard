const { chromium } = require("playwright");

const AUDIT = `(() => {
  const parse = (c) => {
    if (!c) return null;
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const blend = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  };

  const results = [];
  const seen = new Set();

  document.querySelectorAll("body *").forEach((el) => {
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!text) return;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") return;
    if (parseFloat(cs.opacity) < 0.15) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    // собра capas de fondo hacia arriba
    const layers = [];
    let overImage = false;
    let node = el;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.backgroundImage && s.backgroundImage !== "none") overImage = true;
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) layers.push(c);
      if (c && c.a === 1) break;
      node = node.parentElement;
    }
    if (overImage) return; // sobre foto o gradiente: se revisa a ojo
    if (!layers.length) return;

    let bg = layers[layers.length - 1];
    for (let i = layers.length - 2; i >= 0; i--) bg = blend(layers[i], bg);

    const fgRaw = parse(cs.color);
    if (!fgRaw) return;
    const fg = fgRaw.a < 1 ? blend(fgRaw, bg) : fgRaw;

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const r = ratio(fg, bg);

    const key = cs.color + "|" + cs.fontSize + "|" + text.slice(0, 40);
    if (seen.has(key)) return;
    seen.add(key);

    if (r < need) {
      results.push({
        text: text.slice(0, 70),
        color: cs.color,
        size: size,
        ratio: Math.round(r * 100) / 100,
        need: need,
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className)).slice(0, 90),
      });
    }
  });
  return results;
})()`;

(async () => {
  const browser = await chromium.launch();
  const base = process.argv[2] || "http://localhost:3111";
  const pages = process.argv[3]
    ? process.argv[3].split(",")
    : ["/", "/propiedades", "/propiedades/casa-diseno-frente-al-mar-renaca", "/valoracion", "/publicar", "/servicios", "/nosotros", "/contacto", "/panel"];
  const viewport = process.argv[4] || "desktop";

  const sizes = {
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
  };

  const ctx = await browser.newContext({
    viewport: sizes[viewport],
    deviceScaleFactor: 2,
    isMobile: viewport === "mobile",
    hasTouch: viewport === "mobile",
  });
  const page = await ctx.newPage();

  let total = 0;
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(700);
    const issues = await page.evaluate(AUDIT);
    total += issues.length;
    console.log(`\n=== ${p} [${viewport}] — ${issues.length} problemas de contraste`);
    issues.slice(0, 14).forEach((i) => {
      console.log(
        `  ${String(i.ratio).padStart(5)} (min ${i.need})  ${i.tag}  "${i.text}"  ${i.color}  ${i.cls}`,
      );
    });
  }
  console.log(`\nTOTAL problemas: ${total}`);
  await browser.close();
})();
