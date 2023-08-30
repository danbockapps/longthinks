'use client'

import { useState } from 'react'
import Enter from './Enter'
import Boards from './Boards'
import { StyledEngineProvider } from '@mui/joy'

export type Think = [string, number]

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [thinks, setThinks] = useState<Think[]>([])

  const onSubmit = async (username: string) => {
    setLoading(true)
    setThinks([])

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
    <StyledEngineProvider injectFirst>
      {/* ☝️ Gives Tailwind css precedence over MUI */}
      <main className='container mx-auto'>
        <Enter {...{ onSubmit, loading }} />
        <Boards {...{ thinks }} />
      </main>
    </StyledEngineProvider>
  )
}
