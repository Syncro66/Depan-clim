/** Lot 3 : Sharp (liste officielle) et Bosch/Buderus (manuel de service 6721823168). */

type Row = [string, string, string, string, string, string?, string?, number?];
type Range = [string, string, string, string, string, string, string, string, string, number?, string?];

const SH = "Liste officielle Sharp, global.sharp, Air-Conditioner Error Code List. Libellé traduit.";
const BO = "Manuel de service Bosch 6721823168 (Compress 7000i AW / Logatherm WLW196i), liste d'alarmes. Libellé traduit.";
const SS = "Split (liste officielle Sharp)";
const SB = "Compress 7000i / Logatherm (6721823168)";

function row(brand: string, series: string, code: string, meaning: string, cat: string, source: string, detail = ""): Row {
  return [brand, series, code, meaning, cat, "Source : " + source, detail];
}

function catOf(text: string): string {
  const s = text.toLowerCase();
  if (s.includes("sonde")) return "sonde";
  if (s.includes("liaison") || s.includes("wlan") || s.includes("câblage")) return "com";
  if (s.includes("ventilateur")) return "vent";
  if (s.includes("compresseur") || s.includes("surintensité") || s.includes("courant")) return "comp";
  if (s.includes("eeprom") || s.includes("tension") || s.includes("ipm") || s.includes("pam")) return "carte";
  return "fluide";
}

const sharp: [string, string][] = [
  ["1-0", "Sonde d'échangeur en court-circuit"],
  ["1-1", "Sonde de température extérieure en court-circuit"],
  ["1-2", "Sonde d'aspiration en court-circuit"],
  ["1-3", "Sonde de vanne 2 voies en court-circuit"],
  ["1-4", "Sonde de dissipateur en court-circuit"],
  ["2-0", "Température compresseur trop haute"],
  ["2-1", "Surchauffe au refoulement compresseur"],
  ["2-2", "Surchauffe de l'échangeur UE"],
  ["2-3", "Surchauffe de l'échangeur UI"],
  ["2-4", "Température IPM trop haute"],
  ["5-0", "Sonde d'échangeur en circuit ouvert"],
  ["5-1", "Sonde de température extérieure en circuit ouvert"],
  ["5-2", "Sonde d'aspiration en circuit ouvert"],
  ["5-4", "Sonde de refoulement en circuit ouvert"],
  ["5-5", "Sonde de dissipateur en circuit ouvert"],
  ["6-0", "Surintensité DC"],
  ["6-1", "Niveau de broche IPM en défaut"],
  ["7-0", "Surintensité AC"],
  ["9-0", "Sonde mal placée ou vanne 4 voies"],
  ["9-4", "Vanne 4 voies ou fuite de gaz"],
  ["9-5", "Vannes 2 voies et 3 voies fermées"],
  ["10-0", "EEPROM UE"],
  ["11-0", "Rotation du ventilateur DC de l'UE"],
  ["11-2", "Ventilateur DC de l'UE bloqué"],
  ["13-0", "Démarrage du compresseur"],
  ["14-0", "Surtension PAM"],
  ["14-2", "Sous-tension PAM"],
  ["17-0", "Liaison série en circuit ouvert"],
  ["18-0", "Liaison série en court-circuit"],
  ["18-1", "Câblage série incorrect"],
  ["19-0", "Ventilateur de l'UI"],
  ["20-0", "EEPROM"],
  ["26-1", "Sonde d'ambiance de l'UI"],
  ["26-2", "Sonde de tube de l'UI"],
];

const bosch: [string, string, string, string][] = [
  ["1010", "Pas de communication EMS", "com", "Le boîtier n'a pas reçu son jeton EMS depuis 2 min. Contrôler le bus et la liaison écran / carte installateur"],
  ["5206", "Sonde de départ T0 en défaut", "sonde", "Trois défauts 5204 ou 5205 en 3 h, ou circuit ouvert/court-circuit 30 min. Mesurer la sonde"],
  ["5252", "Débit limité entre UE et UI", "fluide", "Écart de température du fluide caloporteur > 13 K en chaud ou > 7 K en froid. Vannes et circulation"],
  ["5298", "Avertissement haute pression JR1", "fluide", "JR1 > 67 °C (Pe = 44 bar). Filtre, débit, air, vanne d'inversion VW1, pompe PC0"],
  ["5299", "Alarme haute pression JR1", "fluide", "Le 5298 s'est produit 3 fois en 2 h"],
  ["5331", "Communication avec la commande compresseur", "com", "Réponse inverter absente ou fausse. Alimentation UE, Modbus, bus CAN"],
  ["5434", "Capteur basse pression JR0", "sonde", "Circuit JR0 ouvert 15 min, ou trois avertissements 5432 en 2 h"],
  ["5451", "Débit trop faible pendant le dégivrage", "fluide", "TC0 − TC3 > 6 K et JR0 < 6 °C pendant plus de 60 s. Filtre, air, débit, ballon ou bypass"],
  ["5506", "Le compresseur ne démarre pas", "comp", "Pas de démarrage dans les 2 min après l'ordre. Câblage inverter / compresseur"],
];

export const D5: Row[] = [
  ...sharp.map(([code, meaning]) => row("sp", SS, code, meaning, catOf(meaning), SH)),
  ...bosch.map(([code, meaning, cat, detail]) => row("bo", SB, code, meaning, cat, BO, detail)),
];

export const MOD5: Range[] = [
  ["sp", "Split Sharp (liste officielle)", "m", "Mural mono-split", "famille AY-XP, liste global.sharp", "à vérifier selon série", "Liste d'erreurs Sharp, site global.sharp", SS, "Liste publiée par Sharp pour ses climatiseurs. Le numéro affiché peut être du type 1-0. D'autres séries peuvent différer : à vérifier sur le manuel du modèle.", 1],
  ["bo", "Compress 7000i / Logatherm WLW196i", "p", "PAC air/eau", "CS7000iAW, Logatherm WLW196i, manuel 6721823168", "à vérifier selon série", "Manuel de service Bosch 6721823168", SB, "Le manuel classe Bosch Compress 7000i et Buderus Logatherm WLW196i dans la même famille. Extrait des alarmes les plus utiles au dépannage, pas la liste intégrale.", 1],
];
