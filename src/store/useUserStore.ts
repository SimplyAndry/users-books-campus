import { create } from 'zustand'

interface UserStoreState {
    selectedUserId: string | null
    setSelectedUserId: (id: string | null) => void
}

export const useUserStore = create<UserStoreState>((set) => ({
    selectedUserId: null,
    setSelectedUserId: (id) => set({ selectedUserId: id }),
}))

// const selectedUserId = useUserStore((s) => s.selectedUserId)
// const setSelectedUserId = useUserStore((s) => s.setSelectedUserId)