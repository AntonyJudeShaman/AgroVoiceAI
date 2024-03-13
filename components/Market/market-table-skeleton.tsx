import React from 'react'

export default function MarketTableSkeleton() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center md:mt-[4rem] mt-[6rem] pb-10 p-6">
        <p
          className="animate-pulse dark:bg-gray-800 bg-gray-300 mb-6 md:w-1/3 w-full rounded-2xl"
          style={{ height: '60px' }}
        ></p>
        <div
          defaultValue=""
          className="md:w-[50%] w-full h-screen rounded-2xl animate-pulse dark:bg-gray-800 bg-gray-300"
        ></div>
      </div>
    </div>
  )
}
