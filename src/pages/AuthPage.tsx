import type { FC } from 'react'

import { Button, Form, Input, message } from 'antd'
import omit from 'lodash/omit'

import Center from 'components/Center'

import useAuthContext from 'context/useAuthContext'

import { checkLoginUserInformation } from 'helpers/utils'

import { baseFormProps, ruleRequired } from 'constants/antd'

const AuthPage: FC = () => {
  const auth = useAuthContext()

  return (
    <Center style={{ width: 300 }}>
      <Form
        {...baseFormProps}
        onFinish={(values) => {
          const user = checkLoginUserInformation(values)

          if (user != null) {
            const newUser = omit(user, 'password')

            auth.signIn(newUser)

            return
          }

          message.error('User does not exist or password is incorrect.')
        }}
      >
        <Form.Item name="username" label="Username" rules={[ruleRequired]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[ruleRequired]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Center>
  )
}

export default AuthPage
