/**
=========================================================
* Healing Horizons HealthDash - v2.1.0
=========================================================
* Product Page: https://www.healinghorizons.com
* Copyright 2023 Healing Horizons (https://www.healinghorizons.com)
* Licensed under MIT (https://github.com/healinghorizons/healthdash/blob/main/LICENSE.md)
* Coded by Healing Horizons
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "@/context";
import { ThemeProvider } from "@/context/themeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);