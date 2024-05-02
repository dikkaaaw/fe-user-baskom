import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

  const Private = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const Auth = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-up" element={<Auth element={<SignUp />} />} />
        <Route path="/login" element={<Auth element={<Login />} />} />
      </Routes>
    </Router>
  );
}

export default App;
