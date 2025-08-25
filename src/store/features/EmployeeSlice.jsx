import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    employeeList: [],
    businessProfile:[],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getEmployees = createAsyncThunk(
    "Employees/Get",
    async () => {
        try {
            const params = {
                view: 'employee'
            }
            const response = await baseRequest.get(APIURLS.GETEMPLOYEE, {
                params: params
            });
            console.log(response.data, 'maintanance');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getBusinesProfile = createAsyncThunk(
    "BusinesProfile/Get",
    async () => {
        try {
            const params = {
                businessProfile: 'profileDetails'
            }
            const response = await baseRequest.get(APIURLS.GETBUSINESSPROFILE, {
                params: params
            });
            console.log(response,'profileee');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


const EmployeeSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.employeeList = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })


            .addCase(getBusinesProfile.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBusinesProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.businessProfile = action.payload;
            })
            .addCase(getBusinesProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})


export default EmployeeSlice.reducer