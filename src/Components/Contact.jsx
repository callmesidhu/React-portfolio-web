import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', suggestion: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, suggestion } = formData;

    if (!name || !email || !phone || !suggestion) {
      toast.error("All fields are required!", {
        position: "top-right",
        theme: "dark",
        style: { backgroundColor: "#7C3AED", color: "#fff" },
      });
      return;
    }

    const message = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ASuggestion: ${suggestion}`;
    const whatsappURL = `https://wa.me/9496225620?text=${message}`;

    window.open(whatsappURL, '_blank'); // Open WhatsApp with the message

    toast.success("Opening WhatsApp...", {
      position: "top-right",
      theme: "dark",
      style: { backgroundColor: "#7C3AED", color: "#fff" },
    });

    setFormData({ name: '', email: '', phone: '', suggestion: '' });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white" id="contact">
      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-4xl lg:flex lg:justify-between"
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Contact Me</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Suggestion</label>
              <textarea
                name="suggestion"
                value={formData.suggestion}
                onChange={handleChange}
                placeholder="Your suggestions..."
                rows="4"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center"
        >
          <h2 className="text-xl font-semibold mb-4 text-right">Connect with Me</h2>
          <motion.div 
            className="flex justify-center lg:justify-end space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a href="https://www.linkedin.com/in/callmesidhu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/callmesidhu__" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-600 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.github.com/callmesidhu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://wa.me/9496225620" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-600 transition duration-300">
              <FaWhatsapp size={24} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
