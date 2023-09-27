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
      {/* Using inline styles because the mt-10 class is weirdly prone to FOUC */}
      <Typography level='h1' style={{ marginTop: '2.5rem' }}>
        Your long thinks
      </Typography>

      <Input
        placeholder='Enter your username...'
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='w-72'
        style={{ marginTop: '2.5rem' }}
      />

      <RadioGroup
        name='site'
        value={site}
        onChange={e => setSite(e.target.value as Site)}
        style={{ marginTop: '2.5rem' }}
        orientation='horizontal'
      >
        <Radio value='lichess' label='Lichess' />
        <Radio value='chesscom' label='Chess.com ' />
      </RadioGroup>

      <Button type='submit' loading={props.loading} style={{ marginTop: '2.5rem' }}>
        Submit
      </Button>
    </form>
  )
}

export default Enter
