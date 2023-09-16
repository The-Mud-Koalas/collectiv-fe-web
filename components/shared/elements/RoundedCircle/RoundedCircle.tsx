import React from 'react'

interface Props extends React.PropsWithChildren {
    width: number;
}

const RoundedCircle: React.FC<Props> = ({ children, width }) => {
  return (
    <div className={`w-8 flex justify-center items-center aspect-square rounded-[50%] border-[3px] border-primary-800`}>{ children }</div>
  )
}

export default RoundedCircle