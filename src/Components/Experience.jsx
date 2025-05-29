import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { db } from '../../configs/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [inView, setInView] = useState(false);
  const experienceRef = useRef(null);

  // 🔥 Fetch from Firestore 'experience' collection
  useEffect(() => {
    const fetchExperienceFromFirestore = async () => {
      try {
        const experienceCollection = collection(db, "experience");
        const snapshot = await getDocs(experienceCollection);
        const experienceData = snapshot.docs.map(doc => doc.data());
        setExperiences(experienceData);
      } catch (err) {
        console.error("Failed to fetch experiences from Firestore:", err);
      }
    };

    fetchExperienceFromFirestore();
  }, []);

  // 🔍 InView animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, []);

  // ⏱️ Duration Calculator
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    const diffInMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() - start.getMonth();

    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;
      return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
    }
  };

  return (
    <a href='https://www.linkedin.com/in/callmesidhu/details/experience/'>
      <div
        ref={experienceRef}
        id="experience"
        className="flex flex-col items-center min-h-screen bg-black text-white px-4 py-12 overflow-x-hidden"
      >
        <h2 className="text-4xl font-bold text-center ">
          Current Positions
        </h2>
        <u className="mb-12"> Double click here for more</u>

        <div className="relative border-l-2 border-gray-700 pl-6 max-w-3xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-8 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
              }}
            >
              <div className="absolute -left-3 top-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-black font-bold">
                {index + 1}
              </div>

              <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-lg text-gray-300">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {`${exp.duration || `${exp.startDate} - ${exp.endDate !== "Present" ? exp.endDate : "Current Month, Year"} · ${calculateDuration(exp.startDate, exp.endDate)}`}`}
                </p>
                {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                {exp.description && <p className="mt-2 text-gray-400">{exp.description}</p>}
                {exp.skills && (
                  <p className="mt-2 text-sm text-gray-300">
                    <strong>Skills:</strong> {exp.skills.join(", ")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </a>
  );
}
