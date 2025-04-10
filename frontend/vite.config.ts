import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          vendor: ["axios"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**"],
      exclude: [
        "src/__tests__/**",
        "src/utils/**",
        "src/theme/**",
        "**/index.tsx",
        "**/index.ts",
        "**/vite-env.d.ts",
      ],
    },
  },
});
