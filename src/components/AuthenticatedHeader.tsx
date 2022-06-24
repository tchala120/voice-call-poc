import type { FC } from 'react'

import styled from '@emotion/styled'
import { Dropdown, Layout, Menu, Space } from 'antd'

import FontAwesomeIcon from 'components/FontAwesomeIcon'

import useAuthContext from 'context/useAuthContext'

const AuthenticatedHeader: FC = () => {
  const auth = useAuthContext()
  const authUser = auth.user

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          icon: <FontAwesomeIcon className="fa-arrow-right-from-bracket" />,
          label: <span onClick={auth.signOut}>Log out</span>,
        },
      ]}
    />
  )

  return (
    <AuthenticatedHeaderContainer>
      <span></span>

      <Space>
        Logged in as
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <strong
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: '#1890ff',
            }}
          >
            {authUser?.username}
          </strong>
        </Dropdown>
      </Space>
    </AuthenticatedHeaderContainer>
  )
}

export default AuthenticatedHeader

const AuthenticatedHeaderContainer = styled(Layout.Header)`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
