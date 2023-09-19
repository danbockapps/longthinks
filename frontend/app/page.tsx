'use client'

import Template, { Site, isSite } from '@/src/Template'
import { FC, useEffect, useState } from 'react'

const Page: FC = () => {
  const [site, setSite] = useState<Site>()
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    // This useEffect is for prod only - urlSite and urlUsername are undefined in dev
    const [urlSite, urlUsername] = window.location.pathname.split('/').slice(2, 4)
    console.log({ urlSite, urlUsername })

    if (isSite(urlSite)) {
      setSite(urlSite)

      if (urlUsername) {
        setUsername(urlUsername)
      }
    }
  }, [])

  return <Template {...{ site, username }} />
}

export default Page
