import React, { useEffect, useState } from "react";
import { db } from "../../../configs/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { FaEye } from "react-icons/fa";

const Dashboard = () => {
  const [count, setCount] = useState(null);

 useEffect(() => {
    const fetchVisitorCount = async () => {
      const docRef = doc(db, 'dashboard', 'visitors');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCount(docSnap.data().count);
      } else {
        console.log('No such document!');
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-violet-900 text-white flex items-center justify-center px-4">
      <div className="bg-violet-950 border border-violet-700 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-violet-300">
         Portfolio Dashboard
        </h1>

        <div className="flex items-center justify-between bg-violet-800 rounded-xl p-4 shadow-inner">
          <div className="flex items-center gap-3">
            <FaEye className="text-violet-300 text-2xl" />
            <span className="text-lg font-medium">Visitors</span>
          </div>
          <span className="text-2xl font-bold text-violet-100">
            {count !== null ? <p>{count}</p> : <p>Loading...</p>}
          </span>
        </div>

        <p className="text-sm text-violet-400 text-center mt-6">
          Powered by XyphX
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
