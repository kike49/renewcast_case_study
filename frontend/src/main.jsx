import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Remove StrictMode for production
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
