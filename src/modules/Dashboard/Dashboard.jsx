import React, { useEffect, useState } from 'react'
import { DashCardData } from '@assets/commonData/DashboardData'
import { CommonLoading, CustomRow, Flex } from '@components/others'
import { Card, Col } from 'antd'
import DashboardCard from '@components/common/Card/DashboardCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBusinesProfile } from '@store/features/EmployeeSlice'
import { getDashboardCustomerBalance, getDashboardCustomerVacateDate, getDashboardDetails, getDashboardIncomeDetails, getEmployeePercentage } from '@store/features/DashboardSlice'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer, PieChart, Pie, Label } from 'recharts';
import { CustomTable } from '@components/form'
import { CustomPageFormTitle } from '@components/others/CustomPageTitle'
import { CustomNetWorkError } from '@components/common'

export const Dashboard = () => {

  const dispatch = useDispatch()

  const [dashboardData, setDashboardData] = useState(DashCardData);
  const [income, setIncome] = useState([])
  const [empPercentage, setEmpPercentage] = useState([])

  const { customerBalance, customerVacate, employeePercentage, dashboardDetails, incomeDetails, status, error } = useSelector((state) => state.dashboard)


  useEffect(() => {
    dispatch(getDashboardDetails())
    dispatch(getDashboardIncomeDetails())
    dispatch(getEmployeePercentage())
    dispatch(getDashboardCustomerVacateDate())
    dispatch(getDashboardCustomerBalance())
    dispatch(getBusinesProfile())
  }, [])

  useEffect(() => {
    if (incomeDetails) {
      const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      let monthData = []
      allMonths.forEach((item, index) => {
        if (item === incomeDetails[index]?.monthName) {
          monthData.push({ month: item, Income: incomeDetails[index].monthlyBookingIncome })
        } else {
          monthData.push({ month: item, Income: 0 })
        }
      })
      setIncome(monthData)
    }
  }, [incomeDetails])

  useEffect(() => {
    if (employeePercentage) {
      const dataArray = Object.entries(employeePercentage).map(([key, value]) => ({ name: key, value }));
      setEmpPercentage(dataArray)
    }
  }, [employeePercentage])

  useEffect(() => {
    if (dashboardDetails) {
      setDashboardData((prevData) =>
        prevData.map((item) => {
          switch (item.name) {
            case 'totalCustomers':
              return {
                ...item,
                value: dashboardDetails.totalCustomers || 0,
              };
            case 'totalEmployees':
              return {
                ...item,
                value: dashboardDetails.totalEmployees || 0,
              };
            case 'totalRooms':
              return {
                ...item,
                value: dashboardDetails.totalRooms || 0,
              };
            case 'availableRooms':
              return {
                ...item,
                value: dashboardDetails.availableRooms || 0,
              };
            case 'bookedRooms':
              return {
                ...item,
                value: dashboardDetails.bookedRooms || 0,
              };
            case 'maintenanceRooms':
              return {
                ...item,
                value: dashboardDetails.maintenanceRooms || 0,
              };
            default:
              return item;
          }
        })
      );
    }
  }, [dashboardDetails])

  const balanceColumn = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Given Amount',
      dataIndex: 'givenAmount',
    },
    {
      title: 'Balance Amount',
      dataIndex: 'balance',
    },

  ]

  const vacateColumn = [
    {
      title:'Sl.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
    },
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Vacate Date',
      dataIndex: 'vacateDate',
    },

  ]

  let content;
  if (status === 'loading') {
    content = <CommonLoading />
  } else if (status === 'succeeded') {
    content =
      <CustomRow space={[12, 12]}>
        <Col style={{ display: 'flex', alignItems: 'center' }} span={24} md={18}>
          <CustomRow space={[24, 24]}>
            {
              dashboardData.map((item) => (
                <Col key={item.key} span={24} xl={8} sm={12}>
                  <DashboardCard data={item} />
                </Col>
              ))
            }
          </CustomRow>
        </Col>
        <Col span={24} md={6}>
          <div style={{ width: '100%',height:'100%', display: 'flex',background:'#fff',borderRadius:'10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* <CustomPageFormTitle Heading={'Employee Percentage'} /> */}
            <h4 style={{padding:'10px'}}>Employee Details</h4>
            <Flex wrap={'true'} gap={'10px'} spaceevenly={'true'} aligncenter={'true'}>
              <span>Male : {employeePercentage?.malePercentage}%</span>
              <span>Female : {employeePercentage?.femalePercentage}%</span>
              <span>Others : {employeePercentage?.otherPercentage}%</span>
            </Flex>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart >
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={empPercentage}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#84d89a"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </Col>
        <Col style={{ width: '100%', height: 400 }} span={24}>
          <ResponsiveContainer>
            <LineChart data={income} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Col>

        <Col span={24} md={10}>
          <CustomTable noPagination columns={vacateColumn} data={customerVacate} />
        </Col>

        <Col span={24} md={14}>
          <CustomTable noPagination columns={balanceColumn} data={customerBalance} />
        </Col>
      </CustomRow>
  } else if (status === 'failed') {
    if (error.code === 'ERR_NETWORK') {
      content = <CustomNetWorkError/>;
    } else {
      content = (<h1>Something Went Wrong</h1>);
    }
  }

  return content
}

