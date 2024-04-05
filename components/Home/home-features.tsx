import React from 'react'
import { Header } from './header'
import { getTranslations } from 'next-intl/server'

async function HomeFeatures() {
  const t = await getTranslations('Index')
  return (
    <div className="">
      <Header
        heading={t('home.topic')}
        className="mt-16 p-3 text-4xl md:text-5xl text-center lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bricol font-bold tracking-tighter"
      />
    </div>
  )
}

export default HomeFeatures
