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
import { MemoizedReactMarkdown } from '@/components/Miscellaneous/markdown'
import Link from 'next/link'
import ReactCrop, { PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {
  getStorage,
  ref as reff,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeApp } from 'firebase/app'
import {
  handleFeedbackSubmit,
  handleImageSubmit,
  handlePestImageSubmit
} from '@/helpers/user-info'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { Textarea } from '../ui/textarea'
import { set } from 'zod'

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
  const [image, setImage] = useState<any>(null)
  const [isSavingImage, setIsSavingImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isUploaded, setIsUploaded] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [crop, setCrop] = useState<PixelCrop | any>(null)
  const [imageURL, setImageURL] = useState<string>('')
  const [feedbackImageURL, setFeedbackImageURL] = useState<string>('')
  const [showAnswerInput, setShowAnswerInput] = useState(false)
  const [isFeedbackChanged, setIsFeedbackChanged] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [answer, setAnswer] = useState('')
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState<boolean>(false)
  const [isFeedbackSuccess, setIsFeedbackSuccess] = useState<boolean>(false)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState<boolean>(false)

  useLockBody(modalVisible)

  const handleCropChange = (newCrop: any) => {
    setCrop(newCrop)
  }

  const firebaseApp = initializeApp(firebaseConfig, 'Pests')
  const storage = getStorage(firebaseApp)

  const handleCropComplete = (croppedArea: any) => {
    const canvas = document.createElement('canvas')
    const imageElement = document.createElement('img')
    imageElement.src = image as string

    imageElement.onload = () => {
      const scaleX = imageElement.naturalWidth / imageElement.width
      const scaleY = imageElement.naturalHeight / imageElement.height

      canvas.width = croppedArea.width * scaleX
      canvas.height = croppedArea.height * scaleY
      const ctx = canvas.getContext('2d')

      ctx?.drawImage(
        imageElement,
        croppedArea.x * scaleX,
        croppedArea.y * scaleY,
        croppedArea.width * scaleX,
        croppedArea.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      )

      const croppedImage = canvas.toDataURL('image/jpeg')
      setFile(croppedImage as any)
      console.log('croppedImage:', file)
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
    setIsUploaded(false)
  }

  const locale = useLocale()
  const router = useRouter()

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const fileName = `${Date.now()}.jpeg`
      const storageRef = reff(storage, 'Pests/' + fileName)
      const response = await fetch(image)
      const blob = await response.blob()
      await uploadBytes(storageRef, blob)
      const downloadURL = await getDownloadURL(storageRef)
      setFeedbackImageURL(downloadURL)
      await handlePestImageSubmit(
        event,
        user,
        downloadURL,
        setIsSavingImage,
        toast
      )
      setIsProcessing(true)
      return true
    } catch (error) {
      return false
    }
  }

  let croppedImage: Blob | undefined

  const handleUpload = async (event: any) => {
    setIsProcessed(false)
    setIsProcessing(true)
    try {
      toast.loading(
        locale === 'en' ? 'Processing image ...' : 'படம் செயலாக்கப்படுகிறது',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'lightgreen',
            secondary: 'black'
          },
          className: 'font-pops'
        }
      )
      const uploadResponse = await handleFileUpload(event)
      if (uploadResponse) {
        let imageToSend: Blob | undefined
        if (crop?.width && file && crop.height && crop.x && crop.y) {
          imageToSend = await fetch(file).then(res => res.blob())
        } else {
          imageToSend = await fetch(image).then(res => res.blob())
        }
        const formData = new FormData()
        formData.append('image', imageToSend!)
        toast.dismiss()
        toast.loading(
          locale === 'en' ? 'Finding pest ...' : 'பூச்சியைக் கண்டரிகிரோம்...',
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              fontSize: '14px'
            },
            iconTheme: {
              primary: 'lightgreen',
              secondary: 'black'
            },
            className: 'font-pops'
          }
        )
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
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file. Please try again later.')
    } finally {
      setIsProcessing(false)
      setIsProcessed(true)
      toast.dismiss()
    }
  }

  const handleRadioChange = (e: any) => {
    if (e.target.value) {
      setIsFeedbackChanged(true)
      if (e.target.value === 'incorrect') {
        setShowAnswerInput(true)
      } else {
        setShowAnswerInput(false)
      }
    } else {
      setIsFeedbackChanged(false)
    }
  }

  return (
    <>
      <div
        className={cn(
          response && 'md:bg-gradient-to-tr',
          'flex flex-col md:w-2/3 md:p-6 md:mt-[20vh] dark:from-slate-900 dark:to-transparent to-80% from-zinc-100 to-indigo-100/30 mt-6 mb-16 md:rounded-2xl md:border border-teal-900 mx-auto'
        )}
      >
        <Card className="md:max-w-4xl z-40 w-full flex md:justify-center mt-8 p-6 md:p-0 items-center mx-auto border-none shadow-none bg-transparent">
          <div className="mx-auto">
            {image && !response && (
              <>
                <p className="mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
                  {locale === 'en'
                    ? 'Please drag over the image to crop it'
                    : 'படத்தை செதுக்க, அதன் மேல் இழுக்கவும்'}
                </p>
                <ReactCrop
                  crop={crop}
                  onChange={handleCropChange}
                  onComplete={handleCropComplete}
                >
                  <img
                    src={image}
                    alt={user?.name || 'Profile Picture'}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </ReactCrop>
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
                        onClick={e => handleUpload(e)}
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
                                    className="flex w-full flex-col justify-center items-center cursor-auto text-left rounded-md placeholder:text-white  border-2 border-dashed border-gray-500 h-auto bg-transparent px-3 py-2 text-sm ring-offset-background file:border file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <Input
                                      type="file"
                                      id="fileInput"
                                      onChange={handleFileChange}
                                      disabled={isUploadingImage}
                                      className="appearance-none w-2/3 m-10 bg-gradient-to-r cursor-pointer from-green-600 from-10% via-green-600 via-30% to-emerald-600 to-60%"
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
                        <LoadingDots className="bg-gradient-to-r size-5 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
                      ) : (
                        image &&
                        !isSuccess && (
                          <>
                            <Button
                              disabled={isProcessing}
                              variant="default"
                              onClick={e => handleUpload(e)}
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
          <div className="flex justify-center items-center">
            <div className="flex flex-col w-full p-2 md:p-6 -mt-[10%] lg:-mt-[3%] md:rounded-2xl mx-auto">
              <div className="mr-4 mb-4 z-50 space-x-4 flex md:justify-end md:mt-0 justify-center">
                <AlertDialog
                  open={isFeedbackSubmitted}
                  onOpenChange={setIsFeedbackSubmitted}
                >
                  <AlertDialogTrigger>
                    <Button>
                      {locale === 'en'
                        ? 'Is this correct?'
                        : 'கணிப்பு சரியானது என்று நினைக்கிறீர்களா?'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    {isFeedbackSuccess ? (
                      <>
                        <div className="mx-auto flex flex-col text-transparnt bg-gradent-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% text-2xl space-y-4 w-full">
                          <p className="mx-auto md:pt-6">
                            Feedback submitted!!
                          </p>
                          <div className="flex justify-end">
                            <AlertDialogCancel
                              type="button"
                              className="m-0"
                              onClick={e => {
                                setIsFeedbackChanged(false)
                                setIsFeedbackSubmitted(true)
                              }}
                            >
                              {locale === 'en' ? 'Close' : 'மூடு'}
                            </AlertDialogCancel>
                          </div>
                        </div>
                      </>
                    ) : (
                      <form
                        onSubmit={e => {
                          toast.loading(
                            locale === 'en'
                              ? 'Submitting feedback...'
                              : 'கருத்து சமர்ப்பிக்கப்படுகிறது...'
                          )
                          handleFeedbackSubmit(
                            e,
                            feedbackImageURL,
                            feedback,
                            answer,
                            response.confidence,
                            response.pest,
                            setIsFeedbackSuccess,
                            setIsFeedbackLoading
                          )
                          setTimeout(() => {
                            toast.dismiss()
                          }, 1500)
                          setTimeout(() => {
                            MyToast({
                              message:
                                locale === 'en'
                                  ? 'Feedback submitted. Thank you!.'
                                  : 'கருத்து சமர்ப்பிக்கப்பட்டது. நன்றி!',
                              type: 'success'
                            })
                          }, 1800)
                        }}
                      >
                        <div className="mx-auto flex flex-col space-y-4 w-full">
                          <Label className="text-lg font-medium">
                            {locale === 'en'
                              ? 'Detection correctness:'
                              : 'கண்டறிதல் சரியானதா?'}
                          </Label>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="correct"
                                name="correctness"
                                value="correct"
                                onChange={e => handleRadioChange(e)}
                              />
                              <Label htmlFor="correct">
                                {locale === 'en' ? 'Correct' : 'சரியானது'}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="incorrect"
                                name="correctness"
                                value="incorrect"
                                onChange={e => handleRadioChange(e)}
                              />
                              <Label htmlFor="incorrect">
                                {locale === 'en' ? 'Incorrect' : 'தவறானது'}
                              </Label>
                            </div>
                          </div>
                          <Label
                            htmlFor="feedback"
                            className="text-md font-medium"
                          >
                            {locale === 'en'
                              ? 'Feedback (optional):'
                              : 'கருத்து (விரும்பினால்):'}
                          </Label>
                          <Textarea
                            id="feedback"
                            className="border rounded-md p-2 min-h-[8rem]"
                            placeholder={
                              locale === 'en'
                                ? 'Provide your feedback here...'
                                : 'உங்கள் கருத்தை இங்கே தெரிவு செய்யவும்...'
                            }
                            onChange={e => setFeedback(e.target.value)}
                          ></Textarea>
                          {showAnswerInput && (
                            <>
                              <Label
                                htmlFor="answer"
                                className="text-md font-medium"
                              >
                                {locale === 'en'
                                  ? 'What do you think it is? (optional):'
                                  : 'அது என்ன என்று நீங்கள் என்ன நினைக்கிறீர்கள்? (விரும்பினால்):'}
                              </Label>
                              <Input
                                id="answer"
                                className="border rounded-md p-2"
                                placeholder={
                                  locale === 'en'
                                    ? 'Enter pest name here...'
                                    : 'பூச்சியின் பெயரை இங்கே உள்ளிடவும்...'
                                }
                                onChange={e => setAnswer(e.target.value)}
                              />
                            </>
                          )}
                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              disabled={!isFeedbackChanged || isFeedbackLoading}
                              className="mr-2"
                            >
                              {locale === 'en' ? 'Submit' : 'சமர்ப்பிக்கவும்'}
                            </Button>
                            <AlertDialogCancel
                              type="button"
                              className="m-0"
                              onClick={e => {
                                setIsFeedbackChanged(false)
                                setIsFeedbackSubmitted(true)
                              }}
                            >
                              {locale === 'en' ? 'Cancel' : 'ரத்து செய்'}
                            </AlertDialogCancel>
                          </div>
                        </div>
                      </form>
                    )}
                  </AlertDialogContent>
                </AlertDialog>

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
