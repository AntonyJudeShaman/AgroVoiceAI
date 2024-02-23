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
import { Loader2, Trash2, User } from 'lucide-react'

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
  const [name, setName] = useState('');

  
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
              variant="outline"
            >
              {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-full flex md:justify-center">
            <div className="flex flex-row">
              <p className="rounded-full flex justify-center items-center">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt={user?.name || ''}
                    className="size-30 rounded-full p-4 flex justify-center items-center"
                  />
                ) : (
                  <User className="size-30 bg-slate-700 rounded-full p-4 flex justify-center items-center" />
                )}
              </p>
              <div className='flex flex-col justify-center'>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>
                    Upload a profile image (optional).
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Label className="sr-only" htmlFor="image">
                    upload Image
                  </Label>
                  <Button
                    type="submit"
                    className={cn(className)}
                    disabled={isSavingImage}
                    variant="outline"
                  >
                    {isSavingImage && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    <span>Upload Avatar</span>
                  </Button>
                  {/* <Input id="image" type="file" accept="image/*" /> */}
                </CardContent>
              </div>
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
              {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Phone Number</CardTitle>
            <CardDescription>Please enter your phone number.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Phone Number
              </Label>
              <Input id="name" className="" type="number" size={32} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card className="w-full">
        <CardHeader className="h-">
          <CardTitle className="text-red-500">Delete account</CardTitle>
          <CardDescription>
            This will delete your account and all your data permanently.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-gray-800/70 rounded-bl-2xl rounded-br-2xl md:-m-2 p-3 justify-end flex">
          {' '}
          <Button
            type="submit"
            className={cn(
              buttonVariants(),
              className,
              'bg-red-700 text-white border border-red-500 flex justify-center items-center hover:bg-red-600/60 hover:text-white hover:border-red-500'
            )}
            size="lg"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 size-4" />
            )}
            <span>Delete account</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
