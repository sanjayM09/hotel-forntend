import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    dashboardDetails: {},
    employeePercentage: {},
    incomeDetails: [],
    customerBalance: [],
    customerVacate: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

//get dashboard details
export const getDashboardDetails = createAsyncThunk(
    "DashboardDetails/Get",
    async () => {
        try {
            const params = {
                dashboard: 'dashboardDetails'
            }
            const response = await baseRequest.get(APIURLS.DASHBOARD, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
);

//get dashboard Income details
export const getDashboardIncomeDetails = createAsyncThunk(
    "DashboardIncomeDetails/Get",
    async () => {
        try {
            const params = {
                income: 'incomeDetails'
            }
            const response = await baseRequest.get(APIURLS.DASHBOARDINCOME, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
);
//get dashboard customerBalance details
export const getDashboardCustomerBalance = createAsyncThunk(
    "DashboardCustomerBalance/Get",
    async () => {
        try {
            const params = {
                customer: 'balanceDetails'
            }
            const response = await baseRequest.get(APIURLS.DASHBOARDCUSTOMERBALANCE, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
);
//get dashboard customer vacate details
export const getDashboardCustomerVacateDate = createAsyncThunk(
    "DashboardCustomerVacateDate/Get",
    async () => {
        try {
            const params = {
                customer: 'vacateDate'
            }
            const response = await baseRequest.get(APIURLS.DASHBOARDCUSTOMERVACATE, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
);

//get dashboard employee percentage details
export const getEmployeePercentage = createAsyncThunk(
    "EmployeePercentage/Get",
    async () => {
        try {
            const params = {
                dashboard: 'dashboardDetails'
            }
            const response = await baseRequest.get(APIURLS.EMPLOYEEPERCENTAGE, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
);


const DashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //Dashboard Cases
            .addCase(getDashboardDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDashboardDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.dashboardDetails = action.payload;
            })
            .addCase(getDashboardDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Dashboard Income Cases
            .addCase(getDashboardIncomeDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDashboardIncomeDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.incomeDetails = action.payload;
            })
            .addCase(getDashboardIncomeDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Customer Balance Cases
            .addCase(getDashboardCustomerBalance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDashboardCustomerBalance.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.customerBalance = action.payload;
            })
            .addCase(getDashboardCustomerBalance.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Customer vacate Cases
            .addCase(getDashboardCustomerVacateDate.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDashboardCustomerVacateDate.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.customerVacate = action.payload;
            })
            .addCase(getDashboardCustomerVacateDate.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //Employee Percentage Cases
            .addCase(getEmployeePercentage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getEmployeePercentage.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.employeePercentage = action.payload;
            })
            .addCase(getEmployeePercentage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})


export default DashboardSlice.reducer