'use client'

import { FC, useEffect, useState } from 'react'

type Think = [string, number]

const getGameId = (url: string) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

const getUrl = (url: string, ply: number) =>
  `https://lichess.org/embed/game/${getGameId(url)}/${
    ply % 2 === 0 ? 'white' : 'black'
  }?theme=auto&bg=auto#${ply}`

const Boards: FC = () => {
  const [data, setData] = useState<Think[]>([])

  useEffect(() => {
    fetch('https://danbock.net/longthinksapi/danbock')
      .then(response => response.json())
      .then(({ thinks }) => setData(thinks))
  }, [])

  return (
    <div>
      {data.map(([url, ply], i) => (
        <iframe className='lichess-iframe' key={i} src={getUrl(url, ply)} />
      ))}
    </div>
  )
}

export default Boards
