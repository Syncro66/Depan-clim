import { ALL, BL, BRANDS, MOD, codesFor, rangesFor, tablesFor } from "../src/data.ts";

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

const zen = rangesFor("zen3", "all", "all");
if (!zen.some((m) => m[1] === "Zen 3")) fail("zen3 ne trouve pas la gamme Zen 3");

const peadRanges = rangesFor("PEAD", "all", "all");
const peadCodes = codesFor("PEAD", "all", "all", "", "all", tablesFor("all", "all"));
if (peadRanges.length + peadCodes.length === 0) fail("PEAD ne renvoie aucun résultat");

const e5 = codesFor("E5", "all", "all", "", "all", {});
if (!e5.some((e) => e.c.toUpperCase().includes("E5"))) fail("E5 ne trouve aucun code");

const u0 = ALL.find((e) => e.b === "dk" && e.c === "U0" && e.s === "Split / Sky Air");
if (!u0 || u0.m !== "Manque de réfrigérant") fail("fiche Daikin U0 absente ou modifiée");

if (ALL.length !== 1097) fail("nombre de fiches inattendu : " + ALL.length);
if (MOD.length !== 228) fail("nombre de gammes inattendu : " + MOD.length);

const series = new Set(ALL.map((e) => e.b + "|" + e.s));
for (const gamme of MOD) {
  if (!gamme[7]) continue;
  if (!series.has(gamme[0] + "|" + gamme[7])) fail("table absente : " + gamme[0] + " / " + gamme[1] + " -> " + gamme[7]);
}
for (const fiche of ALL) {
  if (!fiche.b.trim() || !fiche.s.trim() || !fiche.c.trim() || !fiche.m.trim()) fail("fiche vide : " + fiche.id);
}
const seen = new Set<string>();
for (const fiche of ALL) {
  const key = [fiche.b, fiche.s, fiche.c, fiche.m, fiche.k, fiche.x.join("|"), fiche.y.join("|")].join("\u0001");
  if (seen.has(key)) fail("doublon : " + fiche.b + " " + fiche.c + " " + fiche.s);
  seen.add(key);
}
const ids = new Set<string>();
for (const fiche of ALL) {
  if (ids.has(fiche.id)) fail("id en double : " + fiche.id);
  ids.add(fiche.id);
}
for (const brand of BRANDS) {
  if (brand.value === "all") continue;
  if (!ALL.some((fiche) => fiche.b === brand.value)) fail("marque sans code : " + brand.label);
  if (!BL[brand.value]) fail("libellé manquant : " + brand.value);
}
const expected: [string, "codes" | "gammes"][] = [
  ["E5", "codes"], ["U4", "codes"], ["P1", "codes"], ["E28", "codes"], ["1102", "codes"], ["H6", "codes"],
  ["sonde", "codes"], ["compresseur", "codes"], ["ventilateur", "codes"],
  ["zen3", "gammes"], ["Zen 3", "gammes"], ["HMIS3", "gammes"], ["PEAD", "gammes"], ["FBA", "gammes"], ["hyoko", "gammes"], ["Hyōkō", "gammes"],
];
for (const [query, kind] of expected) {
  const found = kind === "gammes" ? rangesFor(query, "all", "all").length : codesFor(query, "all", "all", "", "all", tablesFor("all", "all")).length;
  if (found < 1) fail("recherche vide : " + query);
}
if (codesFor("zzzzqqqq", "all", "all", "", "all", {}).length !== 0 || rangesFor("zzzzqqqq", "all", "all").length !== 0) {
  fail("zzzzqqqq devrait être vide");
}
if (!rangesFor("hyoko", "all", "all").some((gamme) => gamme[1].includes("Hyōkō"))) fail("hyoko ne trouve pas Hyōkō");
if (!rangesFor("Zen 3", "all", "all").some((gamme) => gamme[1] === "Zen 3")) fail("Zen 3 absent");

console.log(JSON.stringify({
  fiches: ALL.length,
  gammes: MOD.length,
  zen3: zen.map((m) => m[1]),
  peadGammes: peadRanges.length,
  peadCodes: peadCodes.length,
  e5: e5.length,
}));
