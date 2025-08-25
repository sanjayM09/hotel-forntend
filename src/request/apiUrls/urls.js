// (Mention API Names on page)
const GETEXAMPLE = 'example/'; // ( Mention request )

// =======  Auth Start ======
const LOGIN = 'admin/login'; // ( Auth Login Post)
// =======  Auth End ======

// =======  CUSTOMER ======== //
const CUSTOMERREGISTER = 'customer/registration/save'  // => POST
const CUSTOMERGET = 'customer/view'  // =>  GET
const CUSTOMERDELETE = 'customer/registration/delete/'  // =>  GET
const CUSTOMERPUT = 'customer/registration/edit/'  // => PUT

// =======  BUSINESS PROFILE ======== //
const ADDBUSINESSPROFILE = 'businessProfile/save'  // => POST
const GETBUSINESSPROFILE = 'profile/view'  // => GET
const EDITBUSINESSPROFILE = 'profile/edit/'  // =>  PUT

// =======  EMPLOYEE ======== //
const ADDEMPLOYEE = 'employee/save'  // => POST
const GETEMPLOYEE = 'employee/view'  // => GET
const EDITEMPLOYEE = 'employee/edit/'  // =>  PUT

// =======  DASHBOARD ======== //
const DASHBOARD = 'dashboard/detail/view'  // => GET
const DASHBOARDINCOME = 'income/detail/view'  // => GET
const DASHBOARDCUSTOMERBALANCE = 'customerBalance/detail/view'  // =>  GET
const DASHBOARDCUSTOMERVACATE = 'customerVacateDate/detail'  // =>  GET
const EMPLOYEEPERCENTAGE = 'dashboard/percentage/view'  // =>  GET

// =======  ROOMS ======== //
const ADDROOMS = 'add/rooms/save'  // => POST
const GETROOMS = 'add/rooms/view'  // => GET
const EDITROOMS = 'addroom/edit/'  // =>  PUT
const UPDATEROOMSTATUS = 'roomMaintenance/available/status/'  // =>  PUT

const SETMAINTENANCEUPDATE = '/room/maintanence/status/'  // => PUT

const ROOMMAINTANANCE = 'roomMaintenance/detail/view' // => GET
const ROOMCLEANUPDATE = 'room/cleaning/status/'  // => PUT
const ROOMAVAILABLE = 'room/available/status/'  // => PUT
const ROOMSWAP = 'booking/swap/'  // => PUT
const EDITROOMMAINTANANCE = 'roomMaintenance/edit/' //=>  PUT
const GETAVAROOMS = 'add/rooms/available/view' // => GET

// =======  BOOKING ======== //
const GETFLOORROOMS = 'add/rooms/floor/view'  // => GET Floor Details
const GETBOOKINGS = 'booking/vacate/view'  // => GET Booking Details
const ROOMVACATE = 'booking/vacate/status/'  //=> PUT Vacate Room

// =======  PAYMENT ======== //
const ADDPAYMENT = 'payment/save'  // => POST
const GETPAYMENT = ''  // => GET
const EDITPAYMENT = 'payment/edit/'  // =>  PUT

const POSTBOOKING = 'booking/save'  // => Post Room Booking

// =======  SUB MODULE ======== //

// ----------  MAINTANCE
const WORKTYPE = 'maintanence/save' // post worktype
const GETWORKTYPE = 'maintanence/view' // get worktype
const EDITWORKTYPE = 'mainatnence/edit/' // edit worktype

// ----------  CATEGORY
const ADDCATEGORY = 'category/save' // post category
const GETCATEGORY = 'category/view' // get category
const EDITCATEGORY = 'category/edit/' // Edit category

// ----------  SPECIFICATIONS
const ADDSPECIFICATIONS = 'specification/save' // post category
const GETSPECIFICATIONS = 'specification/view' // get category
const EDITSPECIFICATIONS = 'specification/edit/' // Edit category

// ----------  FLOOR
const ADDFLOOR = 'floor/save' // post category
const GETFLOOR = 'floor/view' // get category
const EDITFLOOR = 'floor/edit/' // Edit category

// ----------  CITY
const ADDCITY = 'city/save' // post City
const GETCITY = 'city/view' // get City
const EDITCITY = 'city/edit/' // Edit City

// ----------  COUNTRY
const ADDCOUNTRY = 'country/save' // post City
const GETCOUNTRY = 'country/view' // get City
const EDITCOUNTRY = 'country/edit/' // Edit City

// ----------  STATE
const ADDSTATE = 'state/save' // post City
const GETSTATE = 'state/view' // get City
const EDITSTATE = 'state/edit/' // Edit City

// ----------  STAY PURPOSE
const ADDSTAYPURPOSE = 'purposeOfStay/save' // post City
const GETSTAYPURPOSE = 'purposeOfStay/view' // get City
const EDITSTAYPURPOSE = 'purposeOfStay/edit/' // Edit City

// =======  EMPLOYEE ======== //

export const APIURLS = {
    // Auth 
    LOGIN,   // --> Auth Login Post

    // Example
    GETEXAMPLE,  //  --> Example

    // CUSTOMER
    CUSTOMERREGISTER, // --> Post
    CUSTOMERGET, // --> Get
    CUSTOMERDELETE, // --> Delete
    CUSTOMERPUT,  // --> Put

    // BUSINESS PROFILE
    ADDBUSINESSPROFILE, // --> Post
    GETBUSINESSPROFILE, // --> Get
    EDITBUSINESSPROFILE, // --> put

    // EMPLOYEE
    ADDEMPLOYEE, // --> Post
    GETEMPLOYEE, // --> Get
    EDITEMPLOYEE, // --> put

    DASHBOARD, // --> Get
    DASHBOARDINCOME, // --> Get
    DASHBOARDCUSTOMERBALANCE, // --> Get
    DASHBOARDCUSTOMERVACATE, // --> Get,
    EMPLOYEEPERCENTAGE,// --> Get,

    // PAYMENT
    ADDPAYMENT, // --> Post
    GETPAYMENT, // --> Get
    EDITPAYMENT, // --> put

    // ROOMS
    ADDROOMS, // --> Post
    GETROOMS, // --> Get
    EDITROOMS, // --> put
    UPDATEROOMSTATUS, // --> put

    GETAVAROOMS , // --> Get
    ROOMCLEANUPDATE, // --> Put
    ROOMAVAILABLE,  // --> Put
    ROOMSWAP,
    GETAVAROOMS, // --> Get

    SETMAINTENANCEUPDATE, // --> Put

    // ROOM MAINTANANCE
    ROOMMAINTANANCE, // --> Get
    EDITROOMMAINTANANCE, // --> put

    // SUB - MAINTANCE
    WORKTYPE,  // --> post
    GETWORKTYPE,  // --> Get,
    EDITWORKTYPE, // --> Edit

    // SUB - CATEGORY
    ADDCATEGORY,  // --> post
    GETCATEGORY,  // --> Get,
    EDITCATEGORY, // --> Edit

    // SUB - SPECIFICATIONS
    ADDSPECIFICATIONS,  // --> post
    GETSPECIFICATIONS,  // --> Get
    EDITSPECIFICATIONS, // --> Edit

    // SUB - FLOOR
    ADDFLOOR,  // --> post
    GETFLOOR,  // --> Get
    EDITFLOOR, // --> Edit

    // SUB - CITY
    ADDCITY,  // --> post
    GETCITY,  // --> Get
    EDITCITY, // --> Edit

    // SUB - COUNTRY
    ADDCOUNTRY,  // --> post
    GETCOUNTRY,  // --> Get
    EDITCOUNTRY, // --> Edit

    // SUB - STATE
    ADDSTATE,  // --> post
    GETSTATE,  // --> Get
    EDITSTATE, // --> Edit

    // SUB - STAY PURPOSE
    ADDSTAYPURPOSE,  // --> post
    GETSTAYPURPOSE,  // --> Get
    EDITSTAYPURPOSE, // --> Edit

    // BOOKING
    GETFLOORROOMS,  //  --> Get
    GETBOOKINGS,  //  --> Get
    POSTBOOKING,  // --> Post
    ROOMVACATE,  // --> Put
}