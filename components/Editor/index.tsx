"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

const CustomDocument = Document.extend({ content: "heading block*" });

const placeholder: Record<string, string> = {
  heading: "Title",
  paragraph: "Tell your story...",
};

const Editor = () => {
  const [isFloatingMenuActive, setFloatingMenuVisibility] =
    useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          const nodeType = node.type.name;
          return nodeType in placeholder ? placeholder[nodeType] : "";
        },
      }),
    ],
    content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>`,
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ delay: 50 }}>
          <button>
            <PlusCircleIcon className="h-6 w-6 text-neutral-400" />
          </button>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100, arrow: false }}
          className="-translate-x-20"
        >
          <button
            className={
              isFloatingMenuActive
                ? "rotate-45 duration-500 transition transform ease-in-out"
                : "duration-500 transition transform ease-in-out"
            }
            onClick={() => setFloatingMenuVisibility((visible) => !visible)}
          >
            <Image
              src={"/icons/plus.svg"}
              width={40}
              height={40}
              alt="Menu Icon"
            />
          </button>
        </FloatingMenu>
      )}
      <EditorContent
        editor={editor}
        className="prose lg:prose-xl font-serif prose-neutral prose-headings:text-gray-800 prose-headings:font-medium text-neutral-600"
      />
    </>
  );
};

export default Editor;
