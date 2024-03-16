import { Suspense, useEffect, useState } from 'react'

import { Loading } from '@/components/atoms/Loading/Loading'

export const Home = () => {
  const [email, setEmail] = useState<string | null>('')

  useEffect(() => {
    setEmail(localStorage.getItem('admin'))
  }, [])

  return (
    <main>
        <Suspense fallback={<Loading className="" />}>
          {email && (
           <h2>Hello admin</h2>
          )}
        </Suspense>
    </main>
  )
}
