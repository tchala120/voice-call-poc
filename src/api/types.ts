import { UseMutationOptions } from 'react-query'

export type ReactQueryMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
