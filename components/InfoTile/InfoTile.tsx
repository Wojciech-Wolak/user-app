import React from 'react'
import { InfoTileProps } from './InfoTile.types'

const InfoTile = ({ title, children }: InfoTileProps) => {
  return (
    <div className='infoTile'>
        <h2 className='infoTile__heading'>{title}</h2>
        {children}
    </div>
  )
}

export default InfoTile