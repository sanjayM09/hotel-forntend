import React from 'react'
import { PlaceHolder } from './Styled'
import { Svgicons } from '@assets/icons'
import { THEME } from '@theme/index'

const CustomNetWorkError = () => {
  return (
    <PlaceHolder>
        <img src={Svgicons.NETWORKERROR} alt="noData" style={{width:'150px'}}/>
        <h1 style={{color:THEME.gray}}>No Network Where Found !</h1>
    </PlaceHolder>
  )
}

export default CustomNetWorkError
