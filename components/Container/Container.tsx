import React from 'react'
import { ContainerProps } from './Container.types'

const Container = ({ children, fluid=false, width=1440, className }: ContainerProps) => {

    if(fluid){
        return (
          <div className={`container ${className}`} style={{ width: '100%' }}>
              {children}
          </div>
        )
    }

    return (
        <div className={`container ${className}`} style={{ maxWidth: width }}>
            {children}
        </div>
      )
}

export default Container