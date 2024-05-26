"use client";
import { cn } from "@/utils";
import { ReactNode, useState } from "react";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import {
  CodeBracketIcon,
  PhotoIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { PlusIcon } from "@heroicons/react/24/solid";

// editor extensions
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
// import { History } from "@tiptap/extension-history";
// code Highlighting
import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import shell from "highlight.js/lib/languages/shell";
import "highlight.js/styles/atom-one-dark.css";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("javascript", js);
lowlight.register("typescript", ts);
lowlight.register("java", java);
lowlight.register("python", python);
lowlight.register("c", c);
lowlight.register("cpp", cpp);
lowlight.register("shell", shell);

const CustomDocument = Document.extend({ content: "heading block*" });

const placeholder: Record<string, string> = {
  heading: "Title",
  paragraph: "Tell your story...",
};

type ButtonProp = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const RoundedIconButton = ({
  children,
  className,
  onClick,
  disabled,
}: ButtonProp) => {
  return (
    <button
      className={cn(
        "inline-block rounded-full p-2 ring-1 ring-green-800",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Editor = () => {
  const [isFloatingMenuActive, setFloatingMenuVisibility] =
    useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      CodeBlockLowlight.configure({
        lowlight,
      }),
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        showOnlyWhenEditable: true,
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
          className="-translate-x-20 flex gap-4 items-center z-20"
        >
          <button
            className={
              isFloatingMenuActive
                ? "rotate-45 translate-x-0 duration-200 transition transform ease-linear"
                : "duration-200 transition transform ease-in-out"
            }
            onClick={() => setFloatingMenuVisibility((visible) => !visible)}
          >
            <PlusIcon className="inline-block h-8 w-8 text-black rounded-full p-1 ring-1 ring-black" />
          </button>

          <div
            className={classNames(
              "pl-10 space-x-3 transition-all transform ease-linear duration-300",
              { "visible opacity-100": isFloatingMenuActive },
              { "invisible opacity-0": !isFloatingMenuActive }
            )}
          >
            <RoundedIconButton>
              <PhotoIcon className="h-6 w-6 text-green-800 " />
            </RoundedIconButton>
            <RoundedIconButton
              disabled={!editor.can().setCodeBlock()}
              onClick={() => editor.commands.setCodeBlock()}
            >
              <CodeBracketIcon className="h-6 w-6 text-green-800" />
            </RoundedIconButton>
          </div>
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
