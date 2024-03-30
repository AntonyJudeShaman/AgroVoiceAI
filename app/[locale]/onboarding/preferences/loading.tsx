import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>

      <div className=" dark:bg-slate-800/10 bg-white/80 md:w-2/3 xl:w-2/4 m-4 w-full rounded-2xl flex flex-col border border-slate-800">
        <div>
          <div className="w-24 h-10 mx-10 mt-10 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
          <div className="w-3/4 h-8 mx-10 mt-2 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
          <div className="h-60 mx-10 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
        </div>
        <div className="flex justify-between ">
          <div className="w-24 mx-10 h-9 mt-4 mr-3 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
          <div className="h-9 mb-10 w-24 mt-4 mr-10 bg-primary border animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
