import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignInPage() {
  const [user, setUser] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // console.log(user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "20rem",
          height: "24rem",
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
          defaultValue={user.email}
          onChange={handleInputChange}
          autoComplete="off"
          sx={{
            "label.Mui-focused": {
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#eeeeee",
            },
            "&:hover label": {
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#eeeeee",
            },
            ".MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "black" : "#eeeeee80",
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "black" : "#eeeeee80",
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
          defaultValue={user.password}
          onChange={handleInputChange}
          autoComplete="off"
          sx={{
            "label.Mui-focused": {
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#eeeeee",
            },
            "&:hover label": {
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#eeeeee",
            },
            ".MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "black" : "#eeeeee80",
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "black" : "#eeeeee80",
              },
            },
          }}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "#eeeeee80",
            border: (theme) =>
              theme.palette.mode === "light"
                ? "1px solid #878787de"
                : "1px solid #eeeeee80",
            borderRadius: "1000px",
            "&:hover": {
              border: (theme) =>
                theme.palette.mode === "light"
                  ? "1px solid #878787de"
                  : "1px solid #eeeeee80",
            },
          }}
        >
          Sign in
        </Button>
        <Typography variant="p">- or -</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              transition: "all .2s ease-in-out",
              "&:hover": {
                opacity: "0.8",
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
          </Box>
          <Box
            sx={{
              transition: "all .2s ease-in-out",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            <img
              src="./facebook.svg"
              alt="Facebook"
              style={{
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          Don&apos;t have an account.
          <Link
            to="/sign-up"
            style={{
              all: "unset",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
