import react from "@vitejs/plugin-react";

import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vitest/config";

dotenv.config({
  path: ".env.test",
});

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
