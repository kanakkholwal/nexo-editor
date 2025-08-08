import "@/style.css";
import { Content } from "@tiptap/react";
import { useState } from "react";
import { NexoEditor } from "../../package/lib/editor";
import { handleImageUpload, MAX_FILE_SIZE } from "../../package/lib/utils";
import demoContent from "./data/content.json";



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


    return <div className="wrapper">
        <div className="header">
            Nexo Editor
            <button className="tiptap-button" onClick={() => setContent(demoContent)}>
                Load Demo Content
            </button>
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


    </div>
}