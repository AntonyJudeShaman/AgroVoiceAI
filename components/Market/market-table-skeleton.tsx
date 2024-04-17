import React from 'react'

export default function MarketTableSkeleton() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[8rem] pb-10 ">
        <div className="w-full flex flex-col justify-center md:w-[80%] 2xl:w-[70%]">
          <div
            className="animate-pulse dark:bg-gray-800 border mx-auto md:mx-0 border-gray-400 dark:border-gray-600 bg-gray-200 mb-6 md:w-[60%] 2xl:w-[50%] w-[80%] rounded-2xl"
            style={{ height: '50px' }}
          ></div>
          <div className="flex justify-between">
            <div
              className="animate-pulse dark:bg-gray-800 border border-gray-400 dark:border-gray-600 bg-gray-200 mb-6 md:w-[20%] 2xl:w-[20%] w-[35%] rounded-md"
              style={{ height: '30px' }}
            ></div>{' '}
            <div
              className="animate-pulse dark:bg-gray-800 border border-gray-400 dark:border-gray-600 bg-gray-200 mb-6 md:w-[20%] 2xl:w-[20%] w-[30%] rounded-md"
              style={{ height: '30px' }}
            ></div>
          </div>
        </div>
        <div
          defaultValue=""
          style={{ height: 'auto' }}
          className="md:w-[80%] 2xl:w-[70%] w-full h-screen p-4 pt-6 md:pt-10 md:p-8 md:pl-16 rounded-2xl grid grid-cols-4 border border-gray-400 dark:border-gray-600 dark:bg-gray-900 bg-gray-200"
        >
          {Array.from({ length: 60 }).map((_, index) => (
            <div key={index} className="flex w-full md:p-1 md:px-0 px-2">
              {' '}
              <div
                className="animate-pulse dark:bg-slate-800 border border-gray-400 dark:border-gray-600 bg-slate-200 mb-6 md:w-[85%] w-full rounded-md"
                style={{ height: '35px' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
