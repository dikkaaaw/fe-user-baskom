import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Dashboard } from "./pages";
import BaseLayout from "./layout/BaseLayout";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<BaseLayout />}>
          <Route path="/home" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
