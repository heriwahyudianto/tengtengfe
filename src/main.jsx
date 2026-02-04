
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId='390926395930-46tdlcpia8jmaolp39ecopugssu2jh55.apps.googleusercontent.com'> 
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
