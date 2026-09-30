import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tailwind from "./components/Tailwind";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      <Routes>
        <Route path="/tailwindwithglobal" element={<Tailwind />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
