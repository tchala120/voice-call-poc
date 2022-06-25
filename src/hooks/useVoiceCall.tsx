import { useEffect, useState } from 'react'
import AgoraRTC, {
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  UID,
} from 'agora-rtc-sdk-ng'
import { notification } from 'antd'

const userJoinedSound = require('assets/sounds/user_joined.mp3')

interface UseVoiceCallResult {
  users: IAgoraRTCRemoteUser[]
  connectionState: ConnectionState
  localAudioTrack?: ILocalAudioTrack
  join: (
    appID: string,
    channel: string,
    token: string | null,
    uid?: UID | null
  ) => Promise<void>
  leave: () => Promise<void>
}

const useVoiceCall = (client: IAgoraRTCClient): UseVoiceCallResult => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([])
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('DISCONNECTED')
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack>()

  const createLocalAudioTrack = async () => {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack()

    setLocalAudioTrack(microphoneTrack)

    return microphoneTrack
  }

  const join = async (
    appID: string,
    channel: string,
    token: string | null,
    uid?: UID | null
  ) => {
    const localAudioTrack = await createLocalAudioTrack()

    await client.join(appID, channel, token, uid)
    await client.publish(localAudioTrack)
  }

  const leave = async () => {
    if (localAudioTrack != null) {
      localAudioTrack.stop()
      localAudioTrack.close()
    }

    await client.leave()
  }

  useEffect(() => {
    const handleConnectionState = (connectionState: ConnectionState) => {
      setConnectionState(connectionState)
    }

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: 'audio' | 'video'
    ) => {
      await client.subscribe(user, mediaType)

      setUsers(Array.from(client.remoteUsers))
    }

    const handleUserUnpublished = () => {
      setUsers(Array.from(client.remoteUsers))
    }

    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      if (client.uid !== user.uid) {
        const audio = new Audio(userJoinedSound)

        audio.play()
      }

      setUsers(Array.from(client.remoteUsers))
    }

    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      notification.open({
        key: 'userLeftToast',
        message: <span>{user.uid} has left the call</span>,
        placement: 'bottomLeft',
      })

      setUsers(Array.from(client.remoteUsers))
    }

    const handleUserInfoUpdated = () => {
      setUsers(Array.from(client.remoteUsers))
    }

    client.on('connection-state-change', handleConnectionState)
    client.on('user-published', handleUserPublished)
    client.on('user-unpublished', handleUserUnpublished)
    client.on('user-joined', handleUserJoined)
    client.on('user-left', handleUserLeft)
    client.on('user-info-updated', handleUserInfoUpdated)

    return () => {
      client.off('connection-state-change', handleConnectionState)
      client.off('user-published', handleUserPublished)
      client.off('user-unpublished', handleUserUnpublished)
      client.off('user-joined', handleUserJoined)
      client.off('user-left', handleUserLeft)
      client.off('user-info-updated', handleUserInfoUpdated)
    }
  })

  return {
    users,
    connectionState,
    localAudioTrack,
    join,
    leave,
  }
}

export default useVoiceCall
