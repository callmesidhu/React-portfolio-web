import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { auth } from "../../configs/firebase"; 

import AdminAbout from "./admin/adminAbout";
import AdminExperience from "./admin/adminExperience";
import AdminProjects from "./admin/adminProjects";
import AdminHero from "./admin/adminHero";
import AdminTechnologies from "./admin/adminTechnologies";
import AdminLanguages from "./admin/adminLanguages";
import AdminFrameworks from "./admin/adminFrameworks";
import AdminContact from "./admin/adminContact";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Hero");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Hero":
        return <AdminHero />;
      case "About":
        return <AdminAbout />;
      case "Experience":
        return <AdminExperience />;
      case "Projects":
        return <AdminProjects />;
      case "Technologies":
        return <AdminTechnologies />;
      case "Languages":
        return <AdminLanguages />;
      case "Frameworks":
        return <AdminFrameworks />;
      case "Contact":
        return <AdminContact />;
      default:
        return <AdminHero />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading dashboard...
      </div>
    );
  }

  const tabs = [
    "Hero",
    "About",
    "Experience",
    "Projects",
    "Technologies",
    "Languages",
    "Frameworks",
    "Contact",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex">
      <aside className="w-64 bg-violet-900 p-6 rounded-lg shadow-lg h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === tab
                  ? "bg-white text-[#6A0DAD] font-semibold"
                  : "hover:bg-purple-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md w-full"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 ml-8">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
