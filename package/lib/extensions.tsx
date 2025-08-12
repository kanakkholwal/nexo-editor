
// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import Mention from '@tiptap/extension-mention'
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Dropcursor, Selection } from "@tiptap/extensions"
import { StarterKit } from "@tiptap/starter-kit"

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"


// --- Tiptap UI CSS---
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import suggestions from "@/lib/mention-utils"

/**
 * Map of Tiptap extensions used in the editor.
 * This map is used to configure the editor with the necessary extensions.
 */
export const extensionsMap = {
    StarterKit: StarterKit.configure({
        horizontalRule: false,
        link: {
            openOnClick: false,
            enableClickSelection: true,
        },
    }),
    HorizontalRule,
    TextAlign: TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem: TaskItem.configure({ nested: true }),
    Highlight: Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
    Dropcursor: Dropcursor.configure({
        color: 'var(--primary)',
    }),
    Mention: Mention
    .configure({
        HTMLAttributes: {
            class: 'mention',

        },
        deleteTriggerWithBackspace: true,
        suggestions,

    })
}

/** * Array of default Tiptap extensions used in the editor.
 * This array is used to initialize
 * the editor with the default set of extensions.
 * This array is used to initialize
 * the editor with the default set of extensions.
 */

export const defaultExtensions = [
    ...Object.values(extensionsMap),
]