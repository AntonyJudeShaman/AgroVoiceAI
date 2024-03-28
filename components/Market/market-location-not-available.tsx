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
import { tnDistricts } from '@/config/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Item } from '@/lib/types'
import { User } from '@prisma/client/edge'
import { cn, parseItems } from '@/lib/utils'
import toast from 'react-hot-toast'
import MyToast from '../ui/my-toast'

const FormSchema = z.object({
  district: z
    .string({
      required_error: 'Please select a location.'
    })
    .refine(value => tnDistricts.some(district => district.value === value), {
      message: 'Please select a valid location.'
    })
})

export function MarketLocationNotAvailable({
  user,
  setItems,
  setLocation
}: {
  user: User
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  setLocation: React.Dispatch<React.SetStateAction<string>>
}) {
  const [district, setDistrict] = useState<string>(user?.userDistrict || '')
  const [isDistrictChanged, setIsDistrictChanged] = useState<boolean>(false)
  const [isLoadingDistrict, setIsLoadingDistrict] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  useEffect(() => {
    if (isLoadingDistrict) {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: district })
          })

          if (!res.ok) {
            MyToast({ message: 'Failed to fetch price data', type: 'error' })
          }

          const data = await res.json()
          setItems(parseItems(data.scrapedData))
          if (!data || !data.length) {
            setLocation(district)
          }
        } catch (error: any) {
          MyToast({
            message: 'Some error occurred. Please try again later.',
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
    setDistrict(event.target.value)
    setIsDistrictChanged(event.target.value !== user?.userDistrict)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoadingDistrict(true)
    setDistrict(data.district)
  }

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardContent className="2xl:w-[90%] mx-auto">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem onChange={handleDistrictChange}>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.userDistrict || 'Select a location.'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user?.userDistrict
                              ? user?.userDistrict
                              : 'Select a location.'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-60 bg-gradient-to-br dark:from-slate-900 dark:to-slate-950">
                      {tnDistricts.map(district => (
                        <SelectItem key={district.label} value={district.value}>
                          {district.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
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
                <span>Search</span>
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
