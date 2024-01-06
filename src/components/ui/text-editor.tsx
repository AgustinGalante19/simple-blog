"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Strikethrough, Italic, Heading2, Code } from "lucide-react";
import { Toggle } from "./toggle";
import Heading from "@tiptap/extension-heading";
import CodeExt from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import { UnderlineOutlined } from "@ant-design/icons";

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className='space-x-1 border bg-slate-100/30 p-1 border-gray-400/60 rounded-t-md flex'>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineOutlined className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className='h-4 w-4' />
      </Toggle>
    </div>
  );
}

function TextEditor({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
      CodeExt.configure({
        HTMLAttributes: {
          class: "p-1 bg-slate-100",
        },
      }),
      Underline,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] border-x border-b border-gray-400/60 rounded-b-md",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className='flex flex-col justify-stretch'>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editor?.chain().setHardBreak().run();
          }
        }}
      />
    </div>
  );
}

export default TextEditor;
