import { ageSchema, imageURLSchema, nameSchema, phoneNumberSchema } from '@/lib/schema';
import { User } from '@prisma/client/edge'
import { z } from 'zod';

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

  try {
    nameSchema.parse(name);
    const response = await fetch(`/api/user/name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, name }) 
    });
  
    if (response.ok) {
      toast.success('Name updated successfully');
      setIsNameChanged(false);
    } else {
      toast.error('Failed to update name');
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // const validationError = error.errors[0].message; 
      toast.error(`Name must contain at least 3 characters.`);
    } else {
      toast.error('An error occurred. Please try again later.'); 
    }
  } finally {
    setIsSaving(false);
  }
}

export { handleNameSubmit }

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
    imageURLSchema.parse(imageURL);
    const response = await fetch(`/api/user/profile-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, imageURL: imageURL }) 
    });
  
    if (response.ok) {
      toast.dismiss()
      toast.success('Profile picture updated.');
      setIsImageChanged(false);
    } else {
      const errorMessage = await response.text(); 
      toast.dismiss()
      toast.error(`Failed to upload image: ${errorMessage}`);
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.dismiss()
      toast.error(`Image format not supported.`);
    } else {
      toast.dismiss()
      toast.error('An error occurred. Please try again later.');
    }
  } finally {
    setIsSavingImage(false);
  }
}

export { handleImageSubmit }

const handleAgeSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  age: string,
  setIsSavingAge: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAgeChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault();
  setIsSavingAge(true);

  try {
    ageSchema.parse(age);
    const response = await fetch(`/api/user/age`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, age })
    });
  
    if (response.ok) {
      toast.success('Age updated successfully');
      setIsAgeChanged(false);
    } else {
      const errorMessage = await response.text();
      toast.error(`Failed to update age: ${errorMessage}`);
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const validationError = error.errors[0].message;
      toast.error(`Age must be a number between 18 and 120.`); 
    } else {
      toast.error('An error occurred. Please try again later.');
    }
  } finally {
    setIsSavingAge(false);
  }
};

export { handleAgeSubmit };


const handlePhoneNumberSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  user: User,
  phoneNumber: string,
  setIsSavingPhone: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPhoneChanged: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) => {
  event.preventDefault();
  setIsSavingPhone(true);

  try {
    phoneNumberSchema.parse(phoneNumber);
    const response = await fetch(`/api/user/phone-number`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id, phone: phoneNumber }) 
    });
  
    if (response.ok) {
      toast.success('Phone number updated successfully');
      setIsPhoneChanged(false);
    } else {
      const errorMessage = await response.text(); // Get error message from response body
      toast.error(`Failed to update phone number: ${errorMessage}`);
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      toast.error('Enter a valid 10-digit phone number.');
    } else {
      toast.error('An error occurred. Please try again later.'); // Display a generic error message
    }
  } finally {
    setIsSavingPhone(false);
  }
};

export { handlePhoneNumberSubmit };
