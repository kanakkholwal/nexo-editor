import { Content, EditorContent, EditorContext, Extensions, useEditor } from "@tiptap/react";
import isEqual from 'lodash.isequal';
import * as React from "react";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarProps,
  ToolbarSeparator
} from "@/components/tiptap-ui-primitive/toolbar";
// --- Tiptap Node CSS ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
// --- Tiptap UI ---
import { ImageUploadNode, ImageUploadNodeOptions } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import {
  LinkButton,
  LinkContent,
  LinkPopover,
} from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Components ---
// import { ThemeToggle } from "@/components/tiptap-extended/theme-toggle"

// --- Styles ---
import { defaultExtensions } from "@/extensions";
import { cn } from "@/lib/tiptap-utils";
import "@/nexo-editor.scss";
import { Placeholder } from "@tiptap/extensions";
import { useEffect } from "react";
import { HardBreakButton, HorizontalRuleButton } from "./components/tiptap-ui/block-elements";
import { ClearFormattingButton } from "./components/tiptap-ui/inline-elements/clear-formatting";


const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
        <HardBreakButton />
        <HorizontalRuleButton />

      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />

        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
        <ClearFormattingButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)


export interface NexoEditorProps {
  content: Content
  onChange?: (content: Content) => void
  extensions?: Extensions | undefined,
  ssr?: boolean

  className?: string
  placeholder?: string
  imageUploadOptions?: ImageUploadNodeOptions
  id?: string
  toolbarProps?: ToolbarProps
}

/** * NexoEditor is a simple editor component built with Tiptap.
 * It provides a rich text editing experience with various features.
 * @param {NexoEditorProps} props - The properties for the NexoEditor component.
 * @returns {React.ReactNode} The rendered NexoEditor component.
 */

export function NexoEditor({
  content, onChange, extensions, imageUploadOptions,
  ssr = true, className, placeholder,
  toolbarProps
}: NexoEditorProps): React.ReactNode {
  const isMobile = useIsMobile()
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: !ssr,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Start typing to enter text.",
        class: "nexo-editor",
      },
    },
    extensions: [
      ...(extensions ? [...extensions] : [...defaultExtensions]),
      ...(imageUploadOptions
        ? [
          ImageUploadNode.configure({
            accept: "image/*",
            maxSize: MAX_FILE_SIZE,
            limit: 3,
            onError: (error) => console.error("Upload failed:", error),
            upload: handleImageUpload,
            ...imageUploadOptions,
          }),
        ]
        : []),
      Placeholder.configure({
        // Use a placeholder:
        showOnlyWhenEditable: true,
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `What’s the title for Heading ${node.attrs["level"] || 1} ? `;
          }
          // return placeholder || "Press '/' for commands, or '++' for AI autocomplete...";
          return placeholder || "Can you add some further context?";
        },
        includeChildren: true,
      }),

    ],
    content,
    onUpdate: ({ editor }) => {
      const content = editor.getJSON()
      if (typeof content === "object" && content) {
        onChange?.(content)
      }
    },
    onCreate: ({ editor }) => {
      editor.commands?.focus()
    },
    autofocus: isMobile ? false : "end",
    enablePasteRules: true,
  })

  // const isScrolling = useScrolling()


  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  useEffect(() => {
    if (editor && content && !isEqual(editor.getJSON(), content)) {
      editor.commands.setContent(content)
    }

  }, [content, editor])
  return (
    <div className={cn("nexo-editor-wrapper", className)}>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          role="toolbar"
          aria-label="editor toolbar"

          {...toolbarProps}
          className={cn(
            isMobile && "nexo-editor-mobile-toolbar",
            // isScrolling && "nexo-editor-scrolling"
          )}
        // style={{
        //   ...(isScrolling && isMobile
        //     ? { opacity: 0, transition: "opacity 0.3s ease-in-out" }
        //     : {}),
        //   ...(isMobile
        //     ? {
        //       bottom: `calc(100% - ${windowSize.height - rect.y}px)`,
        //     }
        //     : {}),
        // }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="nexo-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
