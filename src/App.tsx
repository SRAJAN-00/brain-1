import { DashBoard } from "./components/DashBoard";
import { SignIn } from "./components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
