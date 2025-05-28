import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
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
    <div className="max-w-md mx-auto p-6 bg-[#121212] rounded-xl shadow-lg text-[#ddd] font-sans">
      <h2 className="text-3xl font-semibold mb-6 text-violet-400 text-center">Manage Roles</h2>

      {/* Add Role Form */}
      <div className="mb-8 flex gap-3">
        <input
          type="text"
          className="flex-grow bg-[#1e1e1e] border border-violet-600 rounded-md px-4 py-3 text-[#eee] placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Enter new role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button
          onClick={addRole}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-md font-semibold transition-colors duration-300"
        >
          Add
        </button>
      </div>

      {/* Role List */}
      <ul className="space-y-3">
        {roles.length === 0 && (
          <p className="text-center text-violet-500">No roles found.</p>
        )}
        {roles.map((role) => (
          <li
            key={role.id}
            className="flex justify-between items-center bg-[#1b1b1b] rounded-lg p-4 shadow-md border border-violet-700 hover:scale-[1.03] transition-transform duration-200"
          >
            <span className="text-violet-300 font-medium">{role.role}</span>
            <button
              onClick={() => deleteRole(role.id)}
              className="text-red-500 hover:text-red-700 text-sm font-semibold"
              aria-label={`Delete role ${role.role}`}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
