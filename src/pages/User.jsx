import React, { useState } from 'react'
import UserList from '../components/UserList'
import UserForm from '../components/UserForm'

export default function User() {
  const [editingUser, setEditingUser] = useState(null)

  const handleEdit = (user) => {
    setEditingUser(user)
  }

  const clearEditing = () => {
    setEditingUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-3xl text-black font-bold mb-6">CRUD Zustand</h1>
      <UserForm editingUser={editingUser} clearEditing={clearEditing} />
      <UserList onEdit={handleEdit} />
    </div>
  );
}