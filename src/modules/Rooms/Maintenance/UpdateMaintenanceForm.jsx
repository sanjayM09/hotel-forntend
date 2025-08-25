import { Button, CustomDatePicker, CustomSelect, CustomTimePicker } from '@components/form';
import { CustomRow, Flex } from '@components/others';
import { getSpecifications, getWorktype } from '@modules/AddSubModules/SubModulesSlice';
import { APIURLS } from '@request/apiUrls/urls';
import errorHandler from '@request/errorHandler';
import { baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import { getEmployees } from '@store/features/EmployeeSlice';
import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const UpdateMaintenanceForm = ({ allMaintenance, formname, record, handleOk, trigger }) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const { employeeList } = useSelector((state) => state.employee)
    const { specification, worktype } = useSelector((state) => state.subModule)

    const [selectedEmployeeOption, setSelectedEmployeeOption] = useState([])

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(null);

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    // =======  Get Selected Time =======
    const [inTime, setInTime] = useState(null)

    const inTimeChange = (time) => {  
        const twentyFourHourTime = dayjs(time, 'h:mm A').format('HH:mm:ss');
        setInTime(twentyFourHourTime);
    }

    useEffect(() => {
        dispatch(getEmployees())
        dispatch(getSpecifications())
        dispatch(getWorktype())
    }, [])

    useEffect(() => {
        form.resetFields()
        setSelectedEmployeeOption([])
    }, [trigger, record])

    const SelectEmployee = (value) => {
        const selectedEmployee = employeeList.filter((item) => item?.maintanenceId == value)
        setSelectedEmployeeOption(selectedEmployee)
    }

    const empOption = selectedEmployeeOption?.map(emp => ({
        label: emp.employeeName,
        value: emp.employeeId
    }))

    const workTypeOpt = worktype?.map((type) => (
        {
            label: type.maintanenceName,
            value: type.maintanenceId
        }
    ))

    const specsOption = specification?.map(specs => ({
        label: specs.specificationName,
        value: specs.specificationId
    }))

    const onClose = () => {
        handleOk()
    }

    const onFinish = (values) => {
        const newValue = {
            ...values,
            workStartDate: selectedDate,
            workStartTime: inTime,
            roomStatus:'onprocess'
        }
        update(newValue)
    };

    const update = (values) => {
        baseRequest.put(`${APIURLS.EDITROOMMAINTANANCE}${record.roomMaintenanceId}`, values)
            .then(resp => {
                form.resetFields();
                handleOk()
                allMaintenance()
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
                    <CustomSelect options={specsOption || []} label={'Room Specification'} placeholder={'Enter specification Name'} name={'specificationId'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select specification Name!',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect options={workTypeOpt || []} label={'Work Type'} placeholder={'Enter work type'} name={'worktypeId'} onChange={SelectEmployee}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select WorkType!',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomSelect options={empOption || []} label={'Employee Name'} placeholder={'Enter employee Name'} name={'employeeId'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select employee Name!',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker onChange={handleOnChange} label={'Select Date'} name={'workStartDate'} picker={'date'} rules={[
                        {
                            required: true,
                            message: 'Please select date!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomTimePicker onChange={inTimeChange} label={'Select Time'} name={'workStartTime'} use12Hours={true} rules={[
                        {
                            required: true,
                            message: 'Please select time!',
                        }
                    ]} />
                </Col>

            </CustomRow>

            <Flex center gap={'20px'} style={{ margin: '30px' }}>
                <Button.Primary text={'Update'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={onClose} />
            </Flex>
        </Form>
    )
}

export default UpdateMaintenanceForm
