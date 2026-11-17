import { useState, type ReactNode } from "react";

export function Chip(props: { label: string; on: boolean; dot?: string; onClick: () => void }) {
  return (
    <button type="button" className={props.on ? "chip on" : "chip"} onClick={props.onClick} aria-pressed={props.on}>
      {props.dot ? <span className="cdot" style={{ background: props.on ? "#FFFFFF" : props.dot }} /> : null}
      {props.label}
    </button>
  );
}

export function Pill(props: { text: string; col: string }) {
  return (
    <span className="pill" style={{ background: props.col + "26", borderColor: props.col + "66" }}>
      <span className="cdot" style={{ background: props.col }} />
      {props.text}
    </span>
  );
}

export function Status(props: { tone: "warning" | "neutral"; children: string }) {
  return <span className={"badge " + props.tone}>{props.children}</span>;
}

export function Section(props: { heading: string; collapsible?: boolean; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(props.collapsible ? !!props.defaultOpen : true);
  if (!props.collapsible) {
    return (
      <section className="block">
        <h3>{props.heading}</h3>
        {props.children}
      </section>
    );
  }
  return (
    <section className={open ? "fold open" : "fold"}>
      <button type="button" className="fold-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="chev" aria-hidden="true" />
        {props.heading}
      </button>
      {open ? <div className="fold-body">{props.children}</div> : null}
    </section>
  );
}

export function BulletList(props: { items: string[] }) {
  return (
    <ul className="bullets">
      {props.items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}

export function Steps(props: { steps: { title: string; detail: string }[] }) {
  return (
    <ol className="steps">
      {props.steps.map((s, i) => (
        <li key={i}>
          <strong>{s.title}</strong>
          <p>{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}
