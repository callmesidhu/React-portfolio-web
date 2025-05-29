import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../configs/firebase';
import {  doc, getDoc } from 'firebase/firestore';


export default function About() {
  const [inView, setInView] = useState(false);
  const aboutRef = useRef(null);
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'about', 'zPae0pmZUUI8p6dmga76'); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAboutContent(data.content || '');
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);  
        }
      },
      { threshold: 0.5 } 
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={aboutRef}
      id="about"
      className="flex justify-center items-center min-h-screen bg-black text-white p-6 sm:p-12 lg:p-28"
    >
      <motion.div
        className="rounded-lg w-[60rem] min-h-[30rem] h-auto shadow-lg border border-violet-900 bg-gray-900"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-between items-center h-10 px-4 border-b border-gray-600">
          <div className="flex space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-700"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 border border-yellow-700"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-green-500 border border-green-700"></span>
          </div>
          <div className="text-sm font-semibold">root@XyphX-OS:~/callmesidhu</div>
          <div className="w-14"></div>
        </div>
        <div className="p-4 text-sm font-mono">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="w-2 h-2 bg-green-500 clip-path-triangle"></span>
            <span className="text-cyan-400">XyphX-OS</span>
            <span className="text-blue-400">git:</span>
            <span className="text-blue-400">(</span>
            <span className="text-red-400">master</span>
            <span className="text-blue-400">)</span>
            <span className="ml-2">git log</span>
          </motion.div>

          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="text-red-400">e23h217</span>
            <span> - (</span>
            <span className="text-yellow-400">HEAD - master, origin/master</span>
            <span>) Vercel Deployment Bug Fixed</span>
          </motion.div>

          <motion.div
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span className="text-red-400">g43e341</span>
            <span> - Addded Skills Section </span>
            <span className="text-green-400 ml-2">(4 weeks ago)</span>
            <span className="text-blue-400"> &lt;cwattrus&gt;</span>
          </motion.div>

          <motion.div
            className="flex items-center mt-2 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <span className="w-2 h-2 bg-green-500 clip-path-triangle"></span>
            <span className="text-cyan-400">XyphX-OS</span>
            <span className="text-blue-400">git:</span>
            <span className="text-blue-400">(</span>
            <span className="text-red-400">master</span>
            <span className="text-blue-400">)</span>
            <span className="ml-2">callmesidhu -la</span>
          </motion.div>

          <div className="px-6">
            <p dangerouslySetInnerHTML={{ __html: aboutContent }} />
          </div>

          <motion.div
            className="flex items-center mt-2 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <span className="w-2 h-2 bg-green-500 clip-path-triangle"></span>
            <span className="text-cyan-400">XyphX-OS</span>
            <span className="text-blue-400">git:</span>
            <span className="text-blue-400">(</span>
            <span className="text-red-400">master</span>
            <span className="text-blue-400">)</span>
            <span className="ml-2">callmesidhu -la --all</span>
            <span className="w-1 h-4 bg-purple-500 animate-pulse"></span>
          </motion.div>

          <div className="px-6">
            <p>loading...</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
