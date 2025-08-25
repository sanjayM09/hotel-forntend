import { CustomRow } from '@components/others'
import {
    ViewLabel,
    ViewLabelData
} from '@components/others/Style'
import { Col } from 'antd'
import React, { Fragment } from 'react'

export const SingleCustomer = ({ data }) => {

    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Customer Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Phone Number</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.mobileNumber}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Gender</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.gender}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Email</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.email}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Verification Type</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.verificationType}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>{data?.verificationType} Number</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.number}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>City</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.cityName}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>State</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.stateName}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Country</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.countryName}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Address</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{data?.address}</ViewLabelData>
            </Col>
        </CustomRow>
    )
}
