interface SettingsHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function SettingsHeader({
  heading,
  text,
  children,
}: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-4xl font-semibold tracking-tighter">{heading}</h1>
        {text && <p className="text-md text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
