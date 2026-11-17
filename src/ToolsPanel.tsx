import { useMemo, useState } from "react";
import {
  CABLES,
  CABLE_SOURCE,
  FGAS_SOURCE,
  FLUIDS,
  NTC_BETA,
  NTC_NOTE,
  PT,
  PT_SOURCE,
  SH_SC_NOTE,
  extraChargeGrams,
  fluidOf,
  frNum,
  leakCheck,
  ntcOhm,
  pressureAt,
  subcooling,
  superheat,
  temperatureAt,
  type FluidId,
} from "./tools";

function num(raw: string): number | null {
  const value = Number(raw.replace(",", ".").trim());
  return Number.isFinite(value) ? value : null;
}

function Field(props: { label: string; value: string; onChange: (value: string) => void; suffix?: string }) {
  return (
    <label className="tool-field">
      <span>{props.label}</span>
      <span className="tool-input">
        <input inputMode="decimal" value={props.value} onChange={(event) => props.onChange(event.target.value)} />
        {props.suffix ? <em>{props.suffix}</em> : null}
      </span>
    </label>
  );
}

export default function ToolsPanel() {
  const [fluid, setFluid] = useState<FluidId>("R32");
  const [temp, setTemp] = useState("0");
  const [bar, setBar] = useState("7,12");
  const [line, setLine] = useState("5");
  const [liquid, setLiquid] = useState("15");
  const [length, setLength] = useState("12");
  const [included, setIncluded] = useState("5");
  const [grams, setGrams] = useState("20");
  const [kg, setKg] = useState("10");
  const [hermetic, setHermetic] = useState(false);
  const [residential, setResidential] = useState(false);
  const meta = fluidOf(fluid);
  const hasPt = true;
  const glide = fluid === "R407C" || fluid === "R454B";

  const pt = useMemo(() => {
    if (!hasPt) return null;
      const id = fluid;
    const t = num(temp);
    const p = num(bar);
    return {
      atTemp: t === null ? null : { bubble: pressureAt(id, t, "bubble"), dew: pressureAt(id, t, "dew") },
      atBar: p === null ? null : { bubble: temperatureAt(id, p, "bubble"), dew: temperatureAt(id, p, "dew") },
    };
  }, [fluid, temp, bar, hasPt]);

  const shsc = useMemo(() => {
    if (!pt?.atBar || pt.atBar.dew === null || pt.atBar.bubble === null) return null;
    const tLine = num(line);
    const tLiquid = num(liquid);
    return {
      dew: pt.atBar.dew,
      bubble: pt.atBar.bubble,
      sh: tLine === null ? null : superheat(tLine, pt.atBar.dew),
      sc: tLiquid === null ? null : subcooling(pt.atBar.bubble, tLiquid),
    };
  }, [pt, line, liquid]);

  const charge = useMemo(() => {
    const a = num(length);
    const b = num(included);
    const c = num(grams);
    if (a === null || b === null || c === null) return null;
    return extraChargeGrams(a, b, c);
  }, [length, included, grams]);

  const leak = useMemo(() => {
    const mass = num(kg);
    if (mass === null) return null;
    return leakCheck({ kg: mass, gwp: meta.gwp, annexI: meta.annexI, hermetic, residential });
  }, [kg, meta, hermetic, residential]);

  const temps = [-10, 0, 10, 20, 25, 30, 40];

  return (
    <div className="tools">
      <p className="hint">Outils de calcul. La notice du modèle et le règlement priment sur un repère général.</p>

      <section className="tool">
        <h2>Pression / température</h2>
        <label className="tool-field">
          <span>Fluide</span>
          <select value={fluid} onChange={(event) => setFluid(event.target.value as FluidId)}>
            {FLUIDS.map((item) => <option key={item.id} value={item.id}>{item.id}</option>)}
          </select>
        </label>
        <p className="tool-note">{meta.note}</p>
        {hasPt ? (
          <>
            <Field label="Température" value={temp} onChange={setTemp} suffix="°C" />
            {pt?.atTemp && pt.atTemp.dew !== null ? (
              <p className="tool-result">
                {glide
                  ? "Bulle " + frNum(pt.atTemp.bubble ?? 0) + " bar rel. · rosée " + frNum(pt.atTemp.dew) + " bar rel."
                  : frNum(pt.atTemp.dew) + " bar relatifs (saturation)."}
              </p>
            ) : <p className="tool-note">Hors de la table (−40 à 60 °C).</p>}
            <Field label="Pression manomètre" value={bar} onChange={setBar} suffix="bar rel." />
            {pt?.atBar && pt.atBar.dew !== null ? (
              <p className="tool-result">
                {glide
                  ? "Bulle " + frNum(pt.atBar.bubble ?? 0, 1) + " °C · rosée " + frNum(pt.atBar.dew, 1) + " °C"
                  : "Saturation " + frNum(pt.atBar.dew, 1) + " °C"}
              </p>
            ) : <p className="tool-note">Pression hors table.</p>}
            <div className="tool-table-wrap">
              <table className="tool-table">
                <caption>Bar relatifs, points publiés tous les 10 K</caption>
                <thead>
                  <tr><th>°C</th><th>{glide ? "Bulle" : "Pression"}</th>{glide ? <th>Rosée</th> : null}</tr>
                </thead>
                <tbody>
                  {PT[fluid].map((point) => (
                    <tr key={point.t}>
                      <td>{point.t}</td>
                      <td>{frNum(point.bubble)}</td>
                      {glide ? <td>{frNum(point.dew)}</td> : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tool-note">R410A : la source ne donne que la rosée dans son tableau court. Le glissement est inférieur à 1 K. Interpolation linéaire entre les points. {PT_SOURCE}</p>
          </>
        ) : null}
      </section>

      <section className="tool">
        <h2>Surchauffe et sous-refroidissement</h2>
        <p className="tool-note">La température de saturation est celle de la pression saisie au-dessus.</p>
        <Field label="Température conduite vapeur" value={line} onChange={setLine} suffix="°C" />
        <Field label="Température conduite liquide" value={liquid} onChange={setLiquid} suffix="°C" />
        {shsc ? (
          <p className="tool-result">
            Rosée {frNum(shsc.dew, 1)} °C
            {shsc.sh !== null ? " · surchauffe " + frNum(shsc.sh, 1) + " K" : ""}
            {glide ? " · bulle " + frNum(shsc.bubble, 1) + " °C" : ""}
            {shsc.sc !== null ? " · sous-refroidissement " + frNum(shsc.sc, 1) + " K" : ""}
          </p>
        ) : <p className="tool-note">Indiquer d'abord une pression dans la table.</p>}
        <p className="tool-note">{SH_SC_NOTE}</p>
      </section>

      <section className="tool">
        <h2>Charge complémentaire</h2>
        <Field label="Longueur de liaison" value={length} onChange={setLength} suffix="m" />
        <Field label="Longueur déjà préchargée" value={included} onChange={setIncluded} suffix="m" />
        <Field label="Appoint indiqué sur la plaque" value={grams} onChange={setGrams} suffix="g/m" />
        {charge !== null ? <p className="tool-result">{frNum(charge, 0)} g à ajouter</p> : null}
        <p className="tool-note">Calcul : max(0, longueur − précharge) × g/m. Aucune règle générique par fluide n'est imposée ici : les g/m viennent de la notice ou de la plaque. La notice du fabricant prime.</p>
      </section>

      <section className="tool">
        <h2>Tonnes équivalent CO2 et étanchéité</h2>
        <Field label="Charge de l'équipement" value={kg} onChange={setKg} suffix="kg" />
        <label className="check"><input type="checkbox" checked={hermetic} onChange={(event) => setHermetic(event.target.checked)} /> Hermétiquement scellé et étiqueté comme tel</label>
        <label className="check"><input type="checkbox" checked={residential} onChange={(event) => setResidential(event.target.checked)} /> Installé dans un bâtiment résidentiel</label>
        {leak ? (
          <p className="tool-result">
            {frNum(leak.tonnes, 2)} t éq. CO2 (PRP {frNum(meta.gwp, meta.gwp < 1 ? 2 : 0)}).
            {leak.required
              ? " Contrôle au moins tous les " + leak.months + " mois, ou " + leak.monthsWithDetector + " mois avec détection de fuites."
              : " Pas de contrôle périodique F-Gas au titre de l'article 5."}
          </p>
        ) : null}
        {leak ? <p className="tool-note">{leak.reason}</p> : null}
        <p className="tool-note">{FGAS_SOURCE}</p>
      </section>

      <section className="tool">
        <h2>Sondes CTN</h2>
        <div className="tool-table-wrap">
          <table className="tool-table">
            <caption>Résistance calculée, kilohms, B = {NTC_BETA}</caption>
            <thead>
              <tr><th>°C</th><th>10 kΩ</th><th>15 kΩ</th><th>20 kΩ</th><th>50 kΩ</th></tr>
            </thead>
            <tbody>
              {temps.map((t) => (
                <tr key={t}>
                  <td>{t}</td>
                  {[10_000, 15_000, 20_000, 50_000].map((r25) => (
                    <td key={r25}>{frNum(ntcOhm(r25, NTC_BETA, t) / 1000, 1)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tool-note">{NTC_NOTE}</p>
      </section>

      <section className="tool">
        <h2>Sections de câble et disjoncteurs</h2>
        <div className="tool-table-wrap">
          <table className="tool-table">
            <caption>Cuivre, logements, courants assignés maximaux</caption>
            <thead><tr><th>Section</th><th>Disjoncteur</th><th>Usage cité</th></tr></thead>
            <tbody>
              {CABLES.map((row) => (
                <tr key={row.section}><td>{row.section}</td><td>{row.breaker}</td><td>{row.use}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tool-note">{CABLE_SOURCE}</p>
      </section>
    </div>
  );
}
