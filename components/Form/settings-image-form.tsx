'use client'
import { useCallback, useState } from 'react'
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
import { handleImageSubmit } from '@/helpers/user-info'
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

export function SettingsImageForm({
  user,
  title,
  description,
  upload,
  remove,
  save,
  cancel,
  drag
}: SettingsProps) {
  const [imageURL, setImageURL] = useState(user?.image || '')
  const [isSavingImage, setIsSavingImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isImageChanged, setIsImageChanged] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isUploaded, setIsUploaded] = useState<boolean>(true)

  const firebaseApp = initializeApp(firebaseConfig, 'profile')
  const storage = getStorage(firebaseApp)
  const router = useRouter()

  useLockBody(modalVisible)

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl)
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
      const fileName = `${Date.now()}_${file.name}`
      const storageRef = reff(storage, 'Profile/' + fileName)
      toast.loading('Please wait...')
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      setImageURL(downloadURL)
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
      handleImageSubmit(
        event,
        user,
        imageURL,
        setIsSavingImage,
        setIsImageChanged,
        toast
      )
      router.refresh()
      setIsUploaded(true)
      setOpen(false)
    } catch (error) {
      MyToast({
        message: 'Error uploading file. Please try again later.',
        type: 'error'
      })
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value)
    setIsImageChanged(event.target.value !== user?.image)
  }

  return (
    <Card className="md:w-2/3 w-full flex md:justify-center border dark:border-green-900/50 border-green-200">
      <div className="flex md:flex-row flex-col mx-auto">
        <p className="rounded-full flex justify-center items-center">
          {user?.image ? (
            <img
              src={user?.image}
              alt={user?.name || 'Profile Picture'}
              className="size-32 rounded-full cursor-pointer p-4 md:p-0 flex justify-center items-center"
              width={60}
              height={30}
              onClick={() => handleImageClick(user?.image)}
            />
          ) : (
            <User className="md:size-32 size-24 mt-4 md:mt-0 dark:bg-slate-700 bg-slate-300 rounded-full md:ml-0 ml-4 p-4 flex justify-center items-center" />
          )}
        </p>
        {modalVisible && (
          <div
            className="fixed inset-0 z-50 p-6 flex animate-in duration-500 justify-center items-center bg-black bg-opacity-60"
            onClick={closeModal}
          >
            <div className="max-w-3/4 bg-transparent p-8 rounded-full shadow-lg">
              <button
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <IconClose className="z-40 size-8 dark:text-white text-black" />
              </button>
              <img src={modalImage} alt="Modal" className="w-full h-auto p12" />
            </div>
          </div>
        )}
        <div className="flex flex-col text-center md:text-left justify-center">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row md:justify-start justify-center">
            <Label className="sr-only" htmlFor="image">
              {upload}
            </Label>
            <div className="">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger>
                  <Button
                    className={cn('p-3')}
                    disabled={isSavingImage}
                    variant="outline"
                    type="button"
                  >
                    {isSavingImage && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    {upload}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="">
                  <form onSubmit={event => handleFileUpload(event)}>
                    <div className="mt-10">
                      {imageURL && (
                        <img
                          src={imageURL}
                          alt="Uploaded Image"
                          width={40}
                          className="rounded-full size-20 mx-auto m-6"
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
                          <p className="flex justify-center p-2 items-center">
                            {drag}
                          </p>
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
            <Button
              className={cn('ml-3')}
              disabled={isSavingImage}
              variant="outline"
              type="button"
              onClick={async () => {
                if (user?.image) {
                  toast.loading('Please wait...')
                  await removeImage()
                  toast.dismiss()

                  MyToast({
                    message: 'Profile picture updated.',
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
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
