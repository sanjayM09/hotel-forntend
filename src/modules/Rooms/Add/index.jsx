import React, { Fragment } from 'react'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import { useNavigate } from 'react-router-dom';
import AddRoomsForm from '@modules/Rooms/Add/AddRooms';

const AddRooms = () => {

  const navigate = useNavigate();

  return (
    <Fragment>
      <CustomPageTitle Heading={'Add Rooms'} PreviousPage={() => navigate(-1)} />
      <AddRoomsForm formname={'AddCustomers'}/>
    </Fragment>
  )
}

export default AddRooms