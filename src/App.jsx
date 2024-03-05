import Box from "@mui/material/Box";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import AuthProvider from "./components/authProtect/AuthProtect";
import ProtectedHomeRoute from "./components/authProtect/ProtectedHomeRoute";

function App() {
  return (
    <Box>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedHomeRoute>
              <Home />
              // </ProtectedHomeRoute>
            }
          />
          {/* <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Box>
  );
}

export default App;
