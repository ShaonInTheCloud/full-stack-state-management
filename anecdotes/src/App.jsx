import { useEffect } from 'react'
import useAnecdoteStore, { useAnecdoteActions } from './store'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const { initialize } = useAnecdoteActions()
  const error = useAnecdoteStore(state => state.error)
  useEffect(() => { initialize() }, [initialize])
  return (
    <main>
      <h2>Anecdotes</h2>
      <Notification />
      {error && <p role="alert">{error}</p>}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </main>
  )
}
export default App
