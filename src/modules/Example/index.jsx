import { CustomPageTitle } from '@components/others/CustomPageTitle'
import React, { Fragment } from 'react'
import { ExampleContainer } from '@modules/Example/Partials/ExampleContainer'
import { useNavigate } from 'react-router-dom'

export const Example = () => {


  //  =======  GO Back To the pages
  const navigate = useNavigate();

  const PreviousPage =()=>{
    navigate(-1);
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={'Company'} PreviousPage={PreviousPage}/>
      <ExampleContainer />
    </Fragment>
  )
}
