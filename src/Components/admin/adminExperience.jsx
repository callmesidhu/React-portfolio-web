import React, { useEffect, useState } from 'react';
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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    type: '',
    duration: '',
    location: '',
    description: '',
    skills: '',
    rank: ''
  });
  const [status, setStatus] = useState('');

  const expCollectionRef = collection(db, 'experience');

  const fetchExperience = async () => {
    try {
      const q = query(expCollectionRef, orderBy('rank', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleAdd = async () => {
    if (experiences.length >= 6) {
      setStatus("⚠️ Max 6 entries allowed.");
      return;
    }

    if (!newExp.title || !newExp.company || !newExp.rank) {
      setStatus("⚠️ Please fill required fields: Title, Company, Rank.");
      return;
    }

    const newItem = {
      ...newExp,
      skills: newExp.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      rank: parseInt(newExp.rank || "99")
    };

    try {
      await addDoc(expCollectionRef, newItem);
      setStatus("✅ Added successfully!");
      setNewExp({
        title: '', company: '', type: '', duration: '',
        location: '', description: '', skills: '', rank: ''
      });
      fetchExperience();
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error("Error adding experience:", error);
      setStatus("❌ Failed to add experience!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'experience', id));
      setStatus("✅ Deleted successfully!");
      fetchExperience();
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error("Error deleting experience:", error);
      setStatus("❌ Failed to delete experience!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#121212] rounded-xl shadow-lg text-[#ddd] font-sans">
      <h2 className="text-3xl font-semibold mb-6 text-violet-400 text-center">Manage Experience (Max 6)</h2>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto mb-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-violet-700 p-4 rounded-lg bg-[#1e1e1e] shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg text-violet-300">{exp.title} <span className="text-gray-500 font-normal">at {exp.company}</span></h3>
              <p className="text-sm text-gray-400 mt-1">{exp.type} | {exp.duration}</p>
              <p className="text-sm text-gray-400">{exp.location}</p>
              {exp.description && <p className="text-sm mt-2 text-gray-300">{exp.description}</p>}
              <p className="text-sm mt-2 text-gray-300">Skills: <span className="text-violet-400">{exp.skills?.join(', ')}</span></p>
              <p className="text-xs mt-2 text-gray-500">Rank: {exp.rank}</p>
            </div>
            <button
              onClick={() => handleDelete(exp.id)}
              className="mt-4 self-start text-red-500 hover:text-red-700 font-semibold transition-colors"
              aria-label={`Delete experience ${exp.title} at ${exp.company}`}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>

      <hr className="border-violet-700 mb-6" />

      {/* Add Experience Form */}
      <h3 className="text-2xl font-semibold mb-4 text-violet-400">Add New Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto mb-6">
        {[
          { placeholder: "Title *", name: "title" },
          { placeholder: "Company *", name: "company" },
          { placeholder: "Type (Internship, Part-time...)", name: "type" },
          { placeholder: "Duration (e.g., Jan 2024 - Present)", name: "duration" },
          { placeholder: "Location", name: "location" },
          { placeholder: "Description (optional)", name: "description" },
          { placeholder: "Skills (comma-separated)", name: "skills" },
          { placeholder: "Rank * (e.g. 1, 2, 3...)", name: "rank", type: "number" },
        ].map(({ placeholder, name, type }) => (
          <input
            key={name}
            type={type || "text"}
            placeholder={placeholder}
            value={newExp[name]}
            onChange={(e) => setNewExp({ ...newExp, [name]: e.target.value })}
            className="p-3 bg-[#1e1e1e] border border-violet-600 rounded-lg text-[#ddd] placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-300 max-w-[900px] mx-auto block"
      >
        ➕ Add Experience
      </button>

      {status && (
        <p
          className={`mt-4 text-center font-medium ${
            status.includes('✅') ? 'text-green-500' :
            status.includes('⚠️') ? 'text-yellow-400' :
            'text-red-500'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
