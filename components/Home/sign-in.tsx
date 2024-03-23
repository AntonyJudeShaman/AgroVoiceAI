'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { IconGitHub, IconGoogle, IconSpinner } from '../ui/icons'
import React from 'react'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { BottomGradient } from '../ui/bottom-gradient'
import { revalidatePath } from 'next/cache'
import { AuthError } from 'next-auth'

interface CreateAccountProps {
  text?: string
  showGoogleIcon?: boolean
}

export function Account({
  text = 'Sign in with Google',
  showGoogleIcon = true
}: CreateAccountProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFieldLoading, setIsFieldLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isEmailChanged, setIsEmailChanged] = React.useState<boolean>(false)
  const [isPasswordChanged, setIsPasswordChanged] =
    React.useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const router = useRouter()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setIsEmailChanged(event.target.value !== email)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setIsPasswordChanged(event.target.value !== password)
  }

  const passwordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Card className="font-pops ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-bl from-green-600 to-green-500 dark:from-green-500 dark:to-green-400">
          Sign in to your account
        </CardTitle>
        <CardDescription>
          Please provide your credentials to sign in
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button
            variant="outline"
            onClick={() => {
              setIsLoading(true)
              signIn('google', { callbackUrl: `/onboarding` })
            }}
            disabled={isLoading}
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
        </div>
        <form
          onSubmit={async e => {
            e.preventDefault()
            setIsFieldLoading(true)
            try {
              const res = await signIn('credentials', {
                redirect: true,
                email: email,
                password: password,
                callbackUrl: '/onboarding'

                // @ts-ignore
              })
              e.preventDefault()
              console.log(res)
              setIsFieldLoading(false)
              redirect('/onboarding')
            } catch (error) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case 'CredentialsSignin':
                    toast.error('Invalid credentials')
                    break
                  case 'CallbackRouteError':
                    toast.error('Invalid credentials')
                    break
                  default:
                    toast.error('An error occurred')
                }
              }
              throw error
            }
          }}
          className="grid gap-2"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="font-pops">
              Email
            </label>
            <div className="relative group/btn flex space-x-2 items-center justify-center px-1 w-full  rounded-md h-10 font-medium shadow-input hover:bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmailChange}
                className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:none"
              />
              <BottomGradient />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="font-pops" htmlFor="password">
              Password
            </label>
            <div className=" relative group/btn flex space-x-2 items-center justify-center px-1 w-full  rounded-md h-10 font-medium shadow-input hover:bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
              <Input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
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
            </div>
          </div>
          <Button className="w-full mt-2" size="lg" type="submit">
            {isFieldLoading && <IconSpinner className="mr-2 animate-spin" />}{' '}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
