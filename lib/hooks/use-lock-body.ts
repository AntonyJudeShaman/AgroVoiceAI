'use client'
import { useEffect } from 'react'

function useLockBody(isLocked: any) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = isLocked ? 'hidden' : originalStyle
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isLocked])
}

export default useLockBody
