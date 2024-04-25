'use client'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect, MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'
import { LoadingDots } from '../ui/loading-dots'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { app } from '@/lib/firebase'
import MyToast from '../ui/my-toast'
import { cropInEnglish, cropInTamil } from '@/config/constants'
import { useChat, type Message } from 'ai/react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { MemoizedReactMarkdown } from '../Miscellaneous/markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

type SoilTestData = {
  K: number
  N: number
  P: number
  humidity: number
  ph: number
  rainfall: number
  temperature: number
}

export default function SoilTest({ user }: any) {
  const [data, setData] = useState<SoilTestData | undefined>(undefined)
  const [recommendation, setRecommendation] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [chatLoading, setChatLoading] = useState<boolean>(false)

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
  const { messages, input, setInput, handleInputChange, handleSubmit, append } =
    useChat()

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
        setInput(
          locale === 'en'
            ? `Tell me more about the crop`
            : `பயிரை மேலும் அறிய சொல்லுக`
        )
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
    <div className="flex justify-center flex-col w-full p-6 items-center mx-auto xl:-mt-[5rem]">
      <p className="font-pops font-semibold tracking-tighter text-center xl:pt-2 pb-3 text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
        {locale === 'en'
          ? 'Soil Testing & Recommendation'
          : 'மண் சோதனை மற்றும் பரிந்துரை'}
      </p>
      <Card className="flex w-full md:w-[80%] lg:w-[60%] mt-10 md:p-6 dark:bg-gray-900 bg-gray-100">
        {loading ? (
          <div className="p-6 flex justify-center mx-auto">
            <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
          </div>
        ) : !data?.K ? (
          <div className=" text-xl mx-auto text-red-600">
            {locale === 'en' ? (
              <div className="flex flex-col mx-auto">
                <p>
                  {locale === 'en'
                    ? 'Please perform a test to display the results.'
                    : 'முடிவுகளைக் காட்ட ஒரு மண் சோதனையைச் செய்யவும்'}
                </p>
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
          <div className="flex p-6 flex-col mx-auto">
            <p className="font-pops font-semibold text-start tracking-tighter pt-2 pb-3 text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
              {locale === 'en'
                ? 'Recommended crop for your soil'
                : 'உங்கள் மண்ணுக்கு பரிந்துரைக்கப்படும் பயிர்'}
            </p>
            <p className="mb-5 text-xl">
              {locale === 'en'
                ? cropInEnglish[
                    recommendation as unknown as keyof typeof cropInEnglish
                  ]
                : cropInTamil[
                    recommendation as unknown as keyof typeof cropInTamil
                  ]}
            </p>{' '}
            <>
              {' '}
              {messages.map(
                m =>
                  m.role !== 'system' && (
                    <div
                      key={m.id}
                      className="px-1 mb-10 space-y-8 overflow-hidden"
                    >
                      {m.role === 'user' ? 'User: ' : 'AgroVoiceAI: '}
                      <MemoizedReactMarkdown
                        className="prose break-words dark:prose-invert font-bricol prose-p:leading-relaxed prose-pre:p-0"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        components={{
                          p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                          }
                        }}
                      >
                        {m.content}
                      </MemoizedReactMarkdown>
                    </div>
                  )
              )}
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  setInput('')
                  setChatLoading(true)
                  await append({
                    id: '1',
                    content:
                      locale === 'en'
                        ? `The user does a soil test(NPK sensor) and i am sending it to my server to get the right crop for their soil. Now i want you to more about the crop ${
                            cropInEnglish[
                              recommendation as unknown as keyof typeof cropInEnglish
                            ]
                          } and how to grow it`
                        : `பயனர் ஒரு மண் பரிசோதனை(NPK sensor) செய்கிறார், நான் அதை எனது சேவையகத்திற்கு அனுப்பி அவர்களின் மண்ணுக்கு சரியான பயிரைப் பெறுகிறேன். இப்போது நீங்கள்  ${
                            cropInTamil[
                              recommendation as unknown as keyof typeof cropInTamil
                            ]
                          } பயிர் மற்றும் அதை எவ்வாறு வளர்ப்பது என்பது பற்றி மேலும் அறிய விரும்புகிறேன்`,
                    role: 'system'
                  })
                  setChatLoading(false)
                }}
              >
                <div>
                  {' '}
                  <Label className="text-lg">
                    {locale === 'en'
                      ? 'Have any question?'
                      : 'ஏதேனும் கேள்வி உள்ளதா?'}
                    <Input
                      className="mt-3"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </Label>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => router.push('/soiltest/new')}
                    variant="outline"
                    className="md:mr-4 mr-0"
                    type="button"
                    disabled={chatLoading}
                  >
                    {locale === 'en' ? 'Back' : 'பின்னால்'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={chatLoading}
                    className="flex items-center p-3"
                  >
                    {locale === 'en' ? (
                      <p className="flex items-center">
                        {chatLoading ? (
                          <LoadingDots className="bg-gradient-to-r size-2 from-zinc-500 from-10% via-gray-500 via-30% to-zinc-500 to-60%" />
                        ) : (
                          'Send'
                        )}
                      </p>
                    ) : (
                      <p className="flex items-center">
                        {chatLoading ? (
                          <LoadingDots className="bg-gradient-to-r size-2 from-zinc-500 from-10% via-gray-500 via-30% to-zinc-500 to-60%" />
                        ) : (
                          'அனுப்பு'
                        )}
                      </p>
                    )}
                  </Button>
                </div>
              </form>
            </>
          </div>
        ) : (
          <div className="flex flex-col w-full justify-between p-6">
            <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-4 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>
                  {locale === 'en'
                    ? 'Potassium Value: '
                    : 'பொட்டாசியம் மதிப்பு:'}{' '}
                </span>
                {data?.K}
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl mt-4 sm:mt-0 rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>
                  {locale === 'en' ? 'Nitrogen Value: ' : 'நைட்ரஜன் மதிப்பு:'}{' '}
                </span>
                {data?.N} mg/kg
              </p>
            </div>
            <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-4 mt-4 sm:mt-0 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>
                  {locale === 'en'
                    ? 'Phosphorus Value: '
                    : 'பாஸ்பரஸ் மதிப்பு: '}
                </span>
                {data?.P} mg/kg
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl mt-4 sm:mt-0 rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>{locale === 'en' ? 'PH Value: ' : 'PH மதிப்பு: '}</span>
                {data?.ph}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-4 p-4">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>{locale === 'en' ? 'Humidity: ' : 'ஈரப்பதம்: '}</span>
                {data?.humidity}
              </p>{' '}
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl mt-4 sm:mt-0 rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>
                  {locale === 'en'
                    ? 'Electrical Conductivity: '
                    : 'மின் கடத்துத்திறன்: '}
                </span>
                {data?.rainfall} uS/cm
              </p>
            </div>
            <div className="flex w-full mx-auto justify-center p-4 mt-4 sm:mt-0">
              <p
                className={cn(
                  'z-50 overflow-hidden text-xl w-full lg:w-2/3 rounded-md border bg-popover hover:bg-slate-900/60 hover:text-popover-foreground/90 px-4 py-2.5 font-medium text-popover-foreground shadow-md shadow-green-400'
                )}
              >
                <span>
                  {locale === 'en' ? 'Temperature: ' : 'வெப்ப நிலை: '}
                </span>
                {data?.temperature} F
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
                disabled={loading || recommendation !== ''}
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
