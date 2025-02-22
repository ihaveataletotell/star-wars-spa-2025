import "./styles.css";
import '@mantine/core/styles.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

const reactRootHtml = document.getElementById("root");
if (!reactRootHtml) throw new Error("react-root-html is missing");

const root = createRoot(reactRootHtml);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
