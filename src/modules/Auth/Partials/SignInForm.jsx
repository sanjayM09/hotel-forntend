import React from 'react'
import styled from 'styled-components'
import { Col, Form, Input } from 'antd'
import { CustomRow, Flex } from '@components/others'
import { Button, CustomInput, CustomInputPassword } from '@components/form'

const InputWrapper = styled.div`
  padding-bottom: 25px;

`
const Header = styled.div`
  color:#fff;
  margin-bottom:20px;
`


const SignInForm = ({ handleSignIn }) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    handleSignIn(values)
    // form.resetFields();
  }

  return (
    <Form onFinish={onFinish}
      labelCol={{
        span: 24,
      }}
      autoComplete='off'
      wrapperCol={{
        span: 24,
      }}
      form={form}>

      <Flex center={'true'}>
        <Header>
          <h1 style={{ fontSize: '30px', }}>Login</h1>
        </Header>
      </Flex>

      <CustomRow space={[24, 24]}>
        <Col span={24}>
          <CustomInput
            name="email"
            placeholder={'Enter your Email'}
            rules={[
              { required: true, message: 'Please enter your email address' },
            ]} />
        </Col>

        <Col span={24}>
          <CustomInputPassword
            name="password"
            placeholder={'Enter your Password'}
            rules={[
              { required: true, message: 'Please enter a password' },
            ]} />
        </Col>

      </CustomRow>
      <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
        <Button.Primary text={'Login'} htmlType="submit" />
      </Flex>

    </Form>
  )
}

export default SignInForm
