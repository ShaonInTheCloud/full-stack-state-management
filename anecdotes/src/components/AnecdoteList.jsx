import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const pending = useAnecdoteStore(state => state.pending)
  const show = useNotificationStore(state => state.show)
  const perform = action => action().catch(error => show(`Could not save change: ${error.message}`))

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button type="button" disabled={pending[anecdote.id]} onClick={() => perform(() => vote(anecdote.id))}>vote</button>
        {anecdote.votes === 0 && <button type="button" disabled={pending[anecdote.id]} onClick={() => perform(() => remove(anecdote.id))}>delete</button>}
      </div>
    </div>
  ))
}
export default AnecdoteList
