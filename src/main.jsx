import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/clerk-react";

// cấu hình MUI-dialog
import { ConfirmProvider } from "material-ui-confirm";

// Import your publishable key (clerk)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ConfirmProvider
            defaultOptions={{
              allowClose: false,
              confirmationButtonProps: {
                color: "secondary",
                variant: "outlined",
              },
              cancellationButtonProps: { color: "inherit" },
            }}
          >
            <CssBaseline />
            <App />
            <ToastContainer theme="colored" position="bottom-left" />
          </ConfirmProvider>
        </ClerkProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
