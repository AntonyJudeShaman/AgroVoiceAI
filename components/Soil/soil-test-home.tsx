'use client'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect, MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'
import { LoadingDots } from '../ui/loading-dots'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { app } from '@/lib/firebase'
import MyToast from '../ui/my-toast'

type SoilTestData = {
  K: number
  N: number
  P: number
  humidity: number
  ph: number
  rainfall: number
  temperature: number
}

const crop_mappings = {
  1: 'Rice',
  2: 'Maize',
  3: 'Jute',
  4: 'Cotton',
  5: 'Coconut',
  6: 'Papaya',
  7: 'Orange',
  8: 'Apple',
  9: 'Muskmelon',
  10: 'Watermelon',
  11: 'Grapes',
  12: 'Mango',
  13: 'Banana',
  14: 'Pomegranate',
  15: 'Lentil',
  16: 'Blackgram',
  17: 'Mungbean',
  18: 'Mothbeans',
  19: 'Pigeonpeas',
  20: 'Kidneybeans',
  21: 'Chickpea',
  22: 'Coffee'
}

export default function SoilTest({ user }: any) {
  const [data, setData] = useState<SoilTestData | undefined>(undefined)
  const [recommendation, setRecommendation] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const fetchData = async () => {
    setLoading(true)
    const database = getDatabase(app)
    const soilDataRef = ref(database, 'Soiltest/aaaa')

    onValue(
      soilDataRef,
      snapshot => {
        const data = snapshot.val()
        setData(data)
        setLoading(false)
      },
      {
        onlyOnce: true
      }
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearchAgain = () => {
    fetchData()
  }
  const server = process.env.NEXT_PUBLIC_SOIL_TEST_SERVER_URL!
  const handleSoilSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        const data = await res.json()
        setRecommendation(data.crop)
      }
    } catch (e) {
      MyToast({
        message:
          locale === 'en'
            ? 'Some problem in getting recommendations'
            : 'பரிந்துரைகளைப் பெறுவதில் சில சிக்கல்கள்',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center flex-col w-full p-6 items-center mx-auto">
      <p className="font-pops font-semibold tracking-tighter text-center pt-2 pb-3 text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
        {locale === 'en'
          ? 'Soil Testing & Recommendation'
          : 'மண் சோதனை மற்றும் பரிந்துரை'}
      </p>
      <Card className="flex w-full md:w-[50%] mt-10 md:p-6 dark:bg-gray-900 bg-gray-100">
        {loading ? (
          <div className="p-6 flex justify-center mx-auto">
            <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
          </div>
        ) : !data?.K ? (
          <div className=" text-xl mx-auto text-red-600">
            {locale === 'en' ? (
              <div className="flex flex-col mx-auto">
                <p>Please perform a test to display the results.</p>
                <Button
                  type="button"
                  className="w-1/2 mx-auto mt-5"
                  onClick={handleSearchAgain}
                  disabled={loading}
                >
                  {locale === 'en' ? 'Search for results' : 'தேடு'}
                </Button>
              </div>
            ) : (
              'முடிவுகளைக் காட்ட ஒரு சோதனையைச் செய்யவும்.'
            )}
          </div>
        ) : recommendation ? (
          <div className="flex p-6 flex-col">
            <p className="font-pops font-semibold text-start tracking-tighter pt-2 pb-3 text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
              {locale === 'en'
                ? 'Recommended crop for your soil'
                : 'உங்கள் மண்ணுக்கு பரிந்துரைக்கப்படும் பயிர்'}
            </p>
            <p className="mb-5 text-xl">
              {
                crop_mappings[
                  recommendation as unknown as keyof typeof crop_mappings
                ]
              }
            </p>{' '}
            <Button
              onClick={() => router.push('/soiltest/new')}
              variant="outline"
              className="w-20"
            >
              Back
            </Button>
          </div>
        ) : (
          <div className="flex flex-col w-full justify-between p-6">
            <div className="flex w-full justify-between space-x-4 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Potassium Value: </span>
                {data?.K}
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Nitrogen Value: </span>
                {data?.N}
              </p>
            </div>
            <div className="flex w-full justify-between space-x-4 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Phosphorus Value: </span>
                {data?.P}
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>PH Value: </span>
                {data?.ph}
              </p>
            </div>
            <div className="flex w-full justify-between space-x-4 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Humidity: </span>
                {data?.humidity}
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Electrical Conductivity: </span>
                {data?.rainfall}
              </p>
            </div>
            <div className="flex w-full mx-auto justify-center p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>Temperature: </span>
                {data?.temperature}
              </p>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 mx-auto">
              <Button
                type="button"
                className="mx-auto mt-5"
                onClick={e => handleSoilSubmit(e)}
                disabled={loading}
              >
                {locale === 'en' ? 'Get Recommendation' : 'பரிந்துரையைப் பெறு'}
              </Button>{' '}
              <Button
                type="button"
                className="mx-auto mt-5"
                onClick={handleSearchAgain}
                disabled={loading}
              >
                {locale === 'en' ? 'Search again' : 'மீண்டும் தேடு'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
