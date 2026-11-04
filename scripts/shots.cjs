const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const base = process.argv[2] || "http://localhost:3111";
  const outDir =
    process.argv[3] || "C:/Users/Heidi/AppData/Local/Temp/opencode/shots";
  fs.mkdirSync(outDir, { recursive: true });

  const jobs = [
    { name: "home-desktop", vp: { width: 1440, height: 900 }, url: "/", full: true },
    { name: "home-mobile", vp: { width: 390, height: 844 }, url: "/", full: true },
    { name: "home-mobile-hero", vp: { width: 390, height: 844 }, url: "/", full: false },
    { name: "process-desktop", vp: { width: 1440, height: 900 }, url: "/#proceso", full: false },
    { name: "list-mobile", vp: { width: 390, height: 844 }, url: "/propiedades", full: false },
    { name: "detalle-desktop", vp: { width: 1440, height: 900 }, url: "/propiedades/casa-diseno-frente-al-mar-renaca", full: false },
  ];

  for (const job of jobs) {
    const ctx = await browser.newContext({
      viewport: job.vp,
      deviceScaleFactor: 2,
      isMobile: job.vp.width < 500,
      hasTouch: job.vp.width < 500,
    });
    const page = await ctx.newPage();
    await page.goto(base + job.url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1200);

    if (job.url === "/#proceso") {
      const el = await page.$("section:has(h2)");
      if (el) await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }

    const file = path.join(outDir, `${job.name}.png`);
    await page.screenshot({ path: file, fullPage: job.full });
    console.log("OK", file);
    await ctx.close();
  }
  await browser.close();
})();
