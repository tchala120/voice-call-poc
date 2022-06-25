import type { FC } from 'react'

import { useState } from 'react'
import { Button, Col, message, Row } from 'antd'
import AgoraRTC from 'agora-rtc-sdk-ng'

import useAuthContext from 'context/useAuthContext'

import AudioUserPlayer from 'components/AudioUserPlayer'
import CallMenuAction from 'components/CallMenuAction'

import PageLayout from 'layouts/PageLayout'

import useVoiceCall from 'hooks/useVoiceCall'

import { getUserIDByUsername } from 'helpers/utils'

import { clearLocalStorage, store } from 'services/localStorage'

import { appID } from 'constants/agora'

const client = AgoraRTC.createClient({
  codec: 'vp8',
  mode: 'rtc',
})

client.enableAudioVolumeIndicator()

const RoomPage: FC = () => {
  const auth = useAuthContext()
  const authUser = auth.user
  const room = authUser?.room

  const { users, connectionState, localAudioTrack, join, leave } =
    useVoiceCall(client)

  const [isMuted, setIsMuted] = useState(localAudioTrack?.muted)

  const isJoined = connectionState === 'CONNECTED'
  const userID = getUserIDByUsername(store.username.get())

  return (
    <PageLayout>
      {!isJoined && (
        <Button
          type="primary"
          onClick={() => {
            if (appID == null) {
              message.error(
                'Application ID is required. Try to check the env about APP_ID before start the project'
              )
              return
            }

            if (room?.channel == null || room?.token == null) {
              message
                .error('You cannot join the call please try to sign in again')
                .then(clearLocalStorage)

              return
            }

            join(appID, room.channel, room.token, userID)
          }}
        >
          Join Room
        </Button>
      )}

      {isJoined && (
        <>
          <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
            <Col span={12}>
              <AudioUserPlayer />
            </Col>

            {users.map((user) => (
              <Col key={user.uid} span={12}>
                <AudioUserPlayer user={user} />
              </Col>
            ))}
          </Row>

          <CallMenuAction
            uid={client.uid}
            isMuted={isMuted}
            onToggleMicrophone={() => {
              const nextMutedStatus = !localAudioTrack?.muted

              localAudioTrack?.setMuted(nextMutedStatus)
              setIsMuted(nextMutedStatus)
            }}
            onLeaveChannel={leave}
          />
        </>
      )}
    </PageLayout>
  )
}

export default RoomPage
