import { create } from 'zustand'

let idCounter = 3 // Dummy id tracker

export const useUserStore = create((set) => ({
  users: [
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
  ],

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { id: idCounter++, ...user }]
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    }))
}))
