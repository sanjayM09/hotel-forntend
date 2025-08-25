import { CustomPageTitle } from '@components/others/CustomPageTitle'
import AddCustomersForm from '@modules/Customers/Add/AddCustomers'
import React, { Fragment } from 'react'
import { AddEmployeesForm } from './AddEmployee'
import { useNavigate } from 'react-router-dom'

export const AddEmployees = () => {

    const navigate = useNavigate()
    return (
        <Fragment>
            <CustomPageTitle Heading={'Add Employee'} PreviousPage={() => navigate(-1)} />
            <AddEmployeesForm formname={'AddEmployee'} />
        </Fragment>
    )
}
