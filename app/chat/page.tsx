import { Chat } from '@/components/Chat/chat'
import { SidebarDesktop } from '@/components/Sidebar/sidebar-desktop'
import { auth } from '@/lib/auth'
import { nanoid } from '@/lib/utils'
import React from 'react'

function page() {
    const id = nanoid()
  return (
    <div className=''>
    <Chat id={id} />
    </div>)
}

export default page