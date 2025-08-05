/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'node:path';
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // libInjectCss(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },
  build: {
    outDir: 'dist',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "./lib/index.tsx"),
      name: "nexo-editor",
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    minify: 'terser', // Use Terser for minification
  }
});
