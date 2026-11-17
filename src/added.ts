/** Codes ajoutés depuis des manuels. Le dernier texte de chaque fiche cite la source. */

type Row = [string, string, string, string, string, string?, string?, number?];
type Range = [string, string, string, string, string, string, string, string, string, number?, string?];

const VRV = "Manuel de service Daikin ESIE13-01 (VRV IV RYYQ-T), partie 6. Libellé traduit du sommaire.";
const YU = "Manuel de service Hitachi Yutaki, chapitre 12, alarmes PC-ARFH1E. Libellé traduit du manuel.";

function row(brand: string, series: string, code: string, meaning: string, cat: string, source: string, detail = "", unsure = false): Row {
  const item: Row = [brand, series, code, meaning, cat, "Source : " + source, detail];
  if (unsure) item.push(1);
  return item;
}

export const D3: Row[] = [
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E1", "Carte UE en défaut", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E2", "Détection de fuite à la terre, ou tore de détection absent (deux libellés E2 dans le sommaire)", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E3", "Pressostat haute pression déclenché", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E4", "Pressostat basse pression déclenché", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E5", "Compresseur inverter bloqué", "comp", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E6", "Alarme d'endommagement du compresseur", "comp", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E7", "Moteur de ventilateur UE bloqué", "vent", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "E9", "Bobine du détendeur électronique en défaut", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "F3", "Température de refoulement anormale", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "F4", "Alarme de retour liquide (wet)", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "F6", "Surcharge en fluide", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "H3", "Faisceau entre carte de contrôle et carte inverter", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "H7", "Signal du moteur de ventilateur non détecté", "vent", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "H9", "Sonde d'air extérieur en défaut", "sonde", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "J3 / J5 / J6 / J7 / J8 / J9", "Sonde de l'unité extérieure en défaut", "sonde", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "JA", "Capteur haute pression en défaut", "sonde", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "JC", "Capteur basse pression en défaut", "sonde", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "L1", "Carte inverter en défaut", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "L4", "Température du radiateur trop élevée", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "L5", "Surintensité instantanée du compresseur inverter", "comp", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "L8", "Surintensité du compresseur inverter", "comp", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "L9", "Échec de démarrage du compresseur inverter", "comp", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "LC", "Transmission carte inverter ↔ carte de contrôle", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "P1", "Déséquilibre de la tension d'alimentation", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "P4", "Sonde du radiateur en défaut", "sonde", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "PJ", "Combinaison inverter / commande ventilateur incorrecte", "conf", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U0", "Alarme de manque de fluide", "fluide", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U1", "Ordre des phases incorrect ou phase ouverte", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U2", "Tension d'alimentation anormale", "carte", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U3", "Opération de contrôle (check operation) non faite", "conf", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U4", "Transmission UI ↔ UE", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U5", "Transmission télécommande ↔ UI", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U7", "Le sommaire indique aussi une erreur de transmission télécommande ↔ UI", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U8", "Transmission entre télécommandes principale et secondaire", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "U9", "Transmission avec une autre UI ou UE", "com", VRV),
  row("dk", "VRV IV RYYQ-T (ESIE13-01)", "UA", "Combinaison UI / télécommande incorrecte, ou façade autonettoyante non prise en charge", "conf", VRV),
  row("yu", "Yutaki (chapitre 12)", "3", "UE non détectée : alarme de transmission", "com", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "11", "Sonde d'entrée d'eau THMwi", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "12", "Sonde de sortie d'eau THMwo", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "13", "Sonde de tube liquide THMl", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "14", "Sonde de tube gaz THMg", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "15", "Sonde du circuit d'eau 2 THMwo2", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "16", "Sonde d'eau chaude sanitaire THMdhwt", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "17", "Sonde auxiliaire 2 THMaux2", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "18", "Sonde auxiliaire 1 THMaux1", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "23", "Sonde de refoulement R134a THMd (Yutaki S80)", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "25", "Sonde auxiliaire 3 THMaux3", "sonde", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "40", "Réglage de l'écran LCD incorrect", "conf", YU),
  row("yu", "Yutaki (chapitre 12)", "61", "Pas de messages cascade depuis 180 s, ou aucun depuis le démarrage", "com", YU, "Connecteur desserré, coupé ou en court-circuit"),
  row("yu", "Yutaki (chapitre 12)", "62", "Conflit de pilotage central et contrôleur cascade", "conf", YU),
  row("yu", "Yutaki (chapitre 12)", "63", "Transmission entre le contrôle central et l'UI", "com", YU, "Fusible UI ou câblage"),
  row("yu", "Yutaki (chapitre 12)", "70", "Alarme hydraulique : débit ou pompe (P70)", "fluide", YU, "Débit d'eau non détecté ou pompe en défaut"),
  row("yu", "Yutaki (chapitre 12)", "72", "Alarme thermostat de l'appoint électrique", "fluide", YU, "Température élevée détectée dans l'appoint"),
  row("yu", "Yutaki (chapitre 12)", "73", "Limite de température du circuit mélangé", "fluide", YU, "Départ circuit 2 au-dessus de la consigne plus le décalage"),
  row("yu", "Yutaki (chapitre 12)", "74", "Limite de température de l'unité (P74)", "fluide", YU, "Température au-dessus de Tmax + 5 K"),
  row("yu", "Yutaki (chapitre 12)", "75", "Protection antigel sur l'entrée ou la sortie d'eau", "fluide", YU),
  row("yu", "Yutaki (chapitre 12)", "83", "Alarme hydraulique de pression (P83)", "fluide", YU, "Pression d'eau non détectée"),
  row("yu", "Yutaki (chapitre 12)", "2", "Protection haute pression de l'UE (coupure)", "fluide", YU, "Pressostat HP, moteur bloqué, phase, ventilateur, fluide ou incondensables"),
  row("yu", "Yutaki (chapitre 12)", "4", "Transmission carte inverter ↔ carte RASC", "com", YU, "Connecteur, fil coupé ou fusible"),
  row("yu", "Yutaki (chapitre 12)", "5", "Ordre des phases ou phase manquante", "carte", YU),
  row("yu", "Yutaki (chapitre 12)", "6", "Tension trop basse ou trop haute pour l'inverter", "carte", YU, "Chute de tension ou section de câble insuffisante"),
  row("yu", "Yutaki (chapitre 12)", "8", "Température de refoulement en tête de compresseur trop élevée", "fluide", YU, "Manque de fluide ou détendeur fermé"),
  row("yu", "Yutaki (chapitre 12)", "48", "Protection surintensité", "comp", YU, "Surcharge, carte inverter, échangeur encrassé ou compresseur bloqué"),
];

export const MOD3: Range[] = [
  ["dk", "VRV IV RYYQ-T", "p", "DRV (VRV)", "RYYQ-T, manuel ESIE13-01", "R410A", "Manuel de service Daikin ESIE13-01", "VRV IV RYYQ-T (ESIE13-01)", "Table du sommaire de la partie 6. D'autres sous-codes existent dans le corps du manuel.", 1],
  ["yu", "Yutaki S / S80 / M", "p", "PAC air/eau", "commande PC-ARFH1E", "à vérifier selon série", "Manuel de service Hitachi Yutaki, chapitre 12", "Yutaki (chapitre 12)", "Codes lus dans le chapitre alarmes. Les codes UE dont le numéro est séparé du libellé dans l'extraction sont marqués à vérifier.", 1],
];
