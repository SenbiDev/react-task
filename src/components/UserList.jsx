// src/components/UserList.jsx
import React from 'react'
import { useUserStore } from '../store/useUserStore'

const UserList = ({ onEdit }) => {
  const users = useUserStore((state) => state.users)
  const deleteUser = useUserStore((state) => state.deleteUser)

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl text-black font-semibold mb-4">Daftar User</h2>
      {users.length === 0 ? (
        <p className="text-gray-700">Tidak ada data.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div>
                <p className="font-medium text-black">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserList
