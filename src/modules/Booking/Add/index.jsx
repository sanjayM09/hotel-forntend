import { getFloorRooms } from '@store/features/BookingSlice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookingRooms from '@modules/Booking/Add/Partials/BookingRooms';
import RoomStatus from '@modules/Booking/Add/Partials/RoomStatus';
import { MainLayout } from '@components/MainLayout/MainLayout';
import { CommonLoading } from '@components/others';
import { CustomNetWorkError, CustomNoData } from '@components/common';

const AddBooking = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [trigger, setTrigger] = useState(0)

    const { floorRoomList, status, error } = useSelector((state) => state.booking)

    const dispatch = useDispatch();

    const UpdateTrigger = () => {
        setTrigger(trigger + 1);
    }

    useEffect(() => {
        GetAllFloorRooms();
    }, [trigger])

    const GetAllFloorRooms = () => {
        dispatch(getFloorRooms());
    }

    useEffect(() => {
        setRoomsData(floorRoomList)
        setSelectedRoom(floorRoomList[0]?.floorDetails[0]?.roomNo)
    }, [floorRoomList])


    const SelectedRoomData = (arg) => {
        setSelectedRoom(arg)
    }
    let content;


    if (status === 'loading') {
        content = <CommonLoading />
    } else if (status === 'succeeded') {
        if(floorRoomList?.length !=0){
            content = (
                <MainLayout secondbox={<BookingRooms data={roomsData} selectedroom={SelectedRoomData} />}
                    sideBox={<RoomStatus data={roomsData} selectedRoom={selectedRoom} UpdateTrigger={UpdateTrigger} />} />
            )
        } else {
            content = <CustomNoData/>
        }
    } else if (status === 'failed') {
        if (error.code === 'ERR_NETWORK') {
            content = (
                <CustomNetWorkError/>
            );
        } else {
            content = (
                <h1>Something Went Wrong</h1>
            );
        } 
    }

    return (
        <Fragment>
            {content}
        </Fragment>

    )
}

export default AddBooking