import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.css";

async function dropOldCaches(): Promise<void> {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => !key.startsWith("depan-clim-v4")).map((key) => caches.delete(key)));
}

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
  void dropOldCaches();
}

const root = document.getElementById("root");
if (!root) throw new Error("root manquant");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
