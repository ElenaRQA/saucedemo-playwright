import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  name: "desktop-suite",
  timeout: 30000,
  retries: 1,
  testDir: "./src/tests",
  fullyParallel: true,
  workers: 2,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { slowMo: 0 },
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Desktop Firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: { slowMo: 0 },
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
