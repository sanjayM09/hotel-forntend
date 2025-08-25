import { Button, CustomAddSelect, CustomCheckBox, CustomInput, CustomInputNumber, CustomMultiSelect, CustomSelect } from '@components/form';
import { CustomModal, CustomRow, Flex } from '@components/others';
import { Card, Checkbox, Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LabelSelect, RoomDetailsCard, RoomDetailsHolder } from '@modules/Booking/Add/Partials/Styled';
import { TbAirConditioning } from "react-icons/tb";
import { FaBed, FaPhoneAlt } from "react-icons/fa";
import { THEME } from '@theme/index';
import { MdAddLocation, MdAttachMoney } from "react-icons/md";
import { HiReceiptTax } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { CustomPageFormSubTitle, CustomPageFormTitle } from '@components/others/CustomPageTitle';
import { getCustomer } from '@store/features/CustomerSlice';
import { toast } from 'react-toastify';
import { getStayPurposeDetails } from '@modules/AddSubModules/SubModulesSlice';
import AddStayPurpose from '@modules/AddSubModules/SubModuleForms/StayingPurpose/AddStayPurpose';
import { getAvailableRooms } from '@store/features/RoomSlice';
import { baseRequest } from '@request/request';
import { APIURLS } from '@request/apiUrls/urls';
import successHandler from '@request/successHandler';
import errorHandler from '@request/errorHandler';
import { paymentOption } from '@assets/commonData/RoomData';

const RoomBookingForm = ({ formname, trigger, record, multipleBooking, closeForm }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [selectedCount, setSelectedCount] = useState(0)
    const [men, setMen] = useState(true)
    const [women, setWomen] = useState(true)
    const [child, setChild] = useState(true)
    const [extraBeds, setExtraBeds] = useState(true)
    const [selectedCustomer, setSelectedCustomer] = useState({})
    const [selectedRoomId, setSelectedRoomId] = useState([])
    const [payDetails, setPayDetails] = useState({
        amount: 0,
        bed: 0,
        gst: 0,
        totalAmount: 0,
        balance: 0
    })
    const [btnDisabled, setbtnDisabled] = useState(false)  // ---> BTN Disabled
    const [loading, setLoading] = useState(false)  // ---> btn Loading
    const { customerList, } = useSelector((state) => state.customer)
    const { stayPurpose, } = useSelector((state) => state.subModule)
    const { availableRoomsList, } = useSelector((state) => state.rooms)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormRest = () => {
        setFormReset(formReset + 1)
    }

    // ===== Modal Functions End =====
    
    useEffect(() => {
        form.resetFields()
        dispatch(getCustomer())
        dispatch(getStayPurposeDetails())
        dispatch(getAvailableRooms())
        StateReset();
    }, [record, trigger])

    const StateReset = () => {
        setChild(true)
        setMen(true)
        setWomen(true)
        setSelectedCustomer({})
        setExtraBeds(true)
    }

    useEffect(() => {
        if (!multipleBooking) {
            form.setFieldsValue(record)
            payDetails.amount = record.amount
            payDetails.gst = record.gstPercentage
            payDetails.totalAmount = record.totalAmount
        } else {
            setPayDetails({
                amount: 0,
                gst: 0,
                totalAmount: 0,
                balance: 0
            })
        }
    }, [record, trigger])

    const customerOptions = customerList.map(cust => ({
        label: cust.mobileNumber,
        value: cust.customerId
    }))

    const stayOptions = stayPurpose.map(cust => ({
        label: cust.purpose,
        value: cust.purposeOfStayId
    }))

    const roomsOptions = availableRoomsList.map(user => ({
        label: <LabelSelect className={user.roomType === 'ac' && 'ac'}>{user.roomNo}&nbsp;{user.roomType}</LabelSelect>,
        value: user.roomNo
    }));


    const addStayPurpose = (value) => {
        setFormReset(formReset + 1)
        setModelwith(500)
        setModalTitle("Add Staypurpose Details");
        setModalContent(<AddStayPurpose allStayPurpose={() => dispatch(getStayPurposeDetails())} trigger={formReset} formname={'addStay'} handleOk={handleOk} />)
        showModal();
    }

    const handleCustomer = (id) => {
        const selectedCust = customerList?.find(item => item.customerId === id)
        setSelectedCustomer(selectedCust)
    }

    const handleExtraBedCheck = () => {
        setExtraBeds(prev => !prev)
        form.setFieldsValue({
            extraBedAmount: null,
            extraBeds: null
        })
        handleTotalAmount();
    }

    const handleMenCount = () => {
        setMen(prev => !prev)
        form.setFieldsValue({
            men: null,
        })
    }

    const handleWomenCount = () => {
        setWomen(prev => !prev)
        form.setFieldsValue({
            women: null,
        })
    }

    const handleChildCount = () => {
        setChild(prev => !prev)
        form.setFieldsValue({
            child: null,
        })
    }

    const handleMultiChange = (value) => {
        setSelectedCount(value.length)
        handleTotalAmount();
    }

    const handleTotalAmount = () => {
        const noofday = form.getFieldValue('noofdays') || 1
        const extrabedAmt = form.getFieldValue('extraBedAmount') || 0
        const advancedAmt = form.getFieldValue('advance') || 0
        const rooms = form.getFieldValue('roomNo')

        let grandTotal;
        let bedCountNumber;
        if (multipleBooking) {
            const getBeds = availableRoomsList.filter((item) => rooms.includes(item.roomNo))
            const multiTotalAmount = getBeds.reduce((sum, item) => sum + item.totalAmount, 0);
            const totalbedCount = getBeds.reduce((sum, item) => sum + item.noOfBeds, 0);
            const roomIds = getBeds.map((item) => item.roomId);
            setSelectedRoomId(roomIds)

            grandTotal = (multiTotalAmount + extrabedAmt) * noofday; // --> Total
            bedCountNumber = totalbedCount;
        } else {
            grandTotal = (record.totalAmount + extrabedAmt) * noofday; // --> Total
            bedCountNumber = 200;
        }

        let balance = grandTotal - advancedAmt; // --> Balance

        if (advancedAmt > grandTotal) {
            setbtnDisabled(true)
            toast.warn('Cannot recieve more than total amount')
        } else {
            setbtnDisabled(false)
        }

        setPayDetails((prevState) => ({
            ...prevState,
            balance: balance,
            totalAmount: grandTotal,
            bed: bedCountNumber,
        }));
    }

    const onReset = () => {
        form.resetFields();
        closeForm()
    };

    const onFinish = (values) => {
        let roomId;

        if (multipleBooking) {
            roomId = selectedRoomId.map((item)=>({
                roomId:item
            }))
        } else {
            roomId = [{
                roomId: record.roomId
            }]
        }

        let result = {
            givenAmount: values.advance,
            extraBeds: values.extraBeds,
            customerId: values.customerId,
            extraBedAmount: values.extraBedAmount ? values.extraBedAmount : 0,
            child: values.child,
            men: values.men,
            women: values.women,
            noOfDays: values.noofdays,
            noOfPerson: values.noofperson,
            totalAmount: payDetails?.totalAmount,
            balance: payDetails?.balance,
            purposeOfStayId: values.stayPurpose,
            paymentType: values.paymentType,
        }

        const newValue = { ...result, roomNumberDetails: roomId }
        BookRoom(newValue)
    };

    const BookRoom = (value) => {
        baseRequest.post(APIURLS.POSTBOOKING, value)
            .then(resp => {
                form.resetFields()
                closeForm();
                StateReset();
                successHandler(resp, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Room Booked Successfully',
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
            autoComplete="off"
        >

            <Card>
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={12}>
                        {
                            multipleBooking ?
                                <CustomMultiSelect
                                    label={'Room Number'}
                                    name={'roomNo'}
                                    options={roomsOptions || []}
                                    onChange={handleMultiChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Rooms!',
                                        },
                                    ]}
                                />
                                :
                                <CustomInput
                                    label={'Room Number'}
                                    name={'roomNo'}
                                    disabled
                                />
                        }

                    </Col>

                    {
                        multipleBooking ? (
                            <Col span={24} md={12}>
                                <RoomDetailsHolder>
                                    <RoomDetailsCard>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <FaBed size={22} color={THEME.blue} />Rooms Count
                                        </div>
                                        {selectedCount}
                                    </RoomDetailsCard>
                                    <RoomDetailsCard>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <FaBed size={22} color={THEME.blue} />No.of Beds
                                        </div>
                                        {payDetails?.bed || 0}
                                    </RoomDetailsCard>
                                </RoomDetailsHolder>
                            </Col >
                        ) : (
                            <Col span={24} md={12}>
                                <RoomDetailsHolder>
                                    <RoomDetailsCard>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <TbAirConditioning size={22} color={THEME.blue} />Ac-Type
                                        </div>
                                        {record?.roomType}
                                    </RoomDetailsCard>
                                    <RoomDetailsCard>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <FaBed size={22} color={THEME.blue} />No.of Beds
                                        </div>
                                        {record?.noOfBeds}
                                    </RoomDetailsCard>
                                </RoomDetailsHolder>
                            </Col >
                        )
                    }

                    <Col span={24} md={12}>
                        <CustomSelect
                            label={'Select PhoneNumber'}
                            name={'customerId'}
                            onChange={handleCustomer}
                            options={customerOptions || []}
                            placeholder={'Select..'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select any customer!',
                                },
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <RoomDetailsHolder>
                            <RoomDetailsCard>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <FaPhoneAlt size={18} color={THEME.blue} />Name
                                </div>
                                {selectedCustomer?.name}
                            </RoomDetailsCard>
                            <RoomDetailsCard>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <MdAddLocation size={22} color={THEME.blue} />Address
                                </div>
                                {selectedCustomer?.address}
                            </RoomDetailsCard>
                        </RoomDetailsHolder>
                    </Col>

                    <Col span={24}>
                        <CustomPageFormTitle Heading={'Booking Details'} />
                    </Col>
                    <Col span={24} md={12} sm={12}>

                        <CustomSelect
                            options={paymentOption}
                            name={'paymentType'}
                            precision={0}
                            label={'Payment Type'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select any type!',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12} sm={12}>

                        <CustomAddSelect
                            options={stayOptions}
                            name={'stayPurpose'}
                            precision={0}
                            label={'Purpose of Stay'}
                            onButtonClick={addStayPurpose}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please select purpose!',
                        //     },
                        // ]}
                        />
                    </Col>
                    <Col span={24} md={12} sm={12}>

                        <CustomInputNumber
                            name={'noofperson'}
                            precision={0}
                            label={'No. of Person'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter no. of persons!',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12} sm={12}>
                        <CustomInputNumber
                            name={'noofdays'}
                            precision={0}
                            label={'No. of Days'}
                            onChange={handleTotalAmount}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter days!',
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={8}>

                        <CustomInputNumber
                            name={'men'}
                            precision={0}
                            disabled={men}
                            label={'No. of Men'}
                            optional={<Checkbox checked={!men} onChange={handleMenCount} />}
                        />
                    </Col>
                    <Col span={24} md={8}>

                        <CustomInputNumber
                            precision={0}
                            name={'women'}
                            disabled={women}
                            label={'No. of Women'}
                            optional={<Checkbox checked={!women} onChange={handleWomenCount} />}
                        />
                    </Col>
                    <Col span={24} md={8}>

                        <CustomInputNumber
                            precision={0}
                            name={'child'}
                            disabled={child}
                            label={'No. of Children'}
                            optional={<Checkbox checked={!child} onChange={handleChildCount} />}
                        />
                    </Col>
                </CustomRow >

                <CustomRow style={{ margin: '10px 0px' }} space={[12, 12]}>
                    <Col span={24} md={12}>
                        <Col span={24} >
                            <CustomInputNumber
                                name={'advance'}
                                precision={2}
                                label={'Advance Amount'}
                                onChange={handleTotalAmount}
                            />
                        </Col>
                        <Col span={24} >
                            <CustomInputNumber
                                name={'extraBeds'}
                                label={'Extra Beds'}
                                precision={0}
                                placeholder={'No. of Extra Beds'}
                                disabled={extraBeds}
                                optional={<Checkbox checked={!extraBeds} onChange={handleExtraBedCheck} />}
                            />
                        </Col>
                        <Col span={24} >
                            <CustomInputNumber
                                name={'extraBedAmount'}
                                placeholder={'Amount'}
                                precision={2}
                                disabled={extraBeds}
                                onChange={handleTotalAmount}
                            />
                        </Col>
                    </Col>
                    <Col span={24} md={12}>
                        <RoomDetailsHolder padding={'10px'}>
                            {!multipleBooking && <RoomDetailsCard>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <MdAttachMoney size={18} color={THEME.blue} />Amount
                                </div>
                                {payDetails.amount}
                            </RoomDetailsCard>
                            }
                            {!multipleBooking &&
                                <RoomDetailsCard>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <HiReceiptTax size={18} color={THEME.blue} />Gst
                                    </div>
                                    {payDetails.gst}%
                                </RoomDetailsCard>
                            }
                            <RoomDetailsCard>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <TbReportMoney size={18} color={THEME.blue} />Total Amount
                                </div>
                                {payDetails.totalAmount}
                            </RoomDetailsCard>
                            <RoomDetailsCard color={'green'} >
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', }}>
                                    <GiMoneyStack size={18} color={'green'} />Balance
                                </div>
                                {payDetails.balance}
                            </RoomDetailsCard>

                        </RoomDetailsHolder>
                    </Col>
                </CustomRow>

            </Card >
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                <Button.Success text={'Submit'} htmlType={'submit'} loading={loading} disabled={btnDisabled} />
                <Button.Danger text={'cancel'} onClick={() => onReset()} />
            </Flex>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </Form >
    )
}

export default RoomBookingForm
