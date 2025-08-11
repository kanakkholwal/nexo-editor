import { Content } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE, NexoEditor } from "nexo-editor";
import "nexo-editor/index.css";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import demoContent from "./data/content.json";

import { CiImport } from "react-icons/ci";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { ThemeCustomizer, ThemeToggler } from "./theme-customizer";



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
                    }
                ]
            }
        ]
    });



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
                themes using the Theme Customizer below.
            </p>
            <div className="mt-4 flex items-center gap-2">

            <Button variant="default_light" size="sm" onClick={() => setContent(demoContent)}>
                <CiImport />
                Load Demo Content
            </Button>

            <ThemeCustomizer />
            </div>
        </div>
        <style id="nexo-editor-preview-style">

        </style>
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
    </main>


}