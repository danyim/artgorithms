import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      components: path.resolve(__dirname, "./components"),
      hooks: path.resolve(__dirname, "./hooks"),
      utils: path.resolve(__dirname, "./utils"),
      types: path.resolve(__dirname, "./types"),
      styles: path.resolve(__dirname, "./styles"),
    },
  },
});
