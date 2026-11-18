import { expect, test, type Locator, type Page } from "@playwright/test";
import { BRANDS, MOD } from "../src/data";

const BASE = process.env.BASE_URL ?? "https://syncro66.github.io/Depan-clim/";

function row(page: Page, label: string): Locator {
  return page.locator(".chip-row").filter({ has: page.locator(".chip-label", { hasText: label }) });
}

async function openApp(page: Page): Promise<void> {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.locator("#q").waitFor();
}

async function reset(page: Page): Promise<void> {
  await page.locator("#q").fill("");
  const table = page.getByRole("button", { name: /Table :/ });
  if (await table.count()) await table.click();
  await row(page, "Marque").getByRole("button", { name: "Toutes", exact: true }).click();
  await row(page, "Catégorie").getByRole("button", { name: "Toutes", exact: true }).click();
  await row(page, "Type").getByRole("button", { name: "Tous", exact: true }).click();
}

async function codesHeading(page: Page): Promise<string> {
  return page.locator("#codes h2").innerText();
}

async function noHorizontalOverflow(page: Page): Promise<void> {
  const delta = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(delta, "débordement horizontal").toBeLessThanOrEqual(1);
}

function picks(): { brand: string; query: string; card: string; table: string }[] {
  return BRANDS.filter((brand) => brand.value !== "all").map((brand) => {
    const gamme = MOD.find((item) => item[0] === brand.value && item[7]);
    if (!gamme || !gamme[7]) throw new Error("pas de table pour " + brand.label);
    return { brand: brand.label, query: gamme[1], card: gamme[1], table: gamme[7] };
  });
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (/favicon|Download the React DevTools/i.test(text)) return;
    errors.push(text);
  });
  (page as Page & { __errors?: string[] }).__errors = errors;
});

function errorsOf(page: Page): string[] {
  return (page as Page & { __errors?: string[] }).__errors ?? [];
}

test("recherche par code, mot-clé, modèle, accents et résultat vide", async ({ page }) => {
  await openApp(page);
  const queries = ["E5", "e5", "U4", "P1", "E28", "1102", "H6", "sonde", "compresseur", "ventilateur", "zen3", "Zen 3", "HMIS3", "PEAD", "FBA", "hyoko", "Hyōkō"];
  for (const query of queries) {
    await page.locator("#q").fill(query);
    await expect(page.locator(".count").first(), query).toBeVisible();
    const cards = await page.locator("article.card").count();
    expect(cards, query).toBeGreaterThan(0);
  }
  await page.locator("#q").fill("zzzzqqqq");
  await expect(page.locator("#codes h2")).toHaveText("Codes : 0 fiche");
  await expect(page.locator(".code")).toHaveCount(0);
  await page.locator("#q").fill("E5");
  await page.locator("#codes article").first().click();
  await expect(page.getByText("Vérifications")).toBeVisible();
  await noHorizontalOverflow(page);
  expect(errorsOf(page)).toEqual([]);
});

test("chips marque, catégorie, type, combinaisons et réinitialisation", async ({ page }) => {
  await openApp(page);
  for (const brand of BRANDS) {
    if (brand.value === "all") continue;
    await row(page, "Marque").getByRole("button", { name: brand.label, exact: true }).click();
    await expect(page.locator("#codes h2")).toContainText(/fiche/);
    await expect(page.locator("#codes article").first()).toContainText(brand.label);
  }
  await reset(page);
  await expect(page.locator(".hint")).toBeVisible();

  for (const label of ["Communication", "Sonde", "Compresseur", "Ventilateur", "Pression / fluide / T°", "Carte / inverter / alim", "Condensats", "Config / divers"]) {
    await row(page, "Catégorie").getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator("#codes article").first(), label).toBeVisible();
  }
  for (const label of ["Murale", "Gainable", "Cassette", "Console", "Plafonnier / allège", "Multi / UE / DRV", "PAC air/eau", "Ballon thermodynamique", "CET monobloc", "CET bi-bloc", "Anciennes gammes"]) {
    await row(page, "Type").getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator("article.card").first(), label).toBeVisible();
  }

  await reset(page);
  await row(page, "Marque").getByRole("button", { name: "Daikin", exact: true }).click();
  await row(page, "Catégorie").getByRole("button", { name: "Sonde", exact: true }).click();
  await row(page, "Type").getByRole("button", { name: "Gainable", exact: true }).click();
  await expect(page.locator("#codes article").first()).toContainText("Daikin");
  await expect(page.locator("#codes .pill").first()).toContainText("Sonde");
  await expect(page.locator(".range-name").first()).toBeVisible();
  await noHorizontalOverflow(page);

  await reset(page);
  await expect(page.locator(".hint")).toBeVisible();
  expect(errorsOf(page)).toEqual([]);
});

test("ouvrir la table de codes pour chaque marque", async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  await openApp(page);
  const shotDir = process.env.SHOT_DIR;
  for (const pick of picks()) {
    await reset(page);
    await row(page, "Marque").getByRole("button", { name: pick.brand, exact: true }).click();
    await page.locator("#q").fill(pick.query);
    const card = page.locator("article.card").filter({ has: page.locator(".range-name", { hasText: pick.card }) }).first();
    await card.click();
    await page.getByRole("button", { name: "Ouvrir la table de codes" }).click();
    await page.waitForFunction(() => {
      const title = document.querySelector("#codes h2");
      if (!title) return false;
      const top = title.getBoundingClientRect().top;
      return top >= 0 && top < 160;
    });
    await expect(page.getByRole("button", { name: "Table : " + pick.table })).toBeVisible();
    await expect(page.getByText(/^Gammes \(/)).toHaveCount(0);
    const subs = await page.locator("#codes .sub").allInnerTexts();
    expect(subs.length, pick.brand).toBeGreaterThan(0);
    for (const sub of subs) expect(sub, pick.brand).toContain(pick.table);
    await expect(page.locator(".range-name", { hasText: pick.card })).toHaveCount(0);
    await noHorizontalOverflow(page);
    if (shotDir && testInfo.project.name === "iphone" && (pick.card === "Zen 3" || pick.card.startsWith("PEAD-M") || pick.card.startsWith("FBA-A"))) {
      await page.screenshot({ path: `${shotDir}/iphone-${pick.card.slice(0, 12).replace(/\W+/g, "-")}.png` });
    }
    await page.getByRole("button", { name: /Table :/ }).click();
    await expect(page.getByRole("button", { name: /Table :/ })).toHaveCount(0);
    await expect(page.getByText(/^Gammes \(/)).toBeVisible();
  }
  expect(errorsOf(page)).toEqual([]);
});

test("cartes, afficher plus, sections et sources", async ({ page }) => {
  await openApp(page);
  await row(page, "Marque").getByRole("button", { name: "Daikin", exact: true }).click();
  const before = await page.locator("#codes article").count();
  const moreCodes = page.getByRole("button", { name: /Afficher plus \(/ });
  await expect(moreCodes).toBeVisible();
  await moreCodes.click();
  await expect.poll(async () => page.locator("#codes article").count()).toBeGreaterThan(before);

  const moreRanges = page.getByRole("button", { name: /Afficher plus de gammes/ });
  if (await moreRanges.count()) {
    const rangesBefore = await page.locator(".range-name").count();
    await moreRanges.click();
    await expect.poll(async () => page.locator(".range-name").count()).toBeGreaterThan(rangesBefore);
  }

  await page.locator("#codes article").first().click();
  await expect(page.getByText("Vérifications", { exact: true })).toBeVisible();
  await page.locator("#codes article").first().click();
  await expect(page.getByText("toucher pour détails").first()).toBeVisible();

  await page.getByRole("button", { name: "Mode d'emploi" }).click();
  await expect(page.getByText("Les chips défilent")).toBeVisible();
  await page.getByRole("button", { name: "Lire le code (par marque)" }).click();
  await expect(page.getByRole("button", { name: "Daikin" }).last()).toBeVisible();
  await page.getByRole("button", { name: "Méthodes de test" }).click();
  await expect(page.getByRole("heading", { name: "Sonde CTN (thermistance)" })).toBeVisible();
  await page.getByRole("button", { name: "Couverture et limites" }).click();
  await expect(page.getByText("Saunier Duval Genia Air")).toBeVisible();
  await page.getByRole("button", { name: "Sources" }).click();
  const links = page.locator(".sources a");
  await expect.poll(async () => links.count()).toBeGreaterThan(20);
  const hrefs = await links.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
  for (const href of hrefs) expect(href).toMatch(/^https?:\/\//);
  await expect(page.locator("p.warning")).toContainText("manuel de service");
  await noHorizontalOverflow(page);
  expect(errorsOf(page)).toEqual([]);
});

test("lisibilité, zones tactiles et absence de débordement", async ({ page }) => {
  await openApp(page);
  await page.locator("#q").fill("E5");
  const font = await page.locator(".code").first().evaluate((el) => {
    const style = getComputedStyle(el);
    return { size: parseFloat(style.fontSize), color: style.color };
  });
  expect(font.size).toBeGreaterThanOrEqual(16);
  const desc = await page.locator(".desc").first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(desc).toBeGreaterThanOrEqual(15);
  const minTouch = await page.locator(".chip, .fold-btn, .clear").evaluateAll((els) => {
    const sizes = els.map((el) => {
      const box = el.getBoundingClientRect();
      return Math.min(box.width, box.height);
    });
    return Math.min(...sizes);
  });
  expect(minTouch).toBeGreaterThanOrEqual(44);
  await noHorizontalOverflow(page);
  await page.locator("#codes article").first().click();
  await noHorizontalOverflow(page);
  expect(errorsOf(page)).toEqual([]);
});

test("manifeste, hors ligne et remplacement du cache", async ({ page, context }) => {
  await openApp(page);
  const manifestUrl = new URL("manifest.webmanifest", BASE);
  const manifestRes = await page.request.get(manifestUrl.toString());
  expect(manifestRes.status()).toBe(200);
  const manifest = await manifestRes.json();
  expect(manifest.name).toBe("Dépannage Clim");
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  for (const icon of manifest.icons as { src: string }[]) {
    const iconRes = await page.request.get(new URL(icon.src, manifestUrl).toString());
    expect(iconRes.status(), icon.src).toBe(200);
    expect(iconRes.headers()["content-type"] ?? "").toContain("png");
  }
  const worker = await page.request.get(new URL("sw.js", BASE).toString());
  expect(worker.status()).toBe(200);
  const workerText = await worker.text();
  expect(workerText).toContain("skipWaiting");
  expect(workerText).toContain("depan-clim-v5");

  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.evaluate(async () => {
    const cache = await caches.open("workbox-precache-v2");
    await cache.put(new Request("./ancienne-version.txt"), new Response("ancienne"));
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#q").waitFor();
  await page.waitForFunction(async () => {
    const keys = await caches.keys();
    return keys.some((key) => key.startsWith("depan-clim-v5")) && !keys.some((key) => key.startsWith("workbox-"));
  });

  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#q").fill("U4");
  await expect(page.locator(".code").first()).toContainText(/U4/i);
});

test("outils : pressions, CO2, surchauffe et charge", async ({ page }) => {
  await openApp(page);
  await page.getByRole("tab", { name: "Outils" }).click();
  await expect(page.getByRole("heading", { name: "Pression / température" })).toBeVisible();
  await expect(page.getByText(/7,12 bar relatifs/)).toBeVisible();
  await expect(page.getByText(/surchauffe 5,0 K/)).toBeVisible();
  await expect(page.getByText("140 g à ajouter")).toBeVisible();
  await page.locator("select").first().selectOption("R410A");
  await page.getByLabel("Charge de l'équipement").fill("10");
  await expect(page.getByText(/20,88 t éq\. CO2/)).toBeVisible();
  await expect(page.getByText(/tous les 12 mois/)).toBeVisible();
  await page.getByRole("button", { name: "Mode clair" }).click();
  await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  await page.getByRole("tab", { name: "Codes" }).click();
  await page.locator("#q").fill("E5");
  await page.locator("#codes article").first().click();
  await page.getByRole("button", { name: "Copier" }).click();
  await expect(page.getByRole("button", { name: "Copié" })).toBeVisible();
  expect(errorsOf(page)).toEqual([]);
});

test("ballon thermodynamique : filtres et NeptuO E5", async ({ page }) => {
  await openApp(page);
  await row(page, "Type").getByRole("button", { name: "Ballon thermodynamique", exact: true }).click();
  await expect(page.locator(".range-name", { hasText: "NeptuO" })).toBeVisible();
  await expect(page.locator(".range-name", { hasText: "Calypso split" })).toBeVisible();
  await row(page, "Type").getByRole("button", { name: "CET monobloc", exact: true }).click();
  await expect(page.locator(".range-name", { hasText: "NeptuO" })).toBeVisible();
  await expect(page.locator(".range-name", { hasText: "Calypso split" })).toHaveCount(0);
  await row(page, "Type").getByRole("button", { name: "CET bi-bloc", exact: true }).click();
  await expect(page.locator(".range-name", { hasText: "Calypso split" })).toBeVisible();
  await expect(page.locator(".range-name", { hasText: "NeptuO" })).toHaveCount(0);
  await row(page, "Type").getByRole("button", { name: "Tous", exact: true }).click();
  await page.locator("#q").fill("NeptuO E5");
  const card = page.locator("#codes article").filter({ hasText: "E5" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Problème de débit d'eau");
  await expect(card).toContainText("Bourgeois Global");
  await card.click();
  await expect(card.getByText("Source : Notice NeptuO III")).toBeVisible();
  await expect(card.getByText(/sonde T4/)).toBeVisible();
  expect(errorsOf(page)).toEqual([]);
});

test("Effie II 230 : recherches Effie E5 et EFFIE II 230", async ({ page }) => {
  await openApp(page);
  await page.locator("#q").fill("Effie E5");
  const card = page.locator("#codes article").filter({ hasText: "E5" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Effie II 230");
  await expect(card).toContainText("température ambiante");
  await card.click();
  await expect(card.getByText(/tube d'eau chaude/)).toBeVisible();
  await expect(card.getByText("Source : Manuel d'installation et d'utilisation Bourgeois Global")).toBeVisible();
  await page.locator("#q").fill("EFFIE II 230");
  await expect(page.locator("#codes article").filter({ hasText: "E5" }).filter({ hasText: "T4" })).toBeVisible();
  expect(errorsOf(page)).toEqual([]);
});

test("chargement et réactivité de la recherche", async ({ page }) => {
  const started = Date.now();
  await page.goto(BASE, { waitUntil: "load" });
  const loadMs = Date.now() - started;
  await page.locator("#q").waitFor();
  const searchStarted = Date.now();
  await page.locator("#q").fill("E5");
  await page.locator(".code").first().waitFor();
  const searchMs = Date.now() - searchStarted;
  console.log(JSON.stringify({ project: test.info().project.name, loadMs, searchMs }));
  expect(loadMs).toBeLessThan(20_000);
  expect(searchMs).toBeLessThan(1_500);
  expect(errorsOf(page)).toEqual([]);
});
