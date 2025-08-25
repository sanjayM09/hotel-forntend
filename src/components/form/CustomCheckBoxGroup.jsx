/* eslint-disable */
import React, { Fragment } from 'react'
import { Checkbox as AntdCheckbox, Col, Form } from 'antd'
import styled from 'styled-components'
import Label from '@components/form/Label'
import { CustomRow } from '@components/others'

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  border-radius: 8px;
  margin-bottom: 5px !important;
  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }
`
const StyledCheckbox = styled(AntdCheckbox)`
  & .ant-checkbox .ant-checkbox-inner {
    width: ${props => (props.Big ? '25px' : '18px')};
    height: ${props => (props.Big ? '25px' : '18px')};
    /* background: ${props => props.color || 'black'}; */

    &:hover {
      /* background: ${props => props.color || 'black'}; */
      /* border-color: ${props => props.color || 'black'}; */
    }
  }
  & .ant-checkbox .ant-checkbox-inner:after {
    inset-inline-start: 25%;
  }
  &.ant-checkbox-wrapper {
    align-items: center;
    height: 100%;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    /* background-color: ${props => props.color || 'black'}; */
    /* border-color: ${props => props.color || 'black'}; */
  }
  .ant-checkbox + span {
    padding-left: 12px;
  }
`

const LabelWrapper = styled.h3`
  font-size: 14px;
  line-height: 24px;
  /* color: #202020; */
`
const CustomCheckBoxGroup = ({
  label,
  type,
  name,
  rules,
  step,
  options,
  onChange,
  placeholder,
  required,
  autoFocus,
  disabled,
  readOnly,
  width,
  height,
  marginRight,
  labelStyle,
  defaultValue,
  minWidth,
  value,
  optional,
  noStyle = undefined,
  ...rest
}) => {

  return (
    <StyledItem
      style={{
        width: width,
        marginRight: marginRight,
        minWidth: minWidth,
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
      <StyledCheckbox.Group
        {...rest}
        defaultValue={defaultValue}
        type={type}
        autoFocus={autoFocus}
        readOnly={readOnly}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        height={height}>
        <CustomRow>
          {options.map((item) => (
            <Col span={12} key={item.value}>
              <StyledCheckbox value={item.value}><LabelWrapper>{item.label}</LabelWrapper></StyledCheckbox>
            </Col>
          ))}
        </CustomRow>
      </StyledCheckbox.Group>
    </StyledItem>
  )
}

export default CustomCheckBoxGroup