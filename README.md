# Nexo Editor

A Rich Text editor based on @tiptap/react

[![npm version](https://badge.fury.io/js/nexo-mdx.svg)](https://www.npmjs.com/package/nexo-mdx)
[![NPM Downloads](https://img.shields.io/npm/dy/nexo-mdx)](https://www.npmjs.com/package/nexo-mdx)

## Features

- **React Component**: Easily integratable editor

## Installation

Choose your preferred package manager:

```bash
npm install nexo-editor --save
# or
bun install nexo-editor
# or
pnpm add nexo-editor
```

## Basic Usage

- Follow these steps to integrate nexo-editor into your project:
- Import the Editor: Import NexoEditor from the package.
- Manage State: Utilize React's state management to handle the editor's content.

```jsx editor.jsx

import React, { useState } from 'react';
import type { Content, JSONContent } from "@tiptap/react";

export function Editor() {
   const [content, setContent] = useState<Content>({
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Hello, this is a simple editor built with Nexo Editor!"
                    }
                ]
            }
        ]
    });
  return (
    <NexoEditor
        content={content}
        onChange={(content) => setContent(content)}
    />
  );
}

```
