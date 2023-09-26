'use client'

import Boards from '@/app/Boards'
import Enter from '@/app/Enter'
import { StyledEngineProvider } from '@mui/joy'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

export type Think = [string, number]
export type Site = 'lichess' | 'chesscom'

export const isSite = (site: string): site is Site => ['lichess', 'chesscom'].includes(site)

interface Props {
  site?: Site
  username?: string
}

const Template: FC<Props> = props => {
  const [loading, setLoading] = useState<boolean>(false)
  const [thinks, setThinks] = useState<Think[]>([])
  const router = useRouter()

  // Runs every time the route changes
  useEffect(() => {
    if (props.site && props.username) {
      setLoading(true)
      setThinks([])

      const load = async () => {
        try {
          const response = await fetch(
            `https://danbock.net/longthinksapi/${props.site}/${props.username}`,
          )
          const { thinks } = (await response.json()) as { thinks: Think[] }
          setThinks(thinks)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

      load()
    }
  }, [props.site, props.username])

  return (
    <StyledEngineProvider injectFirst>
      {/* ☝️ Gives Tailwind css precedence over MUI */}
      <main className='container mx-auto'>
        <Enter
          {...{ loading }}
          onSubmit={(site, username) => router.push(`/${site}/${username}`)}
        />
        <Boards {...{ thinks }} />
      </main>
    </StyledEngineProvider>
  )
}

export default Template
