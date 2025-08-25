import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddEmployeesForm } from '../Add/AddEmployee';
import { CommonLoading, CustomModal, Flex } from '@components/others';
import { TableIconHolder } from '@components/others/Style';
import { THEME } from '@theme/index';
import { FiEdit } from 'react-icons/fi';
import { CustomTable } from '@components/form';
import { getEmployees } from '@store/features/EmployeeSlice';
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useNavigate } from 'react-router-dom';
import { CustomNetWorkError } from '@components/common';

export const ViewEmployees = () => {

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

    const { employeeList, status, error } = useSelector((state) => state.employee)

    useEffect(() => {
        getAllEmployees()
    }, [])

    const getAllEmployees = () => [
        dispatch(getEmployees())
    ]

    useEffect(() => {
        setDataSource(employeeList)
    }, [employeeList])

    const UpdateEmployee = (record) => {
        setTrigger(trigger + 1)
        setModelwith(1000)
        setModalTitle("Update Employee");
        setModalContent(<AddEmployeesForm getAllEmployees={getAllEmployees} viewTrigger={trigger} formname={'updateEmployee'} record={record} ViewHandleOk={handleOk} />)
        showModal();
    }
    console.log(dataSource, 'hgzdgfuvws');
    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
        },
        {
            title: 'Location',
            dataIndex: 'location',
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateEmployee(record) }}>
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
        const rowKey = (dataSource) => dataSource.employeeId;
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
            <CustomPageTitle Heading={'View Employee'} PreviousPage={() => navigate(-1)} />
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

