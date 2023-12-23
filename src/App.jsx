import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
      </Routes>
    </Box>
  );
}

export default App;
