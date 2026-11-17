import {
  CABLES,
  PT,
  extraChargeGrams,
  leakCheck,
  ntcOhm,
  pressureAt,
  subcooling,
  superheat,
  temperatureAt,
  tonnesCO2,
} from "../src/tools.ts";

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

function near(actual: number, expected: number, label: string) {
  if (Math.abs(actual - expected) > 0.02) fail(label + " : " + actual + " ≠ " + expected);
}

if (pressureAt("R32", 0, "dew") !== 7.12) fail("R32 à 0 °C");
if (pressureAt("R32", 20, "bubble") !== 13.73) fail("R32 à 20 °C");
if (pressureAt("R410A", 0, "dew") !== 6.97) fail("R410A à 0 °C");
if (pressureAt("R134a", 0, "dew") !== 1.92) fail("R134a à 0 °C");
if (pressureAt("R290", 20, "dew") !== 7.35) fail("R290 à 20 °C");
if (pressureAt("R407C", 0, "bubble") !== 4.67) fail("R407C bulle 0 °C");
if (pressureAt("R407C", 0, "dew") !== 3.59) fail("R407C rosée 0 °C");
near(pressureAt("R32", 5, "dew") ?? 0, (7.12 + 10.06) / 2, "interpolation R32 5 °C");
near(temperatureAt("R32", 7.12, "dew") ?? 99, 0, "température R32 7,12 bar");

if (superheat(5, 0) !== 5) fail("surchauffe");
if (subcooling(20, 15) !== 5) fail("sous-refroidissement");
if (extraChargeGrams(12, 5, 20) !== 140) fail("charge");
if (extraChargeGrams(3, 5, 20) !== 0) fail("charge négative");

near(tonnesCO2(10, 2088), 20.88, "10 kg R410A");
near(tonnesCO2(2, 675), 1.35, "2 kg R32");

const annual = leakCheck({ kg: 10, gwp: 2088, annexI: true, hermetic: false, residential: false });
if (!annual.required || annual.months !== 12 || annual.monthsWithDetector !== 24) fail("contrôle 20,88 t");

const under = leakCheck({ kg: 2, gwp: 675, annexI: true, hermetic: false, residential: false });
if (under.required) fail("sous le seuil de 5 t");

const home = leakCheck({ kg: 2.5, gwp: 2088, annexI: true, hermetic: true, residential: true });
if (home.required) fail("résidentiel hermétique < 3 kg");

const band50 = leakCheck({ kg: 50_000 / 2088, gwp: 2088, annexI: true, hermetic: false, residential: false });
if (band50.months !== 6) fail("seuil 50 t");

const band500 = leakCheck({ kg: 500_000 / 2088, gwp: 2088, annexI: true, hermetic: false, residential: false });
if (band500.months !== 3 || band500.monthsWithDetector !== 6) fail("seuil 500 t");

const propane = leakCheck({ kg: 1, gwp: 0.02, annexI: false, hermetic: false, residential: false });
if (propane.required) fail("R290 ne doit pas être soumis à l'article 5");

if (Math.abs(ntcOhm(10_000, 3950, 25) - 10_000) > 0.01) fail("NTC à 25 °C");
const ntc0 = ntcOhm(10_000, 3950, 0);
if (ntc0 < 30_000 || ntc0 > 36_000) fail("NTC à 0 °C hors plage : " + ntc0);
if (PT.R32.length < 10) fail("table courte");
if (CABLES[0].breaker !== "16 A" || CABLES[3].breaker !== "32 A") fail("câbles");

console.log(JSON.stringify({ r32_0C_bar: 7.12, ntc0_ohm: Math.round(ntc0), tCO2_10kg_R410A: 20.88 }));
