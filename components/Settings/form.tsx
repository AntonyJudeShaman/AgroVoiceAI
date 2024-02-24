'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
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
import { Loader2, Trash2, User } from 'lucide-react'
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
import {handleAgeSubmit, handleImageSubmit, handleNameSubmit, handlePhoneNumberSubmit} from '@/helpers/user-info'

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
  const [name, setName] = useState(user?.name || '')
  const [imageURL, setImageURL] = useState(user?.image || '')
  const [age, setAge] = useState(user?.age || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameChanged(event.target.value !== user?.name)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value)
    setIsImageChanged(event.target.value !== user?.image)
  }

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value)
    setIsAgeChanged(event.target.value !== user?.age)
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
    setIsPhoneChanged(event.target.value !== user?.phone)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageURL(file ? URL.createObjectURL(file) : null)
    // setImage(acceptedFiles)
  }, [])
  console.log(imageURL)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {}
  })

  

  return (
    <>
      <div
        className={cn(
          className,
          'flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row'
        )}
      >
        <Card className="md:w-2/3 w-full border dark:border-gray-700/70 border-gray-300">
          <form
            onSubmit={event =>
              handleNameSubmit(
                event,
                user,
                name,
                setIsSaving,
                setIsNameChanged,
                toast
              )
            }
          >
            {' '}
            {/* Pass handleNameSubmit as onSubmit handler */}
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
            <CardFooter className="dark:bg-gray-800/70 bg-slate-600 rounded-bl-2xl p-3 border dark:border-gray-700/70 border-gray-600 rounded-br-2xl md:-m-2 md:mt-4 justify-end flex">
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 hover:opacity-85 dark:hover:opacity-100 flex justify-center items-center',
                  `${isNameChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-gray-600/70'}`
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
        <Card className="max-w-full flex md:justify-center border dark:border-gray-700/70 border-gray-300">
          <div className="flex flex-row">
            <p className="rounded-full flex justify-center items-center">
              {user?.image ? (
                <img
                  src={user?.image}
                  alt={user?.name || ''}
                  className="size-30 rounded-full p-4 flex justify-center items-center"
                />
              ) : (
                <User className="size-30 bg-slate-700 rounded-full p-4 flex justify-center items-center" />
              )}
            </p>
            <div className="flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Upload a profile image (optional).
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Label className="sr-only" htmlFor="image">
                  upload Image
                </Label>

                <Dialog>
                  <DialogTrigger>
                    <Button
                      className={cn(className)}
                      disabled={isSavingImage}
                      variant="outline"
                      type="button"
                    >
                      {isSavingImage && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      )}
                      Upload Avatar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <form onSubmit={(event) => handleImageSubmit(event, user, imageURL, setIsSavingImage, setIsImageChanged, toast)}>
                      <div className="">
                        {imageURL && (
                          <img
                            src={imageURL}
                            alt="Uploaded Image"
                            width={40}
                            className="rounded-full size-20 mx-auto m-6"
                            height={40}
                          />
                        )}
                        <div
                          {...getRootProps()}
                          className="flex w-full justify-center rounded-md placeholder:text-white  border-2 border-dashed border-gray-600  h-40 bg-transparent px-3 py-2 text-sm ring-offset-background file:border file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                            className="m-1 mt-4"
                            variant="outline"
                            type="button"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
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
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
      <Card className="h-[12rem] flex justify-center flex-col border dark:border-gray-700/70 border-gray-300">
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
              className="dark:text-gray-400 text-gray-100"
              size={32}
              value={user?.email}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4">
        <Card className="md:w-2/3 w-full border dark:border-gray-700/70 border-gray-300">
          <form onSubmit={(event) => handleAgeSubmit(event, user, age, setIsSavingAge, setIsAgeChanged, toast)}>
            <CardHeader>
              <CardTitle>Your Age</CardTitle>
              <CardDescription>Please enter your Age.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Age
                </Label>
                <Input
                  id="name"
                  className=""
                  size={32}
                  onChange={handleAgeChange}
                  value={age}
                />
              </div>
            </CardContent>
            <CardFooter className="dark:bg-gray-800/70 bg-slate-600 border dark:border-gray-700/70 border-gray-600 rounded-bl-2xl rounded-br-2xl md:-m-2 p-3 md:mt-4 items-end justify-end flex">
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  ' dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
                  `${isAgeChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-gray-600/70'}`
                )}
                size="lg"
                disabled={!isAgeChanged || isSavingAge}
              >
                {isSavingAge && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                <span>Save</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full border dark:border-gray-700/70 border-gray-300">
          <form onSubmit={(event) => handlePhoneNumberSubmit(event, user, phoneNumber, setIsSavingPhone, setIsPhoneChanged, toast)}>
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
            <CardFooter className="dark:bg-gray-800/70 bg-slate-600 border dark:border-gray-700/70 border-gray-600 rounded-bl-2xl rounded-br-2xl md:-m-2 p-3 md:mt-4 justify-end flex">
              {' '}
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
                  `${isPhoneChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-gray-600/70 border-gray-300'}`
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
