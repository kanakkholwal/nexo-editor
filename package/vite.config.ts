import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
    }),
    // visualizer({
    //   filename: 'dist/bundle-analysis.html',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  build: {

    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: 'NexoEditor',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react', 'react-dom',
        '@tiptap/react',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/extensions',
        '@floating-ui/react',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-popover',
        'lodash.throttle',
        'react-hotkeys-hook'
      ], // peer deps
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tiptap/react': 'TiptapReact',
          '@tiptap/pm': 'TiptapPM',
          '@tiptap/starter-kit': 'TiptapStarterKit',
          '@tiptap/extensions': 'TiptapExtensions',
          '@floating-ui/react': 'FloatingUIReact',
          '@radix-ui/react-dropdown-menu': 'RadixUIDropdownMenu',
          '@radix-ui/react-popover': 'RadixUIPopover',
          'lodash.throttle': 'lodashThrottle',
          'react-hotkeys-hook': 'reactHotkeysHook'
        },
      },
    },
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: true,
  },
});
