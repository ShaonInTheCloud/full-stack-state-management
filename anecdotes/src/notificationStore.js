import { create } from 'zustand'

let timer
export const useNotificationStore = create(set => ({
  message: '',
  show: message => {
    clearTimeout(timer)
    set({ message })
    timer = setTimeout(() => set({ message: '' }), 5000)
  },
}))
