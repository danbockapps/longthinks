import { Typography } from '@mui/joy'
import { FC } from 'react'

interface Props {
  move: string
  seconds: number
}

const Caption: FC<Props> = props => (
  <Typography>
    You thought for {props.seconds} seconds and played {props.move}.
  </Typography>
)

export default Caption
