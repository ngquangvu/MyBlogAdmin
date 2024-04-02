import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/react'

import '../../../assets/css/tiptap.css'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="space-x-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('bold') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* bold */}
        <Icon icon="fa6-solid:bold" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('italic') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* italic */}
        <Icon icon="fa6-solid:italic" className='h-4 w-4 text-white' />

      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('strike') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* strike */}
        <Icon icon="fa6-solid:strikethrough" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('code') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* code */}
        <Icon icon="lucide:code" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('paragraph') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* paragraph */}
        <Icon icon="fa6-solid:paragraph" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* h1 */}
        <Icon icon="ci:heading-h1" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* h2 */}
        <Icon icon="ci:heading-h2" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* h3 */}
        <Icon icon="ci:heading-h3" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('heading', { level: 4 }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* h4 */}
        <Icon icon="ci:heading-h4" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('heading', { level: 5 }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* h5 */}
        <Icon icon="ci:heading-h5" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('bulletList') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* bullet list */}
        <Icon icon="fa6-solid:list-ul" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('orderedList') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* ordered list */}
        <Icon icon="fa6-solid:list-ol" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('codeBlock') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* code block */}
        <Icon icon="fa6-solid:code" className='h-5 w-5 -m-0.5 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('blockquote') ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* blockquote */}
        <Icon icon="fa6-solid:quote-right" className='h-4 w-4 text-white' />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        {/* undo */}
        <Icon icon="fa6-solid:arrow-rotate-left" className='h-4 w-4 text-white' />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        {/* redo */}
        <Icon icon="fa6-solid:arrow-rotate-right" className='h-4 w-4 text-white' />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={`px-2 py-2 rounded-md hover:bg-gray-800 ${
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active bg-gray-600' : ''
        } `}
      >
        {/* purple */}
        <Icon icon="fa6-solid:paintbrush" className='h-4 w-4 text-white' />
      </button>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  })
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export const Tiptap = () => {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-600 dark:text-white rounded-md p-5">
      <EditorProvider slotBefore={<></>} extensions={extensions} content={content}>
        <BubbleMenu className="w-full min-w-[38vw] bg-white text-gray-900 dark:bg-black dark:text-white rounded-md border border-gray-500 p-1.5">
          <MenuBar />
        </BubbleMenu>
      </EditorProvider>
    </div>
  )
}
