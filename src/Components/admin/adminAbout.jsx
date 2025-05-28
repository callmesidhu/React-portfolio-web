import React, { useEffect, useState } from 'react';
import { db } from '../../../configs/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function AdminAbout() {
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const docRef = doc(db, "about", "zPae0pmZUUI8p6dmga76");

  const fetchAbout = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAboutText(data.content);
      } else {
        setAboutText("No 'about' content found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching about:", error);
      setAboutText("Error fetching data.");
      setLoading(false);
    }
  };

  const updateAbout = async () => {
    try {
      await updateDoc(docRef, {
        content: aboutText,
      });
      setStatus("✅ About section updated!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error updating about:", error);
      setStatus("❌ Update failed.");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#121212] rounded-xl shadow-lg text-[#ddd] font-sans">
      <h2 className="text-3xl font-semibold mb-6 text-violet-400 text-center">Edit About Section</h2>

      {loading ? (
        <p className="text-violet-500 text-center">Fetching current data...</p>
      ) : (
        <>
          <textarea
            rows={14}
            className="w-full p-5 bg-[#1e1e1e] border border-violet-600 rounded-lg text-[#eee] text-sm placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Write about your project or company here..."
          />
          <button
            onClick={updateAbout}
            className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-300"
          >
            Save Changes
          </button>
          {status && (
            <p className={`mt-4 font-medium text-center ${status.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
              {status}
            </p>
          )}
        </>
      )}
    </div>
  );
}
