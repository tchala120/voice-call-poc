import users from 'constants/users'

import type { UserMetadata } from 'constants/users'

export const checkLoginUserInformation = (userInput: UserMetadata) => {
  const user = users.find(
    ({ username, password }) =>
      username === userInput.username && password === userInput.password
  )

  if (user == null) {
    return false
  }

  return true
}
