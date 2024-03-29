import { BottomGradient } from '@/components/ui/bottom-gradient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full font-pops dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center">
      <h1 className="md:text-7xl text-5xl font-display text-center font-bold mb-4 dark:text-white text-black">
        404 - Not Found
      </h1>
      <p className="md:text-lg text-md text-center dark:text-white text-black mb-8">
        Sorry, the page you are looking for does not exist. Please check if you
        are{' '}
        <Link href="/sign-in" className="duration-300">
          <Button variant="link" className="px-0 text-lg">
            <span className="text-green-500 font-bold">signed in</span>
          </Button>
        </Link>
        .
      </p>
      <Link href="/">
        <Button className=" relative text-white dark:text-black group/btn dark:bg-white bg-black hover:bg-white/40 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
          Go to Home Page
          <BottomGradient />
        </Button>
      </Link>
    </div>
  )
}
