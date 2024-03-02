'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { IconGitHub, IconGoogle, IconSpinner } from './ui/icons'
import React from 'react'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isNameChanged, setIsNameChanged] = React.useState<boolean>(false)
  const [isPasswordChanged, setIsPasswordChanged] =
    React.useState<boolean>(false)
  const router = useRouter()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameChanged(event.target.value !== name)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setIsPasswordChanged(event.target.value !== password)
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
              signIn('google', { callbackUrl: `/` })
            }}
            disabled={isLoading}
            className={cn('p-5')}
          >
            {isLoading ? (
              <IconSpinner className="mr-2 animate-spin" />
            ) : showGoogleIcon ? (
              <IconGoogle className="mr-2" />
            ) : null}
            {text}
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
          onSubmit={e => {
            e.preventDefault()
            setIsFieldLoading(true)

            signIn('credentials', {
              redirect: true,
                email: name,
                password: password
              
              // @ts-ignore
            }).then(({ error }) => {
              if (error) {
                setIsFieldLoading(false)
                toast.error(error)
              } else {
                // router.refresh()
                // router.push('/')
                toast.success('Signed in successfully')
              }
            })
          }}
          className='grid gap-2'
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="font-pops">
              Username
            </label>
            <Input
              id="name"
              type="name"
              placeholder="Enter your username"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="font-pops" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button className="w-full mt-2" size="lg" type='submit'>
          {isFieldLoading && <IconSpinner className="mr-2 animate-spin" /> } Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
