# Technology Stack

## Core Technologies
- **React 19+** - Primary UI framework
- **TypeScript** - Type-safe development
- **TipTap** - Rich text editor foundation with extensions
- **Vite** - Build tool and development server
- **SCSS/CSS** - Styling with custom variables and keyframe animations

## Key Dependencies
- **@tiptap/react** - Core TipTap React integration
- **@tiptap/extensions** - Rich text editing extensions
- **@floating-ui/react** - Floating UI components
- **@radix-ui** - Accessible UI primitives (dropdown-menu, popover)
- **Lodash utilities** - throttle, isEqual for performance optimization
- **react-hotkeys-hook** - Keyboard shortcuts
- **nanoid** - Unique ID generation

## Development Tools
- **ESLint** - Code linting with TypeScript and React hooks rules
- **Changesets** - Version management and changelog generation
- **Terser** - Code minification
- **vite-plugin-dts** - TypeScript declaration file generation

## Build System

### Workspace Structure
This is a monorepo with npm workspaces:
- `package/` - Main library source code
- `demo/` - Demo application for testing

### Common Commands

**Package Development:**
```bash
npm run pkg:dev          # Watch mode development
npm run pkg:build        # Build the library
npm run pkg:publish      # Build and publish to npm
```

**Demo Development:**
```bash
npm run demo:dev         # Start demo development server
```

**Linking for Local Development:**
```bash
npm run link             # Link package to demo for local testing
npm run unlink           # Unlink package
```

**Release Management:**
```bash
npm run pkg:prepare      # Prepare changeset and version
```

### Build Configuration
- **Library builds** use Vite with UMD and ES module outputs
- **TypeScript declarations** generated to `dist/types/`
- **CSS bundling** combines all styles into single file
- **External dependencies** marked as peer dependencies
- **Source maps** disabled for production builds