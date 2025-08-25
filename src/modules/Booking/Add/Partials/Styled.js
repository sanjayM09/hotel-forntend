import { StatusStyleColorCode } from "@assets/commonData/RoomData";
import { THEME } from "@theme/index";
import styled from "styled-components";



//  ======== Room Booking style  =========

export const RoomDetailsHolder = styled.div`
    background:#f2f2f2; 
   height:  100%;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   padding:  ${props => (props.padding ? props.padding : '10px')};
   gap:5px;
   border-radius: 5px;
`
export const RoomDetailsCard = styled.div`
    display: flex;
    flex-direction: row;    
    align-items: center;
    justify-content: space-between;
    gap:5px;
    color:  ${props => (props.color ? props.color : '#000')};
`

export const MainContentWrapper = styled.div`
    /* background:lightblue; */
    height:100%;
     padding:20px;
`
export const MainContentTitle = styled.h2`
    font-size:1rem;
    text-transform:capitalize;
    font-variant:small-caps;
    color:${THEME.primary};
    text-align:center;
`
export const MainContentHolder = styled.div`
    margin-top:20px;
    padding:0 10px;
`

export const MainContentSubTitle = styled.h3`
    font-size:1rem;
    text-transform:capitalize;
    font-variant:small-caps;
    color:${THEME.primary};
    text-align:left;
    margin-bottom:10px;
`

export const MainContentRoomsWrapper = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 10px;
`

export const MainContentRooms = styled.div`
    width:100%;
    //  background:green; 
    /* background:linear-gradient(90deg, white 0%, white 50% ,red 50% ,red  100% );  */
    height:70px;
    cursor: pointer;
    transition:.5s;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    font-size:0.7rem;
    font-weight:800;
    color:${THEME.white};
    border-radius:8px;
    overflow:hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    position:relative;
    
    & span{
        z-index:10;
        position:relative;
    }

    & span:nth-child(2){
        font-size:0.7rem;
    }
//      Room Booked
    &.booked {
        background:${StatusStyleColorCode.booked};
    }

//      Room Vacated
    &.vacate{
        background:${StatusStyleColorCode.vacated};
    }

//      Room Available
    &.available {
        background:${StatusStyleColorCode.available};
    }

//      Room Maintenance
    &.maintanence{
        background:${StatusStyleColorCode.maintenance};
    }

//      Room Maintenance
    &.cleaning{
            background:${StatusStyleColorCode.cleaned};
        }

    &.active{
        /* background:red;  */
        border:5px dashed ${THEME.white}; 
        transform:translateY(-5px);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
    &:hover{
        transform:translateY(-5px);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
    /* &.true{
          background:red;  
    } */
`

export const StatusLabel = styled.h3`
    font-size:.85rem;
    height:100%;
    display:flex;
    align-items:center;
`

export const StatusValue = styled.h4`
    font-size:.85rem;
    height:100%;
    color:${THEME.red};
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:10px;
`

export const Cleaned = styled.div`
    width:30px;
    height:30px;
    background:#F2EBBF;
    border-radius:6px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    
    &.cleaned{
        background:${StatusStyleColorCode.cleaned};
    }
`

export const ButtonHolder = styled.div`
    padding:15px 0;
    display:flex;
    flex-wrap:wrap;
    gap:20px;
    align-items:center;
    justify-content:center;
`

export const FormSubTitle = styled.h4`
    font-size:1rem;
    font-variant:small-caps;
    text-transform:capitalize;
    font-weight:700;
    font-family: Poppins, sans-serif;
    color:${THEME.red};
    margin-top:20px;
`

export const CategoryWrapper = styled.div`
    height:calc(100% - 24px);
    display:flex;
    row-gap:10px;
    column-gap:20px;
    flex-wrap:wrap;
    padding:5px;
    
    & span{
        padding:5px 10px;
        border:1px solid ${THEME.PRIMARY};
        border-radius:8px;
        height: fit-content;
        font-family: Poppins, sans-serif;
        font-size:0.7rem;
        font-weight:600;          
    }
`

export const StatusHolder = styled.div`
    display:flex;
    gap:10px;
    // padding:10px 0;
    flex-direction:column;
`

export const StatusWrapper = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
`

export const StatusColorHolder = styled.div`
    width:30px;
    height:30px;
    background:${props => props.color || 'black'};
    border-radius:8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const StatusColorName = styled.h3`
    font-family: Poppins, sans-serif;
    font-size:.7rem;
    font-weight:600;
    pointer-events:none;
    flex: 1;
`

export const LabelSelect = styled.h3`
    font-size:1rem;
    color:#fff;
    background:darkorange;
    padding:2px 5px;
    text-transform:uppercase;
    &.ac {
        background:green;
    }
`
