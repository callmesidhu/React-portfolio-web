import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 fixed w-full z-50 top-0">
      {/* Desktop Navbar */}
      <div className="container mx-6 flex justify-between items-center">
        {/* Logo with White Border */}
        <a href='https://callmesidhu.vercel.app/' className="text-white cursor-pointer">
        <div className="text-white text-2xl font-bold hover:bg-violet-900 backdrop-blur-sm bg-white/10 border-white border transform hover:scale-105 p-2 px-8 rounded-3xl transition-all duration-500">
          <p>
            Call Me Sidhu
          </p>
        </div>

        </a>

        {/* Toggle Button (visible on small screens) */}
        <button onClick={toggleMenu} className="mx-2 text-white focus:outline-none">
          <svg
            className="right-1 top-5 absolute w-8 h-8 cursor-grab mx-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`bg-opacity-50 backdrop-blur-lg fixed inset-y-0 left-0 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-end">
          {/* Close Button */}
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-8 h-8 cursor-grab"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Profile Image and Name */}
        <div className="mt-8">
          <img
            src="https://avatars.githubusercontent.com/u/92774572?v=4"
            alt="profile"
            className="w-48 mb-2 h-auto rounded-full mx-auto"
          />
          <h1 className="text-white text-3xl font-bold text-center">S SIDHARTH</h1>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col space-y-6 p-4 mt-8 justify-center items-center">
          {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="text-white text-2xl hover:text-gray-400"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
