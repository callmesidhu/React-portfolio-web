import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./Components/Login"; 
import AdminDashboard from "./Components/Admin"; 
import App from "./App"; 

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<App />} /> 
      </Routes>
    </Router>
  );
}

export default Index;
