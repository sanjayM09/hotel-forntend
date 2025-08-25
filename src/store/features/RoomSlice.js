import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    roomsList: [],
    roomMaintenance: [],
    availableRoomsList: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

//get Rooms
export const getRooms = createAsyncThunk(
    "Rooms/Get",
    async () => {
        try {
            const params = {
                rooms: 'customer'
            }
            const response = await baseRequest.get(APIURLS.GETROOMS, {
                params: params
            });
            console.log(response.data, 'roomsss');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get Room Maintanance
export const getRoomMaintenance = createAsyncThunk(
    "RoomMaintenance/Get",
    async () => {
        try {
            const params = {
                roomMaintenance: 'roomMaintenanceDetails'
            }
            const response = await baseRequest.get(APIURLS.ROOMMAINTANANCE, {
                params: params
            });
            console.log(response.data, 'roomsss');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get Room Maintanance
export const getAvailableRooms = createAsyncThunk(
    "AvailableRooms/Get",
    async () => {
        try {
            const params = {
                rooms: 'customer'
            }
            const response = await baseRequest.get(APIURLS.GETAVAROOMS, {
                params: params
            });
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


const RoomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            //Rooms cases
            .addCase(getRooms.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.roomsList = action.payload;
            })
            .addCase(getRooms.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //RoomMaintenance cases
            .addCase(getRoomMaintenance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getRoomMaintenance.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.roomMaintenance = action.payload;
            })
            .addCase(getRoomMaintenance.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Available Rooms cases
            .addCase(getAvailableRooms.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAvailableRooms.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.availableRoomsList = action.payload;
            })
            .addCase(getAvailableRooms.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

    }
})


export default RoomSlice.reducer