import { Content } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE, NexoEditor } from "nexo-editor";
import "nexo-editor/index.css";
import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import demoContent from "./data/content.json";

import { CiImport } from "react-icons/ci";

import { ArrowRightLeft, ArrowUpRight, LoaderCircle } from "lucide-react";
import { createHighlighter } from 'shiki';
import { Button } from "./components/ui/button";
import { ThemeCustomizer, ThemeToggler } from "./theme-customizer";

const highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['javascript', 'typescript', 'json', 'html', 'css', 'markdown', 'jsx', 'tsx'],
})

export default function App() {
    const [content, setContent] = useState<Content>({
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Hello, this is a simple editor built with Nexo Editor!"
                    },
                ]
            },

        ]
    });
    const [mode, setMode] = useState<"preview" | "code">("preview");



    return <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-5" id="preview">
        <div className="header mb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 whitespace-nowrap text-left">
                Nexo Editor
            </div>
            <div className="flex items-center gap-2 justify-center">
                <ThemeToggler />
                <Button variant="ghost" size="sm" asChild>
                    <a href="https://docs.nexonauts.com/packages/nexo-editor" target="_blank" rel="noopener noreferrer">
                        <IoDocumentTextOutline />
                        Docs
                        <ArrowUpRight />
                    </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                    <a href="https://github.com/kanakkholwal/nexo-editor" target="_blank" rel="noopener noreferrer">
                        <IoLogoGithub />
                        Star us on GitHub
                        <span className="sr-only">Star us on GitHub</span>
                    </a>
                </Button>

            </div>
        </div>
        <div className="my-4">
            <p className="text-sm text-muted-foreground">
                This is a demo of the Nexo Editor. You can try it out and customize the
                themes using the Theme Customizer below (works with Shadcn UI CSS variables).
            </p>
            <div className="mt-4 flex items-center gap-2">

                <Button variant="default_light" size="sm" onClick={() => setContent(demoContent)}>
                    <CiImport />
                    Load Demo Content
                </Button>
                <Button variant="glass" size="sm" onClick={() => {
                    setMode(mode === "preview" ? "code" : "preview");
                }}>
                    <ArrowRightLeft />
                    Switch to {mode === "preview" ? "Code" : "Preview"}
                </Button>

                <ThemeCustomizer />
            </div>
        </div>
        <style id="nexo-editor-preview-style">

        </style>
        {mode === "preview" ? (
            <NexoEditor
                content={content}
                onChange={(content) => setContent(content)}
                ssr={false}
                imageUploadOptions={{
                    accept: "image/*",
                    maxSize: MAX_FILE_SIZE,
                    limit: 3,
                    onError: (error) => console.error("Upload failed:", error),
                    upload: handleImageUpload,
                }}
            />
        ) : (
            <RenderCodeBlock content={content} />
        )}

    </main>


}

function RenderCodeBlock({ content }: { content: Content }) {
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        (async () => {
            const highlighted = await highlighter.codeToHtml(JSON.stringify(content, null, 2),
                {
                    lang: 'json', themes: {
                        dark: 'github-dark',
                        light: 'github-light'
                        
                    },
                    defaultColor: 'light-dark()',
                });
            setCode(highlighted);
            setLoading(false);
        })();
    }, [content]);

    if (loading) {
        return <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-64 border rounded-md card">
            <LoaderCircle className="animate-spin size-8 m-auto" />
        </div>;
    }

    return (
        <div className="sh-lang--json font-mono prose prose-gray dark:prose-invert [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:border bg-card"
            dangerouslySetInnerHTML={{ __html: code }}
        />
    );
}