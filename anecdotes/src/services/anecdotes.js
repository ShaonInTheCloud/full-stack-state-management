const baseUrl = 'http://localhost:3001/anecdotes'

const request = async (path = '', options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  if (response.status === 204) return null
  return response.json()
}

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export default {
  getAll: () => request(),
  createNew: content => request('', json('POST', { content, votes: 0 })),
  update: (id, anecdote) => request(`/${encodeURIComponent(id)}`, json('PUT', anecdote)),
  remove: id => request(`/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
