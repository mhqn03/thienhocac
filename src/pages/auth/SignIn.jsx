import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function SignInPage() {
  const [user, setUser] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <TextField
        id="outlined-search"
        label="Email"
        name="email"
        type="text"
        size="small"
        value={user.email}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <TextField
        id="outlined-search"
        label="Password"
        name="password"
        type="password"
        size="small"
        value={user.password}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </Box>
  );
}

export default SignInPage;
