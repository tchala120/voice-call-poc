import type { FC } from 'react'
import type { UID } from 'agora-rtc-sdk-ng'

import styled from '@emotion/styled'
import { Button, Space, Tooltip } from 'antd'

import FontAwesomeIcon from 'components/FontAwesomeIcon'
import { findUserByUserID } from 'helpers/utils'

interface CallMenuActionProps {
  isMuted?: boolean
  uid?: UID
  onToggleMicrophone?: VoidFunction
  onLeaveChannel?: VoidFunction
}

const CallMenuAction: FC<CallMenuActionProps> = ({
  uid,
  isMuted,
  onToggleMicrophone,
  onLeaveChannel,
}) => {
  const user = findUserByUserID(uid)

  const microphoneIcon = isMuted ? 'fa-microphone-slash' : 'fa-microphone'

  return (
    <CallMenuActionContainer>
      <Space size="large">
        <span>{user?.username}</span>

        <Space>
          <Tooltip title={isMuted ? 'Click to unmute' : 'Click to mute'}>
            <Button
              onClick={onToggleMicrophone}
              icon={<FontAwesomeIcon className={microphoneIcon} size={24} />}
              shape="circle"
            />
          </Tooltip>

          <Button
            danger
            type="primary"
            shape="circle"
            onClick={onLeaveChannel}
            icon={
              <FontAwesomeIcon
                className="fa-door-open"
                size={24}
                color="white"
              />
            }
          />
        </Space>
      </Space>
    </CallMenuActionContainer>
  )
}

export default CallMenuAction

const CallMenuActionContainer = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  padding: 8px 8px 8px 16px;
  border-radius: 36px;
  transform: translateX(calc(-50%));
  background: #000;

  span {
    font-weight: 500;
    color: #fff;
  }
`
