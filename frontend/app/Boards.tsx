import { Think } from '@/src/Template'
import { Card } from '@mui/joy'
import { FC } from 'react'

const getGameId = (url: string) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

const getUrl = (url: string, ply: number) =>
  `https://lichess.org/embed/game/${getGameId(url)}/${
    ply % 2 === 0 ? 'white' : 'black'
  }?theme=auto&bg=auto#${ply}`

interface Props {
  thinks: Think[]
}

const Boards: FC<Props> = props => {
  return (
    <div className='mt-10 flex flex-col items-center'>
      {props.thinks.map(([url, ply], i) => (
        <Card key={i} className='mt-5'>
          <iframe className='lichess-iframe' src={getUrl(url, ply)} frameBorder={0} />
        </Card>
      ))}
    </div>
  )
}

export default Boards
