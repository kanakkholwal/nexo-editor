"use client"

import { Badge } from "@/components/tiptap-ui-primitive/badge";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { type Editor } from "@tiptap/react";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
// Icons from lucide-react
import { ListEnd, Minus } from "lucide-react"; // substitute with appropriate icons

// --- Utils from your code base ---
import {
    isNodeInSchema,
    isNodeTypeSelected
} from "@/lib/tiptap-utils";

import { useIsMobile } from "@/hooks/use-mobile";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// -------------- HARD BREAK -------------------

export const HARD_BREAK_SHORTCUT_KEY = "mod+shift+enter"

function canToggleHardBreak(editor: Editor | null): boolean {
    if (!editor || !editor.isEditable) return false
    if (
        !isNodeInSchema("hardBreak", editor) ||
        isNodeTypeSelected(editor, ["image"])
    )
        return false
    return true
}

function insertHardBreak(editor: Editor | null): boolean {
    if (!editor || !editor.isEditable || !canToggleHardBreak(editor)) return false
    try {
        editor.chain().focus().setHardBreak().run()
        return true
    } catch {
        return false
    }
}

export function useHardBreak(config?: {
    editor?: Editor | null
    hideWhenUnavailable?: boolean
    onToggled?: () => void
}) {
    const { editor: providedEditor, hideWhenUnavailable = false, onToggled } =
        config || {}

    const { editor } = useTiptapEditor(providedEditor)
    const isMobile = useIsMobile()
    const [isVisible, setIsVisible] = React.useState(true)
    const canToggleState = canToggleHardBreak(editor)
    const isActive = editor?.isActive("hardBreak") || false

    React.useEffect(() => {
        if (!editor) return

        const handleUpdate = () => {
            setIsVisible(!hideWhenUnavailable || canToggleHardBreak(editor))
        }

        handleUpdate()
        editor.on("selectionUpdate", handleUpdate)

        return () => {
            editor.off("selectionUpdate", handleUpdate)
        }
    }, [editor, hideWhenUnavailable])

    const handleToggle = React.useCallback(() => {
        if (!editor) return false
        const success = insertHardBreak(editor)
        if (success) onToggled?.()
        return success
    }, [editor, onToggled])

    useHotkeys(
        HARD_BREAK_SHORTCUT_KEY,
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
        label: "Hard Break",
        shortcutKeys: HARD_BREAK_SHORTCUT_KEY,
        Icon: ListEnd,
    }
}

// -------------- HORIZONTAL RULE -------------------

export const HORIZONTAL_RULE_SHORTCUT_KEY = "mod+shift+h"

function canToggleHorizontalRule(editor: Editor | null): boolean {
    if (!editor || !editor.isEditable) return false
    if (
        !isNodeInSchema("horizontalRule", editor) ||
        isNodeTypeSelected(editor, ["image"])
    )
        return false
    return editor.can().insertContent({ type: "horizontalRule" })
}

function insertHorizontalRule(editor: Editor | null): boolean {
    if (!editor || !editor.isEditable || !canToggleHorizontalRule(editor))
        return false
    try {
        editor.chain().focus().setHorizontalRule().run()
        return true
    } catch {
        return false
    }
}

export function useHorizontalRule(config?: {
    editor?: Editor | null
    hideWhenUnavailable?: boolean
    onToggled?: () => void
}) {
    const { editor: providedEditor, hideWhenUnavailable = false, onToggled } =
        config || {}

    const { editor } = useTiptapEditor(providedEditor)
    const isMobile = useIsMobile()
    const [isVisible, setIsVisible] = React.useState(true)
    const canToggleState = canToggleHorizontalRule(editor)
    const isActive = editor?.isActive("horizontalRule") || false

    React.useEffect(() => {
        if (!editor) return

        const handleUpdate = () => {
            setIsVisible(!hideWhenUnavailable || canToggleHorizontalRule(editor))
        }

        handleUpdate()
        editor.on("selectionUpdate", handleUpdate)

        return () => { editor.off("selectionUpdate", handleUpdate) }
    }, [editor, hideWhenUnavailable])

    const handleToggle = React.useCallback(() => {
        if (!editor) return false
        const success = insertHorizontalRule(editor)
        if (success) onToggled?.()
        return success
    }, [editor, onToggled])

    useHotkeys(
        HORIZONTAL_RULE_SHORTCUT_KEY,
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
        label: "Horizontal Rule",
        shortcutKeys: HORIZONTAL_RULE_SHORTCUT_KEY,
        Icon: Minus,
    }
}




function ShortcutBadge({ shortcutKeys }: { shortcutKeys: string }) {
    // Simple parser just replaces 'mod' with Cmd/Ctrl for display etc.
    const display = shortcutKeys
        .replace(/mod/g, navigator.platform.includes("Mac") ? "⌘" : "Ctrl")
        .replace(/\+/g, " + ")
    return <Badge>{display}</Badge>
}

export const HardBreakButton = React.forwardRef<
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

    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } =
        useHardBreak({ editor, hideWhenUnavailable, onToggled })

    if (!isVisible) return null

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        handleToggle()
    }

    return (
        <Button
            type="button"
            data-style="ghost"
            data-active-state={isActive ? "on" : "off"}
            role="button"
            disabled={!canToggle}
            data-disabled={!canToggle}
            tabIndex={-1}
            aria-label={label}
            aria-pressed={isActive}
            tooltip="Line Break"
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

HardBreakButton.displayName = "HardBreakButton"

export const HorizontalRuleButton = React.forwardRef<
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

    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } =
        useHorizontalRule({ editor, hideWhenUnavailable, onToggled })

    if (!isVisible) return null

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        handleToggle()
    }

    return (
        <Button
            type="button"
            data-style="ghost"
            data-active-state={isActive ? "on" : "off"}
            role="button"
            disabled={!canToggle}
            data-disabled={!canToggle}
            tabIndex={-1}
            aria-label={label}
            aria-pressed={isActive}
            tooltip="Separator"
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

HorizontalRuleButton.displayName = "HorizontalRuleButton"
