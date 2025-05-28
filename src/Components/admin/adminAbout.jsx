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

  // 🟢 Update the 'about' content
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit About Section</h2>

      {loading ? (
        <p className="text-gray-500">Fetching current data...</p>
      ) : (
        <>
          <textarea
            rows={14}
            className="w-full p-4 border rounded text-sm"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
          <button
            onClick={updateAbout}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>
          {status && <p className="mt-3 text-green-600 font-medium">{status}</p>}
        </>
      )}
    </div>
  );
}
