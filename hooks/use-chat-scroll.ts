import {useEffect, useState} from 'react'

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  shouldLoadmore: boolean
  loadMore: () => void
  count: number
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadmore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const topDiv = chatRef?.current

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop

      if (scrollTop === 0 && shouldLoadmore) {
        loadMore()
      }
    }

    topDiv?.addEventListener('scroll', handleScroll)

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll)
    }
  }, [shouldLoadmore, loadMore, chatRef])

  useEffect(() => {
    const bottomDiv = bottomRef?.current
    const topDiv = chatRef.current

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true)
        return true
      }

      if (!topDiv) {
        return false
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

      return distanceFromBottom <= 100
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    }
  }, [bottomRef, chatRef, count, hasInitialized])
}
