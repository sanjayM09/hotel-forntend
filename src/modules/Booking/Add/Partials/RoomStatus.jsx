import React, { useEffect, useState } from 'react'
import {
  MainContentHolder,
  MainContentTitle,
  MainContentWrapper,
  StatusLabel,
  StatusValue,
  Cleaned,
  ButtonHolder,
  StatusHolder,
  StatusWrapper,
  StatusColorHolder,
  StatusColorName,
} from '@modules/Booking/Add/Partials/Styled'
import { CommonLoading, CustomModal, CustomPopConfirm, CustomRow } from '@components/others';
import { Col, Tag, Tooltip } from 'antd';
import { StatusColorCode } from '@assets/commonData/RoomData';
import { TableIconHolder } from '@components/others/Style';
import RoomBookingForm from './RoomBookingForm';
import { Svgicons } from '@assets/icons';
import successHandler from '@request/successHandler';
import errorHandler from '@request/errorHandler';
import { baseRequest } from '@request/request';
import { APIURLS } from '@request/apiUrls/urls';
import { LuBedDouble } from "react-icons/lu";
import { THEME } from '@theme/index';

const RoomStatus = ({ selectedRoom, data, UpdateTrigger }) => { //   ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0)

  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    setRoomsData(data)
  }, [data])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CloseModal = () => {
    handleOk();
    UpdateTrigger();
  }

  const maintanceConfirm = (values) => {
    const data = {
      statusType: "maintanence"
    }
    baseRequest.put(`${APIURLS.SETMAINTENANCEUPDATE}${values.roomId}`, data)
      .then(resp => {
        UpdateTrigger();
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'info'
        })
      })
      .catch(error => {
        return errorHandler(error);
      })
  }

  const CleanConfirm = (values) => {
    const data = {
      statusType: "cleaned"
    }
    baseRequest.put(`${APIURLS.ROOMCLEANUPDATE}${values.roomId}`, data)
      .then(resp => {
        UpdateTrigger();
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'info'
        })
      })
      .catch(error => {
        return errorHandler(error);
      })
  }
  
  const AvailableConfirm = (values) => {
    const data = {
      statusType: "available"
    }
    baseRequest.put(`${APIURLS.ROOMAVAILABLE}${values.roomId}`, data)
      .then(resp => {
        UpdateTrigger();
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'info'
        })
      })
      .catch(error => {
        return errorHandler(error);
      })
  }

  const handleRoomBooking = (record) => {
    setTrigger(prev => prev + 1)
    setModalTitle("Book Rooms");
    setModalContent(<RoomBookingForm formname={'bookRooms'} multipleBooking={false} record={record} closeForm={CloseModal} trigger={trigger} />);
    showModal();
  }

  const handleMultipleRoomBook = (record) => {
    setTrigger(prev => prev + 1)
    setModalTitle("Book Multiple Rooms");
    setModalContent(<RoomBookingForm formname={'bookRooms'} multipleBooking={true} record={record} closeForm={CloseModal} trigger={trigger} />);
    showModal();
  }

  const room = roomsData.flatMap((floor) => floor.floorDetails).find((room) => room.roomNo === selectedRoom);

  return (
    <MainContentWrapper>
      <MainContentTitle>Room Status</MainContentTitle>
      {
        // roomsData.length != 0 ? (
        true ? (
          <MainContentHolder>
            <CustomRow space={[18, 18]}>
              <Col span={12}>
                <StatusLabel>Room Number&nbsp;:</StatusLabel>
              </Col>
              <Col span={12}>
                <StatusValue>{room?.roomNo}</StatusValue>
              </Col>

              <Col span={12}>
                <StatusLabel>Ac Type&nbsp;:</StatusLabel>
              </Col>
              <Col span={12}>
                <StatusValue>{room?.roomType}</StatusValue>
              </Col>

              <Col span={12}>
                <StatusLabel>Room Category&nbsp;:</StatusLabel>
              </Col>
              <Col span={12}>
                <StatusValue>
                  <Tag color={'geekblue'} style={{ fontSize: '.82rem', fontWeight: '500' }}>
                    {room?.categoryName}
                  </Tag>
                </StatusValue>
              </Col>

              <Col span={12}>
                <StatusLabel>No. Beds&nbsp;:</StatusLabel>
              </Col>
              <Col span={12}>
                <StatusValue>{room?.noOfBeds}</StatusValue>
              </Col>

              <Col span={12}>
                <StatusLabel>Room Clean&nbsp;:</StatusLabel>
              </Col>
              <Col span={12}>
                <StatusValue>
                  {
                    room?.cleaning ?
                      (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}><Cleaned className="cleaned"></Cleaned> <span>Cleaned</span></div>
                      ) :
                      (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}><Cleaned ></Cleaned> <span>Not Cleaned</span></div>
                      )
                  }
                </StatusValue>
              </Col>
            </CustomRow>

            <ButtonHolder>
              {
                room?.available &&
                (
                  <Tooltip placement="top" title={'Room Booking'} >
                    <TableIconHolder onClick={() => handleRoomBooking(room)}>
                      <img src={Svgicons.ROOMBOOKING} alt="" style={{ height: '30px', width: '30px' }} />
                    </TableIconHolder>
                  </Tooltip>
                )
              }

              <Tooltip placement="top" title={'Multiple Room Booking'} >
                <TableIconHolder onClick={() => handleMultipleRoomBook(room)}>
                  <img src={Svgicons.MULTIROOMBOOKING} alt="" style={{ height: '30px', width: '30px' }} />
                </TableIconHolder>
              </Tooltip>
              {
                room?.available &&
                // <Tooltip placement="top" title={'Maintanance'} >
                <CustomPopConfirm
                  title="RoomMaintenance Status"
                  description="Do you want to add this room to maintenance ?"
                  confirm={() => maintanceConfirm(room)}
                  cancel={() => { console.log('Cancel Clicked'); }}
                  record={room}
                  placement="topLeft"
                  okText="Yes"
                  cancelText={"No"}
                >
                  <TableIconHolder>
                    <img src={Svgicons.MAINTANANCE} alt="" style={{ height: '30px', width: '30px' }} />
                  </TableIconHolder>
                </CustomPopConfirm>
                // </Tooltip>
              }
              {
                room?.vacate &&
                <CustomPopConfirm
                  title="Room Cleaning Status"
                  description="Do you want to add this room to Cleaned ?"
                  confirm={() => CleanConfirm(room)}
                  cancel={() => { console.log('Cancel Clicked'); }}
                  record={room}
                  placement="topLeft"
                  okText="Yes"
                  cancelText={"No"}
                >
                  <TableIconHolder >
                    <img src={Svgicons.CLEANINGSTATUS} alt="" style={{ height: '30px', width: '30px' }} />
                  </TableIconHolder>

                </CustomPopConfirm>
              }

              {
                room?.cleaning && !room?.available &&
                <CustomPopConfirm
                  title="Set to Available"
                  description="Do you want to add this room to Available ?"
                  confirm={() => AvailableConfirm(room)}
                  cancel={() => { console.log('Cancel Clicked'); }}
                  record={room}
                  placement="topLeft"
                  okText="Yes"
                  cancelText={"No"}
                >
                  <TableIconHolder >
                    <LuBedDouble color={THEME.primary} size={30} />
                  </TableIconHolder>

                </CustomPopConfirm>
              }
            </ButtonHolder>

            <StatusHolder>
              {
                StatusColorCode.map((item, index) => {
                  return (
                    <StatusWrapper key={index}>
                      <StatusColorHolder color={item.color} />
                      <StatusColorName>{item.name}</StatusColorName>
                    </StatusWrapper>
                  )
                })
              }
            </StatusHolder>
          </MainContentHolder>
        )
          :
          (<CommonLoading />)
      }

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </MainContentWrapper>
  )
}

export default RoomStatus
