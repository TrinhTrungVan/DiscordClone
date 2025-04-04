'use client'

import {LiveKitRoom, VideoConference} from '@livekit/components-react'
import '@livekit/components-styles'
import {useUser} from '@clerk/nextjs'
import {useEffect, useState} from 'react'
import {Loader2} from 'lucide-react'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

const MediaRoom = ({chatId, video, audio}: MediaRoomProps) => {
  const {user} = useUser()
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!user?.firstName) {
      return
    }

    const name = `${user.firstName} ${user.lastName ? user.lastName : ''}`

    ;(async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [user?.firstName, chatId, user?.lastName])

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}>
      <VideoConference />
    </LiveKitRoom>
  )
}

export default MediaRoom
