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

const handleNameSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  name: string,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>,
  setIsNameChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault()
  setIsSaving(true)
  if (!validateInput(name)) {
    toast.error('Dont try to inject code. ð', {
      style: {
        borderRadius: '10px',
        background: '#d83030',
        color: '#fff',
        fontSize: '14px'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'black'
      }
    })
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
        toast.success('Name updated successfully', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'lightgreen',
            secondary: 'black'
          }
        })
        setIsNameChanged(true)
        setIsSaving(false)
      } else {
        toast.error('Failed to update name', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // const validationError = error.errors[0].message;
        toast.error(`Name must contain at least 3 characters.`, {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      } else {
        toast.error('An error occurred. Please try again later.', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
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
      toast.success('Profile picture updated.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'lightgreen',
          secondary: 'black'
        }
      })
    } else {
      const errorMessage = await response.text()
      toast.dismiss()
      toast.error(`Failed to upload image: ${errorMessage}`, {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.dismiss()
      toast.error(`Image format not supported.`, {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    } else {
      toast.dismiss()
      toast.error('An error occurred. Please try again later.', {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
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
  setIsDistrictChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
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
      toast.success('District updated successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'lightgreen',
          secondary: 'black'
        }
      })
      setIsDistrictChanged(false)
    } else {
      const errorMessage = await response.text()
      toast.error(`Failed to update district: ${errorMessage}`, {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const validationError = error.errors[0].message
      toast.error(`Select a valid district.`, {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    } else {
      toast.error('An error occurred. Please try again later.', {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
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
  setIsUserNameChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault()
  setIsSavingUserName(true)
  if (!validateInput(userName)) {
    toast.error('Dont try to inject code. ð')
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
        toast.success('Name updated successfully', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'lightgreen',
            secondary: 'black'
          }
        })
        setIsUserNameChanged(true)
        setIsSavingUserName(false)
      } else {
        toast.error('Failed to update name', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // const validationError = error.errors[0].message;
        toast.error(`Name must contain at least 3 characters.`, {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      } else {
        toast.error('An error occurred. Please try again later.', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
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
  setIsEmailChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
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
      toast.success('Email updated successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'lightgreen',
          secondary: 'black'
        }
      })
      setIsEmailChanged(false)
    } else {
      const errorMessage = await response.text()
      toast.error(`Failed to update email`, {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.error('Enter a valid email.', {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    } else {
      toast.error('An error occurred. Please try again later.', {
        style: {
          borderRadius: '10px',
          background: '#d83030',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
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
  setIsPrefChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault()
  setIsSavingPref(true)
  prefSchema.parse(pref)
  if (!validateInput(pref)) {
    toast.error('Dont try to inject code. ð', {
      style: {
        borderRadius: '10px',
        background: '#d83030',
        color: '#fff',
        fontSize: '14px'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'black'
      }
    })
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
        toast.success('Chabot Preference updated successfully', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'lightgreen',
            secondary: 'black'
          }
        })
        setIsPrefChanged(false)
      } else {
        toast.error('Failed to update preference.', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // const validationError = error.errors[0].message;
        toast.error(`Not Valid.`, {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      } else {
        toast.error('An error occurred. Please try again later.', {
          style: {
            borderRadius: '10px',
            background: '#d83030',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
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
  setIsFieldLoading: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  e.preventDefault()
  setIsFieldLoading(true)
  try {
    const res = await signIn('credentials', {
      redirect: false,
      name: name,
      password: password,
      callbackUrl: '/onboarding'
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

export {
  handleNameSubmit,
  handleImageSubmit,
  handleDistrictSubmit,
  handleEmailSubmit,
  handleUserNameSubmit,
  handlePrefSubmit,
  handleSubmit
}
