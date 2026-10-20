import { useState } from 'react'
import { useNotificationStore } from '../notificationStore'
import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const [saving, setSaving] = useState(false)
  const show = useNotificationStore(state => state.show)

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const content = form.elements.anecdote.value.trim()
    if (!content) return
    if (saving) return
    setSaving(true)
    try {
      await add(content)
      form.reset()
    } catch (error) {
      show(`Could not create anecdote: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="anecdote">Anecdote</label>
        <input id="anecdote" name="anecdote" data-testid="new" required />
        <button type="submit" disabled={saving}>create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm
