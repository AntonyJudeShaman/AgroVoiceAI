'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { tnDistricts, tnDistrictsInTamil } from '@/config/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { ForecastData } from '@/lib/types'
import { User } from '@prisma/client/edge'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'
import { LoadingDots } from '../ui/loading-dots'

const FormSchema = z.object({
  district: z
    .string({
      required_error: 'Please select a location.'
    })
    .refine(value => tnDistricts.some(district => district.value === value), {
      message: 'Please select a valid location.'
    })
})

export function WeatherLocationNotAvailable({
  user,
  setForecastData,
  setLocation,
  className
}: {
  user: User
  setForecastData: React.Dispatch<React.SetStateAction<ForecastData | null>>
  setLocation: React.Dispatch<React.SetStateAction<string>>
  className: string
}) {
  const [district, setDistrict] = useState<string>(user?.userDistrict || '')
  const [isDistrictChanged, setIsDistrictChanged] = useState<boolean>(false)
  const [isLoadingDistrict, setIsLoadingDistrict] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const locale = useLocale()
  useEffect(() => {
    if (isLoadingDistrict) {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/weather', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: district })
          })

          if (!res.ok) {
            MyToast({
              message:
                locale === 'en'
                  ? 'Failed to fetch weather data'
                  : 'வானிலைத் தரவைப் பெறுவதில் தோல்வி',
              type: 'error'
            })
          }

          const forecastData = await res.json()
          setForecastData(forecastData)
          if (forecastData || forecastData.list) {
            setLocation(district)
          }
        } catch (error: any) {
          MyToast({
            message:
              locale === 'en'
                ? 'Some error occurred. Please try again later.'
                : 'சில பிழை ஏற்பட்டது. பிறகு முயற்சிக்கவும்.',
            type: 'error'
          })
        } finally {
          setIsLoadingDistrict(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }

      fetchData()
    }
  }, [isLoadingDistrict])

  function handleDistrictChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsDistrictChanged(event.target.value !== user?.userDistrict)
    setDistrict(event.target.value)
    setIsLoadingDistrict(true)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoadingDistrict(true)
    setDistrict(data.district)
  }

  return (
    <Card
      className={cn(
        'w-[20%] border-none bg-transparent shadow-none',
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardContent className="2xl:w-[90%] mx-auto pb-20">
            {!isLoadingDistrict ? (
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem onChange={handleDistrictChange}>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        district
                          ? district
                          : user?.userDistrict || 'Select a location.'
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              district ? district : user?.userDistrict
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-60 bg-gradient-to-br dark:from-slate-900 dark:to-slate-950">
                        {tnDistricts.map(district => (
                          <SelectItem
                            key={district.label}
                            value={district.value}
                          >
                            {locale === 'en'
                              ? district.label
                              : tnDistrictsInTamil[
                                  district.label as keyof typeof tnDistrictsInTamil
                                ]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="mt-4 flex justify-center">
                <LoadingDots className="bg-gradient-to-r size-5 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
              </div>
            )}
            {/* <div className="flex justify-end">
              <Button
                type="submit"
                className={cn(
                  'mt-4',
                  isLoadingDistrict ? 'opacity-50 cursor-not-allowed' : ''
                )}
                size="lg"
                disabled={!isDistrictChanged || isLoadingDistrict}
              >
                {isLoadingDistrict && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                <span>{locale === 'en' ? 'Search' : 'தேடு'}</span>
              </Button>
            </div> */}
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
