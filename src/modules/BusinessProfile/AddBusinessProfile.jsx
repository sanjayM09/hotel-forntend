import { Button, CustomInput, CustomInputNumber, CustomTextArea, CustomUpload } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { IMG_BASE_URL, baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Card, Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBusinessProfile = ({ profileGet, record, trigger, formname, handleOk }) => {

  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    form.resetFields()
  }, [trigger, record])

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record)
      form.setFieldsValue({ phoneNumber: record.phoneNumber1 })

      const proImg = [{
        uid: record?.logoUrl,
        name: `example${record?.logoUrl}.jpg`,
        status: 'done',
        url: `${IMG_BASE_URL}${record?.logoUrl}`,
      }]
      console.log( `${IMG_BASE_URL}${record?.logoUrl}`,'logoImage');
      form.setFieldsValue({ logo: proImg })

      const signImg = [{
        uid: record?.profileUrl,
        name: `example${record?.profileUrl}.jpg`,
        status: 'done',
        url: `${IMG_BASE_URL}${record?.profileUrl}`,
      }]
      form.setFieldsValue({ profile: signImg })

    }
  }, [record, trigger])

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values, 'jjj');
    console.log(values.logo ? true : false, 'v_Logo');
    console.log(values.profile ? true : false, 'v_profilej');

    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('ownerName', values?.ownerName);
    formData.append('address', values?.address);
    formData.append('pincode', values?.pincode);
    formData.append('gstNumber', values?.gstNumber);
    formData.append('state', values?.state);
    formData.append('country', values?.country);
    formData.append('location', values?.location);
    formData.append('phoneNumber', values?.phoneNumber);
    formData.append('description', values?.description);
    formData.append('email', values?.email);
    {
      (values?.logo) && values?.logo[0]?.lastModified &&
        formData.append('logo', values?.logo[0]?.originFileObj || '')
    }
    {
      (values?.profile) && values?.profile[0]?.lastModified &&
        formData.append('profile', values?.profile[0]?.originFileObj || '')
    }
    console.log([...formData.entries()], 'RESULT');
    if (record) {
      update(formData)

    } else {
      add(formData)
    }
  };

  const add = (values) => {
    baseRequest.post(APIURLS.ADDBUSINESSPROFILE, values)
      .then(resp => {
        console.log(resp.data, 'responnse');
        navigate('/')
        form.resetFields();
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'success'
        })

      })
      .catch(error => errorHandler(error))
  }

  const update = (values) => {
    baseRequest.put(`${APIURLS.EDITBUSINESSPROFILE}${record.profileId}`, values)
      .then(resp => {
        console.log(resp.data, 'responnse');
        successHandler(resp, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'success'
        })
        handleOk()
        profileGet()
      })
      .catch(error => errorHandler(error))
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

      <Card>
        <CustomRow space={[24, 24]}>

          <Col span={24} md={12}>
            <CustomInput label={'Business Name'} placeholder={'Enter Business Name'} name={'name'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Business Name!',
                }
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Owner Name'} placeholder={'Enter Owner Name'} name={'ownerName'}

            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Email'} placeholder={'Enter Email'} name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Email!',
                }
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Gst Number'} placeholder={'Enter Gst Number'} name={'gstNumber'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Gst Number!',
                }
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInputNumber label={'Phone Number'} placeholder={'Enter Phone Number'} name={'phoneNumber'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Phone Number!',
                }
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Pincode'} placeholder={'Enter Pincode'} name={'pincode'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Pincode!',
                }
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'State'} placeholder={'Enter State'} name={'state'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter State!',
                }
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput label={'Location'} placeholder={'Enter Location'} name={'location'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Location!',
                }
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput label={'Country'} placeholder={'Enter country'} name={'country'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Country!',
                }
              ]}
            />
          </Col>


          <Col span={24} md={12}>
            <CustomInput label={'Description'} placeholder={'Enter Description'} name={'description'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter description!',
                }
              ]}
            />
          </Col>


          <Col span={24} md={12}>
            <CustomUpload
              label={'Profile'}
              name={'profile'}
              listType='picture-card'
              maxCount={1}
              accept='.png,.jpeg,.jpg'
            />

          </Col>
          <Col span={24} md={12}>
            <CustomUpload
              label={'Company Logo'}
              name={'logo'}
              listType='picture-card'
              maxCount={1}
              accept='.png,.jpeg,.jpg'
            />
          </Col>

          <Col span={24} md={12}>
            <CustomTextArea label={'Address'} placeholder={'Enter Address'} name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Address!',
                }
              ]}
            />
          </Col>

        </CustomRow>
      </Card>

      {
        record ? (<Flex center gap={'20px'} style={{ margin: '30px' }}>
          <Button.Primary text={'Update'} htmlType={'submit'} />
          <Button.Danger text={'Cancel'} onClick={() => handleOk()} />

        </Flex>) : (<Flex center gap={'20px'} style={{ margin: '30px' }}>
          <Button.Primary text={'Add'} htmlType={'submit'} />
          <Button.Danger text={'Reset'} onClick={onReset} />

        </Flex>)
      }
    </Form>
  )
}

export default AddBusinessProfile