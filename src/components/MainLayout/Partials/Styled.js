import { THEME } from "@theme/index";
import styled from "styled-components";


export const ContainerWrapper = styled.div`
    background:#ff000000;
    height:100%;
    display:flex;
    gap:10px;
    flex-direction:column;

    @media ${THEME.LAPTOP}{
        flex-direction:row;
    }
`

export const SideLIst = styled.div`
    background:#fff;
    width:100%;
    height:30vh;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    order:1;

    @media ${THEME.LAPTOP}{
        order:2;
        width:300px;
        overflow: auto;
        height: 100%;
    }
`;

export const MainList = styled.div`
    background:#fff;
    overflow:auto;
    width:100%;
    height:50vh;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    order:2;

    @media ${THEME.LAPTOP}{
        order:1;
        width:calc(100% - 300px);
        overflow: auto;
        height: 100%;
    }
`;

// ===============

export const DisabledLink = styled.span`
    text-decoration:none;
    color:${THEME.grey};
    font-size:16px;
    font-weight:bold;
    text-align:center;
    display:block;
    cursor: pointer;
    &:hover{
        color: ${THEME.PRIMARY}
    }
    &.active{
        color: ${THEME.PRIMARY}
    }
`;
