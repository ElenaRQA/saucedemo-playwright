import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  name: "mobile-suite",
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
      name: "Mobile Safari",
      use: devices["iPhone 13"],
    },
    {
      name: "Mobile Chrome",
      use: devices["Pixel 5"],
    },
  ],
});
