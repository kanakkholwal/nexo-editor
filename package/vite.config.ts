import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';


export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
    }),

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
        '@tiptap/extension-highlight',
        '@tiptap/extension-horizontal-rule',
        '@tiptap/extension-image',
        '@tiptap/extension-list',
        '@tiptap/extension-subscript',
        '@tiptap/extension-superscript',
        '@tiptap/extension-text-align',
        '@tiptap/extension-typography',
        '@tiptap/static-renderer',
        '@floating-ui/react',
        '@tiptap/extension-mention',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-popover',
        'lodash.isequal',
        'lodash.throttle',
        'nanoid',
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
          'react-hotkeys-hook': 'reactHotkeysHook',
          "lodash.isequal": "lodashIsEqual",
          'nanoid': 'nanoid',
          '@tiptap/extension-highlight': 'TiptapExtensionHighlight',
          '@tiptap/extension-horizontal-rule': 'TiptapExtensionHorizontalRule',
          '@tiptap/extension-image': 'TiptapExtensionImage',
          '@tiptap/extension-list': 'TiptapExtensionList',
          '@tiptap/extension-subscript': 'TiptapExtensionSubscript',
          '@tiptap/extension-superscript': 'TiptapExtensionSuperscript',
          '@tiptap/extension-text-align': 'TiptapExtensionTextAlign',
          '@tiptap/extension-typography': 'TiptapExtensionTypography',
          '@tiptap/static-renderer': 'TiptapStaticRenderer',
          '@tiptap/extension-mention':'TiptapExtensionMention'
          
        },
      },
    },
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: false, // ⬅ forces all CSS into one file
  },
});
