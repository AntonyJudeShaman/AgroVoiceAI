import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { BottomGradient } from './ui/bottom-gradient'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col dark:bg-black bg-white items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 dark:text-white text-black">
        404 - Not Found
      </h1>
      <p className="text-lg dark:text-white text-black mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button className=" relative text-white group/btn dark:bg-zinc-700/70 bg-black hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
          Go to Home Page
          <BottomGradient />
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
