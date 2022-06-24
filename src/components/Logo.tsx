import type { FC } from 'react'

import { Space } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'
import styled from '@emotion/styled'

const Logo: FC = () => {
  return (
    <LogoContainer>
      <Space>
        <FontAwesomeIcon className="fa-headset" size={36} color="white" />
        <span>Call Center</span>
      </Space>
    </LogoContainer>
  )
}

export default Logo

const LogoContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-weight: 500;
  }
`
