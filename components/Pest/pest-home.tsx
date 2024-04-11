'use client'
import { FormEvent, useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Loader2, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { handlePestImageSubmit } from '@/helpers/user-info'
import { removeImage } from '@/app/actions'
import {
  getStorage,
  ref as reff,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeApp } from 'firebase/app'
import useLockBody from '@/lib/hooks/use-lock-body'
import { useRouter } from 'next/navigation'
import MyToast from '../ui/my-toast'
import { IconClose } from '../ui/icons'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { SettingsProps } from '@/lib/types'
import { useLocale } from 'next-intl'
import { LoadingDots } from '../ui/loading-dots'
import { Header } from '../Home/header'
import { SettingsHeader } from '../Settings/settings-header'

export default function PestHome({
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
  const [image, setImage] = useState(null as string | null)
  const [isSavingImage, setIsSavingImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isImageChanged, setIsImageChanged] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isUploaded, setIsUploaded] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [formData, setFormData] = useState('' as FormData | '')

  const firebaseApp = initializeApp(firebaseConfig, 'Pest')
  const storage = getStorage(firebaseApp)
  const router = useRouter()
  const locale = useLocale()

  useLockBody(modalVisible)

  const handleImageClick = (image: string) => {
    setModalImage(image)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setModalImage('')
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploadingImage(true)
      const file = acceptedFiles[0]

      const formData = new FormData()
      setFormData(formData)
      console.log(file)
      toast.loading('Please wait...')
      setImage(file ? URL.createObjectURL(file) : null)
      toast.dismiss()
      setIsUploaded(false)
      setIsUploadingImage(false)
    },
    [storage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  })

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsImageChanged(false)
    try {
      router.refresh()
      setOpen(false)
    } catch (error) {
      MyToast({
        message:
          locale === 'en'
            ? 'Error uploading file. Please try again later.'
            : 'கோப்பை பதிவேற்றுவதில் பிழை ஏற்பட்டது. பிறகு முயற்சிக்கவும்.',
        type: 'error'
      })
    } finally {
      setIsUploaded(true)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value)
    setIsImageChanged(event.target.value !== image)
  }

  const sendImageforProcessing = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setIsProcessing(true)
    try {
      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg'
        },
        body: image
      })

      const data = await response.json()
      console.log(data)
      router.refresh()
      setOpen(false)
      setIsProcessed(true)
    } catch (error) {
      MyToast({
        message:
          locale === 'en'
            ? 'Error processing image. Please try again later.'
            : 'படத்தை செயலாக்குவதில் பிழை ஏற்பட்டது. பிறகு முயற்சிக்கவும்.',
        type: 'error'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center z-40 mt-0 md:mt-[10%] w-screen">
      <Card className="md:max-w-xl z-40 w-full flex md:justify-center items-center mx-auto border-none shadow-none bg-transparent">
        <div className={className}>
          {/* <p className="rounded-full flex justify-center items-center"> */}
          {image && (
            <img
              src={image}
              alt={user?.name || 'Profile Picture'}
              className="cursor-pointer w-[40vh] mt-8 md:mt-0 flex justify-center rounded-2xl md:border dark:border-green-800 border-teal-400 items-center"
              onClick={() => handleImageClick(image)}
            />
          )}
          {/* </p> */}
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
            {isProcessed ? (
              'processed'
            ) : (
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
                        <AlertDialog open={open} onOpenChange={setOpen}>
                          <AlertDialogTrigger>
                            <Button
                              className={cn(
                                'p-3 bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% hover:from-emerald-600 hover:via-emerald-600 hover:to-green-600'
                              )}
                              disabled={isSavingImage}
                              variant="default"
                              type="button"
                              size="lg"
                            >
                              {isSavingImage && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                              )}
                              {upload}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="">
                            <form onSubmit={event => handleFileUpload(event)}>
                              <div className="mt-5">
                                {image && (
                                  <img
                                    src={image}
                                    alt="Uploaded Image"
                                    width={40}
                                    className="rounded-full mx-auto m-6"
                                    height={40}
                                    onChange={() => handleImageChange}
                                  />
                                )}
                                <button
                                  type="button"
                                  {...getRootProps()}
                                  disabled={isUploadingImage}
                                  className="flex w-full justify-center items-center rounded-md placeholder:text-white  border-2 border-dashed border-green-200  h-40 bg-transparent px-3 py-2 text-sm ring-offset-background file:border file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <input
                                    {...getInputProps()}
                                    type="file"
                                    accept="image/*"
                                  />
                                  {isDragActive ? (
                                    <p className="flex justify-center p-2 items-center">
                                      Drop the image here ...
                                    </p>
                                  ) : (
                                    <div className="flex flex-col justify-center p-2 items-center space-y-2">
                                      <p className="text-md">{drag}</p>
                                      <p className="bg-accent uppercase dark:bg-background text-muted-foreground">
                                        {locale === 'en' ? 'or' : 'அல்லது'}
                                      </p>
                                      <Button type="button">
                                        {locale === 'en'
                                          ? 'Browse'
                                          : 'தேர்ந்தெடு'}
                                      </Button>
                                    </div>
                                  )}
                                </button>
                              </div>
                              <AlertDialogFooter>
                                <Button
                                  disabled={isSavingImage || isUploadingImage}
                                  className="m-1 mt-4"
                                  variant="outline"
                                  type="button"
                                  onClick={() => setOpen(false)}
                                >
                                  {cancel}
                                </Button>
                                <Button
                                  disabled={isUploaded || isUploadingImage}
                                  className="m-1 mt-4"
                                  variant="default"
                                  type="submit"
                                >
                                  {save}
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <form
                    onSubmit={event => sendImageforProcessing(event)}
                    className="m-1 mt-8"
                    encType="multipart/form-data"
                  >
                    {isProcessing ? (
                      <LoadingDots className="bg-gradient-to-r size-8 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
                    ) : (
                      image && (
                        <>
                          <Button
                            disabled={isProcessing}
                            variant="default"
                            type="submit"
                            size="lg"
                            className="mb-4"
                          >
                            {locale === 'en' ? 'Find pest' : 'பூச்சி கண்டுபிடி'}
                          </Button>
                          <Button
                            className={cn('ml-3')}
                            disabled={isSavingImage}
                            variant="outline"
                            type="button"
                            size="lg"
                            onClick={async () => {
                              if (image) {
                                toast.loading(
                                  locale === 'en'
                                    ? 'Please wait...'
                                    : 'காத்திருக்கவும்...'
                                )
                                setImage(null)
                                setIsUploaded(false)
                                toast.dismiss()

                                MyToast({
                                  message:
                                    locale === 'en'
                                      ? 'Image removed.'
                                      : 'படம் நீக்கப்பட்டது.',
                                  type: 'success'
                                })
                              } else {
                                MyToast({
                                  message:
                                    locale === 'en'
                                      ? 'No image to remove.'
                                      : 'அழிக்க எந்த படமும் இல்லை.',
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
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
