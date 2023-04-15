import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Counter from "./App";

const App = () => {
  return <Counter />;
};

const contain = document.getElementById("root");
const root = createRoot(contain);
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
