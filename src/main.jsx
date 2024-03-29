import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// cấu hình MUI-dialog
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            confirmationButtonProps: {
              color: "secondary",
              variant: "outlined",
            },
            cancellationButtonProps: { color: "inherit" },
            dialogProps: {
              PaperProps: {
                sx: {
                  borderRadius: "13px",
                },
              },
            },
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer
            theme="colored"
            position="bottom-left"
            style={{ width: "max-content" }}
          />
        </ConfirmProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
