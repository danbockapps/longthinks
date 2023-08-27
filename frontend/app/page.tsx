'use client'

import { useState } from 'react'
import Enter from './Enter'
import Boards from './Boards'

export type Think = [string, number]

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [thinks, setThinks] = useState<Think[]>([])

  const onSubmit = async (username: string) => {
    setLoading(true)

    try {
      const response = await fetch(`https://danbock.net/longthinksapi/${username}`)
      const { thinks } = (await response.json()) as { thinks: Think[] }
      setThinks(thinks)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='container mx-auto'>
      <Enter {...{ onSubmit, loading }} />
      <Boards {...{ thinks }} />
    </main>
  )
}
