import React from 'react'
import { Mainbox } from '@components/MainLayout/Partials/MainBox'
import { Sidebox } from '@components/MainLayout/Partials/Sidebox'
import { ContainerWrapper } from '@components/MainLayout/Partials/Styled'

export const MainLayout = ({ sideBox, secondbox }) => {
  return (

    <ContainerWrapper>
      <Mainbox secondbox={secondbox} />
      <Sidebox sideBox={sideBox} />
    </ContainerWrapper>
  )
}
