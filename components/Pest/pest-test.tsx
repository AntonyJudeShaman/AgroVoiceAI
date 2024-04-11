'use client'
import React, { useCallback, useState } from 'react'
import { Input } from '../ui/input'
import { SettingsProps } from '@/lib/types'
import useLockBody from '@/lib/hooks/use-lock-body'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { IconClose } from '../ui/icons'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { LoadingDots } from '../ui/loading-dots'
import MyToast from '../ui/my-toast'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from '@/components/markdown'
import Link from 'next/link'

export default function PestTest({
  user,
  title,
  description,
  upload,
  remove,
  save,
  cancel,
  drag,
  className
}: SettingsProps) {
  const [file, setFile] = useState(null)
  const [response, setResponse] = useState<any>(null)
  const [image, setImage] = useState(null as string | null)
  const [isSavingImage, setIsSavingImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isUploaded, setIsUploaded] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useLockBody(modalVisible)

  const handleImageClick = (image: string) => {
    setModalImage(image)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setModalImage('')
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
    setIsUploaded(false)
  }

  const locale = useLocale()
  const router = useRouter()

  const handleUpload = async () => {
    setIsProcessed(false)
    setIsProcessing(true)
    const formData = new FormData()
    formData.append('image', file as any)
    console.log('formData:', formData)

    try {
      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to classify image')
      }

      const data = await response.json()
      setResponse(data)
      setIsSuccess(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsProcessing(false)
      setIsProcessed(true)
    }
  }

  return (
    <>
      <div
        className={cn(
          response && 'md:bg-gradient-to-tr',
          'flex flex-col md:w-2/3 md:p-6 md:mt-[20vh] dark:from-slate-900 dark:to-transparent to-80% from-zinc-100 to-indigo-100/30 mt-6 mb-10 md:rounded-2xl md:border border-teal-900 mx-auto'
        )}
      >
        <Card className="md:max-w-4xl z-40 w-full flex md:justify-center items-center mx-auto border-none shadow-none bg-transparent">
          <div className={className}>
            {image && !response && (
              <>
                <img
                  src={image}
                  alt={user?.name || 'Profile Picture'}
                  className="cursor-pointer mx-auto w-[40vh] md:w-[50vh] mt-8 0 flex justify-center rounded-2xl md:border dark:border-green-800 border-teal-400 items-center"
                  onClick={() => handleImageClick(image)}
                />
                {isProcessed && (
                  <>
                    <p className="mt-6 mx-auto text-lg text-red-600">
                      {locale === 'en'
                        ? 'Some error occurred. Please try again.'
                        : 'பிழை ஏற்பட்டது. மீண்டும் முயல்க'}
                    </p>
                    <div className="mx-auto space-x-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="min-w-1/3 mt-6 mx-auto"
                        onClick={() => router.push('/pest-identification/new')}
                      >
                        {locale === 'en' ? 'Back' : 'பின்னால்'}
                      </Button>
                      <Button
                        className="min-w-1/3 mt-6 mx-auto"
                        onClick={handleUpload}
                        size="lg"
                      >
                        {locale === 'en'
                          ? 'Try again'
                          : 'மீண்டும் முயற்சி செய்'}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
            {modalVisible && (
              <div
                className="fixed inset-0 z-50 p-6 flex animate-in duration-500 justify-center items-center dark:bg-black bg-white bg-opacity-100"
                onClick={closeModal}
              >
                <div className="max-w-3/4 bg-transparent p-8 rounded-full">
                  <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    <IconClose className="z-40 size-8 dark:text-white text-black" />
                  </button>
                  <img
                    src={modalImage}
                    alt="Modal"
                    className="w-full h-auto p12"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center items-center space-y-4">
              {!isProcessed && (
                <>
                  {isUploaded || !image ? (
                    <>
                      <CardHeader className="p-6 md:p-0 pt-12 flex justify-center text-center">
                        <CardTitle className="font-pops pt-2 pb-3 text-6xl md:text-5xl lg:text-6xl 2xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
                          {title}
                        </CardTitle>
                        <CardDescription className="text-lg md:text-xl">
                          {description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-row md:justify-start justify-center p-0">
                        <Label className="sr-only" htmlFor="image">
                          {upload}
                        </Label>
                        <div className="">
                          <>
                            <CardContent className="">
                              <div>
                                <div className="mt-5">
                                  {image && (
                                    <img
                                      src={image}
                                      alt="Uploaded Image"
                                      width={40}
                                      className="rounded-full mx-auto m-6"
                                      height={40}
                                    />
                                  )}
                                  <button
                                    type="button"
                                    disabled={isUploadingImage}
                                    className="flex w-full flex-col justify-center items-center text-left rounded-md placeholder:text-white  border-2 border-dashed border-gray-500 h-auto bg-transparent px-3 py-2 text-sm ring-offset-background file:border file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <Input
                                      type="file"
                                      id="fileInput"
                                      onChange={handleFileChange}
                                      disabled={isUploadingImage}
                                      className="appearance-none w-2/3 m-10 bg-gradient-to-r from-green-600 from-10% via-green-600 via-30% to-emerald-600 to-60%"
                                      lang="ta"
                                    />
                                  </button>
                                </div>
                              </div>
                            </CardContent>
                          </>
                        </div>
                        <div></div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="m-1 mt-8">
                      {isProcessing ? (
                        <LoadingDots className="bg-gradient-to-r size-8 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
                      ) : (
                        image &&
                        !isSuccess && (
                          <>
                            <Button
                              disabled={isProcessing}
                              variant="default"
                              onClick={handleUpload}
                              size="lg"
                              type="button"
                              className="mb-4"
                            >
                              {locale === 'en' ? 'Find pest' : 'கண்டுபிடி'}
                            </Button>

                            <Button
                              className={cn('ml-3')}
                              disabled={isSavingImage}
                              variant="outline"
                              type="button"
                              size="lg"
                              onClick={async () => {
                                if (image) {
                                  setImage(null)
                                  setIsUploaded(false)
                                  toast.dismiss()

                                  MyToast({
                                    message: 'Image removed.',
                                    type: 'success'
                                  })
                                } else {
                                  MyToast({
                                    message: 'No image to remove.',
                                    type: 'error'
                                  })
                                }
                              }}
                            >
                              {remove}
                            </Button>
                          </>
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>{' '}
        {response && (
          <div className="flex justify-center items-center mb-10">
            <div className="flex flex-col w-full p-2 md:p-6 mt-6 lg:-mt-[3%] mb-10 md:rounded-2xl mx-auto">
              <div className="mr-4 mb-4 flex justify-end">
                <Button onClick={() => router.push('/pest-identification/new')}>
                  {locale === 'en' ? 'Find Other' : 'மற்றொரு முயற்சி'}
                </Button>
              </div>
              <div className="max-w-2xl mx-auto flex items-center ml-4 mb-5">
                <p className="flex flex-row items-center">
                  <span className="mr-2 bg-clip-text font-bricol text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% text-4xl font-bold">
                    Pest Name:
                  </span>{' '}
                  <span className="text-4xl capitalize">{response.pest}</span>
                </p>
              </div>
              <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
                <MemoizedReactMarkdown
                  className="prose break-words dark:prose-invert font-bricol prose-p:leading-relaxed prose-pre:p-0"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  components={{
                    p({ children }) {
                      return <p className="mb-2 last:mb-0">{children}</p>
                    }
                  }}
                >
                  {response.response}
                </MemoizedReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
