// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react'
import { useUserStore } from '../store/useUserStore'

const UserForm = ({ editingUser, clearEditing }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const addUser = useUserStore((state) => state.addUser)
  const updateUser = useUserStore((state) => state.updateUser)

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name)
      setEmail(editingUser.email)
    } else {
      setName('')
      setEmail('')
    }
  }, [editingUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email) return

    if (editingUser) {
      updateUser(editingUser.id, { name, email })
      clearEditing()
    } else {
      addUser({ name, email })
    }

    setName('')
    setEmail('')
  }

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto mb-6">
      <h2 className="text-xl text-black font-semibold mb-4">
        {editingUser ? 'Edit User' : 'Tambah User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingUser ? 'Update' : 'Tambah'}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={clearEditing}
              className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserForm
