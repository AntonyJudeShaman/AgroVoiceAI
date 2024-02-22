'use client'

import { useState } from 'react'
import * as React from 'react'
import { useRouter } from 'next/navigation'
// Updated import

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, User } from 'lucide-react'

export function SettingsForm({
  user,
  className,
  ...props
}: {
  user: any
  className: string
}) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isSavingImage, setIsSavingImage] = React.useState<boolean>(false)
  const [isSavingPhone, setIsSavingPhone] = React.useState<boolean>(false)
  const [isSavingGender, setIsSavingGender] = React.useState<boolean>(false)
  const [isSavingAge, setIsSavingAge] = React.useState<boolean>(false)

  return (
    <form
      className={cn(className, 'space-y-4')}
      // onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row">
        <Card className=" md:w-2/3 w-full">
          <CardHeader>
            <CardTitle>Your Name</CardTitle>
            <CardDescription>
              Please enter your full name or a display name you are comfortable
              with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input id="name" className="" size={32} value={user?.name} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
        <Card className=" max-w-full">
          <div className="flex md:flex-row flex-col">
            <div className="flex-1">
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
                <CardDescription>
                  Upload a profile image (optional).
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Label className="sr-only" htmlFor="image">
                  Image
                </Label>
                <Input id="image" type="file" accept="image/*" />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className={cn(buttonVariants(), className)}
                  disabled={isSavingImage}
                >
                  {isSavingImage && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span>Upload</span>
                </Button>
              </CardFooter>
            </div>
            <p className="rounded-full flex justify-center p-4 items-center">
              {user?.image ? (
                <img src={user?.image} alt={user?.name || ''} className='size-36 rounded-full p-6 flex justify-center items-center'/>
              ) : (
                <User className="size-36 bg-slate-700 rounded-full p-6 flex justify-center items-center" />
              )}
            </p>
          </div>
        </Card>
      </div>
      <Card className="h-[12rem] flex justify-center flex-col">
        <CardHeader>
          <CardTitle>Your Email</CardTitle>
          <CardDescription>Your email cannot be changed.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="w- text-gray-500"
              size={32}
              value={user?.email}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4">
        <Card className="md:w-2/3 w-full">
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
            <CardDescription>Please enter your Age.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Age
              </Label>
              <Input id="name" type="number" className="" size={32} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Phone Number</CardTitle>
            <CardDescription>
              Please enter your phone number.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Phone Number
              </Label>
              <Input id="name" className="" type='number' size={32} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
