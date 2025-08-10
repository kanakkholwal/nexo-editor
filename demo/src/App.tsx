import { Content } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE, NexoEditor } from "nexo-editor";
import { useState } from "react";
import demoContent from "./data/content.json";


import { Button } from "./components/ui/button";
import { Sidebar } from "./sidebar";



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



    return  <main className="min-h-screen p-6" id="preview">
            <div className="header mb-4 flex items-center justify-between">
                <Sidebar />
                Nexo Editor
                <Button  onClick={() => setContent(demoContent)}>
                    Load Demo Content
                </Button>
            </div>
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