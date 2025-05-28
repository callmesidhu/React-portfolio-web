import React, { useState, useEffect } from 'react';
import { db } from '../../../configs/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';

const tabs = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'technologies', label: 'Technologies' },
];

export default function AdminSkills() {
  const [activeTab, setActiveTab] = useState('languages');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', src: '' });
  const [status, setStatus] = useState('');

  // Reference to the current collection based on active tab
  const currentCollection = collection(db, activeTab);

  // Fetch items from current collection ordered by id ascending
  const fetchItems = async () => {
    try {
      const q = query(currentCollection, orderBy('id', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
    setNewItem({ name: '', src: '' }); // reset input on tab change
    setStatus('');
  }, [activeTab]);

  // Get next id by incrementing max current id or start from 1
  const getNextId = () => {
    if (items.length === 0) return 1;
    return Math.max(...items.map(i => i.id)) + 1;
  };

  const handleAdd = async () => {
    if (!newItem.name.trim() || !newItem.src.trim()) {
      setStatus('⚠️ Please fill both Name and Image URL.');
      return;
    }

    // Basic URL validation
    try {
      new URL(newItem.src);
    } catch {
      setStatus('⚠️ Please enter a valid Image URL.');
      return;
    }

    const itemToAdd = {
      id: getNextId(),
      name: newItem.name.trim(),
      src: newItem.src.trim(),
    };

    try {
      await addDoc(currentCollection, itemToAdd);
      setStatus('✅ Added successfully!');
      setNewItem({ name: '', src: '' });
      fetchItems();
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error adding item:', error);
      setStatus('❌ Failed to add item!');
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, activeTab, docId));
      setStatus('✅ Deleted successfully!');
      fetchItems();
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error deleting item:', error);
      setStatus('❌ Failed to delete item!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#121212] rounded-xl shadow-lg text-[#ddd] font-sans">
      <h2 className="text-3xl font-semibold mb-6 text-violet-400 text-center">Manage Skills</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-6 border-b border-violet-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 -mb-[1px] border-b-4 font-semibold transition-colors
              ${
                activeTab === tab.id
                  ? 'border-violet-400 text-violet-400'
                  : 'border-transparent hover:text-violet-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add new skill */}
      <div className="max-w-[600px] mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name *"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="p-3 bg-[#1e1e1e] border border-violet-600 rounded-lg text-[#ddd] placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="Image URL *"
          value={newItem.src}
          onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
          className="p-3 bg-[#1e1e1e] border border-violet-600 rounded-lg text-[#ddd] placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="max-w-[600px] mx-auto mb-8 text-center">
        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-300"
        >
          ➕ Add {tabs.find(t => t.id === activeTab).label.slice(0, -1)}
        </button>
      </div>

      {/* Status message */}
      {status && (
        <p
          className={`text-center font-medium mb-6 ${
            status.includes('✅') ? 'text-green-500' :
            status.includes('⚠️') ? 'text-yellow-400' :
            'text-red-500'
          }`}
        >
          {status}
        </p>
      )}

      {/* List of added icons */}
      <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ docId, id, name, src }) => (
          <div
            key={docId}
            className="bg-[#1e1e1e] rounded-lg p-4 flex flex-col items-center shadow-md border border-violet-700"
          >
            <img
              src={src}
              alt={name}
              className="w-16 h-16 object-contain mb-2"
              loading="lazy"
            />
            <p className="text-sm text-violet-300 font-semibold">{name}</p>
            <p className="text-xs text-gray-500 mt-1">ID: {id}</p>
            <button
              onClick={() => handleDelete(docId)}
              className="mt-3 text-red-500 hover:text-red-700 font-semibold"
              aria-label={`Delete ${name}`}
            >
              ❌ Delete
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No items added yet.</p>
        )}
      </div>
    </div>
  );
}
