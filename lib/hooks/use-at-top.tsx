import * as React from 'react'

export function useAtTop(offset = 0) {
  const [isAtTop, setIsAtTop] = React.useState(true)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= offset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])

  return isAtTop
}
