import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../configs/firebase'; 
import { collection, getDocs } from 'firebase/firestore';


const GitHubStats = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      <h2 className="text-4xl font-bold text-center">Github Stats</h2>
      <a href="https://github.com/callmesidhu" target="_blank" rel="noopener noreferrer">
        <img src="https://nirzak-streak-stats.vercel.app/?user=callmesidhu&theme=radical&card_width=500" alt="GitHub Streak" className="w-full" />
      </a>
      <div className="flex flex-wrap justify-center gap-4">
        <img src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=callmesidhu&theme=radical&hide_border=true" alt="GitHub Stats" />
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=callmesidhu&theme=radical&hide_border=true&layout=compact" alt="Top Languages" />
      </div>
      <div className="lg:flex-row flex-col flex gap-4">
        <img src="http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=callmesidhu&theme=radical&hide_border=true" />
        <img src="http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=callmesidhu&theme=radical&hide_border=true" />
      </div>
    </div>
  );
};

const Skills = () => {
  const [inView, setInView] = useState(false);
  const skillsRef = useRef(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const [langSnap, frameSnap, techSnap] = await Promise.all([
          getDocs(collection(db, 'languages')),
          getDocs(collection(db, 'frameworks')),
          getDocs(collection(db, 'technologies')),
        ]);

        const languages = langSnap.docs.map(doc => doc.data());
        const frameworks = frameSnap.docs.map(doc => doc.data());
        const technologies = techSnap.docs.map(doc => doc.data());

        const skillData = [
          { category: 'Programming Languages', items: languages },
          { category: 'Frameworks', items: frameworks },
          { category: 'Technologies', items: technologies },
        ];

        setSkills(skillData);
      } catch (error) {
        console.error("Error fetching skills: ", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <motion.div
      id="skills"
      ref={skillsRef}
      className="flex flex-col items-center space-y-8 my-12 md:mx-28 mx-auto"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center">Skills & Technologies</h2>
      {skills.map((skillCategory) => (
        <div key={skillCategory.category} className="w-full text-center">
          <h3 className="text-2xl font-semibold mb-4">{skillCategory.category}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {skillCategory.items.map((skill) => (
              <a key={skill.name} href={skill.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <img src={skill.src} alt={skill.name} className="w-20 h-20" />
                <span className="mt-2 text-sm">{skill.name}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const Profile = () => {
  return (
    <div className="container mx-auto p-8">
      <Skills />
      <GitHubStats />
    </div>
  );
};

export default Profile;
