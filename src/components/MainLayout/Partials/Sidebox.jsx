import React, { Children } from 'react'
import { SideLIst } from '@components/MainLayout/Partials/Styled';

export const Sidebox = ({sideBox}) => {
  return (
    <SideLIst>
      {sideBox}
    </SideLIst>
  )
}
