// import { Select, Button } from 'antd';
import { Fragment, useState } from 'react';
import { Select as AntdSelect, Form } from 'antd'
import styled from 'styled-components'
import { PlusCircleOutlined } from '@ant-design/icons'
import { THEME } from '@theme/index';
import Label from '@components/form/Label';
import Button from '@components/form/CustomButton';

const { Item } = Form
const { Option } = AntdSelect;

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  border-radius: 8px;
  margin-bottom: -5px !important;
  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }
  & .ant-form-item-label > label > span {
   
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const AntdSelectStyle = styled(AntdSelect)`
margin-bottom:5px;
font-family:  'Poppins', sans-serif;
font-weight:600;
::placeholder {
  font-size: 16px;
}
height: ${props => (props.height ? props.height : '40px')};
border-radius: 8px;
box-shadow: none;
border-color: ${props => (props.error ? 'red' : '#8056F7')};
:focus {
  border-color: ${THEME.primary_color};
  box-shadow: none;
}
:hover {
  border-color: ${THEME.primary_color};
}
& .ant-select-selector {
    height:100% !important;
    border: 1px solid ${THEME.primary_color} !important;
    color: rgb(14 13 13) !important;
    & input{
    height:100% !important;
    /* border: 1px solid ${THEME.primary_color}; */

    }
  }
  &.ant-input[disabled] {
    /* color: ${THEME.black}; */
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }
  & .ant-select-selection-item{
    margin:auto;
    font-size: 1rem;
    font-weight: 600;
  }
  & .ant-select-selection-placeholder { 
    margin:auto;
  }
`

const CustomDropSelect = ({
    initialValue,
    label,
    type,
    name,
    buttonLabel,
    onButtonClick,
    rules,
    onChange,
    placeholder,
    required,
    disabled,
    options,
    width,
    minWidth,
    height,
    onSearch,
    searchText,
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleButtonClick = () => {
        setIsDropdownOpen(false);
        onButtonClick();
    };

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
            colon={false}
            required={false}
            initialValue={initialValue}
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
            <AntdSelectStyle
                placeholder={placeholder}
                showSearch={showSearch}
                value={searchText}
                onChange={onChange}
                onSearch={onSearch}
                disabled={disabled}
                defaultValue={defaultValue}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={(menu) => (
                    <div>
                        <div style={{ padding: '8px 12px' }}>
                            <Button style={{ border: `1px solid ${THEME.PRIMARY}`, width: '100%', color: `${THEME.PRIMARY}`, }} onClick={handleButtonClick}>
                                <PlusCircleOutlined /> {buttonLabel}
                            </Button>
                        </div>
                        {menu}
                    </div>
                )}
                open={isDropdownOpen}
                onDropdownVisibleChange={(open) => setIsDropdownOpen(open)}
                {...rest}
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

export default CustomDropSelect