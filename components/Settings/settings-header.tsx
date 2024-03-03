import { cn } from "@/lib/utils"

interface HeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function SettingsHeader({
  heading,
  text,
  children,
  className
}: HeaderProps) {
  return (
    <div className="flex justify-center md:justify-start mx-auto md:mx-0 px-2">
      <div className="grid gap-1">
        <h1 className={cn(' font-display text-center md:text-left px-5 md:px-0 tracking-tight', className)}>{heading}</h1>
        {text && <p className="text-md text-muted-foreground">{text}</p>}
      </div>
    </div>
  )
}
