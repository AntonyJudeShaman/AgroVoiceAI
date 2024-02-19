'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const tabs = ['Home', 'Search', 'About', 'FAQ']

const ChipTabs = () => {
  const [selected, setSelected] = useState(tabs[0])
  const [hovered, setHovered] = useState(tabs[0])
  const [hoveredLeave, setHoveredLeave] = useState(tabs[0])

  return (
    <div className="px-4 mt-5 py-2 border border-gray-600 rounded-full bg-slate-900 flex items-center flex-wrap">
      {tabs.map(tab => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          hovered={hovered === tab}
          setHovered={setHovered}
          setHoveredLeave={setHoveredLeave}
          hoveredLeave={hoveredLeave === tab}
          key={tab}
        />
      ))}
    </div>
  )
}

const Chip = ({
  text,
  selected,
  setSelected,
  hovered,
  setHovered,
  hoveredLeave,
  setHoveredLeave
}) => {
  return (
    <
    >
      <Link
      href={`#`}
        className={`relative cursor-pointer z-10 hover:translate-y-1 transition-transform duration-200 ${
          selected && 'text-orange-400 hover:text-orange-400'
        }`}
      >
        {text}
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: 'spring', duration: 0.5 }}
            className="absolute inset-0 z-0 mb-3 bg-tranparent rounded-md"
          />
        )}
        {/* {selected && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 before:mb-5 bg-orange-900"
            style={{ paddingBottom: "2px" }}
          />
        )} */}
      </Link>
      {hovered && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-gray-800 to-gray-800 rounded-md"
        />
      )}
      {/* <span
        className="absolute bottom-0 mt-3 left-0 w-full h-0.5 bg-orange-400"
        style={{ paddingBottom: "2px" }}
      /> */}
    </>
  )
}

export default ChipTabs