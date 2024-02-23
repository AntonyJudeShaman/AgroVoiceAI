import * as React from "react"

import { cn } from "@/lib/utils"

interface SettingsShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsShell({
  children,
  className,
  ...props
}: SettingsShellProps) {
  return (
    <div className={cn("grid container md:px-40 p-4 py-10 items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}