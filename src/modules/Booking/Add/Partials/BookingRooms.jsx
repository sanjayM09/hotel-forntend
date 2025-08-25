import React, { useEffect, useState } from 'react'
import {
    MainContentWrapper,
    MainContentTitle,
    MainContentHolder,
    MainContentSubTitle,
    MainContentRoomsWrapper,
    MainContentRooms,
} from '@modules/Booking/Add/Partials/Styled'


const BookingRooms = ({ data, selectedroom }) => {

    const [activeClass, setActiveClass] = useState(null)

    useEffect(() => {
        setActiveClass(data[0]?.floorDetails[0]?.roomNo)
    }, [data])

  return (
            <MainContentWrapper>
            <MainContentTitle>Booking Rooms</MainContentTitle>
            {
                data?.map((room,index) => (
                    <MainContentHolder key={index}>
                        <MainContentSubTitle>{room.floorName}</MainContentSubTitle>
                        <MainContentRoomsWrapper>
                            {
                                room.floorDetails.map((item,index) => (
                                    <MainContentRooms key={index}
                                        className={[item.booking && 'booked', item.vacate && 'vacate', item.cleaning && !item.available && 'cleaning',item.maintanence && 'maintanence', item.available && 'available', activeClass === item.roomNo ? 'active' : '']}
                                        onClick={() => {
                                            setActiveClass(item.roomNo);
                                            selectedroom(item.roomNo);
                                        }}>
                                        <span>{item.roomNo}</span>
                                        <span style={{textTransform:'uppercase'}}>{item.roomType}</span>
                                    </MainContentRooms>
                                ))
                            }
                        </MainContentRoomsWrapper>
                    </MainContentHolder>
                ))
            }
        </MainContentWrapper>
  )
}

export default BookingRooms
