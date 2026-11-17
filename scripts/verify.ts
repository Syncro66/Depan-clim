import { ALL, MOD, codesFor, rangesFor, tablesFor } from "../src/data.ts";

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

if (ALL.length !== 1034) fail("nombre de fiches inattendu : " + ALL.length);
if (MOD.length !== 226) fail("nombre de gammes inattendu : " + MOD.length);

console.log(JSON.stringify({
  fiches: ALL.length,
  gammes: MOD.length,
  zen3: zen.map((m) => m[1]),
  peadGammes: peadRanges.length,
  peadCodes: peadCodes.length,
  e5: e5.length,
}));
