import React from 'react'
import {
    DCardWrapper,
    IconHolder,
    DCardContentHolder,
    DCardHeading,
    DCardNumber,
    DCardContainer,
} from '@components/common/Card/Styled'

const DashboardCard = ({ data }) => {

    console.log(data, 'njkggufgjk');
    return (
        <DCardWrapper >
            <DCardContainer linear={data.linear} bgColor={data.bgColor} textColor={data.textColor}>
                <div className='contentHolder'>
                    <div className='lineBar'></div>
                    <div className='contentWrapper'>
                        <h4>{data.label}</h4>
                        <span>{data.value}</span>
                    </div>
                </div>

                <div className='iconWrapper'>
                    <div className='iconHolder'>
                        {data.icon}
                    </div>
                </div>
            </DCardContainer>
        </DCardWrapper>
    )
}

export default DashboardCard
