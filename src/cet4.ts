type Row = [string, string, string, string, string, string?, string?, number?];
type Range = [string, string, string, string, string, string, string, string, string, number?, string?];

function row(b: string, s: string, c: string, m: string, k: string, source: string, detail: string): Row {
  return [b, s, c, m, k, "Source : " + source, detail];
}

const CM = "City Multi PUHY-P200/250 (HWE06050)";
const SRC_CM = "Service Handbook Mitsubishi Electric City Multi PUHY-P200/250M-B1-BM, HWE06050, chapitre V, listes de check codes";
const VC = "Vitocal 060-A (6154854)";
const SRC_VC = "Montage- und Serviceanleitung Viessmann Vitocal 060-A, 6154854, chapitre 6 Störungsbehebung";

function listed(code: string, meaning: string, cat: string): Row {
  return row("me", CM, code, meaning, cat, SRC_CM,
    "Définition de la liste des check codes du Service Handbook HWE06050. Le chapitre V de ce handbook décrit le contrôle de ce code.");
}

const city: Row[] = [
  listed("0403", "Erreur de communication série entre la carte principale et la carte inverter", "com"),
  listed("0900", "Mode d'essai", "conf"),
  listed("1102", "Température de refoulement anormale", "fluide"),
  listed("1111", "Sonde de température de saturation basse pression TH2", "sonde"),
  listed("1143", "Température de carter du compresseur anormale", "comp"),
  listed("1301", "Basse pression anormale", "fluide"),
  listed("1302", "Haute pression anormale", "fluide"),
  listed("1500", "Charge de fluide excessive ou insuffisante", "fluide"),
  listed("2500", "Fuite d'eau", "cond"),
  listed("2502", "Pompe de relevage ou flotteur", "cond"),
  listed("2503", "Pompe de relevage ou flotteur", "cond"),
  listed("2600", "Fuite d'eau", "cond"),
  listed("2601", "Alimentation en eau coupée", "fluide"),
  listed("4102", "Phase ouverte", "carte"),
  listed("4103", "Inversion de phase ou phase ouverte", "carte"),
  listed("4115", "Signal de synchronisation de l'alimentation anormal", "carte"),
  listed("4116", "Erreur de vitesse ou défaut moteur", "comp"),
  listed("4121", "Défaut du dispositif d'harmoniques", "carte"),
  listed("4200", "Défaut du capteur ou du circuit Vdc", "carte"),
  listed("4220", "Protection chute de tension du bus", "carte"),
  listed("4230", "Protection surchauffe du radiateur", "carte"),
  listed("4240", "Protection de surcharge", "comp"),
  listed("4250", "Anomalie IPM ou tension de bus", "carte"),
  listed("4260", "Anomalie du ventilateur de refroidissement", "vent"),
  listed("5109", "Défaut des sondes de température de liquide du circuit CS, TH9 et TH9b", "sonde"),
  listed("5110", "Défaut de la sonde de température du radiateur inverter THHS", "sonde"),
  listed("5112", "Défaut de la sonde de carter compresseur TH10", "sonde"),
  listed("5201", "Défaut du capteur haute pression HPS", "sonde"),
  listed("5301", "Défaut du capteur ou du circuit IDC", "carte"),
  listed("6600", "Adresses en double", "conf"),
  listed("6602", "Défaut matériel du processeur de transmission", "com"),
  listed("6603", "Bus de transmission occupé", "com"),
  listed("6606", "Erreur de communication avec le processeur de transmission", "com"),
  listed("6607", "Pas d'accusé de réception", "com"),
  listed("6608", "Pas de réponse", "com"),
  listed("6810", "Erreur de communication de la télécommande d'unité", "com"),
  listed("7100", "Erreur de puissance totale raccordée", "conf"),
  listed("7101", "Erreur de code de puissance", "conf"),
  listed("7102", "Erreur du nombre d'unités raccordées", "conf"),
  listed("7105", "Erreur de réglage d'adresse", "conf"),
  listed("7106", "Erreur de réglage d'attribut", "conf"),
  listed("7109", "Erreur de paramètres de raccordement", "conf"),
  listed("7110", "Information de raccordement d'unité non réglée", "conf"),
  listed("7111", "Défaut de la sonde de la télécommande", "sonde"),
  listed("7130", "Unités incompatibles", "conf"),
  listed("1202", "Préliminaire : température de refoulement anormale ou sonde TH1", "fluide"),
  listed("1205", "Préliminaire : sonde de température de tuyauterie TH5", "sonde"),
  listed("1211", "Préliminaire : saturation basse pression ou sonde TH2", "sonde"),
  listed("1212", "Préliminaire : saturation basse pression ou sonde de niveau de liquide TH4", "sonde"),
  listed("1213", "Préliminaire : saturation basse pression ou sonde sous le niveau de liquide TH3", "sonde"),
  listed("1214", "Préliminaire : sonde ou circuit THH", "sonde"),
  listed("1216", "Préliminaire : sonde de sortie liquide du sous-refroidisseur TH7", "sonde"),
  listed("1217", "Préliminaire : sonde de sortie bypass du sous-refroidisseur TH8", "sonde"),
  listed("1219", "Préliminaire : température de liquide de détection de composition ou sa sonde", "sonde"),
  listed("1221", "Préliminaire : sonde de température d'air extérieur TH6", "sonde"),
  listed("1243", "Préliminaire : température d'huile du compresseur ou sa sonde", "sonde"),
  listed("1402", "Préliminaire : haute pression ou capteur de pression", "fluide"),
  listed("1600", "Préliminaire : surcharge de fluide", "fluide"),
  listed("1605", "Préliminaire : protection de tirage au vide", "fluide"),
  listed("1607", "Préliminaire : circuit CS étranglé", "fluide"),
  listed("4171", "Préliminaire : dispositif d'harmoniques", "carte"),
  listed("4320", "Préliminaire : chute de tension du bus", "carte"),
  listed("4330", "Préliminaire : surchauffe du radiateur", "carte"),
  listed("4340", "Préliminaire : protection de surcharge", "comp"),
  listed("4350", "Préliminaire : IPM ou tension de bus", "carte"),
  listed("4360", "Préliminaire : ventilateur de refroidissement", "vent"),
];

const vitocal: Row[] = [
  row("vi", VC, "ER 0", "Panneau de commande défectueux", "carte", SRC_VC,
    "Remplacer le panneau de commande. Acquittement : maintenir ensemble les touches indiquées par la notice et OK pendant 3 secondes."),
  row("vi", VC, "ER 1", "Le pressostat haute pression de sécurité s'est ouvert. Surpression du circuit de la pompe à chaleur", "fluide", SRC_VC,
    "Couper puis rétablir l'alimentation, ou acquitter le message. Maintenir ensemble les touches indiquées par la notice et OK pendant 3 secondes."),
  row("vi", VC, "ER 2", "Le limiteur de température de sécurité s'est ouvert. Surchauffe du ballon d'eau chaude", "cond", SRC_VC,
    "Soutirer de l'eau chaude. Réarmer le limiteur de température de sécurité."),
  row("vi", VC, "ER 3", "Court-circuit ou coupure de la sonde de température haute du ballon NTC1", "sonde", SRC_VC,
    "Mesurer la résistance. Remplacer la sonde si besoin."),
  row("vi", VC, "ER 4", "Court-circuit ou coupure de la sonde de température d'entrée d'air NTC2", "sonde", SRC_VC,
    "Mesurer la résistance. Remplacer la sonde si besoin."),
  row("vi", VC, "ER 5", "Court-circuit ou coupure de la sonde d'évaporateur NTC4", "sonde", SRC_VC,
    "Mesurer la résistance. Remplacer la sonde si besoin."),
  row("vi", VC, "ER 6", "Court-circuit ou coupure de la sonde de température basse du ballon NTC3", "sonde", SRC_VC,
    "Mesurer la résistance. Remplacer la sonde si besoin."),
  row("vi", VC, "ER 8", "Problème de communication entre le panneau et la régulation de la pompe à chaleur", "com", SRC_VC,
    "Contrôler les raccordements et le câble."),
  row("vi", VC, "ER 9", "Durée de chauffe de l'eau sanitaire anormalement longue", "fluide", SRC_VC,
    "Contrôler la pompe à chaleur, la résistance électrique sèche et l'étanchéité."),
  row("vi", VC, "ER 10", "Pas de bascule entre tarif haut et tarif bas depuis 24 heures", "conf", SRC_VC,
    "Contrôler l'entrée haut tarif / bas tarif."),
];

export const D9: Row[] = city.concat(vitocal);

export const MOD9: Range[] = [
  ["me", "City Multi PUHY-P200/250", "p", "DRV", "PUHY-P200M-B1-BM, PUHY-P250M-B1-BM", "voir la plaque", "Service Handbook HWE06050", CM, "Liste des check codes du chapitre V. Les lignes du tableau où plusieurs sondes sont mélangées sur un même code (1112, 1113, 5101 à 5108, 4300) ne sont pas reprises.", 0, "Code à 4 chiffres sur la télécommande. L'adresse et le code défilent en alternance."],
  ["vi", "Vitocal 060-A", "m", "Ballon thermodynamique monobloc", "T0E-ze et T0S-ze, notice 6154854", "voir la plaque", "Montage- und Serviceanleitung 6154854", VC, "Chapitre 6 de la notice de montage et de maintenance Vitocal 060-A. Il n'y a pas de ER 7 dans cette table.", 0, "Message ER sur le panneau. La LED rouge de la régulation clignote en cas de défaut."],
];
