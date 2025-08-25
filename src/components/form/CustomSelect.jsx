import React, { Fragment } from 'react'
import { Select as AntdSelect, Form } from 'antd'
import styled from 'styled-components'
import Label from '@components/form/Label'

const { Item } = Form
const { Option } = AntdSelect;

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left
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
const AntdSelectStyle = styled(AntdSelect)`
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: 0.4rem;
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#d9d9d9')};

::placeholder {
  font-size: 16px;
}

:focus {
  border-color: 1px solid #b3d8ff;
  box-shadow: none;
}

:hover {
  border-color:1px solid #b3d8ff;
}

& .ant-select-selector {
    height:100% !important;
    & input{
    height:100% !important;
    }
  }

  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border: 1px solid #d9d9d9;
  }

  & .ant-select-selection-item{
    margin:auto;
    font-size: 1rem;
    font-weight: 500;
  }

  & .ant-select-selection-placeholder { 
    margin:auto;
  }
`
const CustomSelect = ({
  initialValue,
  label,
  type,
  name,
  rules,
  onChange,
  placeholder,
  required,
  disabled,
  options,
  width,
  minWidth,
  height,
  notFoundContent,
  value,
  showSearch,
  marginRight,
  labelStyle,
  defaultValue,
  optional,
  noStyle = undefined,
  ...rest
}) => {
  const isRequired = Array.isArray(rules) && rules.some(rule => rule.required);
  return (

    <StyledItem
      style={{
        width: width,
        marginRight: marginRight,
        minWidth: minWidth
      }}
      rules={rules}
      noStyle={noStyle}
      name={name}
      disabled={disabled}
      colon={false}
      required={false}
      initialValue={initialValue}
      label={
        label && (
          <Fragment>
            <Label required={required} labelStyle={labelStyle}>
              {label} {isRequired && <span style={{ color: 'red' }}>*</span>} {optional}
            </Label>
          </Fragment>
        )
      }
    >
      <AntdSelectStyle
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        showSearch={true}
        notFoundContent={notFoundContent}
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
        filterSort={(optionA, optionB) =>
          (optionA?.children ?? '').toLowerCase().localeCompare((optionB?.children ?? '').toLowerCase())
        }
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </AntdSelectStyle>
    </StyledItem>
  )
}

export default CustomSelect


{/* <Col lg={8} md={12} span={24}>                >>>  FUTURE USE
            <Select
              options={option}
              placeholder={'Party Group'}
              label={'Party Group'}
              name={'party_group'}
              showSearch={true}
              rules={[
                {
                  required: true,
                  message: 'Please enter Phone Party Group!',
                }
              ]} />
          </Col> */}