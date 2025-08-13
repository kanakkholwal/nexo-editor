"use client";
import { ChevronDownIcon } from '@/components/tiptap-icons/chevron-down-icon';
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import { Button, ButtonGroup } from '@/components/tiptap-ui-primitive/button';
import { Card, CardBody } from '@/components/tiptap-ui-primitive/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/tiptap-ui-primitive/dropdown-menu';
import CodeBlock from '@tiptap/extension-code-block';
import type { NodeViewProps } from "@tiptap/react";
import { mergeAttributes, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';

import { LanguageOption, languagesList } from '@/lib/languages-list';

const CodeBlockNodeComponent = (props: NodeViewProps) => {
    const { class: className, language } = props.node.attrs;
    const defaultLang = props.node.attrs["data-default-language"] || "javascript";
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
        id: language || defaultLang,
        label: languagesList.find(lang => lang.id === (language || defaultLang))?.label || 'JavaScript',
    });

    const handleSelectLanguage = (lang: LanguageOption) => {
        setSelectedLanguage(lang);
        props.updateAttributes({ language: lang.id, "data-selected-language": lang.id });
    };

    useEffect(() => {
        if (!language) {
            props.updateAttributes({ language: selectedLanguage.id, "data-selected-language": selectedLanguage.id });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <NodeViewWrapper className={`code-block-node ${className || ""}`}>
            <div className="code-block-header">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            type="button"
                            data-style="ghost"
                            role="button"
                            tabIndex={-1}
                            aria-label="List language options"
                            tooltip="Select Language"
                            data-active-state={selectedLanguage ? "on" : "off"}
                        >
                            <Languages className="tiptap-button-icon" />
                            <span className="tiptap-button-text">{selectedLanguage.label}</span>
                            <ChevronDownIcon className="tiptap-button-icon  tiptap-button-text" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="tiptap-dropdown-menu" portal={true}>
                        <Card>
                            <CardBody>
                                <ButtonGroup >
                                    {languagesList.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.id}
                                            onSelect={(e) => {
                                                e.preventDefault();
                                                handleSelectLanguage(lang);
                                            }}
                                            asChild
                                            onClick={() => handleSelectLanguage(lang)}
                                        >
                                            <Button
                                                type="button"
                                                data-style="ghost"
                                                data-active-state={selectedLanguage.id === lang.id ? "on" : "off"}
                                                role="button"
                                                
                                            >
                                                {lang.label}
                                            </Button>
                                        </DropdownMenuItem>
                                    ))}
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <pre className={`lang-${selectedLanguage.id}`} data-language={selectedLanguage.id} data-type="code-block">
                {/* IMPORTANT: This makes the code editable */}
                <NodeViewContent as={"code" as unknown as "div"} spellCheck={false} />
            </pre>
        </NodeViewWrapper>
    );
};

export default CodeBlock.extend({
    addAttributes() {
        return {
            class: {
                default: 'code-block-node',
            },
            language: {
                default: this.options.defaultLanguage || 'javascript',
                renderHTML: (attributes) => ({ 'data-language': attributes["data-language"] }),
            },
            'data-selected-language': {
                default: this.options.defaultLanguage || 'javascript',
            },
            'data-default-language': {
                default: this.options.defaultLanguage || 'javascript',
            },
        };
    },

    parseHTML() {
        return [{ tag: 'pre[data-type="code-block"].code-block-node' }];
    },

    renderHTML({ HTMLAttributes }) {
        const lang = HTMLAttributes["data-language"] || this.options.defaultLanguage || "javascript";
        return [
            "pre",
            mergeAttributes(
                {
                    "data-type": "code-block",
                    "data-selected-language": HTMLAttributes["data-selected-language"] || lang,
                    "data-default-language": this.options.defaultLanguage || "javascript",
                    class: `code-block-node language-${lang}`,
                },
                HTMLAttributes,
            ),
            ["code", 0],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockNodeComponent);
    },
});
