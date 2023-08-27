import { Button, Input, Radio, RadioGroup, Typography } from '@mui/joy'
import { FC, useState } from 'react'

interface Props {
  onSubmit: (username: string) => void
  loading: boolean
}

const Enter: FC<Props> = props => {
  const [username, setUsername] = useState<string>('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        props.onSubmit(username)
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
        value='lichess'
        onChange={e => console.log(e.target.value)}
        className='mt-10'
        orientation='horizontal'
      >
        <Radio value='lichess' label='Lichess' />
        <Radio disabled value='chesscom' label='Chess.com (coming soon)' />
      </RadioGroup>

      <Button type='submit' loading={props.loading} className='mt-10'>
        Submit
      </Button>
    </form>
  )
}

export default Enter
