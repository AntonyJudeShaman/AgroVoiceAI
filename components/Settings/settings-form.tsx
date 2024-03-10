'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { Label } from '../ui/label'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '../ui/dialog'
import { useDropzone } from 'react-dropzone'
import { DeleteAccount } from './delete-account'
import {
  handleImageSubmit,
  handleNameSubmit,
  handlePhoneNumberSubmit
} from '@/helpers/user-info'
import {
  getStorage,
  ref as reff,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeApp } from 'firebase/app'
import { removeImage } from '@/app/actions'
import { DistrictForm } from '../Form/district-form'
import { IconClose } from '../ui/icons'
import useLockBody from '@/lib/hooks/use-lock-body'

export function SettingsForm({
  user,
  className,
  ...props
}: {
  user: any
  className: string
}) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false)
  const [isSavingAge, setIsSavingAge] = useState<boolean>(false)
  const [isSavingPhone, setIsSavingPhone] = useState<boolean>(false)
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false)
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false)
  const [isAgeChanged, setIsAgeChanged] = useState<boolean>(false)
  const [isPhoneChanged, setIsPhoneChanged] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(true)
  const [name, setName] = useState(user?.name || '')
  const [imageURL, setImageURL] = useState(user?.image || '')
  const [age, setAge] = useState(user?.age || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
  const [open, setOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')

  useLockBody(modalVisible)

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setModalImage('')
  }

  const firebaseApp = initializeApp(firebaseConfig, 'profile')
  const storage = getStorage(firebaseApp)
  const router = useRouter()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameChanged(event.target.value !== user?.name)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value)
    setIsImageChanged(event.target.value !== user?.image)
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
    setIsPhoneChanged(event.target.value !== user?.phone)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const uniqueFileName = `${Date.now()}_${file.name}`
    const storageRef = reff(storage, 'Profile/' + uniqueFileName)
    toast.loading('Please wait...')
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    setImageURL(downloadURL)
    toast.dismiss()
    setIsUploaded(false)
  }, [])
  // console.log(imageURL)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {}
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
      toast.error('Error uploading file. Please try again later.')
    }
  }

  return (
    <>
      <div
        className={cn(
          className,
          'flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row'
        )}
      >
        <Card className="md:w-2/3 w-full border dark:border-green-900/50 border-green-200">
          <form
            onSubmit={event =>
              handleNameSubmit(
                event,
                user,
                name,
                setIsSaving,
                setIsNameChanged,
                toast
              ).then(() => {
                setIsNameChanged(false)
              })
            }
          >
            <CardHeader>
              <CardTitle>Your Name</CardTitle>
              <CardDescription>
                Please enter your full name or a display name you are
                comfortable with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Input
                  id="name"
                  className=""
                  size={32}
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% p-3 border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 md:mt-4 justify-end flex">
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 dark:hover:opacity-100 flex justify-center items-center',
                  `${isNameChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70'}`
                )}
                size="lg"
                disabled={!isNameChanged || isSaving}
                variant="outline"
              >
                {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
                <span>Save</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
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
                <User className="md:size-32 size-24 mt-4 md:mt-0 bg-slate-700 rounded-full md:ml-0 ml-4 p-4 flex justify-center items-center" />
              )}
            </p>
            {modalVisible && (
              <div
                className="fixed inset-0 z-50 p-6 flex animate-in duration-500 justify-center items-center bg-black bg-opacity-60"
                onClick={closeModal}
              >
                <div className="max-w-3/4 bg-background p-8 border rounded-full shadow-lg">
                  <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    <IconClose className="z-40 size-8 dark:text-white text-black" />
                  </button>
                  <img src={modalImage} alt="Modal" className="w-full h-auto" />
                </div>
              </div>
            )}
            <div className="flex flex-col text-center md:text-left justify-center">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Upload a profile image (optional).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row justify-start">
                <Label className="sr-only" htmlFor="image">
                  upload Image
                </Label>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button
                      className={cn(className, 'p-3')}
                      disabled={isSavingImage}
                      variant="outline"
                      type="button"
                    >
                      {isSavingImage && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      )}
                      Upload image
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
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
                        <div
                          {...getRootProps()}
                          className="flex w-full justify-center rounded-md placeholder:text-white  border-2 border-dashed border-green-200  h-40 bg-transparent px-3 py-2 text-sm ring-offset-background file:border file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                              Drag n drop an image file here, or click to select
                              a file
                            </p>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose>
                          <Button
                            disabled={isSavingImage}
                            className="m-1 mt-4"
                            variant="outline"
                            type="button"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          disabled={isUploaded}
                          className="m-1 mt-4"
                          variant="default"
                          type="submit"
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  className={cn(className, 'ml-3')}
                  disabled={isSavingImage}
                  variant="outline"
                  type="button"
                  onClick={async () => {
                    if (user?.image) {
                      toast.loading('Please wait...')
                      await removeImage()
                      toast.dismiss()
                      toast.success('Profile picture updated.')
                    } else {
                      toast.error('No image to remove.')
                    }
                  }}
                >
                  {isSavingImage && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Remove
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
      <Card className="h-[12rem] flex justify-center flex-col border dark:border-green-900/50 border-green-200">
        <CardHeader>
          <CardTitle>Your Email</CardTitle>
          <CardDescription>Your email cannot be changed.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="text-gray-400"
              size={32}
              value={user?.email}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4">
        <DistrictForm user={user} />
        <Card className="w-full border dark:border-green-900/50 border-green-200">
          <form
            onSubmit={event =>
              handlePhoneNumberSubmit(
                event,
                user,
                phoneNumber,
                setIsSavingPhone,
                setIsPhoneChanged,
                toast
              ).then(() => {
                setIsPhoneChanged(false)
              })
            }
          >
            <CardHeader>
              <CardTitle>Your Phone Number</CardTitle>
              <CardDescription>Please enter your phone number.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Phone Number
                </Label>
                <Input
                  id="name"
                  className=""
                  type="number"
                  size={32}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 p-3 md:mt-4 justify-end flex">
              {' '}
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
                  `${isPhoneChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70 border-green-200'}`
                )}
                size="lg"
                disabled={!isPhoneChanged || isSavingPhone}
              >
                {isSavingPhone && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                <span>Save</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <DeleteAccount />
    </>
  )
}
