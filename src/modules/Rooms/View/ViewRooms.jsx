import { CustomTable } from '@components/form';
import { CommonLoading, CustomModal, Flex } from '@components/others';
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { TableIconHolder } from '@components/others/Style';
import { getRooms } from '@store/features/RoomSlice';
import { THEME } from '@theme/index';
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddRoomsForm from '../Add/AddRooms';
import { CustomNetWorkError } from '@components/common';

const ViewRooms = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState()

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0)

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [formReset, setFormReset] = useState(0);
  const [modelwith, setModelwith] = useState(0);

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormRest()

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1)
  }

  // ===== Modal Functions End =====

  const { roomsList, status, error } = useSelector((state) => state.rooms)

  useEffect(() => {
    getAllRooms()
  }, [])

  const getAllRooms = () => [
    dispatch(getRooms())
  ]

  useEffect(() => {
    setDataSource(roomsList)
  }, [roomsList])

  const UpdateRooms = (record) => {
    setTrigger(trigger + 1)
    setModelwith(1000)
    setModalTitle("Update Rooms");
    setModalContent(<AddRoomsForm data={record} rerequest={getAllRooms} formname={'updateRooms'} formReset={trigger} FormExternalClose={handleOk}/>)
    showModal();
  }
  
  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Room No.',
      dataIndex: 'roomNo',
    },
    {
      title: 'Floor Name',
      dataIndex: 'floorName',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
    },
    {
      title: 'No. of Beds',
      dataIndex: 'noOfBeds',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateRooms(record) }}>
              <FiEdit />
            </TableIconHolder>
          </Flex>
        );
      },
    }
  ]


  let content;

  if (status === 'loading') {
    content = <CommonLoading />
  } else if (status === 'succeeded') {
    const rowKey = (dataSource) => dataSource.roomId;
    content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
  } else if (status === 'failed') {
    if (error.code === 'ERR_NETWORK') {
        content = (
            <CustomNetWorkError/>
        );
    } else {
        content = (
            <h1>Something Went Wrong</h1>
        );
    } 
}

  return (
    <div>
      <CustomPageTitle Heading={'View Rooms'} PreviousPage={() => navigate(-1)} />
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

    </div>
  )
}

export default ViewRooms

