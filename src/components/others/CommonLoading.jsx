import React from 'react'
import styled from 'styled-components'
import { ThreeCircles } from 'react-loader-spinner';
import { THEME } from '@theme/index';
const CommonLoading = () => {
  return (
    <LoadingHolder>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color={THEME.primary}
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <Title>LOADING . . .</Title>
    </LoadingHolder>
  )
}

export default CommonLoading

const LoadingHolder = styled.div`
  flex:1;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:15px;
`


const Title = styled.h1`
color:${THEME.primary};
`

