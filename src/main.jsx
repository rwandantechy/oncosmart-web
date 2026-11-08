import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

/** Reusing the cached root keeps hot reloads from mounting a second tree. */
const ROOT_CACHE_KEY = "__everyDoseRoot";

const container = document.getElementById("root");
const root = globalThis[ROOT_CACHE_KEY] || createRoot(container);
globalThis[ROOT_CACHE_KEY] = root;

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
