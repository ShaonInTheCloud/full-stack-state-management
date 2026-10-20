import { useNotification } from '../NotificationContext'
const Notification = () => {
  const message = useNotification()
  if (!message) return null
  return <div role="status" data-testid="notification" style={{ border: '1px solid', padding: 10 }}>{message}</div>
}
export default Notification
