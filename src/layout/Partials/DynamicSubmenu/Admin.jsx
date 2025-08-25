import { AiFillMoneyCollect, AiOutlineDashboard, AiOutlineTags } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MenuText } from "@layout/Partials/Style";
import { MdBedroomParent } from "react-icons/md";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";
import { MdPermContactCalendar } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";

export const adminItems = (collapsed,business) => {

console.log(business,'jagdj');
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let items = [
        getItem('Dashboard', '', <AiOutlineDashboard />),
        getItem('General', 'subModule', <MdOutlineSettingsSuggest />),
        business.length != 0 ? '' : getItem('Business Profile', 'business', <ImProfile />),
        getItem(<MenuText>{null}</MenuText>, 'menu', null,
            [

                getItem('Rooms', 'sub1', <MdBedroomParent />, [
                    getItem('Add Rooms', 'addrooms', <BsFillHouseAddFill />),
                    getItem('View Rooms', 'viewRooms', <MdHomeWork />),
                    getItem('Maintenance', 'roomMaintenance', <MdHomeWork />),
                ]),

                getItem('Booking', 'sub2', <FaClipboardList />, [
                    getItem('Add Booking', 'addBooking', <MdPlaylistAddCircle />),
                    getItem('View Booking', 'viewBooking', <MdPlaylistAddCheckCircle />),
                ]),

                // getItem('Contact', 'sub3', <MdPermContactCalendar />, [
                //     getItem('View Contact', 'viewContacts', <BiSolidContact />),
                // ]),
                getItem('Customers', 'sub4', <HiUserGroup />, [
                    getItem('Add Customer', 'addCustomer', <FaUserPlus />),
                    getItem('View Customers', 'viewCustomers', <FaUserPen />),
                ]),
                getItem('Employee', 'sub5', <HiUserGroup />, [
                    getItem('Add Employee', 'addEmployee', <FaUserPlus />),
                    getItem('View Employees', 'viewEmployees', <FaUserPen />),
                ]),
                getItem('Report', 'sub6', <TbReportAnalytics />, [
                    getItem('Booking Report', 'bookingReport', <TbReportAnalytics />),
                ]),

            ], 'group'),
    ]

    return items;
}

export const adminKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];