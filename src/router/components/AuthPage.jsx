import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import { adminAuthenticated, userAuthenticated } from '@router/config/routes'
import { Flex } from '@components/others'
import styled from 'styled-components'
import DashboardLayout from '@layout/DashboardLayout'
import { useSelector } from 'react-redux'
import { selectCurrentUserRole } from '@modules/Auth/authSlice'
import { userRolesConfig } from '@router/config/roles'
import { adminAuthenticated } from '@router/config/routes'

const PageFlex = styled(Flex)`
  overflow: hidden;
`
const AuthPage = ({ isAuthenticated }) => {

    const role = useSelector(selectCurrentUserRole);
    const [authRoutePages, setAuthRoutePages] = useState([]);
  
    // useEffect(() => {
    //   if (role === userRolesConfig.ADMIN) {
    //     setAuthRoutePages(adminAuthenticated);
    //   } else if (role === userRolesConfig.USER) {
    //     setAuthRoutePages(userAuthenticated);
    //   }
    // }, [role]);
  

    return (
        <PageFlex>
            {isAuthenticated && (
                <DashboardLayout>
                    <Routes>
                        {adminAuthenticated.map(({ routePath, Component }) => {
                            return (
                                <Route
                                    key={routePath}
                                    path={routePath}
                                    element={<Component />}
                                ></Route>
                            )
                        })}
                    </Routes>
                </DashboardLayout>
            )}
        </PageFlex>
    )
}

export default AuthPage
