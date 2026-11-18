import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const names = fs.readdirSync(dist);
const manifestName = names.find((n) => n === "manifest.webmanifest" || n === "manifest.json");
if (!manifestName) {
  console.error("manifest introuvable dans dist/", names);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(dist, manifestName), "utf8"));
const errors = [];
if (manifest.name !== "Dépannage Clim") errors.push("nom du manifeste : " + manifest.name);
if (manifest.start_url !== "/Depan-clim/" && manifest.start_url !== "./") errors.push("start_url : " + manifest.start_url);
if (manifest.scope !== "/Depan-clim/" && manifest.scope !== "./") errors.push("scope : " + manifest.scope);
const sizes = new Set((manifest.icons || []).map((i) => i.sizes));
if (!sizes.has("192x192")) errors.push("icône 192 absente");
if (!sizes.has("512x512")) errors.push("icône 512 absente");
const sw = names.find((n) => n === "sw.js" || n.startsWith("sw-"));
if (!sw) errors.push("service worker introuvable");
const index = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const assetJs = fs.readdirSync(path.join(dist, "assets")).filter((name) => name.endsWith(".js"));
const js = assetJs.map((name) => fs.readFileSync(path.join(dist, "assets", name), "utf8")).join("\n");
const swText = sw ? fs.readFileSync(path.join(dist, sw), "utf8") : "";
if (!js.includes("serviceWorker.register") && !index.includes("serviceWorker.register")) {
  errors.push("service worker non enregistré");
}
if (!swText.includes("skipWaiting")) errors.push("skipWaiting absent du service worker");
if (!swText.includes("depan-clim-v4")) errors.push("cache depan-clim-v4 absent du service worker");
if (errors.length) {
  console.error(errors.join("\n"));
  console.error(JSON.stringify(manifest, null, 2));
  process.exit(1);
}
console.log("build ok", { manifest: manifestName, sw, start_url: manifest.start_url, scope: manifest.scope });
