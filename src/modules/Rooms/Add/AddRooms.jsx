import { specData } from '@assets/commonData/RoomData';
import {
  Button,
  CustomAddSelect,
  CustomCardUpload,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
} from '@components/form';
import CustomAddMultiSelect from '@components/form/CustomAddMultiselect';
import { CustomModal, CustomRow, Flex } from '@components/others';
import AddCategory from '@modules/AddSubModules/SubModuleForms/Category/AddCategory';
import AddFloor from '@modules/AddSubModules/SubModuleForms/Floor/AddFloor';
import AddSpecification from '@modules/AddSubModules/SubModuleForms/Specification/AddSpecification';
import { getCategory, getFloorDetails, getSpecifications } from '@modules/AddSubModules/SubModulesSlice';
import { APIURLS } from '@request/apiUrls/urls';
import errorHandler from '@request/errorHandler';
import { IMG_BASE_URL, baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import { Card, Col, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddRoomsForm = ({ rerequest, formname, data, formReset, FormExternalClose }) => {

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
  const [imageUrl, setImageUrl] = useState([])  //  --> Selected Image Urls
  const [defaultSelected, setDefaultSelected] = useState([]) // ===> set previously selected specifications
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [specList, setSpecList] = useState([])

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

  const { specification, floorDetails, category, } = useSelector(state => state.subModule)

  useEffect(() => {
    getAllCategory()
    getAllSpecs()
    getAllFloors()
  }, [])

  const getAllCategory = () => {
    dispatch(getCategory())
  }

  const getAllSpecs = () => {
    dispatch(getSpecifications())
  }

  const getAllFloors = () => {
    dispatch(getFloorDetails())
  }

  const specificationOptions = specification?.map(item => ({
    label: item.specificationName,
    value: item.specificationId,
  }))

  const categoryOptions = category?.map(item => ({
    label: item.categoryName,
    value: item.categoryId,
  }))

  const floorOptions = floorDetails?.map(item => ({
    label: item.floorName,
    value: item.floorId,
  }))

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = (error) => {
        reject(error)
      };
    });

  const handleproductImage = async (img) => {

    if (img.fileList.length > 0) {
      const updatedFileList = await Promise.all(img.fileList.map(async (value) => {
        // Assuming getBase64 returns a Promise
        if (value?.originFileObj) {
          const base64Result = await getBase64(value.originFileObj);
          const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);

          // Add the 'url' property to the existing object
          return {
            imageUrl: slicedImageUrl,
            imageType: value.type,
          };
        } else {
          // If 'originFileObj' is not present, return the original object
          return {
            roomListId: value.uid,
            deleted: false
          };
        }
      }));
      setImageUrl(updatedFileList)
    }

  }

  useEffect(() => {
    const proImg = data?.roomsList?.map((image) => ({
      uid: image?.roomListId,
      name: `example${image?.roomListId}.jpg`,
      status: 'done',
      url: `${IMG_BASE_URL}${image?.imageUrl}`,
    }));

    setImageInitialValue(proImg);
    setImageUrl(proImg)
  }, [formReset, data]);


  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      const selectedSpecs = data?.specificationList.map(value => value.specificationId);
      form.setFieldsValue({ specificationList: selectedSpecs })

      const setFields = {};
      setSpecList(data?.specificationList)
      data?.specificationList?.forEach(item => {
        setFields[`specificationId${item.specificationId}`] = item.specificationId;
        setFields[`specificationListId${item.specificationId}`] = item.specificationListId;
      });

      form.setFieldsValue(setFields);
    }
  }, [data, formReset])

  const addCategory = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add Category");
    setModalContent(<AddCategory allcategory={getAllCategory} formname={'addCategory'} handleOk={handleOk} trigger={trigger} />);
    showModal();
  }
  const addFloors = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add Floors");
    setModalContent(<AddFloor allFloors={getAllFloors} formname={'addFloors'} handleOk={handleOk} trigger={trigger} />);
    showModal();
  }
  const addSpecs = () => {
    setTrigger(trigger + 1)
    setModelwith(500)
    setModalTitle("Add Specification");
    setModalContent(<AddSpecification allSpecification={getAllSpecs} formname={'addSpecs'} handleOk={handleOk} trigger={trigger} />);
    showModal();
  }

  const handleTotalAmount = () => {
    const amount = form.getFieldValue('amount') || 0
    const gst = form.getFieldValue('gstPercentage') || 0
    const total = amount * (gst / 100) + amount
    form.setFieldsValue({ totalAmount: total })
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {

    if (data) {
      UpdatingRoomsData(values)
    } else {
      const result = {
        roomNo: values?.roomNo,
        categoryId: values?.categoryId,
        floorId: values?.floorId,
        amount: values?.amount,
        gstPercentage: values?.gstPercentage,
        totalAmount: values?.totalAmount,
        noOfBeds: values?.noOfBeds,
        size: values?.size,
        roomType: values?.roomType,
        roomsList: imageUrl,
        specificationList: values.specificationList.map(item => ({
          specificationId: item
        }))
      }
      AddRooms(result)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const findMissingIds = (originalArray, editedArray) => {  //  --------> Find Missing Ids
    const originalIds = new Set(originalArray.map(item => item.uid));
    const editedIds = new Set(editedArray.map(item => item.uid).filter(uid => uid !== undefined));
    const missingIds = [...editedIds].filter(id => !originalIds.has(id));
    return missingIds;
  };

  const findMissingSpecFalseIds = (originalArray, editedArray) => {  //  --------> Find Missing spac falseIds
    const originalIds = new Set(originalArray.map(item => item.specificationId));
    const editedIds = new Set(editedArray.map(item => item.specificationId).filter(specificationId => specificationId !== undefined));
    const missingIds = [...editedIds].filter(id => !originalIds.has(id));
    return missingIds;
  };

  const UpdatingRoomsData = (values) => {
    const specData = {
      specificationList: Object.entries(values)
        .filter(([key]) => key.startsWith('specificationId'))
        .map(([key, specificationId]) => {
          const index = key.match(/\d+/)[0];
          const specificationListIdkey = `specificationListId${index}`;

          return {
            specificationId,
            specificationListId: values[specificationListIdkey],
          };
        }),
    }

    // const checkspecstatus = specData?.specificationList.some((item) => item.specificationListId !== undefined)
    const checkspecstatus = specData?.specificationList.some((item) => item.specificationListId === undefined);
    const checkstatus = imageUrl.some((item) => item.status === 'done')

    let roomsList;
    if (checkstatus) {
      roomsList = [];
    } else {
      const missingId = findMissingIds(values?.roomsList, ImageInitialValue)
      const combinedArray = imageUrl.concat(missingId.map(id => ({
        roomListId: id,
        deleted: true
      })));

      roomsList = combinedArray;
    }

    let specCheckList;
    if (checkspecstatus) {
      const missingId = findMissingSpecFalseIds(specData?.specificationList, data?.specificationList)

      const removedItems = data?.specificationList
        .filter(item => missingId.includes(item.specificationId))
        .map(item => ({ deleted: true, specificationListId: item.specificationListId }));

      const filteredData = specData?.specificationList.filter(item => item.specificationListId === undefined)
        .map(item => ({ specificationId: item.specificationId }));

      const combinedArrayConcat = removedItems.concat(filteredData);  //  Combine Two Arrays

      specCheckList = combinedArrayConcat;
    } else {

      const missingId = findMissingSpecFalseIds(specData?.specificationList, data?.specificationList)

      if (missingId.length != 0) {
        const removedItems = data?.specificationList
          .filter(item => missingId.includes(item.specificationId))
          .map(item => ({ deleted: true, specificationListId: item.specificationListId }));

        specCheckList = removedItems;
      } else {
        specCheckList = [];
      }

    }

    const result = {
      roomNo: values?.roomNo,
      categoryId: values?.categoryId,
      floorId: values?.floorId,
      amount: values?.amount,
      gstPercentage: values?.gstPercentage,
      totalAmount: values?.totalAmount,
      noOfBeds: values?.noOfBeds,
      size: values?.size,
      roomType: values?.roomType,
      roomsList: roomsList,
      specificationList: specCheckList
    }

    RoomsUpdate(result)
  }

  const AddSpecList = (currentState, value) => {
    const newState = [];
    currentState?.forEach(specify => {
      const existingIndex = newState.findIndex(item => item.specificationId === specify);

      if (existingIndex === -1) {
        // If the specify doesn't exist, add it
        const specObject = specification.find(item => item.specificationId === specify);
        if (specObject) {
          newState.push(specObject);
        }
      } else {
        // If the specify exists, remove it
        newState.splice(existingIndex, 1);
        // form.resetFields(`variations_value${existingIndex}`)

      }
    });

    // Create an object to set the form fields
    const setFields = {};
    newState?.forEach(item => {
      setFields[`specificationId${item.specificationId}`] = item.specificationId;
      // setFields[`specificationName${item.specificationId}`] = item.specificationName;

      // Check if the specificationId exists in data array
      const dataItem = data?.specificationList?.find(d => d.specificationId === item.specificationId);
      if (dataItem) {
        setFields[`specificationListId${item.specificationId}`] = dataItem.specificationListId;
      } else {
        // If it doesn't exist in data, remove the field
        delete setFields[`specificationListId${item.specificationId}`];
      }
    });

    form.setFieldsValue(setFields);
    setSpecList(newState)
  }

  const AddRooms = async (value) => {
    setLoading(true)
    await baseRequest.post(APIURLS.ADDROOMS, value)
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

  const RoomsUpdate = async (value) => {
    setLoading(true)
    await baseRequest.put(`${APIURLS.EDITROOMS}${data.roomId}`, value)
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
            <CustomInputNumber
              label={'Room Number'}
              name={'roomNo'}
              placeholder={'Room Number'}
              precision={0}
              rules={[
                {
                  required: true,
                  message: 'Please enter Room Number!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomSelect
              options={specData}
              label={'Room Type'}
              name={'roomType'}
              rules={[
                {
                  required: true,
                  message: 'Please Select any Type',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={'Room Size'}
              name={'size'}
              placeholder={'Room Size'}
              rules={[
                {
                  required: true,
                  message: 'Please enter Room Size!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomAddSelect
              options={categoryOptions || []}
              label={'Category'}
              name={'categoryId'}
              onButtonClick={addCategory}
              rules={[
                {
                  required: true,
                  message: 'Please Select any category',
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomAddSelect
              options={floorOptions || []}
              label={'Floor'}
              name={'floorId'}
              onButtonClick={addFloors}
              rules={[
                {
                  required: true,
                  message: 'Please Select any floor',
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            {
              data
                ? (
                  <Fragment>
                    <CustomAddMultiSelect
                      options={specificationOptions || []}
                      label={'Specification'}
                      name={'specificationList'}
                      onButtonClick={addSpecs}
                      onChange={AddSpecList}
                      rules={[
                        {
                          required: true,
                          message: 'Please Select any specs',
                        },
                      ]}
                    />
                    {
                      specList?.length != 0 && (
                        <>
                          {
                            specList?.map((item) => (
                              <Fragment key={item?.specificationId} >
                                <CustomInput display={'none'} name={`specificationId${item?.specificationId}`} />
                                <CustomInput display={'none'} name={`specificationListId${item?.specificationId}`} />
                              </Fragment>
                            ))
                          }
                        </>
                      )
                    }
                  </Fragment>
                ) : (
                  <CustomAddMultiSelect
                    options={specificationOptions || []}
                    label={'Specification'}
                    name={'specificationList'}
                    onButtonClick={addSpecs}
                    rules={[
                      {
                        required: true,
                        message: 'Please Select any specs',
                      },
                    ]}
                  />
                )
            }
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={'No. of Beds'}
              name={'noOfBeds'}
              placeholder={'No. of Beds'}
              precision={0}
              rules={[
                {
                  required: true,
                  message: 'Please enter Number of Beds!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={'Amount'}
              name={'amount'}
              placeholder={'Amount'}
              onChange={handleTotalAmount}
              precision={2}
              rules={[
                {
                  required: true,
                  message: 'Please enter Amount!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={'GST Percentage'}
              name={'gstPercentage'}
              placeholder={'GST Percentage'}
              onChange={handleTotalAmount}
              precision={0}
              min={0}
              max={100}
              rules={[
                {
                  required: true,
                  message: 'Please enter GST Percentage!',
                },
              ]} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={'Total Amount'}
              name={'totalAmount'}
              disabled
            />
          </Col>

          <Col span={24}>
            <CustomCardUpload
              multiple={true}
              listType='picture-card'
              accept='.png,.jpeg,.jpg'
              name={'roomsList'}
              label={'Room Images (max-count - 3)'}
              maxCount={3}
              form={form}
              initialValue={ImageInitialValue}
              onChange={handleproductImage}
              rules={[
                {
                  required: true,
                  message: 'Please Select Room Images!',
                },
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

export default AddRoomsForm


