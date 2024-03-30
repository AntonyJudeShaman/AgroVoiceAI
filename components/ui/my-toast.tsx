import React from 'react'
import toast from 'react-hot-toast'

type ToastType = 'success' | 'error'

interface MyToastProps {
  message: string
  type: ToastType
}

const MyToast: React.FC<MyToastProps> = ({ message, type }) => {
  const toastOptions = {
    style: {
      borderRadius: '10px',
      background: type === 'success' ? '#333' : '#d83030',
      color: '#fff',
      fontSize: '14px'
    },
    iconTheme: {
      primary: type === 'success' ? 'lightgreen' : 'white',
      secondary: 'black'
    },
    className: 'font-pops'
  }

  return (
    <>
      {type === 'success'
        ? toast.success(message, toastOptions)
        : toast.error(message, toastOptions)}
    </>
  )
}

export default MyToast
