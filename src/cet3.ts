type Row = [string, string, string, string, string, string?, string?, number?];
type Range = [string, string, string, string, string, string, string, string, string, number?, string?];

function row(b: string, s: string, c: string, m: string, k: string, source: string, detail: string, unsure = false): Row {
  const item: Row = [b, s, c, m, k, "Source : " + source, detail];
  if (unsure) item.push(1);
  return item;
}

const V2 = "Explorer V2 (notice)";
const SRC_V2 = "Notice Atlantic Explorer V2, Atlantic Suisse, Explorer V2 Betriebsanleitung F";
const V3 = "Explorer V3 (notice)";
const SRC_V3 = "Notice Atlantic Explorer V3 Cozytouch, Atlantic Suisse";
const OD = "Odyssée 200/270 (notice 2017)";
const SRC_OD = "Notice d'entretien Atlantic Odyssée 200/270 L, diagnostic de panne. L'hébergeur titre le fichier Odyssée PI 2015/2018";
const DK = "Altherma M HW (4P509215-1)";
const SRC_DK = "Manuel d'installation et d'utilisation Daikin EKHH2E, 4P509215-1, chapitre 8.1.3.11";
const NB = "MT-WH (manuel NIBE)";
const SRC_NB = "Manuel NIBE MT-WH21, OE03:956-1807, chapitre 7.7";
const AE = "WPA 303 ECO 2 (notice Austria Email)";
const SRC_AE = "Notice Austria Email WPA 303 ECO 2, réf. 17-14-35-1251-10, chapitre 10";

const explorerV2: Row[] = [
  row("atc", V2, "Err 03", "Sonde de température d'eau (doigt de gant) défectueuse", "sonde", SRC_V2,
    "Sonde coupée ou en court-circuit. Pas de chauffe, mise en sécurité haute pression (Err 25). Vérifier les connexions ou remplacer le faisceau."),
  row("atc", V2, "Err 09", "Température d'eau trop chaude (> 80 °C)", "cond", SRC_V2,
    "Résistance alimentée en permanence ou sonde hors service. Risque de sécurité mécanique, pas de chauffe. Vérifier connexions et position. Vérifier que l'appoint n'est pas permanent. Réarmer la sécurité et contacter l'installateur."),
  row("atc", V2, "Err 10", "Perte de la communication radio", "com", SRC_V2,
    "Transmetteur radio ou carte de régulation hors service. La télécommande ne pilote plus. Le produit reste dans le dernier mode. Vérifier la connexion du transmetteur sur la carte."),
  row("atc", V2, "Err 21", "Sonde d'entrée d'air défectueuse", "sonde", SRC_V2,
    "Sonde coupée ou en court-circuit. Plages non respectées, chauffe par l'appoint. Vérifier les connexions ou remplacer le faisceau."),
  row("atc", V2, "Err 22-23", "Sondes de température d'évaporateur défectueuses", "sonde", SRC_V2,
    "Sondes coupées ou en court-circuit, ou défaut ventilateur. Dégivrage compromis, risque pour le compresseur, chauffe par l'appoint. Vérifier les connexions, remplacer les sondes, vérifier le ventilateur."),
  row("atc", V2, "Err 24", "Température d'air mesurée hors limites", "conf", SRC_V2,
    "PAC hors plage, chauffe par l'appoint. Installer selon la notice. Vérifier le paramètre FAN, les connexions et la position de la sonde d'entrée d'air."),
  row("atc", V2, "Err 25", "Alarme de pressostat, haute pression", "fluide", SRC_V2,
    "Pas d'alimentation du compresseur, chauffe par l'appoint. Vérifier que l'air n'a pas dépassé 43 °C. La touche mode réarme ce défaut."),
  row("atc", V2, "Err 26", "Alarme compresseur (Klixon, sonde évaporateur ou manque d'échange)", "comp", SRC_V2,
    "Compresseur bloqué, sonde évaporateur coupée, manque d'échange ou de gaz. Pas d'alimentation du compresseur, chauffe par l'appoint. Contacter l'installateur."),
  row("atc", V2, "Err 27", "Sonde de température en sortie de compresseur défectueuse", "sonde", SRC_V2,
    "Sonde coupée ou en court-circuit, ou température de refoulement trop élevée. Pas d'alimentation du compresseur, chauffe par l'appoint. Contacter l'installateur."),
  row("atc", V2, "Err 28", "Dysfonctionnement du dégivrage", "fluide", SRC_V2,
    "Manque de fluide ou défaut ventilateur. Dégivrage inefficace, évaporateur obstrué, chauffe par l'appoint. Vérifier le ventilateur. La touche mode réarme ce défaut."),
  row("atc", V2, "Err 29", "Température compresseur hors limites", "comp", SRC_V2,
    "Valeur haute, pression trop élevée. Arrêt du compresseur, chauffe par l'appoint. Contacter l'installateur."),
  row("atc", V2, "Err 30", "Pompe à chaleur en marche plus de 50 h sans s'arrêter", "fluide", SRC_V2,
    "Défaut PAC, manque de fluide ou compresseur. Temps de chauffe trop long. Chauffe par l'appoint. Contacter l'installateur."),
  row("atc", V2, "Err 31", "Alarme pompe à chaleur", "fluide", SRC_V2,
    "Manque de fluide ou défaut compresseur. Arrêt du compresseur, chauffe par l'appoint. Contacter l'installateur."),
];

const explorerV3: Row[] = [
  row("atc", V3, "Erreur 03", "Sonde de température d'eau défectueuse ou hors plage", "sonde", SRC_V3,
    "Pas de chauffe. Vérifier la connexion A1 (doigt de gant). Remplacer la sonde si besoin. OK coupe le bip."),
  row("atc", V3, "Erreur 07", "Absence d'eau ou liaison ACI ouverte", "fluide", SRC_V3,
    "Pas de chauffe. Mettre en eau. Vérifier la connexion AC, la filerie et la conductivité."),
  row("atc", V3, "Erreur 09", "Température d'eau trop chaude (T > 80 °C)", "cond", SRC_V3,
    "Risque de sécurité mécanique, pas de chauffe. Vérifier la température au puisage, la connexion A1 et la position. Vérifier que l'appoint n'est pas permanent. Réarmer la sécurité."),
  row("atc", V3, "Erreur 21", "Sonde d'entrée d'air défectueuse ou hors plage", "sonde", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Vérifier la connexion A4 et la position. Remplacer le faisceau si besoin."),
  row("atc", V3, "Erreur 22", "Sonde évaporateur haut hors plage (-20 à 110 °C)", "sonde", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Vérifier le plaquage A4 et que le ventilateur tourne librement."),
  row("atc", V3, "Erreur 23", "Sonde évaporateur bas hors plage (-20 à 110 °C)", "sonde", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Vérifier le plaquage A4 et le ventilateur."),
  row("atc", V3, "Erreur 25", "Ouverture du pressostat ou de la sécurité thermique compresseur", "fluide", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Vérifier le compresseur R1, le pressostat, le condensateur 15 µF, la vanne gaz chauds T2 et les bobinages."),
  row("atc", V3, "Erreur 27", "Sonde compresseur coupée ou en court-circuit", "sonde", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Vérifier la connexion A4 et la position. Remplacer le faisceau si besoin."),
  row("atc", V3, "Erreur 28", "Défaut du système de dégivrage", "fluide", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Propreté de l'évaporateur, charge R134a appareil dégivré, ventilateur, condensats, vanne gaz chauds T2 (menu TEST)."),
  row("atc", V3, "Erreur 29", "Température de refoulement compresseur trop élevée", "fluide", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Contrôler les bobinages, la propreté de l'évaporateur, la charge et la circulation d'air."),
  row("atc", V3, "Erreur 30", "PAC plus de 24 h sans arrêt, ou manque de puissance", "fluide", SRC_V3,
    "Arrêt de la PAC, chauffe électrique. Propreté de l'évaporateur, surconsommation, boucle ou fuite, sondes A4, charge, surchauffe d'au moins 5 K, dégivrage, bobinages."),
];

const odyssee: Row[] = [
  row("atc", OD, "Err 3", "Sonde doigt de gant hors plage (< 0 °C ou > 85 °C)", "sonde", SRC_OD,
    "Pas de chauffe. Vérifier la connexion A1 et la position. Remplacer la sonde si elle est bonne. OK coupe le bip."),
  row("atc", OD, "Err 4", "Sonde haut ou bas de ballon défectueuse (< 0 °C ou > 110 °C)", "sonde", SRC_OD,
    "Pilotage intelligent compromis, chauffe à la consigne maximale. Vérifier la position et la connectique A2. Remplacer le faisceau."),
  row("atc", OD, "Err 7", "Absence d'eau ou liaison ACI ouverte", "fluide", SRC_OD,
    "Pas de chauffe. Mettre en eau. Vérifier le circuit ACI."),
  row("atc", OD, "Err 9", "Température d'eau trop chaude (T03 > 80 °C)", "cond", SRC_OD,
    "Risque de sécurité mécanique, pas de chauffe. Vérifier A1, la position et que l'eau au robinet dépasse 80 °C. Vérifier que l'appoint n'est pas permanent. Réarmer la sécurité."),
  row("atc", OD, "Inf 11", "Absence du signal heures creuses", "conf", SRC_OD,
    "Chauffe sans tenir compte des heures creuses. Vérifier le câblage, l'émission du signal et les autorisations."),
  row("atc", OD, "Err 21", "Sonde d'air entrant défectueuse (< -20 °C ou > 70 °C)", "sonde", SRC_OD,
    "Arrêt de la PAC. AUTO : appoint à la consigne. MANUEL : appoint à 50 °C. Vérifier que les sondes d'air, d'évaporateur haut et bas ne sont pas croisées. Sinon remplacer la sonde."),
  row("atc", OD, "Err 22", "Sonde évaporateur haut défectueuse (< -20 °C ou > 110 °C)", "sonde", SRC_OD,
    "Arrêt de la PAC, dégivrage compromis, appoint. Vérifier le plaquage A4 et que le ventilateur tourne librement."),
  row("atc", OD, "Err 23", "Sonde évaporateur bas défectueuse ou prise en glace (< -20 °C ou > 110 °C)", "sonde", SRC_OD,
    "Arrêt de la PAC, dégivrage compromis, appoint. Vérifier le plaquage A4 et le ventilateur."),
  row("atc", OD, "Err 25", "Pressostat HP ou Klixon ouvert 30 s après l'essai de démarrage", "fluide", SRC_OD,
    "Compresseur à l'arrêt, appoint. Vérifier que l'air n'a pas dépassé 35 °C, les traces d'huile, les fuites d'eau, la charge, le condensateur et la vanne gaz chaud."),
  row("atc", OD, "Err 27", "Sonde de refoulement hors plage (-20 °C à 120 °C)", "sonde", SRC_OD,
    "Arrêt de la PAC, appoint. Vérifier la connectique A4 et la position. Remplacer la sonde si elle est bonne."),
  row("atc", OD, "Err 28", "Dysfonctionnement du dégivrage", "fluide", SRC_OD,
    "Arrêt de la PAC, appoint. Propreté de l'évaporateur, charge appareil dégivré, ventilateur, condensats, adéquation gainage / paramétrage."),
  row("atc", OD, "Err 29", "Température de refoulement compresseur trop élevée", "fluide", SRC_OD,
    "Arrêt de la PAC, appoint. Propreté de l'évaporateur, charge, circulation de l'air aspiré et refoulé. Sinon remplacer la sonde."),
  row("atc", OD, "Err 30", "Pas d'échange, ou PAC 50 h sans atteindre la consigne", "fluide", SRC_OD,
    "Arrêt de la PAC, appoint. Surconsommation, boucle ou fuite. Vérifier le gainage, la charge, la surchauffe et le dégivrage. La notice interdit de toucher la vis du détendeur."),
];

const daikin: Row[] = [
  row("dm", DK, "AL", "Alarme de température minimale", "conf", SRC_DK,
    "L'appareil continue. Contrôler la température liée à l'alarme et les paramètres A0, A1, A2, A11."),
  row("dm", DK, "AH", "Alarme de température maximale", "cond", SRC_DK,
    "L'appareil continue. Contrôler la température liée à l'alarme et les paramètres A3, A4, A5, A11."),
  row("dm", DK, "id", "Alarme d'entrée numérique", "carte", SRC_DK,
    "Compresseur arrêté, dégivrage non activé. Chercher un court-circuit des câbles de signal. Voir i0, i1 et i2."),
  row("dm", DK, "iSd", "Appareil bloqué", "carte", SRC_DK,
    "Compresseur arrêté, dégivrage jamais activé. Voir i0, i1, i8 et i9. Éteindre puis rallumer, ou couper l'alimentation."),
  row("dm", DK, "FiL", "Contrôle du filtre de ventilation", "conf", SRC_DK,
    "Après 1 000 heures, le filtre inox est à nettoyer (rincer ou souffler). Une touche de l'afficheur efface le message."),
  row("dm", DK, "UtL", "Défaut probable du ventilateur", "vent", SRC_DK,
    "Signal sonore, effaçable par une touche. L'alarme reste tant que l'appareil n'est pas éteint ou en veille. PAC arrêtée, chauffe par la résistance. Voir SP10 et C14. Contacter l'assistance."),
  row("dm", DK, "Pr1", "Erreur de sonde, partie haute du ballon", "sonde", SRC_DK,
    "L'appareil s'arrête. Vérifier le type de sonde (paramètre P0), l'intégrité, la connexion et la température du haut de ballon."),
  row("dm", DK, "Pr2", "Erreur de sonde, partie basse du ballon", "sonde", SRC_DK,
    "Même contrôle que Pr1, sur la sonde basse. L'appareil s'arrête."),
  row("dm", DK, "Pr3", "Erreur de sonde d'évaporateur", "sonde", SRC_DK,
    "Même contrôle que Pr1, sur la sonde d'évaporateur. L'appareil s'arrête."),
];

const nibe: Row[] = [
  row("nb", NB, "Er1", "Sonde T1 hors plage (air à l'entrée)", "sonde", SRC_NB,
    "T1 est la température d'air à l'entrée. Vérifier la connexion sur la carte. Remplacer la sonde."),
  row("nb", NB, "Er2", "Sonde T2 hors plage (évaporateur)", "sonde", SRC_NB,
    "T2 est la température d'évaporateur. Vérifier la connexion. Remplacer la sonde."),
  row("nb", NB, "Er3", "Sonde T3 hors plage (eau en haut de cuve)", "sonde", SRC_NB,
    "Si T3 est en erreur, l'eau n'est plus chauffée du tout. Vérifier la connexion. Remplacer la sonde."),
  row("nb", NB, "Er4", "Sonde T4 hors plage (eau en bas de cuve, option)", "sonde", SRC_NB,
    "Le manuel dit que Er4 est ignoré et que l'appareil continue. Vérifier quand même la connexion de T4."),
  row("nb", NB, "Er5", "Sonde T5 hors plage (sonde additionnelle, option)", "sonde", SRC_NB,
    "Le manuel dit que Er5 est ignoré et que l'appareil continue. Vérifier la connexion de T5."),
  row("nb", NB, "Er6", "Err HP, pressostat haute pression", "fluide", SRC_NB,
    "Le pressostat s'ouvre au-dessus de sa limite (le manuel cite aussi 2,0 MPa pour l'arrêt compresseur). Baisser la consigne d'eau, réduire la vitesse maxi du ventilateur, ou remplacer le composant. Recouper l'alimentation pour redémarrer."),
  row("nb", NB, "Er7", "Err Evap, évaporateur trop chaud", "fluide", SRC_NB,
    "T2 reste au-dessus de T1 moins 2 °C pendant plus d'une heure. Sonde mal placée ou fuite de fluide. Replacer T2. Réparer la fuite et recharger."),
  row("nb", NB, "Er8", "Err C Evap, évaporation trop basse", "fluide", SRC_NB,
    "T2 sous -25 °C. Ventilateur, débit d'air faible ou air d'entrée trop froid. Vérifier le ventilateur, monter la vitesse mini et la température d'air mini dans le menu installateur."),
  row("nb", NB, "Er9", "Err H Evap, évaporateur au-dessus de D11", "fluide", SRC_NB,
    "T2 dépasse la consigne D11 (évaporateur maxi). Sonde mal placée ou fuite. Replacer T2. Réparer et recharger."),
  row("nb", NB, "Er10", "Filtre à remplacer", "conf", SRC_NB,
    "Le message s'affiche, le fonctionnement n'est pas arrêté. Remplacer le filtre à air."),
];

const austria: Row[] = [
  row("ae", AE, "W01", "Température de l'air entrant trop basse", "conf", SRC_AE,
    "Sous -7 °C l'appareil s'éteint. Nouvel essai après 30 minutes, si l'air est remonté d'au moins 3 °C. Pendant le blocage, la source additionnelle ou la réserve chauffe. Aérer pour faire entrer de l'air plus chaud, ou activer la réserve."),
  row("ae", AE, "W02", "Température de l'air entrant trop haute", "conf", SRC_AE,
    "Au-dessus de 40 °C l'appareil s'éteint. Reprise après 30 minutes si l'air est redescendu d'au moins 3 °C. La source additionnelle ou la réserve chauffe pendant le blocage."),
  row("ae", AE, "W03", "Surpression du circuit frigorifique", "fluide", SRC_AE,
    "Arrêt, remise en route après 5 minutes. Trois fois en une heure, cela devient E05. Vérifier qu'il y a assez d'eau dans le ballon."),
  row("ae", AE, "W04", "Température d'évaporateur trop basse", "fluide", SRC_AE,
    "Arrêt 30 minutes. Lié à des conduits trop longs ou à une vitesse de ventilateur trop faible. Vérifier la vitesse (menu 8.3.15.9) et réchauffer l'air aspiré."),
  row("ae", AE, "W05", "Température d'évaporateur trop élevée", "fluide", SRC_AE,
    "Arrêt 30 minutes. Baisser la température de l'air aspiré. Sinon contacter le service client et passer sur la réserve."),
  row("ae", AE, "W06", "Température de la source externe trop élevée", "conf", SRC_AE,
    "La source externe s'arrête. Elle repart quand sa température a baissé de 5 °C. L'appareil continue sur le programme choisi, sans cette source."),
  row("ae", AE, "E01", "Erreur sonde d'eau", "sonde", SRC_AE,
    "L'appareil, les sources additionnelles et la résistance s'éteignent. Seule la ventilation peut rester. Contacter le service client."),
  row("ae", AE, "E02", "Erreur sonde d'air entrant", "sonde", SRC_AE,
    "L'appareil continue en prenant la température d'évaporateur, avec un blocage de 30 minutes. La source additionnelle ou la réserve chauffe. Contacter le service client."),
  row("ae", AE, "E03", "Erreur sonde d'évaporateur", "sonde", SRC_AE,
    "L'appareil ne fonctionne plus qu'à partir de 10 °C d'air. S'il s'arrête, activer la réserve. E02 et E03 ensemble éteignent l'appareil."),
  row("ae", AE, "E04", "Erreur sonde de la source externe", "sonde", SRC_AE,
    "L'appareil continue sans la source externe. Vérifier le montage et la sonde."),
  row("ae", AE, "E05", "Erreur surpression", "fluide", SRC_AE,
    "W03 trois fois en une heure. L'appareil s'éteint. Acquitter dans le menu détection d'erreur. Vérifier le niveau d'eau. Sinon le service client. En attendant, activer la réserve."),
  row("ae", AE, "E06", "Erreur température d'évaporateur", "fluide", SRC_AE,
    "W04 trois fois en une heure. Pas de redémarrage automatique. Acquitter le défaut. S'il revient, service client, et réserve en attendant."),
  row("ae", AE, "E07", "Écart de température de la source externe", "conf", SRC_AE,
    "Après trois démarrages, la source externe ne dépasse pas l'eau du ballon de 5 °C. La pompe de circulation externe s'arrête. Vérifier la source externe."),
  row("ae", AE, "E09", "Alimentation du régulateur", "carte", SRC_AE,
    "La pompe à chaleur, la résistance et le ventilateur s'arrêtent. Le régulateur n'est plus alimenté. L'appareil repart quand l'alimentation revient."),
];

export const D8: Row[] = explorerV2.concat(explorerV3, odyssee, daikin, nibe, austria);

export const MOD8: Range[] = [
  ["atc", "Explorer V2", "m", "Ballon thermodynamique monobloc", "Explorer Cozytouch 200/270 V2", "R134a", "notice Atlantic Suisse", V2, "Table de la notice Explorer V2. Pas de notice Explorer V1 ni Explorer split trouvée.", 0, "Code Err sur l'écran. La touche mode réarme certains défauts."],
  ["atc", "Explorer V3", "m", "Ballon thermodynamique monobloc", "Explorer Cozytouch 200/270 V3", "R134a", "notice Atlantic Suisse", V3, "Chapitre 4.1 de la notice Explorer V3. La ligne « eau trop froide » n'a pas de numéro de code dans le PDF : elle n'est pas entrée.", 0, "Code Erreur sur l'écran. OK coupe le bip."],
  ["atc", "Odyssée", "m", "Ballon thermodynamique monobloc", "Odyssée 200 L et 270 L, air non chauffé", "R134a", "notice 2017", OD, "Notice d'entretien Atlantic Odyssée 200/270 L, chapitre diagnostic.", 0, "Code Err ou Inf. L'assistant erreur est dans le menu installateur."],
  ["dm", "Altherma M HW", "m", "Ballon thermodynamique monobloc", "EKHH2E200/260 AV3, PAV3, BV33", "R134a", "manuel 4P509215-1", DK, "Alarmes et erreurs du chapitre 8.1.3.11 et 8.1.3.12. Le manuel lu est en anglais.", 0, "Code sur le régulateur. La LED alarme renvoie à cette liste."],
  ["nb", "MT-WH", "m", "Ballon thermodynamique monobloc", "MT-WH21 190 et 260 L", "R134a", "manuel NIBE OE03:956-1807", NB, "Er1 à Er10 du menu information et du chapitre 7.7.3. T4 et T5 sont optionnels.", 0, "Code Er dans le menu information, groupe Er."],
  ["ae", "WPA 303 ECO", "m", "Ballon thermodynamique monobloc", "WPA 303 ECO 2", "R134a", "notice 17-14-35-1251-10", AE, "Chapitre 10 de la notice Austria Email. W01 à W06 sont des indications, E01 à E09 des erreurs. E08 n'est pas dans cette notice.", 0, "Triangle jaune pour un W, triangle rouge pour un E. Acquittement dans Détection d'erreur."],
];
