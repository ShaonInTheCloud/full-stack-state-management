import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const NotificationContext = createContext(null)

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const timer = useRef()
  const notify = useCallback(message => {
    clearTimeout(timer.current)
    setMessage(message)
    timer.current = setTimeout(() => setMessage(''), 5000)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  const value = useMemo(() => ({ message, notify }), [message, notify])
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

// Context and its public hooks form one module as required by the exercise.
// eslint-disable-next-line react-refresh/only-export-components
export const useNotify = () => useContext(NotificationContext).notify
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext).message
