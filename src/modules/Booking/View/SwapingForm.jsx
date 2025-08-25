import { roomStatusOpt } from '@assets/commonData/RoomData'
import { Button, CustomInput, CustomInputNumber, CustomMultiSelect, CustomSelect } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LabelSelect } from '@modules/Booking/Add/Partials/Styled'
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableRooms } from '@store/features/RoomSlice'

const SwapingForm = ({ allBookings, formname, record, handleOk, trigger }) => {

    console.log(record, 'record ff');
    const [form] = Form.useForm()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const dispatch = useDispatch();
    const { availableRoomsList, } = useSelector((state) => state.rooms)

    useEffect(() => {
        form.resetFields()

        dispatch(getAvailableRooms())
    }, [trigger, record])

    useEffect(() => {
        if (record) {
            form.setFieldsValue(record)
        }
    }, [record, trigger])


    const onClose = () => {
        handleOk()
    }

    const bookedRoomsOpt = record?.roomNumberDetails?.map(user => ({
        label: `${user.roomNo}`,
        value: user.roomNumberId
    }));


    const roomsOptions = availableRoomsList?.map(user => ({
        label: <LabelSelect className={user.roomType === 'ac' && 'ac'}>{user.roomNo}&nbsp;{user.roomType}</LabelSelect>,
        value: user.roomId
    }));


    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const newValue = {
            roomNumberDetails:[{
                ...values
            }]
        }
        console.log('val',values,newValue);
        add(newValue)
    };

    const add = (values) => {
        baseRequest.put(`${APIURLS.ROOMSWAP}${record?.bookingId}`, values)
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
                    <CustomSelect
                        label={'Current Room'}
                        name={'roomNumberId'}
                        options={bookedRoomsOpt || []}
                        rules={[
                            {
                                required: true,
                                message: 'Please select current Room!',
                            },
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect options={roomsOptions} label={'Available Rooms'} placeholder={'Select..'} name={'roomId'}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Swaping Room!',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect options={roomStatusOpt} label={'Change Status'} placeholder={'Select..'} name={'type'}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Any Status!',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>
            {
                record ? (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Update'} htmlType={'submit'} disabled={btnDisabled} />
                    <Button.Danger text={'Cancel'} onClick={onClose} />

                </Flex>) : (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Add'} htmlType={'submit'} disabled={btnDisabled} />
                    <Button.Danger text={'Reset'} onClick={onReset} />

                </Flex>)
            }
        </Form>
    )
}

export default SwapingForm
