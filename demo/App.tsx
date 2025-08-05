import "@/style.css";
import { Content, JSONContent } from "@tiptap/react";
import { useState } from "react";
import { extensions, NexoEditor } from "../lib/editor";
import { renderToMarkdown } from "../lib/utils";




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


    return <div className="w-full max-w-7xl mx-auto my-20 p-5 md:p-24">
        <div className="text-center text-2xl font-bold mb-10">
            Nexo  Editor

        </div>
        <NexoEditor
            content={content}
            onChange={(content) => setContent(content)}
        />
        <div className="text-center mt-10">
            {renderToMarkdown({
                content: content as JSONContent,
                extensions: extensions
                
            })}
            </div>

    </div>
}