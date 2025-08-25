import React from 'react'
import { Input, Form } from 'antd'
import Label from '@components/form/Label'
import styled from 'styled-components'

const { TextArea } = Input

const StyledItem = styled(Form.Item)`
  > div {
    width: 100%;
    text-align: left;
  }
  border-radius: 0.4rem;
  margin-bottom: 5px !important;
  
  .ant-input{
    font-size:14px !important;
    border-color: ${props => (props.error ? 'red' : '#d9d9d9')};
    border-radius: 0.4rem;
    font-weight: 600 !important;
  }

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    position: relative;
    line-height: 1.7;
    letter-spacing: 0.03em;
    font-size: 14px;
    font-weight: 600 !important;
  }



  .ant-input:focus,
  .ant-input-focused {
    border-color: #57a8e9;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(87,168,233, .2);
    box-shadow: 0 0 0 2px rgba(87,168,233, .2);
  }

  .ant-input[disabled]{
    color:#545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border-color: 1px solid #d9d9d9;
  }

  .ant-input:hover {
    border:1px solid #b3d8ff;
  }


`

const CustomTextArea = ({
  name,
  cols,
  type = 'text',
  placeholder,
  label,
  rules,
  display,
  required,
  rows = 4,
  ...rest
}) => {
  return (
    <StyledItem
      colon={false}
      required={false}
      label={
        label && (
          <Label required={required} showLock={rest.showLock}>
            {label}
          </Label>
        )
      }
      style={{
        display: display,
      }}
      rules={rules}
      name={name}
      {...rest}
    >
      <TextArea
        cols={cols}
        {...rest}
        type={type}
        rows={rows}
        placeholder={placeholder}
        style={{ resize: 'none' }}
      />
    </StyledItem>
  )
}

export default CustomTextArea