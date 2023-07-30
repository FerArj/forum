import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Feed from "./pages/Feed";

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/*" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
    </Router>
  )
}

export default App
