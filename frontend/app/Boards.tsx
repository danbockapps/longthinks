import { Think } from '@/src/Template'
import { Card } from '@mui/joy'
import { FC } from 'react'
import { Chessboard } from 'react-chessboard'
import Caption from './Caption'

interface Props {
  thinks: Think[]
}

const Boards: FC<Props> = props => (
  <div className='mt-10 flex flex-col items-center'>
    {props.thinks.map(([url, ply, fen, move, orig, dest, seconds], i) =>
      url.includes('lichess') ? (
        <Card key={i} className='mt-5 items-center'>
          <iframe className='lichess-iframe' src={getLichessUrl(url, ply)} frameBorder={0} />
          <Caption {...{ move, seconds }} />
        </Card>
      ) : (
        <Card key={i} className='w-72 mt-5'>
          <Chessboard
            position={fen}
            arePiecesDraggable={false}
            boardOrientation={ply % 2 === 0 ? 'black' : 'white'}
            customDarkSquareStyle={{ backgroundColor: '#779955' }}
            customLightSquareStyle={{ backgroundColor: '#e9eecd' }}
            customSquareStyles={{
              [orig]: { backgroundColor: '#bbcd48' },
              [dest]: { backgroundColor: '#bbcd48' },
            }}
          />
          <a href={url} className='absolute h-72 w-72 z-10' target='_blank' />
          <Caption {...{ move, seconds }} />
        </Card>
      ),
    )}
  </div>
)

const getGameId = (url: string) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

const getLichessUrl = (url: string, ply: number) =>
  `https://lichess.org/embed/game/${getGameId(url)}/${
    ply % 2 === 0 ? 'black' : 'white'
  }?theme=auto&bg=auto#${ply - 1}`

export default Boards
