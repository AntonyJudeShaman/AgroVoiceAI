import { cn } from '@/lib/utils'

interface HeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function Header({ heading, text, children, className }: HeaderProps) {
  return (
    <div className="flex items-center justify-center px-2">
      <div className="grid gap-1">
        <h1
          className={cn(
            'mx-auto font-display px-5 md:px-0 tracking-tight',
            className
          )}
        >
          {heading}
        </h1>
        {text && <p className="text-md text-muted-foreground">{text}</p>}
      </div>
    </div>
  )
}
