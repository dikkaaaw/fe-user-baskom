import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Dashboard, NotFound } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
