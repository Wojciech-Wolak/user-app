import React from 'react'
import { SuccessInfoProps } from './SuccessInfo.types'

const SuccessInfo = ({ title, children }: SuccessInfoProps) => {
  return (
    <div className='successInfo'>
        <h2 className='successInfo__heading'>{title}</h2>
        {children}
    </div>
  )
}

export default SuccessInfo