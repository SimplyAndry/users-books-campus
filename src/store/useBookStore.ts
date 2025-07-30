import { create } from 'zustand'

interface BookStoreState {
    selectedBookId: string | null
    setSelectedBookId: (id: string | null) => void

    editingBookId: string | null
    setEditingBookId: (id: string | null) => void
}

export const useBookStore = create<BookStoreState>((set) => ({
    selectedBookId: null,
    setSelectedBookId: (id) => set({ selectedBookId: id }),

    editingBookId: null,
    setEditingBookId: (id) => set({ editingBookId: id }),
}))

// const { editingBookId, setEditingBookId } = useBookStore()