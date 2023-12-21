import { SignedIn, SignIn, SignUp } from "@clerk/clerk-react";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import PublicPage from "./pages/PublicPage/PublicPage";
import PrivatePage from "./pages/PrivatePage/PrivatePage";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/protected"
          element={
            <SignedIn>
              <PrivatePage />
            </SignedIn>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
