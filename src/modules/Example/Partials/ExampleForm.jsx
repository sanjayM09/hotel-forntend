// =========  Initial
import React, { useEffect, useState } from 'react'
// ========  Antd
import { Col, Form } from 'antd'
// ======== Components
import { CustomPageFormSubTitle } from '@components/others/CustomPageTitle';
import { 
  CustomInput,
  CustomAddSelect,
  CustomInputNumber,
  CustomTextArea,
  CustomUpload,
  CustomTimePicker,
  CustomSelect,
  Button
} from '@components/form';
import { CustomRow,Flex,CustomModal } from '@components/others';
// ========= Named Components
import { SampleSmallForm } from '@modules/Example/Partials/SampleSmallForm';

export const ExampleForm = ({ FormExternalClose, formReset, formname }) => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null)

  const [form] = Form.useForm();      // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset])

  const categoryOption = [
    {
      label: '1st Item',
      value: '1st item'
    },
    {
      label: '2nd Item',
      value: '2nd item'
    }
  ]

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

  // ===== Modal Functions End =====

  const handleButtonClick = () => {
    setModalTitle("Add Category");
    setModalContent(<SampleSmallForm />);
    showModal();
  };

  const onReset = () => {
    form.resetFields();
  };

  const inTimeChange = (time) => {
    setInTime(time);
  }

  const ChangeProductId = (e) => {
    console.log(e, 'wwwwwwwwww')
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    const NewValue = { ...values, Time: inTime }

    console.log('NewValue:', NewValue);
    // FormExternalClose();  -->  FUTURE use for Update form Close
    form.resetFields();
  };

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

      <CustomRow space={[12, 12]}>
       <Col span={24} md={12}>
          <CustomInput label={'User Name'} name={'name'} />
        </Col>

         {/* <Col span={24} md={12}>
          <CustomInput label={'User Name'} name={'email'} type={'email'} />
        </Col> */}

        <Col span={24}>
          <CustomPageFormSubTitle Heading={'Customer Details'} />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber label={'Phone Number'} name={'phonenumber'} precision={2} />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea label={'Address'} name={'address'} />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload label={'Upload'} name={'upload'} listType='picture-card' maxCount={3} accept='.png,.jpeg,.jpg' rules={[
            {
              required: true,
              message: 'Please Select Image'
            }
          ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker label={'Upload'} name={'Time'} onChange={inTimeChange} rules={[
            {
              required: true,
              message: 'Please Select Time'
            }
          ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomAddSelect label={'Product Category'} name={'categoryid'}
            showSearch={true}
            onButtonClick={handleButtonClick}
            onChange={ChangeProductId}
            options={categoryOption}
            rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={categoryOption}
            label={'Product Category'}
            name={'category'}
            rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} onChange={ChangeProductId} />
        </Col>

      </CustomRow>

      <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
        <Button.Success text={'Submit'} htmlType={'submit'} />
        <Button.Danger text={'cancel'} onClick={() => onReset()} />
      </Flex>

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Form>
  )
}
