import { Content, JSONContent } from "@tiptap/react";
import {
  defaultExtensions,
  handleImageUpload,
  MAX_FILE_SIZE,
  renderToMarkdown,
} from "nexo-editor";
import "nexo-editor/index.css";
import { lazy, Suspense, useEffect, useState } from "react";

import { ArrowRightLeft, ArrowUpRight, LoaderCircle } from "lucide-react";
import { CiImport } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

import { ErrorBoundary } from "react-error-boundary";
import { createHighlighter } from "shiki";
import { Button } from "./components/ui/button";
import demoContent from "./data/content.json";
import { ThemeCustomizer, ThemeToggler } from "./theme-customizer";

const NexoEditor = lazy(() =>
  import("nexo-editor").then((m) => ({ default: m.NexoEditor }))
);

export default function App() {
  const [content, setContent] = useState<Content>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hello, this is a simple editor built with Nexo Editor!",
          },
        ],
      },
    ],
  });

  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [readOnly, setReadOnly] = useState(false);

  // Convert editor content to Markdown string
  const toMarkdown = (c: Content): string => {
    try {
      return renderToMarkdown({
        content: c as JSONContent,
        extensions: defaultExtensions,
      });
    } catch (err) {
      console.error("Markdown render failed:", err);
      return "";
    }
  };

  // Download Markdown file
  const downloadMarkdown = () => {
    const markdown = toMarkdown(content);
    if (!markdown) return;

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "nexo-editor-output.md";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto space-y-5" id="preview">
      {/* Header */}
      <section id="header" className="p-6">
        <div className="header mb-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 text-left text-xl font-bold">Nexo Editor</div>

          <div className="flex items-center gap-2">
            <ThemeToggler />

            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://docs.nexonauts.com/packages/nexo-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoDocumentTextOutline />
                Docs
                <ArrowUpRight />
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/kanakkholwal/nexo-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoGithub />
                Star us on GitHub
              </a>
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Explore the Nexo Editor — a lightweight, customizable React Rich Text and Markdown editor powered by TipTap.
          Easily switch between <strong>Preview</strong> and <strong>Code</strong> views, customize themes with
          Shadcn UI variables, upload images, and even <strong>download your content as a Markdown file</strong>.
          Perfect for building modern React apps, CMS editors, or documentation tools with full SSR support.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Button variant="default_light" size="sm" onClick={() => setContent(demoContent)}>
            <CiImport />
            Load Demo Content
          </Button>

          <Button variant="glass" size="sm" onClick={() => setMode(mode === "preview" ? "code" : "preview")}>
            <ArrowRightLeft />
            Switch to {mode === "preview" ? "Code" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setReadOnly(!readOnly)}>
            {readOnly ? "Enable" : "Disable"} Editing
          </Button>

          <Button variant="outline" size="sm" onClick={downloadMarkdown}>
            <IoDocumentTextOutline />
            Download as Markdown
          </Button>
          <Button variant="outline" size="sm" onClick={downloadMarkdown}>
            <IoDocumentTextOutline />
            Download as Markdown
          </Button>

          <ThemeCustomizer />
        </div>
      </section>

      {/* Main Editor */}
      <main id="editor" className="flex-1 min-h-[400px]">
        <style id="nexo-editor-preview-style" />
        {mode === "preview" ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full min-h-96 border rounded-md card">
                <LoaderCircle className="animate-spin size-10 text-primary" />
              </div>
            }
          >
            <ErrorBoundary
              fallback={
                <div className="text-center h-96 flex flex-col items-center justify-center w-full border rounded-md card">
                  <IoDocumentTextOutline className="size-8 mb-2 text-red-500" />
                  <h2 className="text-lg font-semibold mb-2 text-red-500">
                    Error Loading Editor
                  </h2>
                  <p className="text-sm text-red-300">
                    Something went wrong while loading the editor.
                  </p>
                </div>
              }
            >
              <NexoEditor
                content={content}
                onChange={(c) => setContent(c)}
                ssr={false}
                imageUploadOptions={{
                  accept: "image/*",
                  maxSize: MAX_FILE_SIZE,
                  limit: 3,
                  onError: (err) => console.error("Upload failed:", err),
                  upload: handleImageUpload,
                }}
                readOnly={readOnly}
              />
            </ErrorBoundary>
          </Suspense>
        ) : (
          <div className="prose prose-sm prose-gray dark:prose-invert p-6">
            <RenderCodeBlock content={content} />
          </div>
        )}
      </main>
    </div>
  );
}

// Code Block Renderer
const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: ["javascript", "typescript", "json", "html", "css", "markdown", "jsx", "tsx"],
});

function RenderCodeBlock({ content }: { content: Content }) {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    (async () => {
      const highlighted = await highlighter.codeToHtml(
        JSON.stringify(content, null, 2),
        {
          lang: "json",
          themes: { dark: "github-dark", light: "github-light" },
          defaultColor: "light-dark()",
        }
      );
      setCode(highlighted);
      setLoading(false);
    })();
  }, [content]);

  if (loading) {
    return (
      <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-64 border rounded-md card">
        <LoaderCircle className="animate-spin size-8 m-auto" />
      </div>
    );
  }

  return (
    <div
      className="sh-lang--json font-mono [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:border bg-card"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
