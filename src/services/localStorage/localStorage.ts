import storage from 'store'

import type { LocalKey } from './types'

const prefix = 'voice-call'

const storageVersion = '1.0.0'

const storageKey: Record<LocalKey, string> = {
  username: `${prefix}:username`,
  version: `${prefix}:version`,
}

const username = {
  get: (): string | null => storage.get(storageKey.username),
  set: (username: string) => storage.set(storageKey.username, username),
}

const version = {
  get: (): string | null => storage.get(storageKey.version),
  set: (version: string) => storage.set(storageKey.version, version),
}

export const store = {
  username,
  version,
}

export const clearLocalStorage = () => {
  storage.clearAll()
}

const setupLocalStorage = () => {
  const currentStorageVersion = version.get()

  if (currentStorageVersion !== storageVersion) {
    clearLocalStorage()

    version.set(storageVersion)
  }
}

export default setupLocalStorage
