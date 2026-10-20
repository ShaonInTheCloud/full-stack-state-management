import { useNotificationStore } from '../notificationStore'

const Notification = () => {
  const message = useNotificationStore(state => state.message)
  if (!message) return null
  return <div role="status" style={{ border: '1px solid', padding: 10, marginBottom: 10 }} data-testid="notification">{message}</div>
}
export default Notification
