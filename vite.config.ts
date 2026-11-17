import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Depan-clim/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: [
        "favicon.png",
        "icons/apple-touch-icon.png",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/icon-512-maskable.png",
      ],
      manifest: {
        name: "Dépannage Clim",
        short_name: "Dépannage Clim",
        description: "Codes défauts clim et PAC, par code, gamme ou référence.",
        lang: "fr",
        id: "/Depan-clim/",
        start_url: "/Depan-clim/",
        scope: "/Depan-clim/",
        display: "standalone",
        background_color: "#070b14",
        theme_color: "#070b14",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        cacheId: "depan-clim-v3",
        globPatterns: ["**/*.{js,css,html,png,webp,svg,ico,webmanifest,json}"],
        navigateFallback: "index.html",
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
});
