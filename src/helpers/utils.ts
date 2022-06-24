import users from 'constants/users'

import type { UserMetadata } from 'constants/users'

export const checkLoginUserInformation = (userInput: UserMetadata) => {
  const user = users.find(
    ({ username, password }) =>
      username === userInput.username && password === userInput.password
  )

  return user
}

export const findUserByUsername = (username: string | null) =>
  users.find((user) => user.username === username)

export const getUserIDByUsername = (username: string | null) =>
  users.find((user) => user.username === username)?.userID
