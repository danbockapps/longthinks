import { Think } from '@/src/Template'
import { Card } from '@mui/joy'
import { FC } from 'react'
import { Chessboard } from 'react-chessboard'

interface Props {
  thinks: Think[]
}

const Boards: FC<Props> = props => {
  return (
    <div className='mt-10 flex flex-col items-center'>
      {props.thinks.map(([url, ply, fen], i) =>
        url.includes('lichess') ? (
          <Card key={i} className='mt-5'>
            <iframe className='lichess-iframe' src={getLichessUrl(url, ply)} frameBorder={0} />
          </Card>
        ) : (
          <Card key={i} className='h-72 w-72 mt-5'>
            <Chessboard
              position={fen}
              arePiecesDraggable={false}
              boardOrientation={ply % 2 === 0 ? 'white' : 'black'}
              customDarkSquareStyle={{ backgroundColor: '#779955' }}
              customLightSquareStyle={{ backgroundColor: '#e9eecd' }}
            />
            <a href={url} className='absolute h-72 w-72 z-10' />
          </Card>
        ),
      )}
    </div>
  )
}

const getGameId = (url: string) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

const getLichessUrl = (url: string, ply: number) =>
  `https://lichess.org/embed/game/${getGameId(url)}/${
    ply % 2 === 0 ? 'white' : 'black'
  }?theme=auto&bg=auto#${ply}`

export default Boards
