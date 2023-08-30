import Template from '@/src/Template'
import { FC } from 'react'

interface Props {
  params: { username: string }
}

const Page: FC<Props> = props => <Template site='lichess' username={props.params.username} />

export default Page
