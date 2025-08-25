import { payType } from '@assets/commonData/RoomData'
import { Button, CustomInput, CustomInputNumber, CustomSelect } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PaymentForm = ({ allBookings, formname, record, handleOk, trigger }) => {

    const [form] = Form.useForm()
const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        form.resetFields()
    }, [trigger, record])

    useEffect(() => {
        if (record) {
            form.setFieldsValue(record)
        }
    }, [record, trigger])


    const onClose = () => {
        handleOk()
    }

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const newValue = {
            givenAmount: values.recieve,
            balance: values.balance,
            customerId: values.customerId,
            totalAmount: values.totalAmount,
            bookingId: values.bookingId,
            paymentType: values.paymentType
        }
        add(newValue)

    };

    const add = (values) => {
        baseRequest.post(APIURLS.ADDPAYMENT, values)
            .then(resp => {
                form.resetFields();
                allBookings()
                handleOk()
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'success',
                    type: 'success'
                })
            })
            .catch(error =>{
                return errorHandler(error);
            })
    }

    const update = (values) => {
        baseRequest.put(`${APIURLS.EDITPAYMENT}${record.paymentId}`, values)
            .then(resp => {
                form.resetFields();
                handleOk()
                allBookings()
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

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCurrentRecieve = (amt) => {
        if (amt > record.balance) {
            toast.warn('Cannot receive more than total amount')
            form.setFieldsValue({ balance: record.balance })
            setBtnDisabled(true)
        } else {
            const balance = record.balance - amt
            form.setFieldsValue({ balance: balance })
            setBtnDisabled(false)
        }
    }

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
            autoComplete="off">
            <CustomRow space={[24, 24]}>

                <Col span={24} md={12}>
                    <CustomInput label={'Total Amount'} name={'totalAmount'}
                        disabled
                    />
                </Col>
                <Col span={24} md={12}>
                    <CustomSelect options={payType} label={'Payment Type'} placeholder={'Select..'} name={'paymentType'}
                        rules={[
                            {
                                required: true,
                                message: 'Please select payment type!',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Received Amount'} placeholder={'Enter Given Amount'} name={'givenAmount'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Given Amount!',
                            }
                        ]}
                        disabled
                    />
                </Col>
                <Col span={24} md={12}>
                    <CustomInput label={'Balance'} placeholder={'Enter Balance'} name={'balance'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Balance!',
                            }
                        ]}
                        disabled
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Currently Recieving Amount'} placeholder={'Enter Balance'} name={'recieve'} precision={2}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Balance!',
                            }
                        ]}
                        onChange={handleCurrentRecieve}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput name={'bookingId'} display={'none'}
                    />
                </Col>
                <Col span={24} md={12}>
                    <CustomInput name={'customerId'} display={'none'}
                    />
                </Col>

            </CustomRow>
            {
                record ? (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Update'} htmlType={'submit'} disabled={btnDisabled}/>
                    <Button.Danger text={'Cancel'} onClick={onClose} />

                </Flex>) : (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Add'} htmlType={'submit'} disabled={btnDisabled}/>
                    <Button.Danger text={'Reset'} onClick={onReset} />

                </Flex>)
            }
        </Form>
    )
}

export default PaymentForm
