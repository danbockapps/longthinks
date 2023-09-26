import { Site } from '@/src/Template'
import { Button, Input, Radio, RadioGroup, Typography } from '@mui/joy'
import { FC, useState } from 'react'

interface Props {
  onSubmit: (site: Site, username: string) => void
  loading: boolean
}

const Enter: FC<Props> = props => {
  const [username, setUsername] = useState<string>('')
  const [site, setSite] = useState<Site>('lichess')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        props.onSubmit(site, username)
      }}
      className='flex flex-col items-center'
    >
      <Typography level='h1' className='mt-10'>
        Your long thinks
      </Typography>

      <Input
        placeholder='Enter your username...'
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='w-72 mt-10'
      />

      <RadioGroup
        name='site'
        value={site}
        onChange={e => setSite(e.target.value as Site)}
        className='mt-10'
        orientation='horizontal'
      >
        <Radio value='lichess' label='Lichess' />
        <Radio value='chesscom' label='Chess.com ' />
      </RadioGroup>

      <Button type='submit' loading={props.loading} className='mt-10'>
        Submit
      </Button>
    </form>
  )
}

export default Enter
