import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { common, createLowlight } from 'lowlight'

import { Icon } from '@iconify/react'
import TiptapIframe from './TiptapIframe'
import { useMutateUploadImage } from '@/components/hooks/useMutatePost'
const lowlight = createLowlight()
lowlight.register({ css })
lowlight.register({ js })
lowlight.register({ ts })
lowlight.register({ html })

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false
    },
    codeBlock: false
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image', 'iframe']
  }),
  Image,
  ImageResize,
  TiptapIframe,
  Youtube.configure({
    controls: false
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common)
  })
]

type Props = {
  userId?: string
  className?: string
  content: string
  setNewContent: (html: string) => void
}

export const Tiptap = ({ userId, className = '', content, setNewContent }: Props) => {
  const { mutateAsync: uploadImageMutateAsync } = useMutateUploadImage()
  // const widthIframeRef = useRef(null)
  // const heightIframeRef = useRef(null)

  // useEffect(() => {
  //   if (widthIframeRef.current && heightIframeRef.current) {
  //     ;(widthIframeRef.current as HTMLInputElement).value = '640'
  //     ;(heightIframeRef.current as HTMLInputElement).value = '480'
  //   }
  // }, [widthIframeRef.current, heightIframeRef.current])

  // Initialize the editor
  const editor = useEditor(
    {
      extensions: extensions,
      content: `${content}`,
      onUpdate: ({ editor }) => {
        setNewContent(editor?.getHTML())
      }
    },
    [content]
  )

  // Upload image, return image url
  const handleMutateUploadImage = (uploadFile: File): Promise<string> => {
    return uploadImageMutateAsync({ userId: userId, imageFile: uploadFile })
      .then((res) => {
        if (res.data) {
          return res.data.url
        }
        return ''
      })
      .catch((err: any) => {
        console.log(err.response.data.message)
        return ''
      })
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

  // Add youtube video
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')
    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 900,
        height: 600
      })
    }
  }

  // Add iframe
  // const addIframe = () => {
  //   const url = window.prompt('URL')
  //   if (url && editor) {
  //     editor
  //       .chain()
  //       .focus()
  //       .setIframe({
  //         src: url,
  //         width: 1000,
  //         height: 1000
  //       })
  //       .run()
  //   }
  // }

  return (
    editor && (
      <div className={`${className} bg-white text-gray-900 dark:bg-gray-600 dark:text-white rounded-md`}>
        <div>
          {/* Input iframe */}
          {/* <button
          type='button' onClick={addIframe}>add iframe</button>
          <div className="">
            <input type="number" ref={widthIframeRef} placeholder="Width" />
            <input type="number" ref={heightIframeRef} placeholder="Height" />
          </div> */}

          <BubbleMenu
            editor={editor}
            className="w-full min-w-[445px] bg-white text-gray-900 dark:bg-black dark:text-white rounded-md border border-gray-300 dark:border-gray-600 p-1"
          >
            <div className="w-full flex flex-col space-y-1">
              <div className="w-full flex space-x-1">
                {/* bold */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('bold') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:bold" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* italic */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('italic') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:italic" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* strike */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('strike') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:strikethrough" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* code */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('code') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="lucide:code" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* paragraph */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('paragraph') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:paragraph" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* h1 */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="ci:heading-h1" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* h2 */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="ci:heading-h2" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* h3 */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="ci:heading-h3" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* h4 */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('heading', { level: 4 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="ci:heading-h4" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* h5 */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('heading', { level: 5 }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="ci:heading-h5" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* bullet list */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('bulletList') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:list-ul" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* ordered list */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('orderedList') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:list-ol" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>
              </div>

              <div className="flex space-x-1">
                {/* align left */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive({ textAlign: 'left' }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:align-left" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* align center */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive({ textAlign: 'center' }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:align-center" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* align right */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive({ textAlign: 'right' }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:align-right" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* align justify */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:align-justify" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* blockquote */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('blockquote') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:quote-right" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* code block */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    editor.isActive('codeBlock') ? 'is-active bg-gray-300 dark:bg-gray-600' : ''
                  } `}
                >
                  <Icon icon="fa6-solid:code" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* image */}
                <label
                  className="p-2 inline-block cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 "
                  htmlFor="upload"
                >
                  <Icon icon="fa6-solid:image" className="h-4 w-4 text-gray-600 dark:text-white" />
                  <input className="hidden h-0 w-0" id="upload" type="file" onChange={handleSubmitImage} />
                </label>

                {/* Youtube */}
                <button
                  type="button"
                  onClick={addYoutubeVideo}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 `}
                >
                  <Icon icon="fa-brands:youtube" className="h-5 w-5 -m-0.5 text-gray-600 dark:text-white" />
                </button>

                {/* clear */}
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetAllMarks().run()
                    editor.chain().focus().clearNodes().run()
                  }}
                  className={`px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800`}
                >
                  <Icon icon="fa6-solid:ban" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* undo */}
                <button
                  type="button"
                  className="px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <Icon icon="fa6-solid:arrow-rotate-left" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>

                {/* redo */}
                <button
                  type="button"
                  className="px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <Icon icon="fa6-solid:arrow-rotate-right" className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>
              </div>
            </div>
          </BubbleMenu>
          <EditorContent editor={editor}></EditorContent>
        </div>
      </div>
    )
  )
}
