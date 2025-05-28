import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./Components/Login"; 
import AdminDashboard from "./Components/Admin"; 
import App from "./App"; 
import "./index.css"; 
import "./App.css"


function Index() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/" element={<App />} /> 
    </Routes>
  );
}

export default Index;
