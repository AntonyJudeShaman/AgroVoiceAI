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
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
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
import { Info, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AlertDialogTrigger } from '../ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Dialog } from '../ui/dialog'

const FormSchema = z.object({
  district: z
    .string({
      required_error: 'Please select a district.'
    })
    .refine(value => tnDistricts.some(district => district.value === value), {
      message: 'Please select a valid district.'
    })
})

export function OnboardingLocationForm({ user }: { user: any }) {
  const [district, setDistrict] = useState<string>(user?.userDistrict || '')
  const [isDistrictChanged, setIsDistrictChanged] = useState<boolean>(false)
  const [isSavingDistrict, setIsSavingDistrict] = useState<boolean>(false)
  const [next, setNext] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function handleDistrictChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDistrict(event.target.value)
    setIsDistrictChanged(event.target.value !== user?.userDistrict)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.district)
    handleDistrictSubmit(
      user,
      data.district,
      setIsSavingDistrict,
      setIsDistrictChanged,
      toast
    ).then(() => {
      setIsSavingDistrict(true)
      router.push('/onboarding/preferences')
      setIsSavingDistrict(false)
    })
  }

  return (
    <Card className="w-1/3 border">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-1">
          <CardTitle>Your District</CardTitle>
          <CardDescription>Please select a district.</CardDescription>
        </div>
        <p className="flex justify-start text-sm pb-4 dark:text-gray-500 text-gray-700">
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Info className="size-5 mr-3" />
            </TooltipTrigger>
            <TooltipContent>
              It helps in recommendations based on your region.
            </TooltipContent>
          </Tooltip>
        </p>
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
          <CardFooter className="justify-between flex">
            {' '}
            <Button
              className="flex mr-3 h-full"
              onClick={() => router.push('/onboarding')}
              variant="outline"
              disabled={next || isSavingDistrict}
              type="button"
            >
              Back
            </Button>
            <Button
              type="submit"
              className={cn(buttonVariants())}
              size="lg"
              disabled={isSavingDistrict}
              variant="outline"
            >
              {isSavingDistrict && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              <span>Save & Next</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
