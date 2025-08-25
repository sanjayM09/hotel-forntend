import { THEME } from "@theme/index";
import styled from "styled-components";


export const ViewLabel = styled.h3`
    color:${THEME.GREEN_DARK};
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 1px;
`

export const ViewLabelData = styled.h3`
    color:${THEME.primary_color};
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
`

export const TableIconHolder = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    cursor: pointer;

    & svg{
        font-size:${props => props.size || '15px'};
        color:${props => props.color || 'black'};
        cursor: pointer;
    }
`