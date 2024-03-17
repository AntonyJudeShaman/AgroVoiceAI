import React from 'react'

export default function MarketTableSkeleton() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[8rem] pb-10 p-6">
        <p
          className="animate-pulse dark:bg-gray-800 border border-gray-400 dark:border-gray-600 bg-gray-300 mb-6 md:w-[60%] 2xl:w-[50%] w-[80%] rounded-2xl"
          style={{ height: '60px' }}
        ></p>
        <div
          defaultValue=""
          className="md:w-[80%] 2xl:w-[65%] w-full h-screen rounded-2xl animate-pulse border border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-300"
        ></div>
      </div>
    </div>
  )
}
