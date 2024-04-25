'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const WobbleCard = ({
  children,
  containerClassName,
  className
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      className={cn(
        'mx-auto w-full bg-teal-800  relative rounded-2xl overflow-hidden',
        containerClassName
      )}
    >
      <div className="relative h-full   sm:mx-0 sm:rounded-2xl overflow-hidden">
        <motion.div
          style={{}}
          className={cn('h-full px-8 py-10 sm:px-10', className)}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] -z-10 transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: 'url(/noise.webp)',
        backgroundSize: '30%'
      }}
    ></div>
  )
}
