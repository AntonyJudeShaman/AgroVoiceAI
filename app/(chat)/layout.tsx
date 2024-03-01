import { Header } from '@/components/Chat/chat-header'
import { SidebarDesktop } from '@/components/Sidebar/sidebar-desktop'
import { auth } from '@/lib/auth'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = await auth()
  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {session && <SidebarDesktop />}
      <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      
      {session && <Header />}  {children}
      </div>
    </div>
  )
}
