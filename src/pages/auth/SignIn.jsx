import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
        width: "20rem",
        height: "24rem",
        margin: "auto",
        boxShadow: (theme) =>
          theme.palette.mode === "light"
            ? "0px 6px 16px -6px rgba(1, 1, 1, 0.5)"
            : "0px 6px 16px -6px rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h6">Sign In</Typography>
      <TextField
        id="outlined-email"
        label="Email"
        name="email"
        type="text"
        size="small"
        value={user.email}
        onChange={handleInputChange}
        autoComplete="off"
        sx={{
          "&:hover label": {
            color: (theme) => theme.palette.primary.main,
          },
          ".MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
          },
        }}
      />
      <TextField
        id="outlined-password"
        label="Password"
        name="password"
        type="password"
        size="small"
        value={user.password}
        onChange={handleInputChange}
        autoComplete="off"
        sx={{
          "&:hover label": {
            color: (theme) => theme.palette.primary.main,
          },
          ".MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
          },
        }}
      />
      <Typography variant="p">or</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          transition: "all .2s ease-in-out",
          "&:hover": {
            opacity: "0.7",
          },
        }}
      >
        <img
          src="./google.svg"
          alt="Google"
          style={{
            cursor: "pointer",
          }}
        />
        <img
          src="./facebook.svg"
          alt="Facebook"
          style={{
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
}

export default SignInPage;
