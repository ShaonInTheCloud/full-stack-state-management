import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, voteAnecdote } from '../services/anecdotes'
import { useNotify } from '../NotificationContext'

export const useAnecdotes = () => useQuery({
  queryKey: ['anecdotes'], queryFn: getAnecdotes, retry: false,
})

export const useCreateAnecdote = () => {
  const client = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: anecdote => {
      client.setQueryData(['anecdotes'], old => [...(old || []), anecdote])
      notify(`you created '${anecdote.content}'`)
    },
    onError: error => notify(error.message),
  })
}

export const useVoteAnecdote = () => {
  const client = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn: voteAnecdote,
    onSuccess: anecdote => {
      client.setQueryData(['anecdotes'], old => (old || []).map(item => item.id === anecdote.id ? anecdote : item))
      notify(`you voted '${anecdote.content}'`)
    },
    onError: error => notify(`Could not save vote: ${error.message}`),
  })
}
