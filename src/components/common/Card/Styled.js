import { THEME } from "@theme/index";
import styled from "styled-components";

export const DCardWrapper = styled.div`
    width:100%;
    height:100%;
    padding:20px 0;
    background:${THEME.white};
    border-radius:10px;
    box-shadow:rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    transition: 0.5s;
    /* position:relative; */
    /* border-bottom:5px solid ${props => props.bgColor}; */

    &:hover{
        box-shadow:${THEME.formHover_box_shadow};
        transform:translateY(-5px);
        /* background:${props => props.bgSecondaryColor}; */
    }
`

export const DCardContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:100%;

    & .contentHolder{
        display:flex;
        align-items:center;
        justify-content:flex-start;
        flex:1;
        height:100%;
        padding:5px 0;
        position:relative;

        & .lineBar{
            position:absolute;
            width:4px;
            border-radius:2px;
            background:${props => props.linear};
            height:100%;
            left:0;
        }

        & .contentWrapper{
            margin-left:15px;

            span{
                display:block;
                font-size:1.25rem;
                font-weight:800;
                margin-top:10px;
            }
        }
    }

    & .iconWrapper{
        background:${props => props.textColor};
        width:50px;
        height:50px;
        margin-right:10px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        & .iconHolder{
            background:${props => props.bgColor};
            width:35px;
            height:35px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
        }
    }
`

export const IconHolder = styled.div`
    /* width:70px;
    height:70px;
    border-radius:10px;
    background:${props => props.bgColor || 'red'};
    position:absolute;
    top:-15px;
    left:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:2rem;
    color:${THEME.white}; */
`

export const DCardContentHolder = styled.div`
    /* background:green; */
    margin-top:40px;
    display:flex;
    align-items:flex-end;
    justify-content:center;
    /* background:${props => props.bgColor}; */
    flex-direction:column;
    padding: 20px 2px;
`

export const DCardHeading = styled.h3`
    color:${props => props.color};
    font-size:1rem;
    font-weight:700;
    text-transform:capitalize;
    font-variant:small-caps;
    transition:0.3s;

    @media ${THEME.LAPTOP}{
        font-size:1.2rem;
    }
`

export const DCardNumber = styled.h4`
    color:${props => props.color};
    font-size:2rem;
    margin-top:20px;
`