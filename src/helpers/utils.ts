import users from 'constants/users'

import type { UserMetadata } from 'constants/users'
import type { UID } from 'agora-rtc-sdk-ng'

export const checkLoginUserInformation = (userInput: UserMetadata) => {
  const user = users.find(
    ({ username, password }) =>
      username === userInput.username && password === userInput.password
  )

  return user
}

export const findUserByUserID = (userID?: UID) =>
  users.find((user) => user.userID === userID)

export const findUserByUsername = (username: string | null) =>
  users.find((user) => user.username === username)
