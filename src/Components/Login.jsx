import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase"; // Make sure this is correctly pointing to your Firebase config
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-violet-900 overflow-y-hidden">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
          XyphX Admin Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLoginPage;
