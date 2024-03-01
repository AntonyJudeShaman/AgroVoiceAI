import React from 'react'
import Home from './home'
import Navbar from './navbar'

export function DotBackGround() {
  return (
    <div className="min-h-screen w-full dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
      
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-100 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,purple)]"></div><p className="text-4xl sm:text-7xl w-full 2xl:container flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
        <div className="min-w-full">
          <Navbar />
        </div>
      </p>
      <div className="flex 2xl:container flex-col justify-center grow -mt-20">
        <Home />
      </div>
    </div>
  )
}
