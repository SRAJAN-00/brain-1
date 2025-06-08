import { DashBoard } from "./components/DashBoard";
import { SignIn } from "./components/SignIn";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import SpotlightPreview from "./components/ui/spotlight-demoo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/landing" element={<SpotlightPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;