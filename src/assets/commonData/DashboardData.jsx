import { FaUsers,FaBed ,FaHotel} from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { TbHomeCheck,TbHomeCog } from "react-icons/tb";

// const DashboardData = {
//     // your data here
//   };

export const DashCardData = [
    {
        key:'1',
        name:'totalRooms',
        label:'Total Rooms',
        value:'',
        icon:<FaHotel size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(255,81,47,1) 0%, rgba(221,36,118,1) 100%)',
        bgColor:'rgba(255,81,47,1)',
        textColor:'rgba(255,81,47,.25)',
    },
    {
        key:'2',
        name:'bookedRooms',
        label:'Booked Rooms',
        value:'',
        icon:<FaBed size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(74,167,65,1) 0%, rgba(90,248,167,1) 100%)',
        bgColor:'rgba(74,167,65,1)',
        textColor:'rgba(74,167,65,.25)',
    },
    {
        key:'3',
        name:'availableRooms',
        label:'Available Rooms',
        value:'',
        icon:<TbHomeCheck size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(87,97,178,1) 0%, rgba(31,197,171,1) 100%)',
        bgColor:'rgba(87,97,178,1)',
        textColor:'rgba(87,97,178,.25)',
    },
    {
        key:'4',
        name:'maintenanceRooms',
        label:'Maintenance Rooms',
        value:'',
        icon:<TbHomeCog size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(251,54,244,1) 0%, rgba(1,0,236,1) 100%)',
        bgColor:'rgba(251,54,244,1)',
        textColor:'rgba(251,54,244,.25)',
    },
    {
        key:'5',
        name:'totalCustomers',
        label:'Total Customers',
        value:'',
        icon:<FaUsers size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(110,67,202,1) 0%, rgba(89,142,233,1) 100%)',
        bgColor:'rgba(110,67,202,1)',
        textColor:'rgba(110,67,202,.25)',
    },
    {
        key:'6',
        name:'totalEmployees',
        label:'Total Employees',
        value:'',
        icon:<FaUsersLine size={22} color="#fff"/>,
        linear:'linear-gradient(180deg, rgba(220,72,150,1) 0%, rgba(214,126,195,1) 100%)',
        bgColor:'rgba(220,72,150,1)',
        textColor:'rgba(220,72,150,.25)',
    },
]
