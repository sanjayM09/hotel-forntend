import React from 'react'
import { PlaceHolder } from '@components/common/Styled'
import { Svgicons } from '@assets/icons'
import { THEME } from '@theme/index'

const CustomNoData = () => {
  return (
    <PlaceHolder>
        <img src={Svgicons.NODATA} alt="noData" style={{width:'150px'}}/>
        <h1 style={{color:THEME.gray}}>No Data</h1>
    </PlaceHolder>
  )
}

export default CustomNoData
