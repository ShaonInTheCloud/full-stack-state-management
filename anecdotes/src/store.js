import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import { useNotificationStore } from './notificationStore'

const notify = message => useNotificationStore.getState().show(message)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  pending: {},
  error: '',
  actions: {
    initialize: async () => {
      try {
        const anecdotes = await anecdoteService.getAll()
        set({ anecdotes, error: '' })
      } catch (error) {
        set({ error: `Unable to load anecdotes: ${error.message}` })
      }
    },
    setFilter: filter => set({ filter }),
    add: async content => {
      const trimmed = content.trim()
      if (!trimmed) return false
      const anecdote = await anecdoteService.createNew(trimmed)
      set(state => ({ anecdotes: state.anecdotes.concat(anecdote) }))
      notify(`you created '${anecdote.content}'`)
      return true
    },
    vote: async id => {
      if (get().pending[id]) return
      const anecdote = get().anecdotes.find(item => item.id === id)
      if (!anecdote) return
      set(state => ({ pending: { ...state.pending, [id]: true } }))
      try {
        const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
        set(state => ({ anecdotes: state.anecdotes.map(item => item.id === id ? updated : item) }))
        notify(`you voted '${updated.content}'`)
      } finally {
        set(state => ({ pending: { ...state.pending, [id]: false } }))
      }
    },
    remove: async id => {
      const anecdote = get().anecdotes.find(item => item.id === id)
      if (!anecdote || anecdote.votes !== 0 || get().pending[id]) return
      set(state => ({ pending: { ...state.pending, [id]: true } }))
      try {
        await anecdoteService.remove(id)
        set(state => ({ anecdotes: state.anecdotes.filter(item => item.id !== id) }))
      } finally {
        set(state => ({ pending: { ...state.pending, [id]: false } }))
      }
    },
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export default useAnecdoteStore
