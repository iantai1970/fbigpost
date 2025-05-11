import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FbDetail from "./pages/FbDetail";
import FbSummary from "./pages/FbSummary";
import UserLogin from "./pages/UserLogin";
import { AuthProvider } from "./contexts/authContext";
import "./App.css";
//import PrivateRoute from "./firebase/privateRoute.js";

function App() {
  //console.log(`App() rendered`);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/FbDetail/:job_id?" element={<FbDetail />} />
          <Route path="/FbSummary" element={<FbSummary />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/" element={<UserLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
