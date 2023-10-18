import { motion } from 'framer-motion';
import React from 'react'

interface Props {
    progress: number;
}

const UploadProgress: React.FC<Props> = ({progress}) => {
  return (
    <motion.div className="border-2 overflow-hidden rounded-full h-5 w-full border-gray-400 bg-tertiary-100">
        <motion.div className="bg-primary-500 h-full rounded-full transition-all" style={{width: `${progress.toFixed(1)}%`}}></motion.div>
    </motion.div>
  )
}

export default UploadProgress