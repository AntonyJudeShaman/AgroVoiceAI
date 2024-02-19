'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconGoogle, IconSpinner } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = 'Login with Google',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <div className='flex flex-col gap-4'>
    {/* <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        signIn('github', { callbackUrl: `/` })
      }}
      disabled={isLoading}
      className={cn(className, "p-5")}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button> */}
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        signIn('google', { callbackUrl: `/` })
      }}
      disabled={isLoading}
      className={cn(className, "p-5")}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      {text}
    </Button>
    </div>
  )
}
