import { cn } from '@/lib/utils'

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
    <div className="flex justify-center xl:justify-start md:-ml-2 mx-auto md:mx-0 px-2">
      <div className="grid gap-1 px-5 lg:px-0 md:pt-16 xl:pt-0">
        <h1
          className={cn(
            ' font-display text-center md:text-left pt-1 tracking-tight',
            className
          )}
        >
          {heading}
        </h1>
        {text && (
          <p className="text-md text-muted-foreground text-center md:text-left">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}
