import { CustomPageFormTitle, CustomPageTitle } from '@components/others/CustomPageTitle'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddBusinessProfile from './AddBusinessProfile';
import { CustomModal, CustomRow, Flex } from '@components/others';
import { Card, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinesProfile } from '@store/features/EmployeeSlice';
import { CiEdit } from "react-icons/ci";
import { IMG_BASE_URL } from '@request/request';

const ViewBusinessProfile = () => {
  const navigate = useNavigate();
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
  const { businessProfile } = useSelector((state => state.employee))

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

  console.log(dataSource, 'sikenigga');

  useEffect(() => {
    dispatch(getBusinesProfile())
  }, [])

  useEffect(() => {
    setDataSource(businessProfile[0])
  }, [businessProfile])

  const PreviousPage = () => {
    navigate(-1);
  }

  const UpdateProfile = () => {
    setTrigger(trigger + 1)
    setModelwith(1000)
    setModalTitle("Update Country");
    setModalContent(<AddBusinessProfile profileGet={() => dispatch(getBusinesProfile())} trigger={trigger} formname={'updateCountry'} record={dataSource} handleOk={handleOk} />)
    showModal();
  }
  return (
    <div>
      <CustomPageTitle Heading={'Business Profile'} PreviousPage={PreviousPage} />
      <Card>
        {
          dataSource ?
            <CustomRow space={[12, 12]}>
              <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} span={24} md={8} >
                <CustomRow style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
                  <Col span={24} md={24} sm={12}>
                    <Flex center>
                      <div>
                        <CustomPageFormTitle Heading={'Logo'} />
                        <img src={`${IMG_BASE_URL}${dataSource?.logoUrl}`} alt="" height={100} width={'auto'} />
                      </div>
                    </Flex>
                  </Col>
                  <Col span={24} md={24} sm={12}>
                    <Flex center>
                      <div>
                        <CustomPageFormTitle Heading={'Profile'} />
                        <img src={`${IMG_BASE_URL}${dataSource?.profileUrl}`} alt="" height={100} width={'auto'} />
                      </div>
                    </Flex>
                  </Col>
                </CustomRow>
              </Col>
              <Col span={24} md={16}>
                <Flex style={{ marginBottom: 10 }} end>
                  <CiEdit size={24} color='blue' onClick={UpdateProfile} />
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Business Name</h4>
                  <h4>{dataSource?.name}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Owner Name</h4>
                  <h4>{dataSource?.ownerName}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Email</h4>
                  <h4>{dataSource?.email}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Phone Number</h4>
                  <h4>{dataSource?.phoneNumber1}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Gst Number</h4>
                  <h4>{dataSource?.gstNumber}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Location</h4>
                  <h4>{dataSource?.location}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>State</h4>
                  <h4>{dataSource?.state}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Country</h4>
                  <h4>{dataSource?.country}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Address</h4>
                  <h4>{dataSource?.address}</h4>
                </Flex>
                <Flex style={{ marginBottom: 10 }} spacebetween>
                  <h4>Description</h4>
                  <h4>{dataSource?.description}</h4>
                </Flex>

              </Col>
            </CustomRow>

            :
            <h2 style={{ textAlign: 'center' }}>No Profile Added</h2>
        }

        <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
      </Card>
    </div>
  )
}

export default ViewBusinessProfile