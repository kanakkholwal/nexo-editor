---
title: Nexo Editor - React Markdown Editor with TipTap 
description: Lightweight, customizable React Markdown editor built on TipTap, supporting SSR, custom plugins, Tailwind & ShadCN UI integration.
keywords: React Markdown Editor, MDX Editor, TipTap React, Rich Text Editor, SSR Editor Component, Tailwind Editor, ShadCN UI Editor
---

# Nexo Editor — React Markdown & MDX Rich Text Editor

A lightweight, customizable React Markdown Editor built on TipTap, designed for modern React projects with support for SSR, Tailwind, ShadCN UI, and plugin extensibility based on `@tiptap/react`

[![npm version](https://badge.fury.io/js/nexo-editor.svg)](https://www.npmjs.com/package/nexo-editor)
[![NPM Downloads](https://img.shields.io/npm/dy/nexo-editor)](https://www.npmjs.com/package/nexo-editor)
[![GitHub Stars](https://img.shields.io/github/stars/kanakkholwal/nexo-editor?style=social)](https://github.com/kanakkholwal/nexo-editor/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/kanakkholwal/nexo-editor)](https://github.com/kanakkholwal/nexo-editor/issues)
[![MIT License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 🚀 Features

- ⚛️ React Component – Simple and flexible integration.

- ✨ TipTap Extensions Support – Extend functionality easily.

- 🖌️ Customizable Toolbar – Full control over UI & UX.

- 🧩 Plugin System – Add custom behaviors.

- 🎨 Tailwind & ShadCN UI Compatible – Style seamlessly.

- 📦 SSR Friendly – Works with Next.js, Remix, etc.

- 🔌 Floating UI & Radix Components – Smooth UX patterns.

- ♿ Accessible Design – Built with ARIA attributes.

- 📄 Markdown & MDX Support – For content-heavy applications.

## 📦Installation

Install via your preferred package manager:

```bash
npm install nexo-editor --save
# or
bun install nexo-editor
# or
pnpm add nexo-editor
```

## ⚡Basic Usage

Here’s how to integrate `nexo-editor` into your React project:

```tsx editor.jsx
import React, { useState } from 'react';
import { NexoEditor } from 'nexo-editor';
import type { Content } from '@tiptap/react';

export function Editor() {
  const [content, setContent] = useState<Content>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Hello, this is Nexo Editor!" }]
      }
    ]
  });

  return (
    <NexoEditor
      content={content}
      onChange={(updatedContent) => setContent(updatedContent)}
    />
  );
}

```

### 📚Documentation

- Full API Docs (Coming Soon) - [https://docs.nexonauts.com/packages](https://docs.nexonauts.com/packages)
- Examples & Advanced Use Cases (Coming Soon)

### 🔥 Why Nexo Editor?

- For developers needing a React-friendly Markdown editor.

- Perfect for CMS, Blogs, SaaS Platforms.

- Highly customizable UI/UX for tailored editor experiences.

- Designed with developer ergonomics in mind.

- Extensible through TipTap’s powerful plugin system.Why Nexo Editor? 🔥
For developers needing a React-friendly Markdown editor.

- Perfect for CMS, Blogs, SaaS Platforms.

- Highly customizable UI/UX for tailored editor experiences.

- Designed with developer ergonomics in mind.

- Extensible through TipTap’s powerful plugin system.
