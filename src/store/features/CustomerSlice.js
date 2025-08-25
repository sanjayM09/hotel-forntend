import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    customerList: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getCustomer = createAsyncThunk(
    "Customer/Get",
    async () => {
        try {
            const params = {
                customer: 'customerDetails'
            }
            const response = await baseRequest.get(APIURLS.CUSTOMERGET, {
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


const CustomerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        updateCustomer: (state, action) => {
            const { customerId } = action.payload;
            // Find the index of the customer with the specified id
            const customerIndex = state.customerList.findIndex(customer => customer.customerId === customerId);

            // Update the customer details if the customer is found
            if (customerIndex !== -1) {
                state.customerList[customerIndex] = { ...state.customerList[customerIndex], ...updatedDetails };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomer.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.customerList = action.payload;
            })
            .addCase(getCustomer.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export default CustomerSlice.reducer


