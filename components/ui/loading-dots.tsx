export const LoadingDots = ({
  className
}: {
  color?: string
  className: string
}) => {
  return (
    <span className="loading space-x-2">
      <span className={className} />
      <span className={className} />
      <span className={className} />
    </span>
  )
}
