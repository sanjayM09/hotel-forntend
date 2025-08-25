import { CustomPageTitle } from '@components/others/CustomPageTitle'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddBusinessProfile from './AddBusinessProfile';

const BusinessProfileMain = () => {
  const navigate = useNavigate();

  const PreviousPage = () => {
    navigate(-1);
  }
  return (
    <div>
      <CustomPageTitle Heading={'Add Business Profile'} PreviousPage={PreviousPage} />
      <AddBusinessProfile formname={'addBusiness'} />
    </div>
  )
}

export default BusinessProfileMain
