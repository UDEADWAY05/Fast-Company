import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import "bootstrap/dist/css/bootstrap.css";
import Counter from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";

const store = createStore()

const App = () => {
  return <Counter />;
};


const contain = document.getElementById("root");
const root = createRoot(contain);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);
