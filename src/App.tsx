import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.webp";
import {
  BL,
  BRANDS,
  CATS,
  CATCOL,
  CL,
  LVC,
  LVL,
  MOD,
  READ,
  RDS,
  SOURCES,
  TY,
  TYL,
  codesFor,
  isOld,
  rangesFor,
  rdOf,
  tablesFor,
  tyOf,
  type M,
} from "./data";
import { loadFavs, loadHistory, loadTheme, pushHistory, saveTheme, toggleFav, type Fav, type ThemeName } from "./prefs";
import ToolsPanel from "./ToolsPanel";
import { BulletList, Chip, Pill, Section, Status, Steps } from "./ui";

export const UPDATED = "18 novembre 2026";

const HELP = [
  "Taper un code (U4, E1, P5…), un mot-clé (sonde, condensats, 12 clignotements) ou un nom de gamme / une référence (Zen 3, HMIS3, FBA, PEAD) : les gammes puis les codes correspondants s'affichent.",
  "Chips : marque, catégorie de panne, type d'unité (murale, gainable, cassette, console, plafonnier, multi, PAC air/eau, ballon thermodynamique monobloc ou bi-bloc). Les chips défilent à l'horizontale. « Anciennes gammes » = gammes hors catalogue 2025-2026.",
  "Le type d'unité limite aussi les codes aux tables des gammes de ce type.",
  "Toucher une fiche pour les causes et vérifications. Sur une gamme, « Ouvrir la table de codes » n'affiche que les codes de cette table.",
  "Niveau de gamme : classement du fabricant quand il existe, sinon indicatif (fiche « à vérifier »).",
];

const METHODS: { heading: string; steps: { title: string; detail: string }[] }[] = [
  {
    heading: "Sonde CTN (thermistance)",
    steps: [
      { title: "Débrancher", detail: "Hors tension, débrancher la sonde de la carte (ne pas mesurer sur la carte)." },
      { title: "Mesurer", detail: "Mesurer la résistance et relever la T° réelle de la sonde (thermomètre au même endroit)." },
      { title: "Comparer", detail: "Comparer au tableau R/T du manuel. Valeurs nominales relevées : Heiwa ambiance 15 kΩ, tube 20 kΩ, refoulement 50 kΩ ; Toshiba TA/TC 12,5 kΩ à 20 °C." },
      { title: "Conclure", detail: "0 Ω ou infini = sonde HS. Sonde OK : connecteur (oxydation, eau) puis entrée sonde de la carte. Une sonde en dérive (valeur fausse mais pas en défaut) peut provoquer des protections (antigel, HP, manque de fluide) sans code sonde." },
    ],
  },
  {
    heading: "Compresseur inverter",
    steps: [
      { title: "Sécurité", detail: "Couper, attendre la décharge des condensateurs du bus DC et vérifier au multimètre avant de toucher." },
      { title: "Enroulements", detail: "Débrancher U-V-W, mesurer U-V, V-W, W-U : valeurs faibles et égales. Exemples Midea : de 0,37 Ω à 2,7 Ω selon le compresseur. Un écart net ou 0 Ω = compresseur HS." },
      { title: "Isolement", detail: "Mesurer chaque borne / masse au mégohmmètre ; une valeur basse = compresseur à remplacer." },
      { title: "Mécanique", detail: "Bobinages OK mais défaut de démarrage : pressions équilibrées ? vannes ouvertes ? câblage U-V-W dans le bon ordre ? Puis tester l'IPM / la carte inverter." },
    ],
  },
  {
    heading: "IPM, bus DC et carte inverter",
    steps: [
      { title: "Décharge", detail: "Hors tension, décharger les condensateurs électrolytiques et vérifier qu'ils sont vides." },
      { title: "Test IPM", detail: "Mesurer entre P et U/V/W/N, puis entre U/V/W et N, dans les deux sens. Une valeur nulle ou proche de 0 entre deux bornes = IPM en court-circuit (méthode Midea)." },
      { title: "Bus DC", detail: "Sous tension, avec précaution : tension du bus DC ≈ 1,41 × tension secteur (environ 325 V DC sur 230 V selon Midea). Trop basse ou trop haute = codes sous/surtension (U2 Daikin, PL / PH Gree-Heiwa, P1 Midea, CH23 LG…)." },
      { title: "Alimentation", detail: "Mesurer la tension secteur en charge au bornier UE et contrôler le serrage. Un bornier qui chauffe donne des codes de tension ou de PFC." },
    ],
  },
  {
    heading: "Communication UI / UE",
    steps: [
      { title: "Câblage", detail: "Ordre des bornes identique UI/UE, pas de phase/neutre croisés, câble sans dommage. Heiwa : 1 = neutre, 2 = com, 3 = phase ; une pompe de condensats branchée entre 1 et 2 provoque E6." },
      { title: "Alimentation UE", detail: "L'UE est-elle alimentée (LED de la carte UE) ? Sur Hitachi RAK : 230 V AC entre les bornes 1 et 2, côté UE puis côté UI, dans les 3 min après une demande de marche." },
      { title: "Câble provisoire", detail: "En cas de doute sur le câble (mordu, raccord intermédiaire), essai avec un câble provisoire." },
      { title: "Cartes", detail: "Câblage OK : carte UI ou UE. Midea liste aussi un détendeur électronique ou une self (réactance) défectueux parmi les causes de E1." },
    ],
  },
  {
    heading: "Détendeur électronique (EEV)",
    steps: [
      { title: "Initialisation", detail: "À la mise sous tension, le détendeur fait sa course d'initialisation : on entend en général un cliquetis." },
      { title: "Bobine", detail: "Mesurer la résistance de chaque phase de la bobine (valeurs du manuel) et contrôler le connecteur." },
      { title: "Corps", detail: "Bobine OK : comparer les T° avant / après détendeur et la surchauffe. Pas de détente = corps bloqué." },
    ],
  },
  {
    heading: "Ventilateur DC",
    steps: [
      { title: "Mécanique", detail: "Hors tension : turbine / hélice libre, pas de glace, palier sain." },
      { title: "Critère", detail: "Le défaut se déclenche quand la vitesse ne suit pas la consigne : par exemple Fujitsu < 1/3 pendant > 56 s, Samsung E154 si 450 tr/min ne sont pas atteints en 15 s." },
      { title: "Mesures", detail: "Contrôler alimentation et signaux commande / retour selon le manuel. Moteur bloqué ou pas de retour avec des signaux OK = moteur ; pas de signal = carte." },
    ],
  },
  {
    heading: "Charge en fluide et pressions",
    steps: [
      { title: "Préalables", detail: "Vannes ouvertes, filtres et batteries propres, débit d'air correct UI et UE." },
      { title: "Mesures", detail: "HP/BP, surchauffe et sous-refroidissement, en régime stabilisé et à fréquence compresseur connue (mode test si disponible)." },
      { title: "Diagnostic", detail: "Refoulement chaud + surchauffe forte = manque de fluide ou détendeur. Refoulement froid (U7 Mitsubishi) = retour liquide / surcharge." },
      { title: "Remise en charge", detail: "Après réparation de la fuite : tirage au vide puis charge en poids selon la plaque signalétique et la longueur de liaison." },
    ],
  },
  {
    heading: "Vanne 4 voies",
    steps: [
      { title: "Commande", detail: "En chaud, mesurer la tension sur la bobine (Heiwa : défaut possible si l'alimentation tombe sous 175 V AC)." },
      { title: "Bobine", detail: "Mesurer la résistance de la bobine et contrôler la borne." },
      { title: "Tiroir", detail: "Bobine OK : contrôler les T° de tubes avant et après commutation. Panasonic F11 : T° tube UI < 10 °C en chaud ou > 45 °C en froid." },
    ],
  },
];

function coverItems(): string[] {
  return [
    "Couvert : Daikin (split et Sky Air), Mitsubishi Electric (MSZ, MUZ, P-series), Hitachi (RAK/RAC), Toshiba (RAS et RAV), Atlantic / Fujitsu, LG, Samsung (split et CAC), Panasonic, Midea, Gree (U-Match), Heiwa, Mundoclima, Airton.",
    "Modèles / gammes : " + MOD.length + " fiches (" + (BRANDS.length - 1) + " marques). Références, fluides et années relevés dans les catalogues et fiches fabricant ou distributeur ; quand la source est un revendeur ou que la table de codes n'est pas confirmée pour la gamme, la fiche est marquée « à vérifier ».",
    "Heiwa « Yoko » : aucune gamme Heiwa de ce nom trouvée ; il s'agit probablement de Hyōkō (Hyōkō 3, console Hyōkō, Premium Hyōkō).",
    "Ajouté : Mitsubishi Heavy (SRK-ZS-W), Haier (Pearl Premium), Hisense (table distributeur, à vérifier), Carrier (42QHP), Daikin Altherma 3, Mitsubishi Ecodan (FTC4 / FTC6), Atlantic Alféa (Excellia / Extensa A.I.), Gree muraux (Pular), Mundoclima H11, Heiwa PRO 2.",
    "Toujours sans table sourcée : Gree Charmo, Midea Zenith, Mundoclima H9A / H10X / H14, Heiwa DRV et PAC air/eau Heiwa.",
    "Unités intérieures ajoutées (gainables, cassettes, consoles, plafonniers, armoires) pour toutes les marques ; nouvelles tables : Daikin Sky Air (BRC1E / BRC1H, compléments), Mitsubishi City Multi (4 chiffres, à vérifier), MHI PAC (commande filaire), Hitachi Utopia, Haier gainable / cassette et console AF, Mundoclima MUCSR / MUCR / MUSTR-H6.",
    "Sans table sourcée : Hisense tertiaire (LCAC), Mundoclima H14 / H11 commercial, Panasonic ECOi, Haier gainable haute pression, Mitsubishi SFZ / MLZ, MHI SRR, Airton gainable.",
    "Catalogue 2025-2026 non vérifié : Atlantic / Fujitsu (doc. 2021), LG (catalogue 2024), Carrier (catalogue 2023) ; fiches marquées « à vérifier ».",
    "Chauffe-eau thermodynamiques : NeptuO, Effie II 230 (manuel EFFIE 190/230/350), Calypso split, Calypso VM, Calypso connecté, Explorer V4, Odyssée split V2, Thermor Aéromax 3 et Split 3, Kaliko, aroSTOR, Nuos split, Hitachi Yutampo. Toujours sans table sourcée ici : Samsung EHS, TCL, Electra, Inventor, Olimpia Splendid, De'Longhi, Argo, Sinclair, Tosot, Chigo, Hyundai, Kaysun, AUX, Ferroli, Baxi, Saunier Duval Genia Air (famille aroTHERM, notice non ouverte), Mundoclima H9A / H10X / H14, Gree Charmo, Midea Zenith, Heiwa DRV et air/eau, Hisense tertiaire, Panasonic ECOi, Mitsubishi SFZ / MLZ, MHI SRR, Airton gainable. Ballons encore sans notice complète : Explorer V1 à V3, Explorer split, Odyssée monobloc et Odyssée Pi, Effie III, Sauter, Chaffoteaux, Daikin Altherma M HW, Panasonic, Mitsubishi Ecodan CET, Viessmann Vitocal 060-A / 262-A, Saunier Duval Magna Aqua, Stiebel Eltron, Austria Email, Thaleos, Airton, Heiwa, Midea, Gree, Hitachi hors Yutampo, Bosch CET, Cordivari, Lacaze, NIBE, Ariston Nuos monobloc.",
    "Airton : table relevée par un installateur, pas par le fabricant. Mundoclima MUPR-H3/H4/H6 : table identique à Midea dans le PDF Mundoclima.",
    "Heiwa : codes du même type que Gree, mais l'origine du fabricant n'est pas confirmée officiellement.",
    "Les valeurs de résistance ne sont données que là où une source les publie ; sinon, se référer au manuel du modèle.",
  ];
}

export default function App() {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("all");
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState("");
  const [lim, setLim] = useState(40);
  const [ser, setSer] = useState("");
  const [mt, setMt] = useState("all");
  const [mo, setMo] = useState("");
  const [mlim, setMlim] = useState(4);
  const [view, setView] = useState<"codes" | "outils">("codes");
  const [theme, setTheme] = useState<ThemeName>(() => loadTheme());
  const [history, setHistory] = useState<string[]>(() => loadHistory());
  const [favs, setFavs] = useState<Fav[]>(() => loadFavs());
  const [copied, setCopied] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const mres = useMemo(() => rangesFor(q, brand, mt), [q, brand, mt]);
  const tset = useMemo(() => tablesFor(brand, mt), [brand, mt]);
  const active = q.trim() !== "" || brand !== "all" || cat !== "all" || ser !== "" || mt !== "all";
  const res = useMemo(() => codesFor(q, brand, cat, ser, mt, tset), [q, brand, cat, ser, mt, tset]);
  const shown = res.slice(0, lim);

  const jumpToCodes = useRef(false);
  const goTab = (b: string, s: string) => {
    jumpToCodes.current = true;
    setBrand(b);
    setSer(s);
    setQ("");
    setCat("all");
    setLim(40);
    setOpen("");
    setMo("");
  };
  useLayoutEffect(() => {
    if (!jumpToCodes.current) return;
    jumpToCodes.current = false;
    const go = () => {
      const el = document.getElementById("codes");
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top - 8;
      window.scrollTo(0, Math.max(0, top));
    };
    go();
    window.requestAnimationFrame(go);
    window.setTimeout(go, 80);
    window.setTimeout(go, 320);
  });

  return (
    <div className="app">
      <h1 className="sr-only">Dépannage Clim – Codes erreur</h1>
      <header className="top">
        <img src={logo} width={640} height={484} className="logo" alt="Climat Actif 66 – L'assurance confort" />
        <div className="grad-bar" />
        <div className="top-meta">
          <span>Mise à jour : {UPDATED}</span>
          <button type="button" className="text-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Mode clair" : "Mode sombre"}
          </button>
        </div>
        <div className="view-switch" role="tablist" aria-label="Section">
          <button type="button" role="tab" aria-selected={view === "codes"} className={view === "codes" ? "chip on" : "chip"} onClick={() => setView("codes")}>Codes</button>
          <button type="button" role="tab" aria-selected={view === "outils"} className={view === "outils" ? "chip on" : "chip"} onClick={() => setView("outils")}>Outils</button>
        </div>
      </header>
      {view === "outils" ? <ToolsPanel /> : <>

      <div id="rech">
        <label className="search-label" htmlFor="q">Code, gamme ou référence</label>
        <div className="search">
          <input
            id="q"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="ex. U4, E1, Zen 3, FBA, PEAD"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLim(40); setMlim(4); }}
            onKeyDown={(e) => { if (e.key === "Enter") setHistory(pushHistory(q)); }}
          />
          {q ? (
            <button type="button" className="clear" aria-label="Effacer la recherche" onClick={() => { setQ(""); setLim(40); setMlim(4); }}>
              ×
            </button>
          ) : null}
        </div>
        {history.length || favs.length ? (
          <div className="chip-row memory">
            {favs.map((fav) => (
              <Chip key={fav.id} label={"★ " + fav.title} on={q === fav.query} onClick={() => { setQ(fav.query); setLim(40); setMlim(4); }} />
            ))}
            {history.map((item) => (
              <Chip key={item} label={item} on={q === item} onClick={() => { setQ(item); setLim(40); setMlim(4); }} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="filters">
        <div className="chip-row">
          <span className="chip-label">Marque</span>
          {BRANDS.map((b) => (
            <Chip
              key={b.value}
              label={b.value === "all" ? "Toutes" : b.label}
              on={brand === b.value}
              onClick={() => { setBrand(b.value); setSer(""); setLim(40); setMlim(4); }}
            />
          ))}
        </div>
        <div className="chip-row">
          <span className="chip-label">Catégorie</span>
          {CATS.map((c) => (
            <Chip
              key={c.value}
              label={c.value === "all" ? "Toutes" : c.label}
              dot={CATCOL[c.value]}
              on={cat === c.value}
              onClick={() => { setCat(c.value); setLim(40); }}
            />
          ))}
        </div>
        <div className="chip-row">
          <span className="chip-label">Type</span>
          {TY.map((x) => (
            <Chip
              key={x.value}
              label={x.value === "all" ? "Tous" : x.label}
              on={mt === x.value}
              onClick={() => { setMt(x.value); setLim(40); setMlim(4); }}
            />
          ))}
          <Chip label="Anciennes gammes" on={mt === "old"} onClick={() => { setMt("old"); setMlim(4); }} />
        </div>
        {ser ? (
          <div className="table-chip">
            <Chip label={"Table : " + ser + "  ✕"} on={true} onClick={() => setSer("")} />
          </div>
        ) : null}
      </div>

      {!ser && mres.length ? (
        <div className="stack">
          <div className="count">{"Gammes (" + mres.length + ")"}</div>
          {mres.slice(0, mlim).map((m) => (
            <RangeCard
              key={"m" + MOD.indexOf(m)}
              m={m}
              open={mo === "m" + MOD.indexOf(m)}
              onToggle={() => {
                const id = "m" + MOD.indexOf(m);
                setMo(mo === id ? "" : id);
              }}
              onOpenTable={() => goTab(m[0], m[7] || "")}
            />
          ))}
          {mres.length > mlim ? (
            <button type="button" className="btn-more" onClick={() => setMlim(mlim + 20)}>
              {"Afficher plus de gammes (" + (mres.length - mlim) + ")"}
            </button>
          ) : null}
        </div>
      ) : null}

      {active ? (
        <div className="stack" id="codes">
          <h2 className="count" aria-live="polite">
            {"Codes : " + res.length + " fiche" + (res.length > 1 ? "s" : "") + (res.length > shown.length ? ", " + shown.length + " affichées" : "")}
          </h2>
          {shown.map((e) => {
            const isO = open === e.id;
            return (
              <article
                key={e.id}
                className="card"
                style={{ borderLeftColor: CATCOL[e.k] }}
                onClick={() => setOpen(isO ? "" : e.id)}
              >
                <div className="title-row">
                  <span className="code">{e.c}</span>
                  <span className="sub">{BL[e.b] + " · " + e.s}</span>
                  {e.v ? <Status tone="warning">à vérifier selon modèle</Status> : null}
                </div>
                <div className="desc">{e.m}</div>
                <div className="pills">
                  <Pill text={CL[e.k]} col={CATCOL[e.k]} />
                  {isO ? null : <span className="touch">toucher pour détails</span>}
                </div>
                {isO ? (
                  <div className="details">
                    {e.x.length ? (
                      <div>
                        <div className="k">Causes probables / notes</div>
                        <div className="lines">
                          {e.x.map((s, i) => <div key={i} className="line">{"• " + s}</div>)}
                        </div>
                      </div>
                    ) : null}
                    {e.y.length ? (
                      <div>
                        <div className="k">Vérifications</div>
                        <div className="lines">
                          {e.y.map((s, i) => <div key={i} className="line">{(i + 1) + ". " + s}</div>)}
                        </div>
                      </div>
                    ) : null}
                    <div className="card-actions">
                      <button type="button" className="text-btn" onClick={(ev) => { ev.stopPropagation(); copyCard(e, setCopied); }}>
                        {copied === e.id ? "Copié" : "Copier"}
                      </button>
                      <button type="button" className="text-btn" onClick={(ev) => {
                        ev.stopPropagation();
                        setFavs(toggleFav({ id: e.id, title: e.c + " · " + BL[e.b], query: e.c }));
                      }}>
                        {favs.some((fav) => fav.id === e.id) ? "Retirer le favori" : "Favori"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
          {res.length > shown.length ? (
            <button type="button" className="btn-more primary" onClick={() => setLim(lim + 60)}>
              {"Afficher plus (" + (res.length - shown.length) + " restantes)"}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="hint">Taper un code (U4, E1, P5…), un nom de gamme ou une référence, ou toucher une marque ou un type.</p>
      )}

      <div className="folds">
        <Section heading="Mode d'emploi" collapsible defaultOpen={false}>
          <BulletList items={HELP} />
        </Section>

        <Section heading="Lire le code (par marque)" collapsible defaultOpen={false}>
          {BRANDS.filter((b) => b.value !== "all" && READ[b.value]).map((b) => (
            <Section key={b.value} heading={b.label} collapsible defaultOpen={false}>
              <BulletList items={READ[b.value] ?? []} />
            </Section>
          ))}
          <Section heading="Commandes filaires (gainables, cassettes, tertiaire)" collapsible defaultOpen={false}>
            <BulletList items={RDS.map((x) => x[0] + " : " + x[1])} />
          </Section>
        </Section>

        <Section heading="Méthodes de test" collapsible defaultOpen={false}>
          {METHODS.map((method) => (
            <Section key={method.heading} heading={method.heading}>
              <Steps steps={method.steps} />
            </Section>
          ))}
        </Section>

        <Section heading="Couverture et limites" collapsible defaultOpen={false}>
          <BulletList items={coverItems()} />
        </Section>

        <Section heading="Sources" collapsible defaultOpen={false}>
          <ul className="bullets sources">
            {SOURCES.map((url) => (
              <li key={url}><a href={url} target="_blank" rel="noreferrer">{url}</a></li>
            ))}
          </ul>
        </Section>
      </div>

      <p className="warning">Aide de terrain : le manuel de service du modèle fait foi ; « à vérifier » = sens incertain ou variable selon la série.</p>
      </>}
    </div>
  );
}

function copyCard(e: { id: string; c: string; b: string; s: string; m: string; x: string[]; y: string[] }, setCopied: (id: string) => void) {
  const text = [
    e.c + " · " + BL[e.b] + " · " + e.s,
    e.m,
    e.x.length ? "Causes : " + e.x.join(" ; ") : "",
    e.y.length ? "Vérifications : " + e.y.join(" ; ") : "",
  ].filter(Boolean).join("\n");
  const done = () => {
    setCopied(e.id);
    window.setTimeout(() => setCopied(""), 1500);
  };
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text: string, done: () => void) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  done();
}

function RangeCard(props: { m: M; open: boolean; onToggle: () => void; onOpenTable: () => void }) {
  const m = props.m;
  const col = LVC[m[2]];
  const rows: [string, string][] = [
    ["Références", m[4]],
    ["Fluide", m[5]],
    ["Années / source", m[6]],
    ["Lire le code", rdOf(m)],
    ["Table de codes", m[7] ? BL[m[0]] + " · " + m[7] : "Aucune table dédiée sur la Page"],
  ];
  if (m[8]) rows.push(["Note", m[8]]);
  return (
    <article className="card" style={{ borderLeftColor: col }} onClick={props.onToggle}>
      <div className="title-row">
        <span className="range-name">{m[1]}</span>
        <span className="sub">{BL[m[0]] + " · " + m[3]}</span>
        {m[9] ? <Status tone="warning">à vérifier</Status> : null}
        {isOld(m) ? <Status tone="neutral">ancienne gamme</Status> : null}
      </div>
      <div className="pills">
        <Pill text={LVL[m[2]]} col={col} />
        {tyOf(m).map((x) => <Pill key={x} text={TYL[x]} col="#0075FC" />)}
        <Pill text={m[5]} col="#8A94A6" />
        {props.open ? null : <span className="touch">toucher pour détails</span>}
      </div>
      {props.open ? (
        <div className="details">
          {rows.map((r, i) => (
            <div key={i}>
              <div className="k">{r[0]}</div>
              <div className="v">{r[1]}</div>
            </div>
          ))}
          <button
            type="button"
            className="btn-grad"
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              ev.currentTarget.blur();
              props.onOpenTable();
            }}
          >
            {m[7] ? "Ouvrir la table de codes →" : "Voir les autres codes " + BL[m[0]] + " →"}
          </button>
        </div>
      ) : null}
    </article>
  );
}
