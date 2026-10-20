import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { act, cleanup, render, renderHook, screen } from '@testing-library/react'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes', () => ({ default: {
  getAll: vi.fn(), createNew: vi.fn(), update: vi.fn(), remove: vi.fn(),
} }))
const sample = [
  { id: 'a', content: 'Keep code simple', votes: 1 },
  { id: 'b', content: 'Test every change', votes: 5 },
  { id: 'c', content: 'Read code carefully', votes: 3 },
]
beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes: [], filter: '', pending: {}, error: '' })
})
afterEach(cleanup)

describe('anecdote store and list', () => {
  it('initializes with exact backend anecdotes and vote counts', async () => {
    anecdoteService.getAll.mockResolvedValue(sample)
    const { result } = renderHook(useAnecdoteActions)
    await act(async () => { await result.current.initialize() })
    expect(useAnecdoteStore.getState().anecdotes).toEqual(sample)
    expect(anecdoteService.getAll).toHaveBeenCalledOnce()
  })
  it('gives the list descending votes without mutating source data', () => {
    useAnecdoteStore.setState({ anecdotes: sample })
    const { result } = renderHook(useAnecdotes)
    expect(result.current.map(item => item.id)).toEqual(['b', 'c', 'a'])
    render(<AnecdoteList />)
    const rows = screen.getAllByRole('button', { name: 'vote' }).map(button => button.parentElement.parentElement.textContent)
    expect(rows[0]).toContain('Test every change')
    expect(rows[2]).toContain('Keep code simple')
    expect(sample.map(item => item.id)).toEqual(['a', 'b', 'c'])
  })
  it('filters the rendered list case-insensitively and retains vote order', () => {
    useAnecdoteStore.setState({ anecdotes: sample, filter: 'CODE' })
    const { result } = renderHook(useAnecdotes)
    expect(result.current.map(item => item.id)).toEqual(['c', 'a'])
    render(<AnecdoteList />)
    expect(screen.queryByText('Test every change')).toBeNull()
    expect(screen.getAllByRole('button', { name: 'vote' })).toHaveLength(2)
  })
  it('persists repeated votes and leaves other anecdotes unchanged', async () => {
    useAnecdoteStore.setState({ anecdotes: sample })
    anecdoteService.update.mockImplementation(async (id, item) => item)
    const { result } = renderHook(useAnecdoteActions)
    await act(async () => { await result.current.vote('a'); await result.current.vote('a') })
    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(3)
    expect(useAnecdoteStore.getState().anecdotes[1]).toEqual(sample[1])
    expect(sample[0].votes).toBe(1)
    expect(anecdoteService.update).toHaveBeenLastCalledWith('a', { ...sample[0], votes: 3 })
  })
  it('does not change state after a failed vote and releases pending status', async () => {
    useAnecdoteStore.setState({ anecdotes: sample })
    anecdoteService.update.mockRejectedValue(new Error('offline'))
    await expect(useAnecdoteStore.getState().actions.vote('a')).rejects.toThrow('offline')
    expect(useAnecdoteStore.getState().anecdotes).toEqual(sample)
    expect(useAnecdoteStore.getState().pending.a).toBe(false)
  })
  it('refuses to delete a voted anecdote', async () => {
    useAnecdoteStore.setState({ anecdotes: sample })
    await useAnecdoteStore.getState().actions.remove('a')
    expect(anecdoteService.remove).not.toHaveBeenCalled()
    expect(useAnecdoteStore.getState().anecdotes).toEqual(sample)
  })
})
