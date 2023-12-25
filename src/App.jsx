import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";

function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
      </Routes>
    </Box>
  );
}

export default App;
