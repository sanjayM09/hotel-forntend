import { getStayPurposeDetails } from '@modules/AddSubModules/SubModulesSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddStayPurpose from './AddStayPurpose';
import { CommonLoading, CustomModal, Flex } from '@components/others';
import { TableIconHolder } from '@components/others/Style';
import { THEME } from '@theme/index';
import { FiEdit } from 'react-icons/fi';
import { CustomTable } from '@components/form';
import { CustomNetWorkError } from '@components/common';

const ViewStayPurpose = ({ active }) => {

  const dispatch = useDispatch()
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

  const { stayPurpose, status, error } = useSelector((state) => state.subModule)

  useEffect(() => {
    allStayPurpose()
  }, [active])

  const allStayPurpose = () => {
    dispatch(getStayPurposeDetails())
  }

  useEffect(() => {
    setDataSource(stayPurpose)
  }, [stayPurpose])
  console.log(stayPurpose, 'stayPurpose');
  const UpdateStayPurpose = (record) => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Update Staypurpose Details");
    setModalContent(<AddStayPurpose allStayPurpose={allStayPurpose} trigger={trigger} formname={'updateStay'} record={record} handleOk={handleOk} />)
    showModal();
  }

  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Stay Purpose',
      dataIndex: 'purpose',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateStayPurpose(record) }}>
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
    const rowKey = (dataSource) => dataSource.purposeOfStayId;
    content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
  } else if (status === 'failed') {
    if (error.code === 'ERR_NETWORK') {
      content = (<CustomNetWorkError/>);
    } else {
      content = (<h1>Something Went Wrong</h1>);
    }
  }

  return (
    <div>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

    </div>
  )
}

export default ViewStayPurpose
