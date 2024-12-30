import { User } from '@/lib/bizTypes'
import { create } from 'zustand'

type UserState = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set({ user })
  },
}))
