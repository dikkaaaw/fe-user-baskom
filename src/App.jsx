import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Login,
  SignUp,
  Dashboard,
  NotFound,
  UserProfile,
  ProductManagement,
  AboutUs,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/manage-products" element={<ProductManagement />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
