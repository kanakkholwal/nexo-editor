"use client"

import { Badge } from "@/components/tiptap-ui-primitive/badge"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { type Editor } from "@tiptap/react"
import { RemoveFormatting } from "lucide-react"; // icon for "clear formatting"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"

// --- Utils from your code base ---
import {
    isNodeTypeSelected
} from "@/lib/tiptap-utils"

// --- Clear Formatting ---

export const CLEAR_FORMATTING_SHORTCUT_KEY = "mod+\\"

function canClearFormatting(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (isNodeTypeSelected(editor, ["image"])) return false
  // check if any marks or nodes active (simplified)
  return editor.isActive("bold") ||
    editor.isActive("italic") ||
    editor.isActive("strike") ||
    editor.isActive("underline") ||
    editor.isActive("code") ||
    editor.isActive("link") ||
    editor.isActive("highlight") ||
    editor.isActive("textStyle") // add more if needed
}

function clearAllFormatting(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  try {
    editor.chain().focus().unsetAllMarks().clearNodes().run()
    return true
  } catch {
    return false
  }
}

export function useClearFormatting(config?: {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onToggled?: () => void
}) {
  const { editor: providedEditor, hideWhenUnavailable = false, onToggled } =
    config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = React.useState(true)
  const canToggleState = canClearFormatting(editor)
  const isActive =
    editor
      ? editor.isActive("bold") ||
        editor.isActive("italic") ||
        editor.isActive("strike") ||
        editor.isActive("underline") ||
        editor.isActive("code") ||
        editor.isActive("link") ||
        editor.isActive("highlight") ||
        editor.isActive("textStyle")
      : false

  React.useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
      setIsVisible(!hideWhenUnavailable || canClearFormatting(editor))
    }

    handleUpdate()
    editor.on("selectionUpdate", handleUpdate)

    return () => {editor.off("selectionUpdate", handleUpdate)}
  }, [editor, hideWhenUnavailable])

  const handleToggle = React.useCallback(() => {
    if (!editor) return false
    const success = clearAllFormatting(editor)
    if (success) onToggled?.()
    return success
  }, [editor, onToggled])

  useHotkeys(
    CLEAR_FORMATTING_SHORTCUT_KEY,
    (e) => {
      e.preventDefault()
      handleToggle()
    },
    {
      enabled: isVisible && canToggleState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    canToggle: canToggleState,
    handleToggle,
    isActive,
    label: "Clear Formatting",
    shortcutKeys: CLEAR_FORMATTING_SHORTCUT_KEY,
    Icon: RemoveFormatting ,
  }
}

// Button component

export const ClearFormattingButton = React.forwardRef<
  HTMLButtonElement,
  {
    editor?: Editor | null
    hideWhenUnavailable?: boolean
    onToggled?: () => void
    showShortcut?: boolean
    text?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }
>((props, ref) => {
  const {
    editor,
    hideWhenUnavailable,
    onToggled,
    showShortcut = false,
    text,
    onClick,
    ...rest
  } = props

  const {
    isVisible,
    canToggle,
    isActive,
    handleToggle,
    label,
    shortcutKeys,
    Icon,
  } = useClearFormatting({ editor, hideWhenUnavailable, onToggled })

  if (!isVisible) return null

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    handleToggle()
  }

  function ShortcutBadge({ shortcutKeys }: { shortcutKeys: string }) {
    const display = shortcutKeys
      .replace(/mod/g, navigator.platform.includes("Mac") ? "⌘" : "Ctrl")
      .replace(/\+/g, " + ")
    return <Badge>{display}</Badge>
  }

  return (
    <Button
      type="button"
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      disabled={!canToggle}
      aria-label={label}
      aria-pressed={isActive}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <Icon className="tiptap-button-icon" />
      {text && <span className="tiptap-button-text">{text}</span>}
      {showShortcut && <ShortcutBadge shortcutKeys={shortcutKeys} />}
    </Button>
  )
})

ClearFormattingButton.displayName = "ClearFormattingButton"
