"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

// Import Quill CSS
import "quill/dist/quill.snow.css";

type QuillType = any;

export interface QuillEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
}

interface QuillEditorProps {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
}

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(
  ({ defaultValue = "", placeholder = "Write something...", onChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<QuillType>(null);
    const [isReady, setIsReady] = useState(false);

    useImperativeHandle(ref, () => ({
      getContent: () => {
        return quillRef.current ? quillRef.current.root.innerHTML : "";
      },
      setContent: (content: string) => {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = content;
        }
      },
    }));

    useEffect(() => {
      let quillInstance: QuillType | null = null;

      const initQuill = async () => {
        if (!containerRef.current) return;

        const Quill = (await import("quill")).default;

        const toolbarOptions = [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          [{ direction: "rtl" }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ];

        quillInstance = new Quill(containerRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: toolbarOptions,
          },
        });

        quillRef.current = quillInstance;

        // Set initial content
        if (defaultValue) {
          quillInstance.root.innerHTML = defaultValue;
        }

        // Listen for changes
        quillInstance.on("text-change", () => {
          const html = quillInstance.root.innerHTML;
          onChange?.(html);
        });

        setIsReady(true);
      };

      initQuill();

      return () => {
        if (quillInstance) {
          quillInstance = null;
        }
      };
    }, []);

    return (
      <div className="quill-editor-wrapper">
        {!isReady && (
          <div className="flex items-center justify-center h-12 bg-[#0a0f1e] border border-[#1f2937] rounded-t-xl">
            <div className="w-5 h-5 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm ml-2">Loading editor...</span>
          </div>
        )}
        <div
          ref={containerRef}
          className={`${!isReady ? "opacity-0 h-0 overflow-hidden" : "opacity-100"} transition-opacity`}
          style={{ minHeight: isReady ? "300px" : "0px" }}
        />
      </div>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
