import React from 'react'

export default function WeatherCardsSkeleton() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center mt-[10rem] space-y-4 pb-10">
        <h2
          className="animate-pulse dark:bg-gray-800 bg-gray-300 mb-4 rounded-xl"
          style={{ width: '50%', height: '40px' }}
        ></h2>
        <div defaultValue="" className="w-3/4 ">
          <div className="grid font-pops w-full gap-4 rounded-xl md:grid-cols-4 grid-cols-2 md:h-full h-20 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-2 ml-2 md:m-[20px] rounded-xl animate-pulse"
              style={{ width: '90%', height: '20px' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-2 ml-2 md:m-[20px] rounded-xl animate-pulse"
              style={{ width: '90%', height: '20px' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border  rounded-xl ml-2 md:m-[20px] animate-pulse"
              style={{ width: '90%', height: '20px' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border  rounded-xl ml-2 md:m-[20px] animate-pulse"
              style={{ width: '90%', height: '20px' }}
            ></div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-[20px] rounded-xl animate-pulse"
              style={{ height: '350px', width: '100%' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-[20px] rounded-xl animate-pulse"
              style={{ height: '350px', width: '100%' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-[20px] rounded-xl animate-pulse"
              style={{ height: '350px', width: '100%' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-[20px] rounded-xl animate-pulse"
              style={{ height: '350px', width: '100%' }}
            ></div>
            <div
              className="dark:bg-gray-800 bg-gray-300 border mt-[20px] rounded-xl animate-pulse"
              style={{ height: '350px', width: '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
