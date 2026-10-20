import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes, useVoteAnecdote } from './hooks/useAnecdotes'

const App = () => {
  const query = useAnecdotes()
  const voting = useVoteAnecdote()
  if (query.isPending) return <p role="status">Loading anecdotes…</p>
  if (query.isError) return <p role="alert">anecdote service not available due to problems in server</p>
  return (
    <main>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {query.data.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button disabled={voting.isPending} onClick={() => voting.mutate(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </main>
  )
}
export default App
