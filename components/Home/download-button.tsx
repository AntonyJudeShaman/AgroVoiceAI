'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import { BottomGradient } from '../ui/bottom-gradient'
import Link from 'next/link'
import { LoadingDots } from '../ui/loading-dots'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'

export default function DownloadButton({ app }: any) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      setLoading(true)
      ;(deferredPrompt as any).prompt()
      ;(deferredPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          MyToast({
            message:
              locale === 'en'
                ? 'App installed'
                : locale === 'ta'
                  ? 'பயன்பாடு நிறுவப்பட்டது'
                  : '',
            type: 'success'
          })
        } else {
          MyToast({
            message:
              locale === 'en'
                ? 'Installation cancelled'
                : locale === 'ta'
                  ? 'நிறுவுதல் ரத்து செய்யப்பட்டது'
                  : '',
            type: 'error'
          })
        }
        setDeferredPrompt(null)
        setLoading(false)
      })
    }
  }

  return (
    <Link href="#">
      <Button
        size="lg"
        className="relative group/btn dark:bg-zinc-950/70 bg-white hover:bg-white dark:hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        variant="outline"
        onClick={handleInstallClick}
      >
        <DownloadIcon className="size-5 mr-2" />
        {loading ? (
          <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
        ) : (
          app
        )}
        <BottomGradient />
      </Button>
    </Link>
  )
}
