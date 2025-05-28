import React, { useEffect, useState } from 'react';
import { db } from '../../../configs/firebase';
import { 
  collection, doc, onSnapshot, runTransaction, addDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projArr = [];
      snapshot.forEach(doc => {
        projArr.push({ docId: doc.id, ...doc.data() });
      });
      setProjects(projArr);
    });
    return () => unsubscribe();
  }, []);

  const addProject = async () => {
    if (!title || !tech) {
      alert('Title and Tech are required');
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const counterRef = doc(db, 'counters', 'projects');
        const counterDoc = await transaction.get(counterRef);

        let newId = 1;
        if (counterDoc.exists()) {
          newId = counterDoc.data().current + 1;
        }

        const newProject = { id: newId, title, tech, description, link, image };

        const projectsCol = collection(db, 'projects');
        await addDoc(projectsCol, newProject);

        transaction.set(counterRef, { current: newId });
      });

      setTitle('');
      setTech('');
      setDescription('');
      setLink('');
      setImage('');
    } catch (e) {
      console.error('Failed to add project:', e);
      alert('Error adding project');
    }
  };

  const deleteProject = async (docId) => {
    try {
      await deleteDoc(doc(db, 'projects', docId));
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 rounded-xl bg-gray-900 text-gray-200 font-sans shadow-lg">
      <h1 className="text-center text-4xl font-bold text-violet-400 mb-8">Project Manager</h1>

      <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-12">
        <h2 className="text-violet-300 text-2xl mb-6 font-semibold">Add New Project</h2>

        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="Tech (e.g., Nodejs, React) *"
          value={tech}
          onChange={e => setTech(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="Link (https://...)"
          value={link}
          onChange={e => setLink(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="w-full p-3 mb-6 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={addProject}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-md text-white font-semibold transition-colors duration-300"
        >
          Add Project
        </button>
      </section>

      <section>
        <h2 className="text-violet-300 text-2xl mb-6 text-center font-semibold">Projects List</h2>
        {projects.length === 0 && <p className="text-center text-gray-500">No projects found.</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map(proj => (
            <div
              key={proj.docId}
              className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 flex flex-col text-gray-300 transform transition-transform duration-200 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-violet-400 mb-2">
                {proj.title} <span className="font-normal text-gray-500">(ID: {proj.id})</span>
              </h3>
              <p className="font-semibold text-violet-300 mb-2">Tech: {proj.tech}</p>
              <p className="flex-grow mb-4">{proj.description}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-500 underline mb-4"
                >
                  Project Link
                </a>
              )}
              {proj.image && (
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="rounded-md mb-4 object-cover max-h-44 w-full"
                />
              )}
              <button
                onClick={() => deleteProject(proj.docId)}
                className="self-start px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
