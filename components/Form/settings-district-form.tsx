'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
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
import { useState } from 'react'
import { handleDistrictSubmit } from '@/helpers/user-info'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { SettingsProps } from '@/lib/types'

const FormSchema = z.object({
  district: z
    .string({
      required_error: 'Please select a district.'
    })
    .refine(value => tnDistricts.some(district => district.value === value), {
      message: 'Please select a valid district.'
    })
})

export function SettingsDistrictForm({
  user,
  title,
  description,
  save
}: SettingsProps) {
  const [district, setDistrict] = useState<string>(user?.userDistrict || '')
  const [isDistrictChanged, setIsDistrictChanged] = useState<boolean>(false)
  const [isSavingDistrict, setIsSavingDistrict] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function handleDistrictChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDistrict(event.target.value)
    setIsDistrictChanged(event.target.value !== user?.userDistrict)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleDistrictSubmit(
      user,
      data.district,
      setIsSavingDistrict,
      setIsDistrictChanged
    ).then(() => {
      setIsDistrictChanged(false)
    })
  }

  return (
    <Card className="md:w-2/3 w-full border dark:border-green-900/50 border-green-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem onChange={handleDistrictChange}>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.userDistrict || 'Select your district'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user?.userDistrict
                              ? user?.userDistrict
                              : 'Select your district'
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
          </CardContent>
          <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 p-3 md:mt-4 justify-end flex">
            {' '}
            <Button
              type="submit"
              className={cn(
                buttonVariants(),
                'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
                `${isDistrictChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70 border-green-200'}`
              )}
              size="lg"
              disabled={!isDistrictChanged || isSavingDistrict}
            >
              {isSavingDistrict && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              <span>{save}</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
