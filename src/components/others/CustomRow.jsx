import React from 'react'
import { Row as AntdRow } from 'antd'
import styled from 'styled-components'

const CustomRow = ({space,style,children}) => {
    
    return (
        <StyledRow gutter={space} style={style}>
            {children}
        </StyledRow>
    )
}

export default CustomRow

const StyledRow = styled(AntdRow)`
    margin-left:0 !important;
    margin-right:0 !important;
`;