import { CustomTable, CustomTag } from '@components/form';
import { CommonLoading, CustomModal, CustomPopConfirm, Flex } from '@components/others';
import { TableIconHolder } from '@components/others/Style';
import { getRoomMaintenance } from '@store/features/RoomSlice';
import { THEME } from '@theme/index';
import React, { Fragment, useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import UpdateMaintenanceForm from './UpdateMaintenanceForm';
import { baseRequest } from '@request/request';
import { APIURLS } from '@request/apiUrls/urls';
import { MdSecurityUpdateGood } from "react-icons/md";
import successHandler from '@request/successHandler';
import errorHandler from '@request/errorHandler';
import { CustomNetWorkError } from '@components/common';

const ViewRoomMaintenance = () => {
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

    const { roomMaintenance, status, error } = useSelector((state) => state.rooms)

    useEffect(() => {
        allMaintenance()
    }, [])

    const allMaintenance = () => [
        dispatch(getRoomMaintenance())
    ]

    useEffect(() => {
        setDataSource(roomMaintenance)
    }, [roomMaintenance])

    const UpdateMaintenance = (record) => {
        setTrigger(trigger + 1)
        setModelwith(800)
        setModalTitle("Update Room Maintenance");
        setModalContent(<UpdateMaintenanceForm allMaintenance={allMaintenance} trigger={trigger} formname={'updateMaintenance'} record={record} handleOk={handleOk} />)
        showModal();
    }

    const confirm = (values) => {
        const data = {
            roomStatus: "completed"
        }

        baseRequest.put(`${APIURLS.UPDATEROOMSTATUS}${values.roomMaintenanceId}`, data)
            .then(resp => {
                dispatch(getRoomMaintenance())
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

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNo',
        },
        {
            title: 'Floor Name',
            dataIndex: 'floorName',
        },
        {
            title: 'Specification Name',
            dataIndex: 'specificationName',
        },
        {
            title: 'Assigned Employee',
            dataIndex: 'employeeName',
        },
        {
            title: 'Assigned Date',
            dataIndex: 'startDate',
        },
        {
            title: 'Completed Date',
            dataIndex: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'roomStatus',
            render: (status) => {
                return (
                    <Fragment>
                        {
                            status == 'completed' && <CustomTag bordered={true} color={'success'} title={status} />
                        }

                        {
                            status == 'maintanence' && <CustomTag bordered={true} color={'warning'} title={status} />
                        }

                        {
                            status == 'onprocess' && <CustomTag bordered={true} color={'processing'} title={status} />
                        }
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        {
                            record?.employeeId === 0 &&
                            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateMaintenance(record) }}>
                                <FiEdit />
                            </TableIconHolder>
                        }

                        {
                            record?.roomStatus !== 'completed' && record?.employeeId !== 0 &&
                            <CustomPopConfirm
                                title="RoomMaintenance Status"
                                description="Maintenance are Completed?"
                                cancel={() => { console.log('Canceled') }}
                                confirm={() => confirm(record)}
                                placement="topLeft"
                                okText="Yes"
                                cancelText="No"
                            >
                                <TableIconHolder color={THEME.green} size={'22px'} >
                                    <MdSecurityUpdateGood />
                                </TableIconHolder>
                            </CustomPopConfirm>
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
        const rowKey = (dataSource) => dataSource.roomMaintenanceId;
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

export default ViewRoomMaintenance
