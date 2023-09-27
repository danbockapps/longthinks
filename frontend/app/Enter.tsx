import { Site } from '@/src/Template'
import { Button, Input, Radio, RadioGroup, Typography } from '@mui/joy'
import { FC, useState } from 'react'

interface Props {
  onSubmit: (site: Site, username: string) => void
  loading: boolean
  site: Site
  username?: string
}

const Enter: FC<Props> = props => {
  const [username, setUsername] = useState<string>()
  const [site, setSite] = useState<Site>()

  const processedSite = site ?? props.site
  const processedUsername = username ?? props.username

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        processedSite && processedUsername && props.onSubmit(processedSite, processedUsername)
      }}
      className='flex flex-col items-center'
    >
      {/* Using inline styles because the mt-10 class is weirdly prone to FOUC */}
      <Typography level='h1' style={{ marginTop: '2.5rem' }}>
        Your long thinks
      </Typography>

      <Input
        placeholder='Enter your username...'
        value={processedUsername}
        onChange={e => setUsername(e.target.value)}
        className='w-72'
        style={{ marginTop: '2.5rem' }}
      />

      <RadioGroup
        name='site'
        value={processedSite}
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
