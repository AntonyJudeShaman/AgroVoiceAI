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
import { Input } from './ui/input'
import { IconGoogle, IconSpinner } from './ui/icons'
import React from 'react'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'

interface CreateAccountProps {
  text?: string
  showGoogleIcon?: boolean
}

export function CreateAccount({
    text = 'Register with Google',
    showGoogleIcon = true
  }: CreateAccountProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
      <div className='md:min-w-[50vh]'>
      <Card className='font-pops w-full'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-bl from-green-600 to-green-500 dark:from-green-500 dark:to-green-400">Register for an Account</CardTitle>
          <CardDescription>
            Please provide your details to register
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
          <div className="grid gap-2">
            <label htmlFor="name" className='font-pops'>Username</label>
            <Input id="name" type="name" placeholder="Enter your username" />
          </div>
          <div className="grid gap-2">
            <label className='font-pops' htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder='Enter your password' />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">Register</Button>
        </CardFooter>
      </Card></div>
    )
  }
  
