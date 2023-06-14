import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AddEvent from "./screens/AddEvent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Add_Event" element={<AddEvent />} />
        <Route path="/Update_Event/:id" element={<AddEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
