import { Content, JSONContent } from "@tiptap/react";
import { defaultExtensions, handleImageUpload, MAX_FILE_SIZE, renderToMarkdown } from "nexo-editor";
import "nexo-editor/index.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import demoContent from "./data/content.json";

import { ErrorBoundary } from "react-error-boundary";
import { CiImport } from "react-icons/ci";

import { ArrowRightLeft, ArrowUpRight, LoaderCircle } from "lucide-react";
import { createHighlighter } from 'shiki';
import { Button } from "./components/ui/button";
import { ThemeCustomizer, ThemeToggler } from "./theme-customizer";

const NexoEditor = lazy(() => import("nexo-editor").then(module => ({ default: module.NexoEditor })));

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



    return <div className="min-h-screen max-w-7xl mx-auto space-y-5" id="preview">
        <section id="header" className="p-6">
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
                <div className="mt-4 flex items-center gap-2 flex-wrap">

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
        </section>
        <main id="editor" className="flex-1 min-h-[400px]">
            <style id="nexo-editor-preview-style" />
            {mode === "preview" ? (<Suspense fallback={
                <div className="flex items-center justify-center h-full min-h-96 border rounded-md card">
                    <LoaderCircle className="animate-spin size-10 text-primary" />
                </div>
            }>
                <ErrorBoundary fallback={
                    <div className="text-center  h-96 flex flex-col items-center justify-center w-full border rounded-md card">
                        <IoDocumentTextOutline className="size-8 mb-2 text-red-500" />
                        <h2 className="text-lg font-semibold mb-2 text-red-500">Error Loading Editor</h2>
                        <p className="text-sm text-red-300">Something went wrong while loading the editor.</p>
                    </div>
                }>

                    <NexoEditor
                        content={content}
                        onChange={(content) => {
                            setContent(content)
                            try {
                                console.log("Content Changed:", content);
                                if(!content || !content["content"]) {
                                    console.error("Invalid content structure:", content);
                                    return;
                                }
                                const markdown = renderToMarkdown({
                                    content: content as JSONContent,
                                    extensions: defaultExtensions,
                                });
                                console.log("Markdown Content:", markdown);
                            }
                            catch (error) {
                                console.error("Error rendering to markdown:", error);
                            }
                        }}
                        ssr={false}
                        imageUploadOptions={{
                            accept: "image/*",
                            maxSize: MAX_FILE_SIZE,
                            limit: 3,
                            onError: (error) => console.error("Upload failed:", error),
                            upload: handleImageUpload,
                        }}
                    />
                </ErrorBoundary>
            </Suspense>
            ) : (<div className="prose prose-sm prose-gray dark:prose-invert p-6">
                <RenderCodeBlock content={content} />
            </div>
            )}
        </main>
    </div>


}

const highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['javascript', 'typescript', 'json', 'html', 'css', 'markdown', 'jsx', 'tsx'],
})
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
        <div className="sh-lang--json font-mono [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:border bg-card"
            dangerouslySetInnerHTML={{ __html: code }}
        />
    );
}