import type { FC } from 'react'

import { useState } from 'react'
import { Button, Col, message, Row } from 'antd'
import AgoraRTC from 'agora-rtc-sdk-ng'

import AudioUserPlayer from 'components/AudioUserPlayer'
import CallMenuAction from 'components/CallMenuAction'

import PageLayout from 'layouts/PageLayout'

import useVoiceCall from 'hooks/useVoiceCall'

import useAuthContext from 'context/useAuthContext'

import { appID } from 'constants/agora'

import { clearLocalStorage } from 'services/localStorage'

import useGenerateRTCToken from 'api/useGenerateRTCToken'

const client = AgoraRTC.createClient({
  codec: 'vp8',
  mode: 'rtc',
})

client.enableAudioVolumeIndicator()

const RoomPage: FC = () => {
  const auth = useAuthContext()
  const authUser = auth.user
  const room = authUser?.room as string

  const { isLoading, mutate } = useGenerateRTCToken({
    onSuccess({ data }) {
      const { token } = data

      if (appID == null) {
        message.error(
          'Application ID is required. Try to check the env about APP_ID before start the project'
        )
        return
      }

      join(appID, room, token, authUser?.userID)
    },
    onError(error) {
      message.error(error.message).then(clearLocalStorage)
    },
  })

  const { users, connectionState, localAudioTrack, join, leave } =
    useVoiceCall(client)

  const [isMuted, setIsMuted] = useState(localAudioTrack?.muted)

  const isJoined = connectionState === 'CONNECTED'

  return (
    <PageLayout>
      {!isJoined && (
        <Button
          type="primary"
          loading={isLoading}
          onClick={() =>
            mutate({
              room,
              uid: authUser?.userID,
            })
          }
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
