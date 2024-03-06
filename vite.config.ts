import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), richSvg()],
  resolve: {
    alias: {
      "@src": path.resolve("src"),
      "@routes": path.resolve("src/routes"),
    },
  },
});
