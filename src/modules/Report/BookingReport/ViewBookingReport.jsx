import { CustomNetWorkError } from '@components/common';
import { Button, CustomDatePicker, CustomInput, CustomTable } from '@components/form';
import { CommonLoading, CustomRow, Flex } from '@components/others';
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { Card, Col, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewBookingReport = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [selectedDate, setSelectedDate] = useState(dayjs())
    const { employeeList, status, error } = useSelector((state) => state.employee)

    const handleDateChange = (date) => {
        console.log(date, 'date');
    }
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
    ]
    const onFinish = (values) => {
        console.log('Success:', values);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let content;

    if (status === 'loading') {
        content = <CommonLoading />
    } else if (status === 'succeeded') {
        const rowKey = (dataSource) => dataSource.employeeId;
        content = <CustomTable columns={columns} data={[]} rowKey={rowKey} />
    } else if (status === 'failed') {
        if (error.code === 'ERR_NETWORK') {
            content = (<CustomNetWorkError />);
        } else {
            content = (<h1>Something Went Wrong</h1>);
        }
    }


    return (
        <div>
            <Card>
                <CustomPageTitle Heading={'Booking Report'} PreviousPage={() => navigate(-1)} />
                <Form
                    form={form}
                    name={'bookingReport'}
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

                        <Col span={24} >
                            <CustomDatePicker onChange={handleDateChange} label={'Select Date'} picker={'month'} />
                        </Col>

                    </CustomRow>

                    <Flex center gap={'20px'} style={{ margin: '30px' }}>
                        <Button.Primary text={'Search'} htmlType={'submit'} />
                    </Flex>

                </Form>

                <CustomTable columns={columns} data={[]} />

            </Card>
        </div>
    )
}

export default ViewBookingReport
