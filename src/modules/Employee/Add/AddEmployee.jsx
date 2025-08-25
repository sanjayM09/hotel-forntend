import { genderData } from '@assets/commonData/CustomerData';
import { Button, CustomAddSelect, CustomInput, CustomInputNumber, CustomSelect, CustomTextArea } from '@components/form';
import { CustomModal, CustomRow, Flex } from '@components/others';
import { AddWorktype } from '@modules/AddSubModules/SubModuleForms/Worktype/AddWorktype';
import { getWorktype } from '@modules/AddSubModules/SubModulesSlice';
import { APIURLS } from '@request/apiUrls/urls';
import errorHandler from '@request/errorHandler';
import { baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import { Card, Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const AddEmployeesForm = ({ getAllEmployees, formname, record, ViewHandleOk, viewTrigger }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    // ----------  Form Reset UseState ---------
    const [modelwith, setModelwith] = useState(0);
    const [trigger, setTrigger] = useState(0)

    const { worktype } = useSelector((state) => state.subModule)

    useEffect(() => {
        allWorktype()
    }, [])

    const allWorktype = () => {
        dispatch(getWorktype())
    }


    useEffect(() => {
        if (record) {
            form.setFieldsValue(record)
        }
    }, [record, viewTrigger])


    const wotkTypeOptions = worktype?.map(item => ({
        label: item.maintanenceName,
        value: item.maintanenceId
    }))
    // ===== Modal Functions Start =====
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addWorktype = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add WorkType");
        setModalContent(<AddWorktype allWorktype={allWorktype} formname={'addWorkType'} handleOk={handleOk} trigger={trigger} />);
        showModal();
    }

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        if (record) {
            update(values)
        } else {
            add(values)
        }
    };

    const add = (values) => {
        baseRequest.post(APIURLS.ADDEMPLOYEE, values)
            .then(resp => {
                console.log();
                allWorktype()
                form.resetFields()
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Added Successfully',
                    type: 'success'
                })
            })
            .catch(error => {
                console.log(error, 'error')
                return errorHandler(error);
            })
    }

    const update = (values) => {
        baseRequest.put(`${APIURLS.EDITEMPLOYEE}${values.employeeId}`, values)
            .then(resp => {
                allWorktype()
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Updated Successfully',
                    type: 'success'
                })
                ViewHandleOk()
                getAllEmployees()
            })
            .catch(error => {
                console.log(error, 'error')
                return errorHandler(error);
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            form={form}
            name={formname}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Card>
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={12}>
                        <CustomInput
                            label={'Employee Name'}
                            name={'employeeName'}
                            placeholder={'Enter Employee Name'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Employee Name!',
                                },
                            ]} />
                        {record && <CustomInput display={'none'} name={'employeeId'} />}
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber
                            label={'Phone Number'}
                            name={'mobileNumber'}
                            placeholder={'Enter Phone Number'}
                            precision={0}
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Phone Number!',
                                },
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomSelect
                            options={genderData}
                            label={'Gender'}
                            name={'gender'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select any gender',
                                },
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomAddSelect
                            options={wotkTypeOptions || []}
                            label={'Work Type'}
                            name={'maintanenceId'}
                            onButtonClick={addWorktype}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select any work type',
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber
                            label={'Aadhar Number'}
                            name={'aadharNo'}
                            placeholder={'Enter Aadhar Number'}
                            precision={0}
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Aadhar Number!',
                                },
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            label={'Location'}
                            name={'location'}
                            placeholder={'Enter Employee Loacation'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Location!',
                                },
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomTextArea
                            label={'Address'}
                            name={'address'}
                            placeholder={'Enter Employee Address'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Address!',
                                },
                            ]} />
                    </Col>


                </CustomRow>

                <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                    <Button.Success text={'Submit'} htmlType={'submit'} />
                    <Button.Danger text={'cancel'} onClick={() => onReset()} />
                </Flex>

            </Card>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}

