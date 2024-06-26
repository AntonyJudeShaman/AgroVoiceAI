import MyToast from '@/components/ui/my-toast'
import {
  districtSchema,
  imageURLSchema,
  nameSchema,
  emailSchema,
  prefSchema,
  validateInput
} from '@/lib/schema'
import { User } from '@prisma/client/edge'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { getDatabase } from 'firebase/database'
import { app } from '@/lib/firebase'
import { ref, push, child, update, onValue } from 'firebase/database'
import { getCurrentUser } from '@/app/actions'

const database = getDatabase(app)

const handleNameSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  name: string,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>,
  setIsNameChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault()
  setIsSaving(true)
  if (!validateInput(name)) {
    MyToast({ message: 'Dont try to inject code. 😒', type: 'error' })
    setIsSaving(false)
  } else {
    try {
      nameSchema.parse(name)
      const response = await fetch(`/api/user/name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, name })
      })

      if (response.ok) {
        MyToast({ message: 'Name updated successfully', type: 'success' })
        setIsNameChanged(true)
        setIsSaving(false)
      } else {
        MyToast({ message: 'Failed to update name', type: 'error' })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // const validationError = error.errors[0].message;
        MyToast({
          message: 'Name must contain at least 3 characters.',
          type: 'error'
        })
      } else {
        MyToast({
          message: 'An error occurred. Please try again later.',
          type: 'error'
        })
      }
    } finally {
      setIsSaving(false)
    }
  }
}

const handleImageSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  imageURL: string,
  setIsSavingImage: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault()

  setIsSavingImage(true)
  toast.loading('Uploading file...')
  try {
    imageURLSchema.parse(imageURL)
    const response = await fetch(`/api/user/profile-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, imageURL: imageURL })
    })

    if (response.ok) {
      toast.dismiss()
      MyToast({ message: 'Profile picture updated.', type: 'success' })
    } else {
      const errorMessage = await response.text()
      toast.dismiss()
      MyToast({ message: 'Failed to upload image.', type: 'error' })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.dismiss()
      MyToast({ message: 'Image format not supported.', type: 'error' })
    } else {
      toast.dismiss()
      MyToast({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      })
    }
  } finally {
    setIsSavingImage(false)
  }
}

const handlePestImageSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  imageURL: string,
  setIsSavingImage: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault()

  setIsSavingImage(true)
  // toast.loading('Uploading file...')
  try {
    imageURLSchema.parse(imageURL)
    const response = await fetch(`/api/user/pest-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, imageURL: imageURL })
    })

    if (response.ok) {
      // MyToast({ message: 'Image processed.', type: 'success' })
    } else {
      const errorMessage = await response.text()
      toast.dismiss()
      MyToast({ message: 'Failed to process image.', type: 'error' })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.dismiss()
      MyToast({ message: 'Image format not supported.', type: 'error' })
    } else {
      toast.dismiss()
      MyToast({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      })
    }
  } finally {
    setIsSavingImage(false)
  }
}

const handleDistrictSubmit = async (
  user: User,
  district: string,
  setIsSavingDistrict: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistrictChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsSavingDistrict(true)

  try {
    districtSchema.parse(district)
    const response = await fetch(`/api/user/district`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, district })
    })

    if (response.ok) {
      MyToast({ message: 'District updated successfully', type: 'success' })
      setIsDistrictChanged(false)
    } else {
      MyToast({ message: 'Failed to update district', type: 'error' })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const validationError = error.errors[0].message
      MyToast({ message: 'Select a valid district.', type: 'error' })
    } else {
      MyToast({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      })
    }
  } finally {
    setIsSavingDistrict(false)
  }
}

const handleUserNameSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  userName: string,
  setIsSavingUserName: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUserNameChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault()
  setIsSavingUserName(true)
  if (!validateInput(userName)) {
    MyToast({ message: 'Dont try to inject code. 😒', type: 'error' })
    setIsSavingUserName(false)
  } else {
    try {
      nameSchema.parse(userName)
      const response = await fetch(`/api/user/username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, userName })
      })

      if (response.ok) {
        MyToast({ message: 'UserName updated successfully', type: 'success' })
        setIsUserNameChanged(true)
        setIsSavingUserName(false)
      } else {
        MyToast({ message: 'Failed to update name', type: 'error' })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        MyToast({
          message: 'UserName must contain at least 3 characters.',
          type: 'error'
        })
      } else {
        MyToast({
          message: 'An error occurred. Please try again later.',
          type: 'error'
        })
      }
    } finally {
      setIsSavingUserName(false)
    }
  }
}

const handleEmailSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  email: string,
  setIsSavingEmail: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEmailChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault()
  setIsSavingEmail(true)

  try {
    emailSchema.parse(email)
    const response = await fetch(`/api/user/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, email: email })
    })

    if (response.ok) {
      MyToast({ message: 'Email updated successfully', type: 'success' })
      setIsEmailChanged(false)
    } else {
      MyToast({ message: 'Failed to update email', type: 'error' })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      MyToast({ message: 'Enter a valid email.', type: 'error' })
    } else {
      MyToast({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      })
    }
  } finally {
    setIsSavingEmail(false)
  }
}

const handlePrefSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  pref: string,
  setIsSavingPref: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPrefChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault()
  setIsSavingPref(true)
  prefSchema.parse(pref)
  if (!validateInput(pref)) {
    MyToast({ message: 'Dont try to inject code. 😒', type: 'error' })
    setIsSavingPref(false)
  } else {
    try {
      const response = await fetch(`/api/user/pref`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, pref: pref })
      })

      if (response.ok) {
        MyToast({
          message: 'Chabot Preference updated successfully',
          type: 'success'
        })
        setIsPrefChanged(false)
      } else {
        MyToast({ message: 'Failed to update preference', type: 'error' })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        MyToast({
          message: 'Preference must contain at least 3 characters.',
          type: 'error'
        })
      } else {
        MyToast({
          message: 'An error occurred. Please try again later.',
          type: 'error'
        })
      }
    } finally {
      setIsSavingPref(false)
    }
  }
}

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  password: string,
  setIsFieldLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault()
  setIsFieldLoading(true)
  try {
    const res = await signIn('credentials', {
      redirect: false,
      name: name,
      password: password,
      callbackUrl: '/onboarding/location'
    })

    if (res?.url?.includes('onboarding')) {
      return true
    } else {
      return false
    }
  } catch (error: any) {
    // skipping
  } finally {
    setIsFieldLoading(false)
  }
}

const handleFeedbackSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  pestImage: string,
  feedback?: string,
  answer?: string,
  confidence?: string,
  modelAnswer?: string,
  setIsFeedbackSuccess?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFeedbackLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault()

  setIsFeedbackLoading && setIsFeedbackLoading(true)
  const formData = new FormData(e.target as HTMLFormElement)
  const correctness = formData.get('correctness')

  const data = {
    pestImage: pestImage,
    userAnswer: answer,
    modelAnswer: modelAnswer,
    confidence: confidence,
    correctness: correctness,
    feedback: feedback
  }

  try {
    const user = await getCurrentUser()

    const userName = user?.userName || 'anonymous'

    const feedbackRef = push(ref(database, 'PestFeedbacks/'))
    await update(
      ref(database, `PestFeedbacks/${feedbackRef.key}-${userName}`),
      data
    )

    setIsFeedbackSuccess && setIsFeedbackSuccess(true)
  } catch (error) {
    setIsFeedbackSuccess && setIsFeedbackSuccess(false)
  }
}

export {
  handleNameSubmit,
  handleImageSubmit,
  handlePestImageSubmit,
  handleDistrictSubmit,
  handleEmailSubmit,
  handleUserNameSubmit,
  handlePrefSubmit,
  handleFeedbackSubmit,
  handleSubmit
}
