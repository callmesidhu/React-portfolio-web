import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';
import '../App.css';
import { EffectCards, Autoplay } from 'swiper/modules';

import { db } from '../../configs/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <a href='https://github.com/callmesidhu?tab=repositories' target='_blank' rel="noopener noreferrer">
      <div id='projects' className="flex flex-col items-center py-12 lg:min-h-screen">
        <h2 className="text-center text-4xl m-4 font-black text-white">Projects </h2>

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          className="lg:w-[450px] lg:h-[600px] w-[200px] h-[300px] rounded-[15px] shadow-lg card-swiper"
        >
          {projects.slice().reverse().map((project) => (
            <SwiperSlide key={project.id} className="bg-gray-900 project-card">
              {/* Project Image or Button */}
              {project.image ? (
                <img src={project.image} alt={project.title} className="project-image md:p-3 p-1 rounded-lg max-h-24" />
              ) : (
                <button className='flex-1 bg-black m-3 text-center text-4xl justify-center rounded-lg items-center cursor-pointer'>
                  <a href={project.visit || project.link}>Visit Here</a>
                </button>
              )}

              {/* Content */}
              <div className="project-content md:p-6 p-1 px-3 ">
                <h3 className="lg:text-2xl text-md font-semibold">{project.title}</h3>
                {project.tech && (
                  <p className="lg:text-md text-sm mt-1 bg-gray-700 px-2 py-1 rounded-md w-max text-gray-300">
                    {project.tech}
                  </p>
                )}
                <p className="text-sm mt-2">{project.description}</p>
              </div>

              {/* View Button */}
              <div className="project-button text-lg">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </a>
  );
}
