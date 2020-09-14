import create from 'zustand'

export const useAppTheme = create<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' })),
}))
