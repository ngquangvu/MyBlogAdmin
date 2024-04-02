import { Suspense, useEffect, useState } from 'react'

import { Loading } from '@/components/atoms/Loading/Loading'
import { Tiptap } from '@/components/molecules/Tiptap'

export const Home = () => {
  const [email, setEmail] = useState<string | null>('')

  useEffect(() => {
    setEmail(localStorage.getItem('admin'))
  }, [])

  return (
    <main>
        <Suspense fallback={<Loading className="" />}>
          <div> <Tiptap /></div>
        </Suspense>
    </main>
  )
}
