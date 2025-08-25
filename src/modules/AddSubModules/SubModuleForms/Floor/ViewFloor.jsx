import { CustomTable } from '@components/form'
import { CommonLoading, CustomModal, Flex } from '@components/others'
import CustomPopconfirm from '@components/others/CustomPopConfirm'
import { TableIconHolder } from '@components/others/Style'
import { deleteFloorDetails, getFloorDetails } from '@modules/AddSubModules/SubModulesSlice'
import { APIURLS } from '@request/apiUrls/urls'
import { baseRequest } from '@request/request'
import { THEME } from '@theme/index'
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddFloor from './AddFloor'
import successHandler from '@request/successHandler'
import { CustomNetWorkError } from '@components/common'

const ViewFloor = ({ active }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const { floorDetails, status, error } = useSelector((state) => state.subModule)

    useEffect(() => {
        allFloors()
    }, [active])

    const allFloors = () => {
        dispatch(getFloorDetails())
    }

    useEffect(() => {
        setDataSource(floorDetails)
    }, [floorDetails])

    const UpdateFloorDetails = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Floor Details");
        setModalContent(<AddFloor allFloors={allFloors} trigger={trigger} formname={'updateFloor'} record={record} handleOk={handleOk} />)
        showModal();
    }

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Floor Name',
            dataIndex: 'floorName',
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateFloorDetails(record) }}>
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
        const rowKey = (dataSource) => dataSource.id;
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

export default ViewFloor
