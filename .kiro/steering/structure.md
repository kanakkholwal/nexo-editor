# Project Structure

## Root Level Organization
```
nexo-editor/
├── package/           # Main library source code
├── demo/             # Demo application for testing
├── .kiro/            # Kiro AI assistant configuration
├── .github/          # GitHub workflows and templates
└── package.json      # Root workspace configuration
```

## Package Directory (`package/`)
Main library source code with the following structure:

```
package/
├── lib/                    # Source code
│   ├── components/         # React components
│   │   ├── tiptap-icons/   # Icon components
│   │   ├── tiptap-node/    # Node-specific components
│   │   ├── tiptap-ui/      # UI components
│   │   └── tiptap-ui-primitive/ # Base UI primitives
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── styles/             # SCSS styling
│   ├── editor.tsx          # Main editor component
│   ├── extensions.tsx      # TipTap extensions
│   ├── index.tsx           # Main entry point
│   └── utils.ts            # Utility functions
├── dist/                   # Built library output
├── package.json            # Library package configuration
└── vite.config.ts          # Build configuration
```

## Demo Directory (`demo/`)
Testing and demonstration application:

```
demo/
├── src/                    # Demo source code
├── dist/                   # Built demo output
├── package.json            # Demo dependencies
└── vite.config.ts          # Demo build config
```

## Key Files and Their Purpose

### Library Entry Points
- `package/lib/index.tsx` - Main library export
- `package/lib/editor.tsx` - Core editor component
- `package/lib/extensions.tsx` - TipTap extensions bundle
- `package/lib/utils.ts` - Utility functions

### Component Organization
- **tiptap-ui-primitive/** - Base accessible components
- **tiptap-ui/** - Composed UI components for the editor
- **tiptap-node/** - Node-specific rendering components
- **tiptap-icons/** - Icon components for toolbar

### Hooks Directory
Custom React hooks for editor functionality:
- `use-tiptap-editor.ts` - Main editor hook
- `use-throttled-callback.ts` - Performance optimization
- `use-mobile.ts` - Mobile device detection
- `use-cursor-visibility.ts` - Cursor state management

### Styling Structure
- `nexo-editor.scss` - Main stylesheet
- `styles/_variables.scss` - SCSS variables
- `styles/_keyframe-animations.scss` - Animation definitions

## Build Outputs
- **UMD build** - `dist/index.umd.js`
- **ES modules** - `dist/index.es.js`
- **TypeScript types** - `dist/types/`
- **CSS bundle** - `dist/nexo-editor.css`

## Configuration Files
- **TypeScript** - `tsconfig.json`, `tsconfig-build.json`
- **ESLint** - `.eslintrc.cjs`
- **Vite** - `vite.config.ts` (separate for package and demo)
- **Changesets** - `.changeset/` directory for version management