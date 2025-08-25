import { genderData, verificationData } from '@assets/commonData/CustomerData';
import {
  Button,
  CustomAddSelect,
  CustomCardUpload,
  CustomCheckBoxGroup,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
} from '@components/form';
import CustomAddMultiselect from '@components/form/CustomAddMultiselect';
import { CustomModal, CustomRow, Flex } from '@components/others';
import { AddCity } from '@modules/AddSubModules/SubModuleForms/City/AddCity';
import AddCountry from '@modules/AddSubModules/SubModuleForms/Country/AddCountry';
import AddState from '@modules/AddSubModules/SubModuleForms/State/AddState';
import { getCityDetails, getCountryDetails, getStateDetails } from '@modules/AddSubModules/SubModulesSlice';
import { APIURLS } from '@request/apiUrls/urls';
import errorHandler from '@request/errorHandler';
import { baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import { Card, Col, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddCustomersForm = ({ rerequest, formname, data, formReset, FormExternalClose }) => {
  
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
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    form.resetFields();
  }, [formReset, data])

  const { cityLists, countryList, stateList, } = useSelector(state => state.subModule)

  useEffect(() => {
    getAllCity()
    getAllState()
    getAllCountry()
  }, [])

  const getAllCity = () => {
    dispatch(getCityDetails())
  }

  const getAllState = () => {
    dispatch(getStateDetails())
  }

  const getAllCountry = () => {
    dispatch(getCountryDetails())
  }


  const cityOptions = cityLists?.map(item => ({
    label: item.cityName,
    value: item.cityId,
  }))

  const stateOptions = stateList?.map(item => ({
    label: item.stateName,
    value: item.stateId,
  }))

  const countryOptions = countryList?.map(item => ({
    label: item.countryName,
    value: item.countryId,
  }))

  // const getBase64 = (file) =>
  // new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //         resolve(reader.result);
  //     }
  //     reader.onerror = (error) => {
  //         reject(error)
  //     };
  // });

  // const handleproductImage = async (img) => {  // =======> Upload OnChange Fun
  //   if (img.fileList.length > 0) {
  //     const ImageObj = await Promise.all(img.fileList.map(async (value) => {
  //       // Assuming getBase64 returns a Promise
  //       const base64Result = await getBase64(value.originFileObj);
  //       const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
  //       // Now, you can use base64Result
  //       const newObj = {
  //         productImagesUploadUrl: slicedImageUrl,
  //         type: value.type
  //       }
  //       return newObj
  //     }));
  //   }
  // }


  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, formReset])

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values,'jgydtfy');
    if (data) {
      CustomerUpdate(values)
    } else {
      CustomerRegister(values)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const CustomerRegister = async (value) => {
    setLoading(true)
    await baseRequest.post(APIURLS.CUSTOMERREGISTER, value)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'success'
        })
        setLoading(false)
        onReset();
        return response.data;
      })
      .catch(function (error) {
        setLoading(false)
        return errorHandler(error);
      })
  }

  const CustomerUpdate = async (value) => {
    setLoading(true)
    await baseRequest.put(`${APIURLS.CUSTOMERPUT}${data.customerId}`, value)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: 'success',
          type: 'success'
        })
        setLoading(false)
        onReset();
        rerequest();
        FormExternalClose();
        return response.data;
      })
      .catch(function (error) {
        setLoading(false)
        return errorHandler(error);
      })
  }

  const addCity = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add City");
    setModalContent(<AddCity allcities={getAllCity} formname={'addCity'} handleOk={handleOk} trigger={trigger} />);
    showModal();
  }
  const addState = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add State");
    setModalContent(<AddState allStates={getAllState} formname={'addState'} handleOk={handleOk} trigger={trigger} />);
    showModal();
  }
  const addCountry = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add Country");
    setModalContent(<AddCountry allCountry={getAllCountry} formname={'addSpecs'} handleOk={handleOk} trigger={trigger} />);
    showModal();
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
      autoComplete="off"
    >

      <Card>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomInput
              label={'Customer Name'}
              name={'name'}
              placeholder={'Enter Customer Name'}
              rules={[
                {
                  required: true,
                  message: 'Please enter Customer Name!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={'Phone Number'}
              name={'mobileNumber'}
              placeholder={'Enter Phone Number'}
              precision={0}
              rules={[
                {
                  required: true,
                  message: 'Please enter Phone Number!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={'Email'}
              name={'email'}
              type={'email'}
              placeholder={'Enter Email'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your mail!',
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
            <CustomSelect
              options={verificationData}
              label={'Verification'}
              name={'verificationType'}
              rules={[
                {
                  required: true,
                  message: 'Please Select any verification !',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={'Verification Number'}
              name={'number'}
              placeholder={'Enter verification number'}
              rules={[
                {
                  required: true,
                  message: 'Please add verification number !',
                },
              ]} />
          </Col>

          {/* <Col span={24}>
            <CustomCardUpload
              multiple={false}
              listType='picture-card'
              maxCount={1}
              accept='.png,.jpeg,.jpg'
              name={`image${index + 1}`}
              label={`${item} `}
              onChange={handleproductImage} />
            <CustomInput name={`imageUrl${index + 1}`} />
          </Col> */}
          <Col span={24} md={12}>
            <CustomAddSelect
              onButtonClick={addCity}
              options={cityOptions ||[]}
              label={'City'}
              name={'cityId'}
              placeholder={'Enter City'}
              rules={[
                {
                  required: true,
                  message: 'Please enter City!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomAddSelect
              onButtonClick={addState}
              options={stateOptions ||[]}
              label={'State'}
              name={'stateId'}
              placeholder={'Enter State'}
              rules={[
                {
                  required: true,
                  message: 'Please enter State!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomAddSelect
              onButtonClick={addCountry}
              options={countryOptions ||[]}
              label={'Country'}
              name={'countryId'}
              placeholder={'Enter Country'}
              rules={[
                {
                  required: true,
                  message: 'Please enter Country!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomTextArea
              label={'Address'}
              name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your address',
                }
              ]} />
          </Col>
        </CustomRow>

        <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
          {
            data
              ? (<>
                <Button.Primary text={'Update'} htmlType={'submit'} loading={loading} />
                <Button.Danger text={'Close'} onClick={() => FormExternalClose()} />
              </>
              )
              : (<>
                <Button.Success text={'Submit'} htmlType={'submit'} loading={loading} />
                <Button.Danger text={'cancel'} onClick={() => onReset()} />
              </>)
          }

        </Flex>

      </Card>
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
    </Form>
  )
}

export default AddCustomersForm

