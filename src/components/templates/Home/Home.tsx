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
            content="<strong><h1>Title</h1></strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>Nulla vitae elit libero, a pharetra augue. Sed non mauris vitae erat consequat auctor eu in elit. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.<br/>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus.
            </p>
            <iframe src='https://www.youtube.com/embed/NmxFxBiCrL4' frameborder='0' allowfullscreen></iframe>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>Nulla vitae elit libero, a pharetra augue. Sed non mauris vitae erat consequat auctor eu in elit. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.<br/>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus.
            </p>
            "
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
