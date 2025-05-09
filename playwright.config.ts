import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  timeout: 30000,
  retries: 1,
  testDir: "./src/tests",
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          slowMo: 1000,
        },
        viewport: { width: 1280, height: 720 },
      },
    },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 13"] },
    // },
  ],
});
