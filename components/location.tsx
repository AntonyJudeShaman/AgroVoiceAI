'use client'
import useGeolocation from '@/lib/hooks/use-geolocation'

const LocationComponent = () => {
  const { latitude, longitude } = useGeolocation()

  return (
    <div className="mb-6 items-center">
      {latitude && longitude && (
        <p>
          Latitude: <span className="text-red-600">{latitude}</span>, Longitude:{' '}
          <span className="text-red-600">{longitude}</span>
        </p>
      )}
    </div>
  )
}

export default LocationComponent
