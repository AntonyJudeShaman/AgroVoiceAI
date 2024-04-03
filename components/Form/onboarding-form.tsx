'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Info, Loader2, User } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { useDropzone } from 'react-dropzone'
import { handleImageSubmit, handleNameSubmit } from '@/helpers/user-info'
import {
  getStorage,
  ref as reff,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeApp } from 'firebase/app'
import { removeImage } from '@/app/actions'
import MyToast from '../ui/my-toast'

export default function OnboardingForm({
  user,
  className,
  ...props
}: {
  user: any
  className: string
}) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false)
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false)
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(true)
  const [name, setName] = useState(user?.name || '')
  const [imageURL, setImageURL] = useState(user?.image || '')
  const [open, setOpen] = useState(false)
  const [next, setNext] = useState(false)

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

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const uniqueFileName = `${Date.now()}_${file.name}`
      const storageRef = reff(storage, 'Profile/' + uniqueFileName)
      toast.loading('Please wait...')
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      setImageURL(downloadURL)
      toast.dismiss()
      setIsUploaded(false)
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

  return (
    <Card
      className={cn(
        className,
        'flex flex-col m-4 items-center dark:bg-slate-900/10 bg-white/80 shadow-2xl'
      )}
    >
      <p className="md:text-4xl text-3xl mt-4 bg-clip-text text-center text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-display px-8">
        Welcome to AgroVoiceAI
      </p>
      {/* <p className="flex justify-start font-pops px-8">
        Let's create your profile.
      </p> */}
      <Card className="w-full flex justify-center md:m-4 border-none bg-transparent shadow-none">
        <div className="justify-start">
          <div className="flex md:flex-row flex-col mx-auto justify-center">
            <p className="rounded-full md:border flex justify-center items-center">
              {user?.image ? (
                <img
                  src={user?.image}
                  alt={user?.name || 'Profile Picture'}
                  className="size-32 rounded-full  p-4 md:p-0 flex justify-center items-center"
                  width={60}
                  height={30}
                />
              ) : (
                <User className="md:size-32 size-24 mt-4 md:mt-0 dark:bg-slate-700 bg-slate-200 dark:text-white text-gray-700 rounded-full md:ml-0 ml-4 p-4 flex justify-center items-center" />
              )}
            </p>
          </div>
          <div className="flex flex-col text-center items-center md:text-left justify-center">
            <CardHeader>
              <CardTitle>Profile Picture (optional)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-start">
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
                            Drag n drop an image file here, or click to select a
                            file
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
                Remove
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
      <Card className="w-full border-none bg-transparent shadow-none -mt-6">
        <form
          onSubmit={event => {
            event.preventDefault()

            if (!name.trim()) {
              MyToast({
                message: 'Name cannot be empty.',
                type: 'error'
              })
              setIsSaving(false)
              return false
            }

            if (isNameChanged) {
              handleNameSubmit(
                event,
                user,
                name,
                setIsSaving,
                setIsNameChanged
              ).then(() => {
                setNext(true)
                setIsSaving(true)
                if (name.length >= 3) {
                  router.push('/onboarding/location')
                  setIsSaving(false)
                }
                setIsSaving(false)
              })
            } else {
              setNext(true)
              setIsSaving(true)
              setIsNameChanged(false)
              router.push('/onboarding/location')
            }
          }}
        >
          <CardHeader>
            <CardTitle>Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 -mt-3">
              <Input
                id="name"
                className=""
                size={32}
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                className={cn(buttonVariants(), className, 'ml-2 h-full')}
                size="lg"
                disabled={isSaving}
                variant="outline"
              >
                {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
                <span>Save & Next</span>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
      <p className="flex justify-start text-sm pb-4 dark:text-gray-500 text-gray-700">
        <Info className="size-5 mr-3" />
        <span>You can always change your details later.</span>
      </p>
    </Card>
  )
}
