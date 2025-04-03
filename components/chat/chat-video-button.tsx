'use client'

import ActionTooltip from '@/components/action-tooltip'
import {Video, VideoOff} from 'lucide-react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import qs from 'query-string'

const ChatVideoButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isVideo = searchParams?.get('video')

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? undefined : true,
        },
      },
      {skipNull: true},
    )

    router.push(url)
  }

  const Icon = isVideo ? VideoOff : Video
  const label = isVideo ? 'End Video Call' : 'Start Video'

  return (
    <ActionTooltip side="bottom" label={label}>
      <button onClick={onClick} className="mr-4 transition hover:opacity-75">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  )
}

export default ChatVideoButton
