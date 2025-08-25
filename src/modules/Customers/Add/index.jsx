import React, { Fragment } from 'react'
import AddCustomersForm from '@modules/Customers/Add/AddCustomers'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import { useNavigate } from 'react-router-dom';

const AddCustomers = () => {

  const navigate = useNavigate();

  return (
    <Fragment>
      <CustomPageTitle Heading={'Add Customer'} PreviousPage={() => navigate(-1)} />
      <AddCustomersForm formname={'AddCustomers'}/>
    </Fragment>
  )
}

export default AddCustomers