import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@modules/Auth/authSlice";
import CustomerSlice from "@store/features/CustomerSlice";
import EmployeeSlice from '@store/features/EmployeeSlice'
import RoomSlice from '@store/features/RoomSlice'
import SubmoduleReducer from '@modules/AddSubModules/SubModulesSlice'
import BookingSlice from "@store/features/BookingSlice";
import DashboardReducer from '@store/features/DashboardSlice'

// Combine all reducers.

// Define your initial state
const initialState = {
  auth: {}, // Add other reducers and their initial state here
  // Add other states here
};

const appReducer = combineReducers({
  auth: authReducer,
  customer:CustomerSlice,
  employee:EmployeeSlice,
  rooms:RoomSlice,
  subModule:SubmoduleReducer,
  booking:BookingSlice,
  dashboard:DashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    state = initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;