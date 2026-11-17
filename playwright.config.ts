import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "https://syncro66.github.io/Depan-clim/";

export default defineConfig({
  testDir: "e2e",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: 1,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "off",
  },
  projects: [
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    { name: "pc", use: { ...devices["Desktop Chrome"] } },
  ],
});
