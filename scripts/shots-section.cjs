const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const TARGETS = [
  {
    name: "editorial-mobile",
    vp: { width: 390, height: 844 },
    text: "Casa de diseño frente al mar",
    offset: -120,
  },
  {
    name: "proceso-mobile",
    vp: { width: 390, height: 844 },
    text: "Un proceso corto",
    offset: -80,
  },
  {
    name: "proceso-desktop",
    vp: { width: 1440, height: 900 },
    text: "Un proceso corto",
    offset: -80,
  },
  {
    name: "zonas-desktop",
    vp: { width: 1440, height: 900 },
    text: "Cuatro zonas",
    offset: -60,
  },
  {
    name: "editorial-desktop",
    vp: { width: 1440, height: 900 },
    text: "Casa de diseño frente al mar",
    offset: -260,
  },
];

(async () => {
  const browser = await chromium.launch();
  const base = process.argv[2] || "https://axionvanguard.vercel.app";
  const outDir =
    process.argv[3] || "C:/Users/Heidi/AppData/Local/Temp/opencode/shots4";
  fs.mkdirSync(outDir, { recursive: true });

  for (const t of TARGETS) {
    const ctx = await browser.newContext({
      viewport: t.vp,
      deviceScaleFactor: 2,
      isMobile: t.vp.width < 500,
      hasTouch: t.vp.width < 500,
    });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(900);

    const loc = page.getByText(t.text, { exact: false }).first();
    try {
      await loc.scrollIntoViewIfNeeded();
      await page.evaluate((off) => window.scrollBy(0, off), t.offset);
      await page.waitForTimeout(700);
      const file = path.join(outDir, `${t.name}.png`);
      await page.screenshot({ path: file });
      console.log("OK", file);
    } catch (e) {
      console.log("FALLO", t.name, e.message.slice(0, 90));
    }
    await ctx.close();
  }
  await browser.close();
})();
