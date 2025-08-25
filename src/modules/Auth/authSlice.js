import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
    email: null,
    role:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, token,userRole } = action.payload
            state.email = email
            state.token = token
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserRole = (state) => state.auth.role

export default authSlice.reducer