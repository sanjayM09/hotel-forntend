import { Button, CustomInput } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import React, { useEffect } from 'react'

const AddCountry = ({ allCountry, formname, record, handleOk, trigger }) => {

    const [form] = Form.useForm()

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
        console.log('Success:', values);
        if (record) {
            update(values)
        } else {
            add(values)
        }
    };

    const add = (values) => {
        baseRequest.post(APIURLS.ADDCOUNTRY, values)
            .then(resp => {
                console.log(resp.data, 'responnse');
                form.resetFields();
                allCountry()
                handleOk()
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'success',
                    type: 'success'
                })
            })
            .catch(error => console.log(error, 'error'))
    }

    const update = (values) => {
        baseRequest.put(`${APIURLS.EDITCOUNTRY}${record.countryId}`, values)
            .then(resp => {
                console.log(resp.data, 'responnse');
                form.resetFields();
                handleOk()
                allCountry()
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'success',
                    type: 'success'
                })
            })
            .catch(error => console.log(error, 'Updateerror'))
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

                <Col span={24} md={24}>
                    <CustomInput label={'Country Name'} placeholder={'Enter Country Name'} name={'countryName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Country Name!',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>
            {
                record ? (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Update'} htmlType={'submit'} />
                    <Button.Danger text={'Cancel'} onClick={onClose} />

                </Flex>) : (<Flex center gap={'20px'} style={{ margin: '30px' }}>
                    <Button.Primary text={'Add'} htmlType={'submit'} />
                    <Button.Danger text={'Reset'} onClick={onReset} />

                </Flex>)
            }
        </Form>
    )
}

export default AddCountry
