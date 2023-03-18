import React from "react";
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css"
import Counter from "./components/App";
import Qualitie from "./components/qualite";

const App = () => {
    return <Counter />
}

const contain = document.getElementById('root')
const root = createRoot(contain)
root.render(<App />)