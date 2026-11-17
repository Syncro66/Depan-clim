/** Lot 2 : PAC air/eau courantes en France, libellés traduits des manuels cités. */

type Row = [string, string, string, string, string, string?, string?, number?];
type Range = [string, string, string, string, string, string, string, string, string, number?, string?];

const AQ = "Manuel de service Panasonic Aquarea, table 16.4, PAPAMY1209152CE (panasonicproclub). Libellé traduit.";
const LG = "Notice d'installation LG Therma V, MFL68681810, page 84. Libellé traduit.";
const VA = "Notice d'installation Vaillant aroTHERM VWL 55/3 et 85/3, 0020217825, annexe des codes d'erreur. Libellé traduit.";
const VI = "Instructions de service Viessmann Vitotronic 200 type WO1C (Vitocal), sommaire des messages. Libellé traduit.";
const SAQ = "Aquarea (table 16.4)";
const STV = "Therma V (MFL68681810 p.84)";
const SVA = "aroTHERM VWL .. /3 (0020217825)";
const SVI = "Vitocal / Vitotronic 200 WO1C";

function row(brand: string, series: string, code: string, meaning: string, cat: string, source: string, detail = "", unsure = false): Row {
  const item: Row = [brand, series, code, meaning, cat, "Source : " + source, detail];
  if (unsure) item.push(1);
  return item;
}

const aquarea: [string, string, string, string][] = [
  ["H12", "Capacité UI / UE incompatible", "conf", "Câblage UI/UE, cartes, tableau de combinaison du catalogue"],
  ["H15", "Sonde de température compresseur anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["H23", "Sonde de liquide frigorigène de l'UI anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["H42", "Basse pression compresseur anormale", "fluide", "Sonde de tube UE, détendeur ou filtre bouché, manque de fluide, carte UE, compresseur"],
  ["H62", "Débit d'eau : interrupteur de débit", "fluide", "Contrôler le débit, la pompe et l'interrupteur de débit"],
  ["H63", "Basse pression frigorigène anormale", "sonde", "Capteur basse pression UE défectueux ou débranché"],
  ["H64", "Haute pression frigorigène anormale", "sonde", "Capteur haute pression UE défectueux ou débranché"],
  ["H70", "Sécurité OLP de l'appoint électrique", "carte", "OLP débranché ou déclenché"],
  ["H72", "Sonde de ballon anormale", "sonde", "Sonde de ballon"],
  ["H76", "Communication UI ↔ façade de commande", "com", "Liaison ou façade"],
  ["H90", "Communication UI / UE anormale", "com", "Câble de liaison, carte UI ou UE"],
  ["H91", "Sécurité OLP de la résistance de ballon", "carte", "OLP débranché ou déclenché"],
  ["H95", "Raccordement UI / UE incorrect", "conf", "Tension d'alimentation UI/UE"],
  ["H98", "Protection surcharge haute pression UE", "fluide", "Capteur HP, pompe ou fuite d'eau, détendeur, surcharge en fluide, carte UE"],
  ["H99", "Protection antigel de l'échangeur UI", "fluide", "Échangeur UI, manque de fluide"],
  ["F12", "Pressostat déclenché", "fluide", "Pressostat"],
  ["F14", "Vitesse anormale du compresseur UE", "comp", "Compresseur UE"],
  ["F15", "Ventilateur UE bloqué", "vent", "Carte UE ou moteur de ventilateur"],
  ["F16", "Protection courant total", "carte", "Surcharge en fluide ou carte UE"],
  ["F20", "Protection surchauffe compresseur UE", "comp", "Sonde de cuve, détendeur, manque de fluide, carte, compresseur"],
  ["F22", "Surchauffe de l'IPM", "carte", "Échange thermique insuffisant ou IPM"],
  ["F23", "Pic de courant continu UE", "carte", "Carte UE ou compresseur"],
  ["F24", "Cycle frigorifique anormal", "fluide", "Manque de fluide, carte UE, compression faible"],
  ["F25", "Inversion chaud / froid anormale", "fluide", "Vanne 4 voies, bobine"],
  ["F27", "Pressostat anormal", "fluide", "Pressostat"],
  ["F36", "Sonde d'air extérieur anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F37", "Sonde d'entrée d'eau UI anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F40", "Sonde de refoulement UE anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F41", "Contrôle PFC", "carte", "Tension au PFC"],
  ["F42", "Sonde d'échangeur UE anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F43", "Sonde de dégivrage UE anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F45", "Sonde de sortie d'eau UI anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F46", "Transformateur de courant UE en circuit ouvert", "carte", "Manque de fluide, carte UE, compression faible"],
  ["F48", "Sonde de sortie d'évaporateur UE anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F49", "Sonde de sortie de bypass UE anormale", "sonde", "Sonde défectueuse ou débranchée"],
  ["F95", "Protection surcharge haute pression en froid", "fluide", "Capteur HP, pompe ou fuite d'eau, détendeur, surcharge en fluide, carte UE"],
];

const therma: [string, string, string, string][] = [
  ["1", "Sonde d'air ambiance déportée", "sonde", "10 kΩ à 25 °C, débranchée. Connexion, carte ou sonde"],
  ["2", "Sonde frigorigène côté entrée", "sonde", "5 kΩ à 25 °C pour les sondes autres que l'ambiance"],
  ["6", "Sonde frigorigène côté sortie", "sonde", "5 kΩ à 25 °C, débranchée"],
  ["8", "Sonde de ballon d'eau", "sonde", "5 kΩ à 25 °C, débranchée"],
  ["16", "Problème de sondes", "sonde", "Connexion, carte chauffage ou sonde"],
  ["17", "Sonde d'entrée d'eau", "sonde", "5 kΩ à 25 °C, débranchée"],
  ["18", "Sonde de sortie d'eau", "sonde", "5 kΩ à 25 °C, débranchée"],
  ["19", "Sonde d'eau intermédiaire", "sonde", "5 kΩ à 25 °C, débranchée"],
  ["10", "Pompe à eau BLDC bloquée", "vent", "Pompe défectueuse, corps étranger ou faisceau"],
  ["3", "Communication télécommande ↔ unité", "com", "Connecteur débranché, fils inversés ou ligne coupée. Sortie carte 12 V DC"],
  ["5", "Communication carte chauffage ↔ carte inverter", "com", "Carte inverter ou carte chauffage anormale"],
  ["9", "Défaut EEPROM (programme de carte)", "carte", "EEPROM endommagée électriquement ou mécaniquement"],
  ["14", "Interrupteur de débit", "fluide", "Ouvert pompe en marche, ou fermé pompe à l'arrêt. DIP n°5 de la carte chauffage"],
  ["15", "Tube d'eau en surchauffe", "fluide", "Appoint électrique anormal ou départ d'eau au-dessus de 57 °C"],
  ["20", "Fusible thermique coupé", "carte", "Surchauffe de l'appoint, fusible mécanique ou fil endommagé"],
];

const vaillant: [string, string, string, string][] = [
  ["F.022", "Pression d'eau trop basse", "fluide", "Pas assez d'eau dans le circuit de chauffage"],
  ["F.037", "Défaut de ventilateur", "vent", "Obstacle, moteur non raccordé ou liaison carte principale / carte ventilateur coupée"],
  ["F.042", "Résistance de codage", "conf", "Absente, hors plage, ou connecteur X25 mal branché"],
  ["F.073", "Sonde de pression d'eau", "sonde", "Ligne coupée ou en court-circuit"],
  ["F.086", "Thermostat applique ouvert", "fluide", "Plancher trop chaud, débit trop faible ou circuit fermé"],
  ["F.103", "Pièce de rechange non reconnue", "conf", "Paramètre de durée maxi de coupure secteur, ou carte / inverter de rechange incompatible"],
  ["F.514", "Sonde température entrée compresseur", "sonde", "Sonde défectueuse ou mal raccordée à la carte principale"],
  ["F.517", "Sonde température sortie compresseur", "sonde", "Sonde défectueuse ou mal raccordée à la carte principale"],
  ["F.519", "Sonde de température de retour", "sonde", "Sonde défectueuse ou mal raccordée"],
  ["F.520", "Sonde de température de départ", "sonde", "Sonde défectueuse ou mal raccordée"],
  ["F.523", "Sonde VF1", "sonde", "Ligne coupée ou en court-circuit"],
  ["F.526", "Sonde de température EEV circuit extérieur", "sonde", "Sonde défectueuse ou mal raccordée"],
  ["F.532", "Débit du circuit bâtiment trop bas", "fluide", "Circuit non purgé, filtre, manque d'eau, pompe ou signal PWM"],
  ["F.536", "Température de sortie compresseur trop haute", "fluide", "Manque de fluide, sonde, détendeur ou échangeur bouché"],
  ["F.537", "Pressostat haute pression ouvert", "fluide", "Charge, vide, incondensables, débit ou échangeur"],
  ["F.539", "Pression de fluide trop basse", "fluide", "Manque de fluide, débit d'air, dégivrage, vanne 4 voies ou détendeur"],
  ["F.546", "Sonde de haute pression", "sonde", "Câblage défectueux"],
  ["F.554", "Pression de fluide hors plage de fonctionnement", "fluide", "Charge, incondensables, détendeur, échangeur ou vanne 4 voies"],
  ["F.582", "Défaut du détendeur électronique", "fluide", "Isolement de câble ou liaison coupée"],
  ["F.685", "Communication eBus", "com", "Produit non raccordé au régulateur, ou polarité inversée"],
  ["F.750", "Liaison compresseur", "comp", "Isolement de câble ou liaison coupée"],
  ["F.751", "Compresseur : surintensité", "comp", "Tension trop basse ou échangeur encrassé"],
  ["F.752", "Défaut d'inverter", "carte", "Paramètre de coupure secteur, boîtier inverter ou son refroidissement"],
  ["F.753", "Inverter non reconnu", "com", "Liaison carte principale / inverter coupée, ou inverter non alimenté"],
  ["F.755", "Position de la vanne 4 voies incorrecte", "fluide", "Défaut mécanique ou électrique. Contrôler la tension de bobine"],
];

const vitocal: [string, string, string][] = [
  ["10", "Sonde de température extérieure", "sonde"],
  ["A6", "Pompe du circuit secondaire", "fluide"],
  ["A8", "Pompe du circuit de chauffage HC1", "fluide"],
  ["A9", "Pompe à chaleur (message groupé)", "fluide"],
  ["AA", "Dégivrage interrompu", "fluide"],
  ["AC", "Blocage compresseur", "comp"],
  ["C5", "Coupure secteur imposée (power-OFF)", "conf"],
  ["C9", "Circuit frigorifique, pressostat de sécurité HP", "fluide"],
  ["D1", "Sécurité compresseur", "comp"],
  ["D3", "Basse pression", "fluide"],
  ["D4", "Haute pression de régulation", "fluide"],
  ["D6", "Contrôleur de débit", "fluide"],
];

export const D4: Row[] = [
  ...aquarea.map(([code, meaning, cat, detail]) => row("aq", SAQ, code, meaning, cat, AQ, detail)),
  ...therma.map(([code, meaning, cat, detail]) => row("tv", STV, code, meaning, cat, LG, detail)),
  ...vaillant.map(([code, meaning, cat, detail]) => row("va", SVA, code, meaning, cat, VA, detail)),
  ...vitocal.map(([code, meaning, cat]) => row("vi", SVI, code, meaning, cat, VI, "", true)),
];

export const MOD4: Range[] = [
  ["aq", "Aquarea air/eau", "p", "PAC air/eau", "modules hydrauliques Aquarea, manuel PAPAMY1209152CE", "R410A (série du manuel, à vérifier sur la plaque)", "Manuel de service Panasonic, table 16.4", SAQ, "Table 16.4 du manuel de service Pro Club. D'autres générations peuvent ajouter des codes.", 1],
  ["tv", "Therma V (notice 2017)", "p", "PAC air/eau", "AHUW / AHNW, notice MFL68681810", "à vérifier selon série", "Notice d'installation LG Therma V, page 84", STV, "Codes numéro de la page 84. Les séries récentes affichent souvent CH + le même numéro : à vérifier sur le manuel de la série.", 1],
  ["va", "aroTHERM VWL .. /3", "p", "PAC air/eau", "VWL 55/3 A et VWL 85/3 A 230 V", "à vérifier selon série", "Notice Vaillant 0020217825", SVA, "Saunier Duval Genia Air est la variante de la même famille : la table Genia n'a pas été ouverte, ne pas l'appliquer sans la notice Saunier Duval.", 1],
  ["vi", "Vitocal (Vitotronic 200 WO1C)", "p", "PAC air/eau", "Vitocal avec régulation WO1C", "à vérifier selon série", "Instructions de service Vitotronic 200 WO1C", SVI, "Intitulés du sommaire officiel. Le détail de chaque message est dans le chapitre correspondant du manuel.", 1],
];
