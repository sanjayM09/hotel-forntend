import { Divider, Menu } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import { adminItems, adminKeys } from "@layout/Partials/DynamicSubmenu/Admin";
import { AvImg, HotelImg } from "@assets/images";
import { MenuHolder, MenuImageProfile, Profile } from "@layout/Partials/Style";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserRole } from "@modules/Auth/authSlice";
import { userRolesConfig } from "@router/config/roles";
import { getBusinesProfile } from "@store/features/EmployeeSlice";


export const SideMenu = ({ collapsed }) => {

    const [openKeys, setOpenKeys] = useState([]);
    const [activeTab, setActiveTab] = useState('')

    // ==========  Dynamic Items & Keys
    const [dynamicKeys, setDynamicKeys] = useState([])
    const [items, setItems] = useState([])

    const navigate = useNavigate();
    const route = useLocation()
    const role = useSelector(selectCurrentUserRole)
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])

    const { businessProfile } = useSelector((state => state.employee))
    console.log(businessProfile, 'asdfjhsdugrbf');

    useEffect(() => {
        dispatch(getBusinesProfile())
    }, [])
    
    useEffect(() => {
        setDataSource(businessProfile)
    }, [businessProfile])


    useEffect(() => {
        setDynamicKeys(adminKeys)
        setItems(adminItems(collapsed, dataSource))
       
    }, [collapsed,dataSource])


    useEffect(() => {
        const pathname = route.pathname;
        const parts = pathname.split('/');
        const lastPart = parts[1];
        
        setActiveTab(lastPart)
        const storedOpenKeys = JSON.parse(localStorage.getItem('openKeys'));
        if (storedOpenKeys) {
            setOpenKeys(storedOpenKeys);
        }
    }, [route])

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (dynamicKeys.indexOf(latestOpenKey) === -1) {
            localStorage.setItem('openKeys', JSON.stringify(keys));
            setOpenKeys(keys);
        } else {
            localStorage.setItem('openKeys', JSON.stringify(latestOpenKey ? [latestOpenKey] : []));
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };



    const onClick = ({ key }) => {
        if (key === null) {
        }
        else {
            navigate(`${key}/`)
        }
    }

    return (
        <Fragment>
            <Profile>  {/* Remove When there is no Profile Img*/}
                <div>
                    <MenuImageProfile className={collapsed ? 'active' : ''}>
                        <img src={HotelImg} alt="Profile" />
                    </MenuImageProfile>
                </div>
            </Profile>
            <MenuHolder>
                <Menu
                    onClick={onClick}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={[activeTab]}
                    mode="inline"
                    items={items}
                />
            </MenuHolder>
        </Fragment>
    )
}

