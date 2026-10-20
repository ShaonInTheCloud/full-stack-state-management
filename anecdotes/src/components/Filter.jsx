import { useFilter, useAnecdoteActions } from '../store'

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdoteActions()
  return <label>filter <input value={filter} onChange={event => setFilter(event.target.value)} data-testid="filter" /></label>
}
export default Filter
