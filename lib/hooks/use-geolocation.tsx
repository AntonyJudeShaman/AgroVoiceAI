import MyToast from '@/components/ui/my-toast'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const useGeolocation = () => {
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()
  const [error, setError] = useState<string>('')
  const locale = useLocale()

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        MyToast({
          message:
            locale === 'en'
              ? 'Geolocation is not supported by your browser'
              : 'இருப்பிடத்தை உங்கள் உலாவி ஆதரிக்கவில்லை',
          type: 'error'
        })
        return
      }

      const success = (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }

      const failure = (err: any) => {
        setError(`Error: ${err.message}`)
      }

      navigator.geolocation.getCurrentPosition(success, failure)
    }

    getLocation()
  }, [locale])

  return { latitude, longitude, error }
}

export default useGeolocation
