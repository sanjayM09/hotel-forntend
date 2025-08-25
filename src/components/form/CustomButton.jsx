import React from 'react'
import { Button as AntdButton } from 'antd'
import styled, { css } from 'styled-components'
import { THEME } from '@theme/index'
import Flex from '@components/others/Flex'

const BorderStyle = css`
  &:hover {
    border-color: ${THEME.GREY_T_85};
  }
  &:focus {
    border-color: ${THEME.GREY_T_85};
  }
`
const TextContainer = styled.div`
    /* margin-left: ${props => (props.icon ? '7px' : '')}; */
    display: flex;
`

const primarynowButtonStyles = css`
  color:${THEME.white};
  background-color:${THEME.BTN_PRIMART};
  font-size: 16px;
  font-weight:500;
  transition:.4s;

  &:hover {
  background-color:${THEME.BTN_PRIMART_HOVER};
  }
  &:focus {
    /* box-shadow:0 0 0 .2rem (255, 179, 2,.5) */
  }
  &.svg {
    font-size: 20px !important;
  }
`

const secondarynowButtonStyles = css`
  color:${THEME.white};
  background-color:${THEME.BTN_SECONDARY};
  font-size: 16px;
  font-weight:500;
  transition:.4s;
  &:hover {
  background-color:${THEME.BTN_SECONDARY_HOVER};
  }
  &:focus {
    /* box-shadow:0 0 0 .2rem (255, 179, 2,.5) */
  }
  &.svg {
    font-size: 20px !important;
  }
`
const dangerButtonStyles = css`
  /* color:#f5222d; */
  color:${THEME.danger_2};
  border-color:${THEME.danger_2};
  &:hover {
    color:#fff;
    background-color: ${THEME.danger_2};
    border-color: ${THEME.danger_2};
  }
  &:focus {
    box-shadow:0 0 0 .2rem rgba(220,53,69,.5)
  }
`
const secondaryButtonStyles = css`
  background-color: ${THEME.PRIMARY_PURPLE};
  border-color: ${THEME.PURPLE_T_80};
  color: '#FFFFFF';
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  &:hover {
    background-color: ${THEME.PRIMARY_PURPLE};
    border-color: ${THEME.PURPLE_T_80};
  }
  &:focus {
    background-color: ${THEME.PRIMARY_PURPLE};
    border-color: ${THEME.PURPLE_T_80};
  }
`

const primaryButtonStyles = css`
  /* color:${THEME.PRIMARY}; */
  color: ${THEME.primary_2} !important;
  background-color:#fff;
  border-color:${THEME.primary_2};
  &:hover {
    color:#fff !important;
    /* background-color: ${THEME.PRIMARY} !important; */
    background-color: ${THEME.primary_2} !important;
    /* border-color: ${THEME.PRIMARY}; */
    border-color: ${THEME.primary_2}!important;
  }
  &:focus {
    box-shadow:0 0 0 .2rem rgba(0,123,255,.5)
  }
`

const yellowButtonStyles = css`
  color:${THEME.white};
  background-color:${THEME.dark_gold};
  border-color:${THEME.dark_gold};
  box-shadow:${THEME.button_box_shadow};
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  }
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const successButtonStyles = css`
  color:${THEME.GREEN_PRIMARY};
  border-color:${THEME.GREEN_PRIMARY};
  &:hover {
    color:#fff;
    background-color: ${THEME.GREEN_PRIMARY};
    border-color: ${THEME.GREEN_PRIMARY};
  }
  &:focus {
    box-shadow:0 0 0 .2rem rgba(40,167,69,.5)
  }
`

const defaultButtonStyles = css`
  color: #30475e;
`

const PlainButton = styled(AntdButton)`
  color: ${props => (props.type === 'secondary' ? THEME.PRIMARY : '#FFFFFF')};
  border-width:1px;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  /* border-radius: 8px; */
  border-radius: 4px;
  font-size:14px;
  letter-spacing:1px;
  justify-content: center;
  text-transform:capitalize;
  /* font-weight:600; */
  padding: 0px 15px !important;
  margin: 0px 15px 8px 0px !important;
  font-weight:400;
  cursor: ${props => props?.disableCursor && 'not-allowed'};
  pointer-events: ${props => (props?.disable ? 'none' : 'auto')};
  ${props => props.type === 'secondary' && secondaryButtonStyles};
  ${props => props.type === 'danger' && dangerButtonStyles};
  ${props => props.type === 'success' && successButtonStyles};
  ${props => props.type === 'default' && defaultButtonStyles};
  ${props => props.type === 'primary' && primaryButtonStyles};
  ${props => props.type === 'yellow' && yellowButtonStyles};
  ${props => props.type === 'primarynow' && primarynowButtonStyles};
  ${props => props.type === 'secondaryNow' && secondarynowButtonStyles};
  transition: 0.5s;
`
const CircleButton = styled(AntdButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 15px !important;
  ${BorderStyle}
`

const StyledIconButton = styled(AntdButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: red;
  ${BorderStyle}

`

const Button = props => <AntdButton {...props} />

const Primary = ({ text, icon, ...props }) => (
    <PlainButton {...props} type="primary" >
        <Flex style={{alignItems:"center"}} >
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </Flex>
    </PlainButton>
)

const PrimaryNow = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="primarynow">
    <Flex style={{alignItems:"center"}}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const SecondaryNow = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="secondaryNow">
    <Flex style={{alignItems:"center"}}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)
 
const Yellow = ({ text, icon, ...props }) => (
    <PlainButton {...props} type="yellow">
        <Flex style={{alignItems:"center"}}>
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </Flex>
    </PlainButton>
)

const Secondary = ({ text, icon, ...props }) => (
    <PlainButton {...props} type="secondary">
        <Flex style={{alignItems:"center"}}>
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </Flex>
    </PlainButton>
)

const Success = ({ text, icon, ...props }) => (
    <PlainButton {...props} type="success">
        <Flex style={{alignItems:"center"}}>
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </Flex>
    </PlainButton>
)

const Danger = ({ text, icon, ...props }) => (
    <PlainButton {...props} type="danger">
        <Flex style={{alignItems:"center"}}>
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </Flex>
    </PlainButton>
)

const Default = ({ icon, text, onClick, ...rest }) => {
    return (
        <PlainButton onClick={onClick} {...rest} type="default">
            {icon}
            <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
        </PlainButton>
    )
}

const Round = ({ icon, text, onClick, ...rest }) => {
    return (
        <PlainButton type="round" onClick={onClick} {...rest}>
            {icon}
            <TextContainer>{text}</TextContainer>
        </PlainButton>
    )
}

const Circle = ({ icon, onClick, ...rest }) => {
    return (
        <CircleButton type="circle" onClick={onClick} {...rest}>
            {icon}
        </CircleButton>
    )
}

Button.Primary = Primary
Button.Secondary = Secondary
Button.PrimaryNow = PrimaryNow
Button.SecondaryNow = SecondaryNow
Button.Success = Success
Button.Danger = Danger
Button.Default = Default
Button.Round = Round
Button.Circle = Circle
Button.Yellow = Yellow

export default Button
