import { THEME } from '@theme/index';
import React from 'react'
import styled from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io'

const Titles = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:15px;
    gap:8px;

    & span{
        /* background:${THEME.white}; */
        display:inline-block;
        width:30px;
        height:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:50%;
        cursor: pointer;
        /* box-shadow:${THEME.button_box_shadow} */
    }

    & h2 {
        font-size: 1.25rem;
        color: ${THEME.primary_color_dark};
        font-weight: 600;
    }
`;

const TitleScroll = styled.div`
    & h2 {
        font-size: 1.1rem;
        color: ${THEME.primary_color};
        font-weight: 800;
        /* font-variant: small-caps;
        text-transform: capitalize; */
        margin-bottom:10px;
        /* text-align:center; */
    }
`;


const FormTitles = styled.div`
/* margin: auto; */
    & h2 {
        font-size: 18px;
        color: #5b626b;
        font-weight: 600;
        text-transform: capitalize;
        margin-bottom:10px;
    }
`;

const FormSubTitles = styled.div`
    & h4 {
        font-size: 14px;
        color: ${THEME.gray};
        font-weight: 500;
        text-transform: capitalize;
        border-bottom:1px solid ${THEME.gray};
        margin:10px;
    }
`;

export const CustomPageTitle = ({ Heading, style, PreviousPage }) => {
    const goBack = () => {
        PreviousPage()
    }
    return (
        <Titles style={style}>
            <span onClick={goBack}>
                <IoIosArrowBack size={18}/>
            </span> <h2>{Heading}</h2>
        </Titles>
    )
}


export const CustomPageTitleScroll = ({ Heading }) => {
    return (
        <TitleScroll>
            <h2>{Heading}</h2>
        </TitleScroll>
    )
}

export const CustomPageFormTitle = ({ Heading }) => {
    return (
        <FormTitles>
            <h2>{Heading}</h2>
        </FormTitles>
    )
}

export const CustomPageFormSubTitle = ({ Heading }) => {
    return (
        <FormSubTitles>
            <h4>{Heading}</h4>
        </FormSubTitles>
    )
}