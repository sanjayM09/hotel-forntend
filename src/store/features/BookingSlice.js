import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    floorRoomList: [],
    bookingList: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

//get floor rooms
export const getFloorRooms = createAsyncThunk(
    "FloorRooms/Get",
    async () => {
        try {
            const params = {
                rooms: 'floor'
            }
            const response = await baseRequest.get(APIURLS.GETFLOORROOMS, {
                params: params
            });
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get bookings
export const getBookingDetails = createAsyncThunk(
    "Bookings/Get",
    async () => {
        try {
            const params = {
                booking: 'view'
            }
            const response = await baseRequest.get(APIURLS.GETBOOKINGS, {
                params: params
            });
            console.log([...response.data], 'BookingGet');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


const BookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //Floor Cases
            .addCase(getFloorRooms.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getFloorRooms.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.floorRoomList = action.payload;
            })
            .addCase(getFloorRooms.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Booking Cases
            .addCase(getBookingDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBookingDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bookingList = action.payload;
            })
            .addCase(getBookingDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})


export default BookingSlice.reducer


