const baseUrl = 'http://localhost:3001/anecdotes'
const request = async (path = '', options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data
}
const json = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
export const getAnecdotes = () => request()
export const createAnecdote = content => request('', json('POST', { content, votes: 0 }))
export const voteAnecdote = anecdote => request(`/${encodeURIComponent(anecdote.id)}`, json('PUT', { ...anecdote, votes: anecdote.votes + 1 }))
