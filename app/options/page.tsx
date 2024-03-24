import React from 'react'
import NotFound from '../not-found'
import HomeOptions from '@/components/Home/home-options'
import SessionPageContainer from '@/components/session-page-container'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../actions'

async function OptionsPage() {
  const session = await auth()
  const user = await getCurrentUser()
  console.log(session, user)
  return (
    <>
      {session ? (
        <>
          <div className="absolute pointer-events-none h-full inset-0 flex items-center justify-center dark:bg-black bg-green-100 [mask-image:radial-gradient(ellipse_at_center,transparent_100%,white)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_40%,white)]"></div>
          <SessionPageContainer component={<HomeOptions />} />
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default OptionsPage
