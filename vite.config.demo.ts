import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [solid()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      generateScopedName: "animal-[local]-[hash:base64:5]",
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, "src/styles/variables.less")}";`,
      },
    },
  },
  build: {
    outDir: "demo-dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["solid-js"],
        },
      },
    },
    assetsInlineLimit: 40 * 1024,
  },
});
