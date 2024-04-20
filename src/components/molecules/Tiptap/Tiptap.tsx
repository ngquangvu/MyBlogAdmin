import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import { Icon } from '@iconify/react'
import '../../../assets/css/tiptap.css'
import { useMutateUploadImage } from '@/components/hooks/useMutatePost'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //   TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false
    }
  }),
  Image,
  ImageResize
]

type Props = {
  userId?: string
  className?: string
  content: string
  setContent: (html: string) => void
}

export const Tiptap = ({ userId, className = '', content, setContent }: Props) => {
  const { mutateAsync: uploadImageMutateAsync } = useMutateUploadImage()

  // Initialize the editor
  const editor = useEditor(
    {
      extensions: extensions,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto p-10 rounded-b-xl focus:outline-none'
        }
      },
      content: `${content}`,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        setContent(html)
      }
    },
    [content]
  )

  // Upload image, return image url
  const handleMutateUploadImage = (uploadFile: File): Promise<string> => {
    return uploadImageMutateAsync({ userId: userId, imageFile: uploadFile })
      .then((res) => {
        if(res.data) {
          return res.data.url;
        }
        return '';
      })
      .catch((err: any) => {
        console.log(err.response.data.message)
        return '';
      });
  }

  // Adding image to the editor
  const addImage = (url: string) => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  // Hand submit image
  const handleSubmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return
    handleMutateUploadImage(e.target.files[0])
      .then((res) => addImage(res))
      .catch((err) => console.error(err))
  }

  return (
    editor && (
      <div className={`${className} bg-white text-gray-900 dark:bg-gray-600 dark:text-white rounded-md`}>
        <div>
          <BubbleMenu
            editor={editor}
            className="w-full min-w-[620px] bg-white text-gray-900 dark:bg-black dark:text-white rounded-md border border-gray-300 dark:border-gray-600 p-1"
          >
            <div className="space-x-1">
              <label className="inline-block px-2 cursor-pointer" htmlFor="upload">
                <Icon icon="fa6-solid:image" className="h-4 w-4 text-gray-600 dark:text-white" />
                <input className="hidden" id="upload" type="file" onChange={handleSubmitImage} />
              </label>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('bold') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* bold */}
                <Icon icon="fa6-solid:bold" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('italic') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* italic */}
                <Icon icon="fa6-solid:italic" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('strike') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* strike */}
                <Icon icon="fa6-solid:strikethrough" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('code') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* code */}
                <Icon icon="lucide:code" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
              <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button> */}
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('paragraph') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* paragraph */}
                <Icon icon="fa6-solid:paragraph" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* h1 */}
                <Icon icon="ci:heading-h1" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* h2 */}
                <Icon icon="ci:heading-h2" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* h3 */}
                <Icon icon="ci:heading-h3" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('heading', { level: 4 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* h4 */}
                <Icon icon="ci:heading-h4" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('heading', { level: 5 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* h5 */}
                <Icon icon="ci:heading-h5" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('bulletList') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* bullet list */}
                <Icon icon="fa6-solid:list-ul" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('orderedList') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* ordered list */}
                <Icon icon="fa6-solid:list-ol" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('codeBlock') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* code block */}
                <Icon icon="fa6-solid:code" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('blockquote') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                {/* blockquote */}
                <Icon icon="fa6-solid:quote-right" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              {/* <button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                } `}
              >
                <Icon icon="fa6-solid:paintbrush" className='h-4 w-4 text-gray-600 dark:text-white' />
              </button> */}
              <button
                className="px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                {/* undo */}
                <Icon icon="fa6-solid:arrow-rotate-left" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <button
                className="px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                {/* redo */}
                <Icon icon="fa6-solid:arrow-rotate-right" className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
            </div>
          </BubbleMenu>
          <EditorContent editor={editor}></EditorContent>
        </div>
      </div>
    )
  )
}