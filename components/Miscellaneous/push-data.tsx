'use client'
import React, { useState } from 'react'
import { parseItems } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import MyToast from '@/components/ui/my-toast'
import { Item } from '@/lib/types'
import { tnDistrictsThatHasData } from '@/config/constants'
import toast from 'react-hot-toast'
import { LoadingDots } from '@/components/ui/loading-dots'
import { Input } from '@/components/ui/input'

export default function MarketsData(originalPassword: {
  originalPassword: string
}) {
  const [vegetablesData, setVegetablesData] = useState<Item[]>([])
  const [fruitsData, setFruitsData] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingVegetables, setLoadingVegetables] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const pushData = async (category: string) => {
    setError(null)

    const dataToPush = category === 'vegetables' ? vegetablesData : fruitsData

    try {
      for (const district of tnDistrictsThatHasData) {
        if (category === 'vegetables') {
          setLoadingVegetables(true)
        }
        if (category === 'fruits') {
          setLoading(true)
        }

        const response = await fetch(
          category === 'vegetables' ? '/api/scrape' : '/api/scrape/fruits',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: district.value })
          }
        )

        if (!response.ok) {
          MyToast({
            message: `fetch for ${district.value} failed.`,
            type: 'error'
          })
        }

        const responseData = await response.json()
        const parsedData = parseItems(responseData.scrapedData)

        const storeResponse = await fetch('/api/store-market-prices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            district: district.value,
            items: parsedData,
            type: category
          })
        })

        if (!storeResponse.ok) {
          MyToast({
            message: `Failed to store ${category} data for ${district.value}`,
            type: 'error'
          })
        } else {
          MyToast({
            message: `${category} data stored successfully for ${district.value}`,
            type: 'success'
          })
        }
      }
    } catch (error: any) {
      MyToast({
        message: `Failed to fetch or store prices. Please try again later.`,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-red-600/80 text-lg text-white rounded-2xl">
          {error}
        </div>
      </div>
    )
  }

  //   const originalPassword = process.env.NEXT_PUBLIC_PASSWORD!

  return (
    <>
      {isPasswordValid ? (
        <div className="flex items-center justify-center h-[95vh] w-full md:w-2/5 md:p-0 p-6 mx-auto">
          <div className="md:p-10  flex flex-col p-6 w-full bg-gray-50 dark:bg-gray-950 border border-green-600/80 text-lg text-white rounded-2xl">
            <Button
              className="mt-5 bg-background border dark:text-white text-black"
              onClick={() => pushData('fruits')}
              disabled={loading}
            >
              {loading ? (
                <div className="flex flex-col">
                  <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
                </div>
              ) : (
                'Push Fruits Data'
              )}
            </Button>
            <Button
              className="mt-5 bg-background border dark:text-white text-black"
              onClick={() => pushData('vegetables')}
              disabled={loadingVegetables}
            >
              {loadingVegetables ? (
                <div className="flex flex-col">
                  <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
                </div>
              ) : (
                'Push Vegetables Data'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen md:w-[20%] md:p-0 p-6 mx-auto">
          <div className="md:p-10 flex flex-col justify-center p-6 w-full bg-gray-50 dark:bg-gray-950 border border-green-600/80 text-lg text-white rounded-2xl">
            <form
              onSubmit={e => {
                e.preventDefault()
                if (password.toString() === process.env.NEXT_PUBLIC_PASSWORD) {
                  setIsPasswordValid(true)
                }
              }}
            >
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
              <Button
                className="mt-5 bg-background flex right-0 mx-auto border dark:text-white text-black"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
