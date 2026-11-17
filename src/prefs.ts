export type ThemeName = "dark" | "light";
export type Fav = { id: string; title: string; query: string };

const THEME = "depan-clim-theme";
const HIST = "depan-clim-history";
const FAV = "depan-clim-favs";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* navigation privée */
  }
}

export function loadTheme(): ThemeName {
  return read<ThemeName>(THEME, "dark") === "light" ? "light" : "dark";
}

export function saveTheme(theme: ThemeName) {
  write(THEME, theme);
}

export function loadHistory(): string[] {
  const items = read<string[]>(HIST, []);
  return Array.isArray(items) ? items.filter((item) => typeof item === "string").slice(0, 8) : [];
}

export function pushHistory(query: string): string[] {
  const clean = query.trim();
  if (clean.length < 2) return loadHistory();
  const next = [clean, ...loadHistory().filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
  write(HIST, next);
  return next;
}

export function loadFavs(): Fav[] {
  const items = read<Fav[]>(FAV, []);
  return Array.isArray(items) ? items.filter((item) => item && typeof item.query === "string").slice(0, 30) : [];
}

export function toggleFav(fav: Fav): Fav[] {
  const current = loadFavs();
  const next = current.some((item) => item.id === fav.id)
    ? current.filter((item) => item.id !== fav.id)
    : [fav, ...current].slice(0, 30);
  write(FAV, next);
  return next;
}
