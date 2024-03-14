import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-[35rem] dark:bg-slate-800/10 bg-white/80 w-[28rem] rounded-2xl flex flex-col border border-slate-800">
        <div className="flex justify-center">
          <div className="h-10 w-full mx-10 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
        </div>{' '}
        <div className="bg-white/40 rounded-full h-32 w-32 mx-auto mt-5 animate-pulse"></div>
        <div className="flex justify-center w-full">
          <div className="h-9 w-1/2 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
        </div>
        <div className="flex justify-center w-full space-x-6">
          <div className="h-9 w-40 px-10 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
          <div className="h-9 w-40 px-10 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
        </div>
        <div>
          <div className="w-24 h-8 mx-10 mt-10 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
          <div className="h-12 mx-10 mt-4 dark:bg-slate-800/10 bg-white/80 border animate-pulse rounded-md"></div>
        </div>
        <div className="flex justify-end">
          <div className="h-10 mb-10 w-24 mx-10 mt-4 bg-primary border animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
