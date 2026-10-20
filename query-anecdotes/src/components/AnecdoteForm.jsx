import { useCreateAnecdote } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const creation = useCreateAnecdote()
  const submit = event => {
    event.preventDefault()
    if (creation.isPending) return
    const form = event.currentTarget
    creation.mutate(form.elements.anecdote.value.trim(), { onSuccess: () => form.reset() })
  }
  return (
    <section>
      <h3>create new</h3>
      <form onSubmit={submit}>
        <label htmlFor="anecdote">Anecdote</label>
        <input id="anecdote" name="anecdote" />
        <button disabled={creation.isPending} type="submit">create</button>
      </form>
    </section>
  )
}
export default AnecdoteForm
