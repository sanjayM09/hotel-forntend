import { CustomTable, CustomTag } from '@components/form';
import { CommonLoading, CustomModal, CustomPopConfirm, Flex } from '@components/others';
import { TableIconHolder } from '@components/others/Style';
import { getBookingDetails } from '@store/features/BookingSlice';
import { THEME } from '@theme/index';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePayments } from "react-icons/md";
import PaymentForm from '../Payment/PaymentForm';
import { Tooltip } from 'antd';
import { Svgicons } from '@assets/icons';
import { baseRequest } from '@request/request';
import { APIURLS } from '@request/apiUrls/urls';
import successHandler from '@request/successHandler';
import errorHandler from '@request/errorHandler';
import { IoMdSwap } from "react-icons/io";
import SwapingForm from '@modules/Booking/View/SwapingForm';
import { CustomNetWorkError } from '@components/common';

const ViewBooking = () => {

  const dispatch = useDispatch()
  const [dataSource, setDataSource] = useState([])

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

  const { bookingList, status, error } = useSelector((state) => state.booking)

  useEffect(() => {
    allBookings()
  }, [])

  const allBookings = () => [
    dispatch(getBookingDetails())
  ]

  useEffect(() => {
    setDataSource(bookingList)
  }, [bookingList])

  const VacateConfirm = (values) => {
    const data = {
      statusType: "vacate"
    }
    baseRequest.put(`${APIURLS.ROOMVACATE}${values.bookingId}`, data)
      .then(resp => {
        allBookings();
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'success'
        })
      })
      .catch(error => {
        return errorHandler(error);
      })
  }

  const SwapConfirm =(record)=>{
    setTrigger(trigger + 1)
    setModelwith(1000)
    setModalTitle("Room Swap");
    setModalContent(<SwapingForm allBookings={allBookings} trigger={trigger} formname={'makePayment'} record={record} handleOk={handleOk} />)
    showModal();
  }

  const makePayment = (record) => {
    setTrigger(trigger + 1)
    setModelwith(1000)
    setModalTitle("Make Payment");
    setModalContent(<PaymentForm allBookings={allBookings} trigger={trigger} formname={'makePayment'} record={record} handleOk={handleOk} />)
    showModal();
  }

  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
    },
    {
      title: 'Room No',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>
            {
              record?.roomNumberDetails.map((item, i) => (
                <span key={i}>{item?.roomNo}</span>
              ))
            }
          </Flex>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'number',
    },
    {
      title: 'No.of Days',
      dataIndex: 'noOfDays',
    },
    {
      title: 'No.of Persons',
      dataIndex: 'noOfPerson',
    },
    {
      title: 'Payment Status',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>
            {
              record?.balance == 0 ? (
                <CustomTag title={'Completed'} color={'success'} />
              ) : (
                <CustomTag title={'Pending'} color={'error'} />
              )
            }
          </Flex>
        );
      },
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <CustomPopConfirm
              title="Room swap"
              description="Swap Rooms ?"
              confirm={() => SwapConfirm(record)}
              cancel={() => { console.log('Canceled') }}
              placement="topLeft"
              okText="Yes"
              cancelText="No"
            >
              <TableIconHolder color={THEME.green} size={'22px'} >
                <IoMdSwap color={THEME.primary} size={28} />
              </TableIconHolder>
            </CustomPopConfirm>

            {
              record?.balance == 0 ? (
                <CustomPopConfirm
                  title="Vacate Room"
                  description="Vacate this Room ?"
                  confirm={() => VacateConfirm(record)}
                  cancel={() => { console.log('Canceled') }}
                  placement="topLeft"
                  okText="Yes"
                  cancelText="No"
                >
                  <TableIconHolder color={THEME.green} size={'22px'} >
                    <img src={Svgicons.ROOMVACATE} alt="vacate" style={{ width: '25px', }} />
                  </TableIconHolder>
                </CustomPopConfirm>
              ) : (
                <Tooltip title={'Invoice'}>
                  <TableIconHolder color={THEME.primary} size={'24px'} onClick={() => { makePayment(record) }}>
                    <MdOutlinePayments />
                  </TableIconHolder>
                </Tooltip>
              )
            }
          </Flex>
        );
      },
    }
  ]


  let content;

  if (status === 'loading') {
    content = <CommonLoading />
  } else if (status === 'succeeded') {
    const rowKey = (dataSource) => dataSource.bookingId;
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
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}

export default ViewBooking
