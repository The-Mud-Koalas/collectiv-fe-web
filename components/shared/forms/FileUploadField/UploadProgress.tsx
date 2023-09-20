import React from 'react'

interface Props {
    progress: number;
}

const UploadProgress: React.FC<Props> = ({progress}) => {
  return (
    <div className="border-2 overflow-hidden rounded-full h-5 w-full border-gray-400 bg-tertiary-100">
        <div className="bg-primary-500 h-full rounded-full" style={{width: `${progress}%`}}></div>
    </div>
  )
}

export default UploadProgress