import type { UID } from 'agora-rtc-sdk-ng'

import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { apiEndpoint } from 'constants/api'

import type { ReactQueryMutationOptions } from 'api/types'

interface GenerateRTCTokenData {
  token: string
}

interface GenerateRTCTokenVariables {
  room: string
  uid?: UID
}

const useGenerateRTCToken = (
  options?: ReactQueryMutationOptions<
    AxiosResponse<GenerateRTCTokenData, GenerateRTCTokenVariables>,
    AxiosError<GenerateRTCTokenData, GenerateRTCTokenVariables>,
    GenerateRTCTokenVariables
  >
) =>
  useMutation<
    AxiosResponse<GenerateRTCTokenData, GenerateRTCTokenVariables>,
    AxiosError<GenerateRTCTokenData, GenerateRTCTokenVariables>,
    GenerateRTCTokenVariables
  >((generateRTCTokenData) => {
    const { room, uid } = generateRTCTokenData

    return axios.get(apiEndpoint + `/generate-rtc-token/${room}/${uid}`)
  }, options)

export default useGenerateRTCToken
