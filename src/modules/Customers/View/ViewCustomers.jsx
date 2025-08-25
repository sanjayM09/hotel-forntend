// =========  Initial
import React, { Fragment, useEffect, useState } from 'react'
// ========  Icons and Theme
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { FiEdit, FiAirplay } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { THEME } from '@theme/index';
//  ==========  Components 
import { Button, CustomTable, CustomTag } from '@components/form';
import { CustomNetWorkError, OpenNotification } from '@components/common';
import { CommonLoading, CustomModal, CustomPopConfirm, Flex } from '@components/others';
import { TableIconHolder } from '@components/others/Style';
// ======= Named Components
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from '@store/features/CustomerSlice';
import { SingleCustomer } from '@modules/Customers/View/SingleCustomer';
import AddCustomers from '@modules/Customers/Add/AddCustomers';

const ViewCustomers = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState([])

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customerList, status, error } = useSelector(state => state.customer)

    // ===== Modal Functions Start =====

    useEffect(() => {
        CallUser();
    }, [])
    const CallUser = () => {
        dispatch(getCustomer());
    }

    useEffect(() => {
        if (customerList) {
            setTableData(customerList)
        }
    }, [customerList])


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateCompany = (record) => {
        setModalTitle("Update Customer");
        setModalContent(<AddCustomers rerequest={CallUser} formname={'UpdateCustomer'} data={record} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewCompanyDetails = (record) => {
        setModalTitle("View Customer");
        setModalContent(<SingleCustomer data={record} />);
        showModal();
    };

    // const confirm = (record) => {
    //     DeleteCustomer(record);
    // }

    // const cancel = () => {
    //     console.log('called');
    // }

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Customer Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'mobileNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Status',
            render: (record, i) => {
                return (
                    <Fragment>
                        <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
                        {/* <CustomTag bordered={"true"} color={'error'} title={'In - Active'} /> */}
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        {/* <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellAlert />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellSlash />
                        </TableIconHolder> */}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewCompanyDetails(record)}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateCompany(record)}>
                            <FiEdit />
                        </TableIconHolder>

                        {/* <CustomPopConfirm
                            title="Delete the Customer"
                            description="Are you sure to delete this Customer Details?"
                            confirm={() => confirm(record)}
                            cancel={cancel}
                            placement="topLeft"
                            okText="Yes"
                            cancelText="No"
                        >
                            <TableIconHolder color={THEME.red} size={'22px'} >
                                <AiFillDelete />
                            </TableIconHolder>
                        </CustomPopConfirm> */}
                    </Flex>
                );
            },
        },
    ]

    let content;
    if (status === 'loading') {
        content = <CommonLoading />
    } else if (status === 'succeeded') {
        content = (<CustomTable rowKey={data => data.customerId} columns={TableColumn} data={tableData} />)
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
        <Fragment>
            <CustomPageTitle Heading={'View Customer'} PreviousPage={() => navigate(-1)} />
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}

export default ViewCustomers
