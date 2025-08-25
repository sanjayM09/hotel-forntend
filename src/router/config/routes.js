import { NetWorkError } from "@router/components/NetWorkError"
import PageNotFound from "@router/components/PageNotFound"
import UserSignin from "@modules/Auth/Partials/UserSignin"
import ViewBooking from "@modules/Booking/View/ViewBooking"
import ViewContact from "@modules/Contacts/ViewContact"
import ViewCustomers from "@modules/Customers/View/ViewCustomers"
import ViewRooms from "@modules/Rooms/View/ViewRooms"
import AddCustomers from "@modules/Customers/Add"
import { Dashboard } from "@modules/Dashboard/Dashboard"
import { AddEmployees } from "@modules/Employee/Add"
import { ViewEmployees } from "@modules/Employee/View/ViewEmployee"
import AddRooms from "@modules/Rooms/Add"
import { SubmodulesMain } from "@modules/AddSubModules/SubModuleForms"
import AddBooking from "@modules/Booking/Add"
import ViewRoomMaintenance from "@modules/Rooms/Maintenance/ViewRoomMaintenance"
import ViewBusinessProfile from "@modules/BusinessProfile/ViewBusinessProfile"
import BusinessProfileMain from "@modules/BusinessProfile"
import ViewBookingReport from "@modules/Report/BookingReport/ViewBookingReport"

export const anonymous = [
    {       // ----------- Page Not Fonund
        routePath: '*',
        Component: PageNotFound,
    },
    {       // ----------- Network Error
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/signin',
        Component: UserSignin,
    },
]

export const adminAuthenticated = [
    {
        routePath: '',
        Component: Dashboard,
    },
    {       // ----------- Page Not Fonund
        routePath: '*',
        Component: PageNotFound,
    },
    {       // ----------- Network Error
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: 'business',
        Component: BusinessProfileMain
    },
    {
        routePath: 'viewBusiness',
        Component: ViewBusinessProfile
    },
    {
        routePath: 'addBooking',
        Component: AddBooking,
    },
    {
        routePath: 'viewBooking',
        Component: ViewBooking,
    },
    {
        routePath: 'viewContacts',
        Component: ViewContact,
    },
    {
        routePath: 'addCustomer',
        Component: AddCustomers,
    },
    {
        routePath: 'viewCustomers',
        Component: ViewCustomers,
    },
    {
        routePath: 'addRooms',
        Component: AddRooms,
    },
    {
        routePath: 'viewRooms',
        Component: ViewRooms,
    },
    {
        routePath: 'addEmployee',
        Component: AddEmployees,
    },
    {
        routePath: 'viewEmployees',
        Component: ViewEmployees,
    },
    {
        routePath: 'subModule',
        Component: SubmodulesMain,
    },
    {
        routePath: 'roomMaintenance',
        Component: ViewRoomMaintenance,
    },
    {
        routePath: 'bookingReport',
        Component: ViewBookingReport,
    },
]
