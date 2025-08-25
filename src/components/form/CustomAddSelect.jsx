import { Fragment } from 'react';
import { Select as AntdSelect, Form } from 'antd';
import Label from '@components/form/Label';
import styled from 'styled-components';
import Button from '@components/form/CustomButton';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = AntdSelect;

const StyledItem = styled(Item)`
  width:100%;
  border-radius: 0.4rem;
  margin-bottom: 0px !important;

  > div {
    width: 100%;
    text-align: left;
  }

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    font-weight: 600 !important;
    position: relative;
    font-size: 15px;
    line-height: 1.3 !important;
    letter-spacing: 0.03em;
  }
`

const ButtonContainerHolder = styled.div`
  background:'green';
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  margin-bottom:5px;
`;
const AntdSelectStyle = styled(AntdSelect)`
  border-top-left-radius: 6px;
  height: ${props => (props.height ? props.height : '40px')};
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#D9D9D9')};

  .ant-select-single .ant-select-selector {
      box-sizing: border-box;
      margin: 0;
      padding: 2;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      display: flex;
      /* border-radius: 6px; */
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius:0.4rem;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
  }
  ::placeholder {
    font-size: 14px;
  }
  :focus {
    border-color: #E9E9E9;
    box-shadow: none;
  }
  :hover {
    /* border-color: #E9E9E9; */
  }
  & .ant-select-selector {
    height: 100% !important;
    & input {
      height: 100% !important;
    }
  }
  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border: 1px solid #D9D9D9;
  }
  & .ant-select-selection-item {
    margin: auto;
    font-size: 1rem;
    font-weight: 500;
  }
  & .ant-select-selection-placeholder {
    margin: auto;
  }
`

const CustomAddSelect = ({
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
  return (
    <ButtonContainerHolder>
      {
        label && (
          <Fragment>
            <Label required={required} labelStyle={labelStyle} style={{display:'block',padding:'0 0 8px'}}>
              {label} <span>{optional}</span>
            </Label>
          </Fragment>)
      }

      <ButtonContainer>
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
        // label={
        //   label && (
        //     <Fragment>
        //       <Label required={required} labelStyle={labelStyle}>
        //         {label} <span>{optional}</span>
        //       </Label>
        //     </Fragment>
        //   )
        // }
        >
          <AntdSelectStyle
            notFoundContent={notFoundContent}
            placeholder={placeholder}
            showSearch={true}
            value={value}
            disabled={disabled}
            onChange={onChange}
            name={name}
            defaultValue={defaultValue}
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
        <Button
          style={{
            height: '40px',
            backgroundColor: 'white',
            color: '#0958D9',
            borderTopRightRadius: '0.4rem',
            borderBottomRightRadius: '0.4rem',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
          // disabled={disabled || isSelectDisabled}
          onClick={onButtonClick}
        >
          <PlusCircleOutlined />
        </Button>
      </ButtonContainer>
    </ButtonContainerHolder>
  );
};

export default CustomAddSelect