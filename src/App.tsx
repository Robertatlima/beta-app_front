import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Signin from "./page/Signin";
import DashBoard from "./page/Dashboard";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
