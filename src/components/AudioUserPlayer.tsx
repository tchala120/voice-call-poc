import type { FC } from 'react'
import type { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'

import { useEffect } from 'react'
import styled from '@emotion/styled'
import { Avatar, Space } from 'antd'

import FontAwesomeIcon from 'components/FontAwesomeIcon'

import { findUserByUserID } from 'helpers/utils'

interface AudioUserPlayerProps {
  user?: IAgoraRTCRemoteUser
}

const AudioUserPlayer: FC<AudioUserPlayerProps> = ({ user }) => {
  const userMetadata = findUserByUserID(user?.uid)

  useEffect(() => {
    const audio = user?.audioTrack

    if (audio == null) {
      return
    }

    audio.play()

    return () => {
      audio.stop()
    }
  }, [user?.audioTrack])

  return (
    <AudioUserPlayerContainer>
      <Avatar
        size={128}
        icon={<FontAwesomeIcon className="fa-user" size={64} />}
      />

      <UserInformationContainer>
        <Space>
          {user != null && !user?.hasAudio && (
            <FontAwesomeIcon className="fa-microphone-slash" />
          )}

          <strong>{userMetadata ? userMetadata.username : 'You'}</strong>
        </Space>
      </UserInformationContainer>
    </AudioUserPlayerContainer>
  )
}

export default AudioUserPlayer

const AudioUserPlayerContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0 10px 40px #ccc;
`

const UserInformationContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
`
