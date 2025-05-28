import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebase'; 

export default function AdminHero() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");


  const fetchRoles = async () => {
    const querySnapshot = await getDocs(collection(db, "roles"));
    const fetchedRoles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    fetchedRoles.sort((a, b) => a.order - b.order); 
    setRoles(fetchedRoles);
  };


  const addRole = async () => {
    if (!newRole.trim()) return;

    const nextOrder = roles.length > 0 ? Math.max(...roles.map(r => r.order)) + 1 : 1;

    await addDoc(collection(db, "roles"), {
      role: newRole,
      order: nextOrder,
    });

    setNewRole("");
    fetchRoles();
  };


  const deleteRole = async (id) => {
    await deleteDoc(doc(db, "roles", id));
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Roles</h2>

      {/* Add Role Form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Enter new role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button
          onClick={addRole}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      {/* Role List */}
      <ul className="space-y-2">
        {roles.map((role) => (
          <li
            key={role.id}
            className="flex justify-between items-center bg-gray-950 p-3 rounded"
          >
            <span>{role.role}</span>
            <button
              onClick={() => deleteRole(role.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
