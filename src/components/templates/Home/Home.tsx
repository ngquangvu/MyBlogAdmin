import { Suspense, useEffect, useState } from 'react'

import { Loading } from '@/components/atoms/Loading/Loading'
import { Tiptap } from '@/components/molecules/Tiptap'

export const Home = () => {
  const [_, setEmail] = useState<string | null>('')

  useEffect(() => {
    setEmail(localStorage.getItem('admin'))
  }, [])

  return (
    <main>
      <Suspense fallback={<Loading className="" />}>
        <div>
          <Tiptap
            content="<strong><h1>Title</h1><strong><p>Lorem ipsum Lorem ipsum</p>"
            className=""
            setContent={function (html: string): void {
              console.log(html)
            }}
          />
        </div>
      </Suspense>
    </main>
  )
}
