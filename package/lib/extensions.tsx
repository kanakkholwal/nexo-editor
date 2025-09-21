"use client";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Mention from '@tiptap/extension-mention';
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

// --- Tiptap Node ---
import TiptapHorizontalRule from "@tiptap/extension-horizontal-rule";


// --- Tiptap UI CSS---
import CodeBlock from "@/components/tiptap-node/code-block-node/code-block";

import suggestions from "@/lib/mention-utils";

/**
 * Map of Tiptap extensions used in the editor.
 * This map is used to configure the editor with the necessary extensions.
 */
const extensionsMap = {
    StarterKit: StarterKit.configure({
        horizontalRule: false,
        link: {
            openOnClick: false,
            enableClickSelection: true,
            protocols: ['http', 'https', 'mailto', 'tel'],
            autolink: true,
            defaultProtocol: "https",
        },
        dropcursor: {
            color: 'var(--primary)',
            width: 2,
            class: 'drop-cursor',
        },
        trailingNode: false,
        codeBlock: false,
    }),
    // Markdown: Markdown.configure({
    //     html: true,
    // }),
    TiptapHorizontalRule,
    TextAlign: TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem: TaskItem.configure({ nested: true }),
    Highlight: Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
    Mention: Mention
        .configure({
            HTMLAttributes: {
                class: 'mention',
            },
            deleteTriggerWithBackspace: true,
            suggestions,
        }),
    CodeBlock: CodeBlock.configure({
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
        defaultLanguage: 'javascript',
        HTMLAttributes: {
            class: 'code-block-node',
        },
    }),
}
Object.freeze(extensionsMap)

/** * Array of default Tiptap extensions used in the editor.
 * This array is used to initialize
 * the editor with the default set of extensions.
 * This array is used to initialize
 * the editor with the default set of extensions.
 */
const defaultExtensions = Object.values(extensionsMap)

export { defaultExtensions, extensionsMap };

