import React, { Fragment } from 'react'
import { TimePicker as AntdTimePicker, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '@theme/index'
import Label from '@components/form/Label'

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
  }

  border-radius: 10px;
  margin-bottom: 5px !important;

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
const AntdTimePickerStyle = styled(AntdTimePicker)`
        border-color: ${props => (props.error ? 'red' : '#8056F7')};
        width: 100%;
        height: 40px;
        
    :focus {
        border-color: 3px solid ${THEME.primary_color};
        box-shadow: none;
    }
    :hover {
        border-color: 3px solid ${THEME.primary_color};
    }
    :not(.ant-input-affix-wrapper-disabled):hover {
        border-color: 3px solid ${THEME.primary_color} !important;
    }
`
const CustomTimePicker = ({
    width,
    marginRight,
    minWidth,
    display,
    rules,
    noStyle = undefined,
    name,
    label,
    required,
    labelStyle,
    optional,
    disabled,
    placeholder,

    use12Hours,


    type,
    step,
    onChange,
    autoFocus,
    readOnly,
    height,
    defaultValue,
    value,
    ...rest
}) => {

    const TimeFormat = "HH:mm A";

    const handleTimeChange = (time, timeString) => {
        console.log(time,timeString,'lll');
        onChange(timeString);
    };

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
            <AntdTimePickerStyle
                {...rest}
                type={type}
                use12Hours={use12Hours}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={handleTimeChange}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                format={TimeFormat}
            />
        </StyledItem>
    )
}

export default CustomTimePicker

// --------------  Time Usage --------------

// =======  Get Selected Time =======
//  const [inTime, setInTime] = useState(null)

// const inTimeChange = (time) => {
//     setInTime(time);
// }


{/* <CustomTimePicker label={'Upload'} name={'Time'} onChange={inTimeChange} rules={[
            {
              required: true,
              message: 'Please Select Time'
            }
          ]}/> */}