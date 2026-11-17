/** Outils de terrain. Chaque nombre cité est relié à une source, indiqué dans `source`. */

export const ATM_BAR = 1.01325;

export type FluidId = "R32" | "R410A" | "R407C" | "R290" | "R134a" | "R454B";

/** Pression relative (manomètre), bar, au niveau de la mer. Bubble = liquide saturé, dew = vapeur saturée. */
export type PtPoint = { t: number; bubble: number; dew: number };

/**
 * Points à 10 K. R32, R134a et R290 sont purs : bubble = dew.
 * Source : table publiée par ChillerSerwis, calculée avec CoolProp (bibliothèque d'équations d'état du même type que NIST REFPROP), pression relative = absolue − 1,013 bar.
 * https://chillerserwis.eu/refrigerant-pressure-temperature-table/
 * R454B n'a pas de série °C dans cette source : pas de table P/T embarquée.
 */
export const PT_SOURCE =
  "ChillerSerwis, table P/T calculée avec CoolProp (pression relative, niveau de la mer). https://chillerserwis.eu/refrigerant-pressure-temperature-table/";

export const PT: Record<FluidId, PtPoint[]> = {
  R32: [
    { t: -40, bubble: 0.76, dew: 0.76 },
    { t: -30, bubble: 1.72, dew: 1.72 },
    { t: -20, bubble: 3.04, dew: 3.04 },
    { t: -10, bubble: 4.81, dew: 4.81 },
    { t: 0, bubble: 7.12, dew: 7.12 },
    { t: 10, bubble: 10.06, dew: 10.06 },
    { t: 20, bubble: 13.73, dew: 13.73 },
    { t: 30, bubble: 18.26, dew: 18.26 },
    { t: 40, bubble: 23.77, dew: 23.77 },
    { t: 50, bubble: 30.4, dew: 30.4 },
    { t: 60, bubble: 38.32, dew: 38.32 },
  ],
  R410A: [
    { t: -40, bubble: 0.74, dew: 0.74 },
    { t: -30, bubble: 1.68, dew: 1.68 },
    { t: -20, bubble: 2.98, dew: 2.98 },
    { t: -10, bubble: 4.71, dew: 4.71 },
    { t: 0, bubble: 6.97, dew: 6.97 },
    { t: 10, bubble: 9.84, dew: 9.84 },
    { t: 20, bubble: 13.42, dew: 13.42 },
    { t: 30, bubble: 17.82, dew: 17.82 },
    { t: 40, bubble: 23.17, dew: 23.17 },
    { t: 50, bubble: 29.62, dew: 29.62 },
    { t: 60, bubble: 37.34, dew: 37.34 },
  ],
  R134a: [
    { t: -40, bubble: -0.5, dew: -0.5 },
    { t: -30, bubble: -0.17, dew: -0.17 },
    { t: -20, bubble: 0.31, dew: 0.31 },
    { t: -10, bubble: 0.99, dew: 0.99 },
    { t: 0, bubble: 1.92, dew: 1.92 },
    { t: 10, bubble: 3.13, dew: 3.13 },
    { t: 20, bubble: 4.7, dew: 4.7 },
    { t: 30, bubble: 6.69, dew: 6.69 },
    { t: 40, bubble: 9.15, dew: 9.15 },
    { t: 50, bubble: 12.17, dew: 12.17 },
    { t: 60, bubble: 15.8, dew: 15.8 },
  ],
  R290: [
    { t: -40, bubble: 0.1, dew: 0.1 },
    { t: -30, bubble: 0.67, dew: 0.67 },
    { t: -20, bubble: 1.43, dew: 1.43 },
    { t: -10, bubble: 2.44, dew: 2.44 },
    { t: 0, bubble: 3.73, dew: 3.73 },
    { t: 10, bubble: 5.35, dew: 5.35 },
    { t: 20, bubble: 7.35, dew: 7.35 },
    { t: 30, bubble: 9.78, dew: 9.78 },
    { t: 40, bubble: 12.68, dew: 12.68 },
    { t: 50, bubble: 16.12, dew: 16.12 },
    { t: 60, bubble: 20.15, dew: 20.15 },
  ],
  R407C: [
    { t: -40, bubble: 0.19, dew: -0.16 },
    { t: -30, bubble: 0.86, dew: 0.37 },
    { t: -20, bubble: 1.79, dew: 1.13 },
    { t: -10, bubble: 3.03, dew: 2.19 },
    { t: 0, bubble: 4.67, dew: 3.59 },
    { t: 10, bubble: 6.75, dew: 5.44 },
    { t: 20, bubble: 9.36, dew: 7.79 },
    { t: 30, bubble: 12.58, dew: 10.75 },
    { t: 40, bubble: 16.48, dew: 14.4 },
    { t: 50, bubble: 21.15, dew: 18.86 },
    { t: 60, bubble: 26.68, dew: 24.27 },
  ],
  /**
   * Bar relatifs, CoolProp, tous les 10 K.
   * Source publiée : kelvin.engineering, table R-454B calculée avec CoolProp (Bell et al., Ind. Eng. Chem. Res. 2014).
   * Chart fabricant : Chemours Opteon XL41, C-XL41PT-SI rév. 08-23 (kPa).
   */
  R454B: [
    { t: -40, bubble: 0.66, dew: 0.58 },
    { t: -30, bubble: 1.56, dew: 1.44 },
    { t: -20, bubble: 2.79, dew: 2.63 },
    { t: -10, bubble: 4.44, dew: 4.21 },
    { t: 0, bubble: 6.59, dew: 6.28 },
    { t: 10, bubble: 9.31, dew: 8.92 },
    { t: 20, bubble: 12.71, dew: 12.22 },
    { t: 30, bubble: 16.89, dew: 16.28 },
    { t: 40, bubble: 21.94, dew: 21.24 },
    { t: 50, bubble: 28.01, dew: 27.22 },
  ],
};

export const FLUIDS: { id: FluidId; gwp: number; annexI: boolean; note: string }[] = [
  { id: "R32", gwp: 675, annexI: true, note: "HFC-32, PRP 100 ans, annexe I du règlement (UE) 2024/573." },
  { id: "R410A", gwp: 2088, annexI: true, note: "Mélange R32/R125 50/50. PRP 2 088 selon la méthode de l'annexe VI (0,5×675 + 0,5×3 500)." },
  { id: "R407C", gwp: 1774, annexI: true, note: "Mélange R32/R125/R134a 23/25/52. PRP 1 774 (0,23×675 + 0,25×3 500 + 0,52×1 430)." },
  { id: "R134a", gwp: 1430, annexI: true, note: "HFC-134a, PRP 1 430, annexe I du règlement (UE) 2024/573." },
  { id: "R454B", gwp: 465, annexI: true, note: "Mélange R32/R1234yf 68,9/31,1. PRP F-Gas 465. Table P/T CoolProp en bar relatifs ; le chart Chemours Opteon XL41 (C-XL41PT-SI) est en kPa." },
  { id: "R290", gwp: 0.02, annexI: false, note: "Propane, annexe VI du règlement (UE) 2024/573 : PRP 0,02. Hydrocarbure A3, pas un HFC de l'annexe I." },
];

export const FGAS_SOURCE =
  "Règlement (UE) 2024/573, article 5 (contrôles d'étanchéité) et annexes I et VI (PRP). Le PRP à 20 ans de l'annexe I est informatif et n'est pas utilisé.";

export function fluidOf(id: FluidId) {
  const fluid = FLUIDS.find((item) => item.id === id);
  if (!fluid) throw new Error(id);
  return fluid;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Pression relative interpolée linéairement entre les points à 10 K. Null hors plage. */
export function pressureAt(id: FluidId, tempC: number, side: "bubble" | "dew"): number | null {
  const points = PT[id];
  if (tempC < points[0].t || tempC > points[points.length - 1].t) return null;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (tempC >= a.t && tempC <= b.t) {
      const t = b.t === a.t ? 0 : (tempC - a.t) / (b.t - a.t);
      return lerp(a[side], b[side], t);
    }
  }
  return points[points.length - 1][side];
}

/** Température de saturation pour une pression relative, interpolation linéaire. */
export function temperatureAt(id: FluidId, barGauge: number, side: "bubble" | "dew"): number | null {
  const points = PT[id];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const pa = a[side];
    const pb = b[side];
    const lo = Math.min(pa, pb);
    const hi = Math.max(pa, pb);
    if (barGauge >= lo && barGauge <= hi) {
      const t = pb === pa ? 0 : (barGauge - pa) / (pb - pa);
      return lerp(a.t, b.t, t);
    }
  }
  return null;
}

/** Surchauffe (K) = température de la conduite vapeur − température de rosée. */
export function superheat(lineC: number, dewC: number): number {
  return lineC - dewC;
}

/** Sous-refroidissement (K) = température de bulle − température de la conduite liquide. */
export function subcooling(bubbleC: number, liquidC: number): number {
  return bubbleC - liquidC;
}

export const SH_SC_NOTE =
  "Surchauffe à la sortie d'évaporateur : utiliser la température de rosée. Sous-refroidissement à la sortie de condenseur : utiliser la température de bulle. Pour un fluide pur, les deux sont identiques. Il n'y a pas de cible universelle : la notice du modèle prime. Repère souvent vu sur les splits, à vérifier : environ 5 K.";

/** Charge ajoutée (g) = max(0, longueur − longueur préchargée) × g/m de la plaque. */
export function extraChargeGrams(lengthM: number, includedM: number, gramsPerMeter: number): number {
  return Math.max(0, lengthM - includedM) * gramsPerMeter;
}

export function tonnesCO2(kg: number, gwp: number): number {
  return (kg * gwp) / 1000;
}

export type LeakResult = {
  tonnes: number;
  required: boolean;
  months: number | null;
  monthsWithDetector: number | null;
  reason: string;
};

export function leakCheck(input: {
  kg: number;
  gwp: number;
  annexI: boolean;
  hermetic: boolean;
  residential: boolean;
}): LeakResult {
  const tonnes = tonnesCO2(input.kg, input.gwp);
  if (!input.annexI) {
    return {
      tonnes,
      required: false,
      months: null,
      monthsWithDetector: null,
      reason: "Fluide hors annexe I (cas du R290). L'article 5 du règlement (UE) 2024/573 ne lui impose pas ce contrôle d'étanchéité. Le R290 est inflammable (classe A3) : la charge et la mise en œuvre suivent la notice et l'EN 378.",
    };
  }
  if (input.hermetic && input.residential && input.kg < 3) {
    return {
      tonnes,
      required: false,
      months: null,
      monthsWithDetector: null,
      reason: "Équipement hermétiquement scellé, étiqueté, installé en bâtiment résidentiel, charge inférieure à 3 kg : pas de contrôle d'étanchéité (article 5, paragraphe 1).",
    };
  }
  if (input.hermetic && tonnes < 10) {
    return {
      tonnes,
      required: false,
      months: null,
      monthsWithDetector: null,
      reason: "Équipement hermétiquement scellé et étiqueté, moins de 10 tonnes équivalent CO2 de gaz de l'annexe I : pas de contrôle (article 5, paragraphe 1).",
    };
  }
  if (tonnes < 5) {
    return {
      tonnes,
      required: false,
      months: null,
      monthsWithDetector: null,
      reason: "Moins de 5 tonnes équivalent CO2 : le contrôle périodique de l'article 5 n'est pas exigé pour un HFC.",
    };
  }
  let months = 12;
  let monthsWithDetector = 24;
  if (tonnes >= 500) {
    months = 3;
    monthsWithDetector = 6;
  } else if (tonnes >= 50) {
    months = 6;
    monthsWithDetector = 12;
  }
  return {
    tonnes,
    required: true,
    months,
    monthsWithDetector,
    reason: "Article 5, paragraphe 6, du règlement (UE) 2024/573. Avec un système de détection des fuites, l'intervalle est doublé. Contrôle par une personne certifiée.",
  };
}

/** Équation bêta : R = R25 · exp(B · (1/T − 1/T25)), T en kelvin. Courbe indicative. */
export function ntcOhm(r25: number, beta: number, tempC: number): number {
  const t = tempC + 273.15;
  const t25 = 25 + 273.15;
  return r25 * Math.exp(beta * (1 / t - 1 / t25));
}

export const NTC_BETA = 3950;
export const NTC_NOTE =
  "Courbe calculée avec l'équation bêta, B = 3 950, R donnée à 25 °C. Ce n'est pas le tableau d'un modèle : la comparer au tableau R/T du manuel. Repères déjà notés dans l'app : Heiwa ambiance 15 kΩ, tube 20 kΩ, refoulement 50 kΩ ; Toshiba TA/TC 12,5 kΩ à 20 °C.";

/**
 * Courants assignés maximaux des disjoncteurs, cuivre, logements.
 * Source : NF C 15-100, article 10.1.4.7.2, tableau 10-1F, repris par Nexans (autres circuits et circuits spécialisés).
 * https://home.nexans.fr/app/uploads/2022/03/Tableau-section-et-calibres.pdf
 * La chute de tension et le mode de pose peuvent imposer une section plus grande. Ce n'est pas un dimensionnement de PAC.
 */
export const CABLES: { section: string; breaker: string; use: string }[] = [
  { section: "1,5 mm²", breaker: "16 A", use: "Éclairage, 8 prises max., volets. Autres circuits : 16 A max." },
  { section: "2,5 mm²", breaker: "20 A", use: "12 prises, circuits spécialisés (four, lave-linge), chauffe-eau non instantané. Autres circuits : 20 A max." },
  { section: "4 mm²", breaker: "25 A", use: "Autres circuits, y compris alimentation d'un tableau divisionnaire : 25 A max. Chauffage 230 V jusqu'à 5 750 W dans le tableau Nexans." },
  { section: "6 mm²", breaker: "32 A", use: "Plaque de cuisson monophasée. Autres circuits : 32 A max." },
  { section: "10 mm²", breaker: "40 A ou 50 A", use: "Borne 32 A : 10 mm² et 40 A (tableau Nexans). Plancher chauffant 7 500 W : 10 mm² et 50 A. À lire dans la ligne du tableau qui correspond au circuit." },
];

export const CABLE_SOURCE =
  "NF C 15-100, art. 10.1.4.7.2, tableau 10-1F, tel que reproduit par Nexans. La notice de la PAC et le calcul de chute de tension priment pour le circuit dédié.";

export function frNum(value: number, digits = 2): string {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
