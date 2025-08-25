import React, { Fragment } from 'react'
import Label from '@components/form/Label'
import styled from 'styled-components'
import { InputNumber as AntdInputNumber, Form } from 'antd'

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
  } 
  border-radius: 0.4rem;
  margin-bottom: 5px !important;


  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    font-weight: 600 !important;
    position: relative;
    font-size: 15px;
    line-height: 1.3;
    letter-spacing: 0.03em;
  }
`

const AntdInputNumberStyle = styled(AntdInputNumber)`
  width: 100%;
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: 0.4rem;
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#ced4da')};

  & .ant-input-number-input:placeholder-shown {
    font-size:14px;
    text-align:${props => props.placed ? 'center' : 'start'};
  }

  
  ::placeholder {
    font-size: 14px !important;
    font-weight: 600 !important;
    color:red;
  }

  .ant-input:focus,
.ant-input-focused {
    border-color: #57a8e9;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(87, 168, 233, .2);
    box-shadow: 0 0 0 2px rgba(87, 168, 233, .2);
}

  :hover {
    border:1px solid #b3d8ff;
  }

  :not(.ant-input-affix-wrapper-disabled):hover {
    border:1px solid #b3d8ff !important;
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-right-width: 0px !important;
  }

  .ant-input-number-prefix {
    color: #dbdbdb;
  }

  .ant-input-number-input {
    font-weight:500 !important;
    padding: 8px 11px !important;
    color: black !important;
  }

  .ant-input-number-handler-wrap {
    opacity: unset;
    border-radius: 0 8px 8px 0;
    padding-top: 4px;
  }

  .ant-input-number-input-wrap{
    height:100%;
  }

  .ant-input-number-handler {
    width: 20px;
    height: 12px;
    color: #989898;
  }

  .ant-input-number-handler-up,
  .ant-input-number-handler-down {
    background: #ededed;
    margin-bottom: 2px;
    border-radius: 3px;
    margin-top: 2px;
  }

  .ant-input-number-handler-up:hover,
  .ant-input-number-handler-down:hover {
    height: 12px !important;
  }

  &.ant-input-number:hover .ant-input-number-handler-wrap{
    opacity: 0 !important;
  }
  
  &.ant-input-number:focus .ant-input-number-handler-wrap{
    opacity: 0 !important;
  }

  .ant-input-number-handler-wrap{
    opacity: 0;
  }

  .ant-input-number-focused .ant-input-number-handler-wrap {
    opacity: 0 !important;
  }

  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border: 1px solid #ced4da;
  }
`

const CustomInputNumber = ({
  label,
  type,
  name,
  rules,
  step,
  display,
  onChange,
  placeholder,
  required,
  autoFocus,
  disabled,
  readOnly,
  width,
  precision,
  height,
  marginRight,
  labelStyle,
  defaultValue,
  placed,
  minWidth,
  optional,
  min,
  max,
  noStyle = undefined,
  ...rest
}) => {

  return (
    <StyledItem
      style={{
        width: width,
        marginRight: marginRight,
        minWidth: minWidth,
        display: display,
      }}
      rules={rules}
      noStyle={noStyle}
      name={name}
      colon={false}
      required={false}
      label={
        label && (
          <Fragment>
            <Label required={required} labelStyle={labelStyle}>
              {label} <span>{optional}</span>
            </Label>
          </Fragment>
        )
      }
    >
      <AntdInputNumberStyle
        {...rest}
        defaultValue={defaultValue}
        placed={placed}
        type={type}
        autoFocus={autoFocus}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        height={height}
        step={step}
        precision={precision}
        min={min}
        max={max}
      />
    </StyledItem>
  )
}

export default CustomInputNumber