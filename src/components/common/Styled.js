// ============  Notification    ===============

import { THEME } from "@theme/index"
import styled from "styled-components"

export const MiniPopUpWrapper = styled.div`
  padding: 10px;
`
export const MiniPopUpTitle = styled.h4`
  letter-spacing: -0.01em;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: ${THEME.black};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0;
  text-overflow: ellipsis;
`
export const MiniPopUpPara = styled.h4`
  font-weight: 500;
  font-size: 0.8rem;
`

export const PlaceHolder = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:15px;
  flex:1;
  height:100%;
`