interface VoiceCallRoom {
  channel: string
  token: string
}

export interface UserMetadata {
  userID: number
  username: string
  room: VoiceCallRoom
  password: string
}

const users: UserMetadata[] = [
  {
    userID: 1,
    username: 'ioniclac',
    room: {
      channel: 'room_a',
      token:
        '0066bcb6676562e42b6a4f5ed71591a83c5IAApshQatuHpjumHsiNkWfmLQgm8UEwAhyu6aamzUG1LYoZClsgAAAAAEABGROOedKe2YgEAAQB0p7Zi',
    },
    password: '1234567890',
  },
  {
    userID: 2,
    username: 'eaderymo',
    room: {
      channel: 'room_b',
      token:
        '0066bcb6676562e42b6a4f5ed71591a83c5IAAZIhN2WGMBhfBpC/0uNK5bzbR3KbXJR9htgYqvcnrcLjwTn1EAAAAAEABGROOe3J22YgEAAQDcnbZi',
    },
    password: '1234567890',
  },
  {
    userID: 3,
    username: 'advehrib',
    room: {
      channel: 'room_c',
      token:
        '0066bcb6676562e42b6a4f5ed71591a83c5IADM79F6aqAiCAUAsug2DHZuWfNJowoVl0w+y2/qod2YgKojmCYAAAAAEABGROOehKe2YgEAAQCEp7Zi',
    },
    password: '1234567890',
  },
  {
    userID: 4,
    username: 'dionsest',
    room: {
      channel: 'room_d',
      token:
        '0066bcb6676562e42b6a4f5ed71591a83c5IADZAlO2Lhn0r7IRfq+IrMhDzA4bMspfGSfC0o73TZP/9gm2/LgAAAAAEABGROOel6e2YgEAAQCXp7Zi',
    },
    password: '1234567890',
  },
  {
    userID: 5,
    username: 'eigalgen',
    room: {
      channel: 'room_e',
      token:
        '0066bcb6676562e42b6a4f5ed71591a83c5IABevMbHvyLJ2Aav/l2FHhOMWgN7VFyClFjSHyaMOH56U5+G+88AAAAAEABGROOep6e2YgEAAQCnp7Zi',
    },
    password: '1234567890',
  },
]

export default users
