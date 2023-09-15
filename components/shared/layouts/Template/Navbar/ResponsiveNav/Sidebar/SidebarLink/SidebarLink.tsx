import { inter } from '@/utils/constants/fonts'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const SidebarLink: React.FC<NavLinkType> = ({ name, url }) => {
  return (
    <motion.li className="w-full p-2">
      <Link className={`${inter.className} w-full block text-2xl text-primary-300 font-medium`} href={url}>{ name }</Link>
    </motion.li>
  )
}

export default SidebarLink