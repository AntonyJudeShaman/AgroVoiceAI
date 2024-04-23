'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { IconGoogle, IconSpinner } from '../ui/icons'
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { BottomGradient } from '../ui/bottom-gradient'
import { handleSubmit } from '@/helpers/user-info'
import MyToast from '../ui/my-toast'
import { nameSchema, validateInput } from '@/lib/schema'
import { z } from 'zod'
import Link from 'next/link'
import { AccountProps } from '@/lib/types'
import { useLocale } from 'next-intl'

export function Account({
  title,
  details,
  placeholder1,
  placeholder2,
  signin,
  username,
  pswd,
  forgot
}: AccountProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFieldLoading, setIsFieldLoading] = React.useState(false)
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isnameChanged, setIsNameChanged] = React.useState<boolean>(false)
  const [isPasswordChanged, setIsPasswordChanged] =
    React.useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const router = useRouter()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameChanged(event.target.value !== name)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setIsPasswordChanged(event.target.value !== password)
  }

  const passwordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const locale = useLocale()

  return (
    <Card className="font-pops ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-bl from-green-600 to-green-500 dark:from-green-500 dark:to-green-400">
          {title}
        </CardTitle>
        <CardDescription>{details}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* <div className="grid grid-cols-1 gap-6">
          <Button
            variant="outline"
            onClick={() => {
              setIsLoading(true)
              signIn('google', { callbackUrl: `/onboarding` })
            }}
            disabled
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full  rounded-md h-10 font-medium shadow-input hover:bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          >
            {isLoading ? (
              <IconSpinner className="mr-2 animate-spin" />
            ) : showGoogleIcon ? (
              <IconGoogle className="mr-2" />
            ) : null}
            {text}
            <BottomGradient />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}
        <form
          onSubmit={async e => {
            e.preventDefault()
            try {
              nameSchema.parse(name)
              nameSchema.parse(password)
              if (!validateInput(name) || !validateInput(password)) {
                MyToast({
                  message:
                    locale === 'en'
                      ? 'Dont try to inject code. 😒'
                      : 'குறியீட்டை உட்செலுத்த முயற்சிக்காதீர்கள். 😒',
                  type: 'error'
                })
                setIsFieldLoading(false)
              } else {
                const res = await handleSubmit(
                  e,
                  name,
                  password,
                  setIsFieldLoading
                )
                if (res) {
                  MyToast({
                    message:
                      locale === 'en'
                        ? 'Signed in successfully. Redirecting...'
                        : 'வெற்றிகரமாக உள்நுழைந்துள்ளது. திசைதிருப்புகிறது...',
                    type: 'success'
                  })
                  router.push('/onboarding/location')
                } else {
                  MyToast({
                    message:
                      locale === 'en'
                        ? 'Invalid credentials. Please try again.'
                        : 'தவறான சான்றுகள். மீண்டும் முயருங்கள்.',
                    type: 'error'
                  })
                }
              }
            } catch (error: any) {
              if (error instanceof z.ZodError) {
                MyToast({
                  message:
                    locale === 'en'
                      ? 'Username & Password must contain at least 4 characters.'
                      : 'பயனர்பெயர் மற்றும் கடவுச்சொல் குறைந்ததும் 4 எழுத்துகள் கொண்டிருக்க வேண்டும்.',
                  type: 'error'
                })
              } else {
                MyToast({
                  message:
                    locale === 'en'
                      ? 'An error occurred. Please try again later.'
                      : 'பிழை ஏற்பட்டது. பிறகு முயற்சிக்கவும்.',
                  type: 'error'
                })
              }
            }
          }}
          className="grid gap-2"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="font-pops">
              {username}
            </label>
            <div className="relative group/btn flex space-x-2 items-center justify-center px-1 w-full  rounded-md h-10 font-medium shadow-input hover:bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
              <Input
                id="name"
                type="text"
                placeholder={placeholder1}
                value={name}
                onChange={handleNameChange}
                className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:none"
              />
              <BottomGradient />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="font-pops" htmlFor="password">
              {pswd}
            </label>
            <div className=" relative group/btn flex space-x-2 items-center justify-center px-1 w-full  rounded-md h-10 font-medium shadow-input hover:bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
              <Input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={placeholder2}
                value={password}
                onChange={handlePasswordChange}
                className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:none"
              />
              <div onClick={passwordVisibility}>
                {isPasswordVisible ? (
                  <BsEye className="pr-1 size-6" />
                ) : (
                  <BsEyeSlash className="pr-1 size-6" />
                )}
              </div>
              <BottomGradient />
            </div>{' '}
            {/* <div className="flex justify-end">
              <Button
                variant="link"
                type="button"
                onClick={() => router.push('/forgot_password')}
                className="text-sm text-red-600 flex items-center px-0"
              >
                <p className="text-primary shadow-none cursor-pointer">
                  {forgot}
                </p>
              </Button>
            </div> */}
          </div>

          <Button
            className="w-full mt-2"
            size="lg"
            type="submit"
            disabled={isFieldLoading}
          >
            {isFieldLoading && <IconSpinner className="mr-2 animate-spin" />}{' '}
            {signin}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
