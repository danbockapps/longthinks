'use client'

import { useState } from 'react'
import Enter from './Enter'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (username: string) => {
    setLoading(true)
  }

  return (
    <main className='container mx-auto'>
      <Enter {...{ onSubmit, loading }} />
    </main>
  )
}
