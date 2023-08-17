'use client'

import { FC, useEffect, useRef } from 'react'

const Boards: FC = () => {
  const ref = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    console.log('ref', ref)
    if (ref.current) {
      // Not working - querySelector returns null
      const button = ref.current.querySelector('[aria-label="Next Move"]') as HTMLButtonElement
      console.log('button', button)
      button?.click()
    }
  }, [])

  return (
    <div>
      <iframe
        src='https://lichess.org/embed/game/d3vME4BM?theme=auto&bg=auto#46'
        width={600}
        height={397}
      />
      <iframe
        {...{ ref }}
        id='10928987'
        style={{ width: '615px', height: '490px', marginTop: '20px' }}
        src='//www.chess.com/emboard?id=10928987'
      />
    </div>
  )
}

// window.addEventListener('message', e => {
//   e['data'] &&
//     '10928987' === e['data']['id'] &&
//     document.getElementById(`${e['data']['id']}`) &&
//     (document.getElementById(`${e['data']['id']}`).style.height = `${
//       e['data']['frameHeight'] + 30
//     }px`)
// })

export default Boards
