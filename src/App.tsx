import React from "react";
import "./App.css";
import { PlantListPage } from "./pages/PlantList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlantListPage />} />
    </Routes>
  );
}

export default App;
