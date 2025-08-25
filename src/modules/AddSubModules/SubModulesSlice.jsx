import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    worktype: [],
    category: [],
    specification: [],
    floorDetails: [],
    cityLists: [],
    countryList: [],
    stateList: [],
    stayPurpose: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

//get worktype
export const getWorktype = createAsyncThunk(
    "Worktype/Get",
    async () => {
        try {
            const params = {
                maintanence: 'employee'
            }
            const response = await baseRequest.get(APIURLS.GETWORKTYPE, {
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

//get Category
export const getCategory = createAsyncThunk(
    "category/Get",
    async () => {
        try {
            const params = {
                category: 'categoryDetails'
            }
            const response = await baseRequest.get(APIURLS.GETCATEGORY, {
                params: params
            });
            console.log(response.data, 'category');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get Specifications
export const getSpecifications = createAsyncThunk(
    "Specifications/Get",
    async () => {
        try {
            const params = {
                specification: 'specificationDetails'
            }
            const response = await baseRequest.get(APIURLS.GETSPECIFICATIONS, {
                params: params
            });
            console.log(response.data, 'fgrdfgdfg');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get Floor Details
export const getFloorDetails = createAsyncThunk(
    "floorDetails/Get",
    async () => {
        try {
            const params = {
                floor: 'floorDetails'
            }
            const response = await baseRequest.get(APIURLS.GETFLOOR, {
                params: params
            });
            console.log(response.data, 'floor');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//get City List
export const getCityDetails = createAsyncThunk(
    "CityDetails/Get",
    async () => {
        try {
            const params = {
                city: 'cityDetails'
            }
            const response = await baseRequest.get(APIURLS.GETCITY, {
                params: params
            });
            console.log(response, 'CITY_RESPONSE');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


//get Country List
export const getCountryDetails = createAsyncThunk(
    "CountryDetails/Get",
    async () => {
        try {
            const params = {
                country: 'countryDetails'
            }
            const response = await baseRequest.get(APIURLS.GETCOUNTRY, {
                params: params
            });
            console.log(response, 'COUNTRY_RESPONSE');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


//get State List
export const getStateDetails = createAsyncThunk(
    "StateDetails/Get",
    async () => {
        try {
            const params = {
                state: 'stateDetails'
            }
            const response = await baseRequest.get(APIURLS.GETSTATE, {
                params: params
            });
            console.log(response, 'STATE_RESPONSE');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


//get Stay Purpose List
export const getStayPurposeDetails = createAsyncThunk(
    "StaypurposeDetails/Get",
    async () => {
        try {
            const params = {
                purposeOfStay: 'purposeOfStayDetails'
            }
            const response = await baseRequest.get(APIURLS.GETSTAYPURPOSE, {
                params: params
            });
            console.log(response, 'STAY_RESPONSE');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


const SubmoduleSlice = createSlice({
    name: 'subModules',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            //  worktype case
            .addCase(getWorktype.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getWorktype.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.worktype = action.payload;
            })
            .addCase(getWorktype.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  category case
            .addCase(getCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  specifications case
            .addCase(getSpecifications.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getSpecifications.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.specification = action.payload;
            })
            .addCase(getSpecifications.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  floor details case
            .addCase(getFloorDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getFloorDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.floorDetails = action.payload;
            })
            .addCase(getFloorDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  city details case
            .addCase(getCityDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCityDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.cityLists = action.payload;
            })
            .addCase(getCityDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  country details case
            .addCase(getCountryDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCountryDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.countryList = action.payload;
            })
            .addCase(getCountryDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  country state case
            .addCase(getStateDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getStateDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.stateList = action.payload;
            })
            .addCase(getStateDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //  country stay purpose case
            .addCase(getStayPurposeDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getStayPurposeDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.stayPurpose = action.payload;
            })
            .addCase(getStayPurposeDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export const { deleteCategory, deleteFloorDetails, deleteSpecifications, deleteWorktype } = SubmoduleSlice.actions

export default SubmoduleSlice.reducer