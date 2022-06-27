export interface UserMetadata {
  userID: number
  username: string
  room: string
  password: string
}

const users: UserMetadata[] = [
  {
    userID: 1,
    username: 'ioniclac',
    room: 'room_a',
    password: '1234567890',
  },
  {
    userID: 2,
    username: 'eaderymo',
    room: 'room_b',
    password: '1234567890',
  },
  {
    userID: 3,
    username: 'advehrib',
    room: 'room_c',
    password: '1234567890',
  },
  {
    userID: 4,
    username: 'dionsest',
    room: 'room_d',
    password: '1234567890',
  },
  {
    userID: 5,
    username: 'eigalgen',
    room: 'room_e',
    password: '1234567890',
  },
  {
    userID: 6,
    username: 'ombeleti',
    room: 'room_f',
    password: '1234567890',
  },
]

export default users
