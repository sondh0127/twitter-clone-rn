import AsyncStorage from '@react-native-community/async-storage'
import create from 'zustand'

export const useAuth = create<{
  isLoading: boolean
  session: Session | null
  login: (session: Session) => void
  logout: () => void
}>((set) => ({
  isLoading: true,
  session: null,
  login: (session) =>
    set(() => {
      AsyncStorage.setItem('@session', JSON.stringify(session))
      return { isLoading: false, session }
    }),
  logout: () =>
    set(() => {
      AsyncStorage.removeItem('@session')
      return { isLoading: false, session: null }
    }),
}))
