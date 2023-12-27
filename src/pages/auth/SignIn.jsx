import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo } from "~/apis";
import { comparePassword } from "~/utils";
import { AuthContext } from "~/components/authProtect/AuthProtect";

function SignInPage() {
  const toastOptions = { autoClose: 1000 };
  const { setIsSignedIn } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const secret_key = import.meta.env.VITE_SECRET_KEY;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user.email) {
      toast.warning("Vui lòng nhập email!", toastOptions);
    } else {
      const userInfo = await getUserInfo();
      if (!userInfo.map((e) => e.email).includes(user.email)) {
        toast.warning("Tài khoản không tồn tại!", toastOptions);
      } else {
        const result = userInfo.filter((e) => e.email === user.email)?.[0];
        if (!user.password) {
          toast.warning("Vui lòng nhập đầy đủ!", toastOptions);
        } else if (
          !comparePassword(user.password, result.salt, result.password)
        ) {
          toast.error("Sai mật khẩu!", toastOptions);
        } else if (
          comparePassword(user.password, result.salt, result.password)
        ) {
          toast.success("Đăng nhập thành công!", toastOptions);
          localStorage.setItem(`${secret_key}`, true);
          setIsSignedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
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
              ? "-20px 20px 60px #bebebe, 20px -20px 60px #ffffff"
              : "-20px 20px 60px #253544, 20px -20px 60px #33475c",
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
          onKeyDown={handleKeyDown}
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
          onClick={handleSubmit}
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
            "&:active": {
              transform: "scale(0.94)",
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
              "&:active": {
                transform: "scale(0.9)",
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
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
          >
            <Tooltip
              sx={{
                p: 0,
                m: 0,
              }}
              title="Hiện không hoạt động!"
              placement="right-start"
            >
              <img
                src="./facebook.svg"
                alt="Facebook"
                style={{
                  cursor: "pointer",
                }}
              />
            </Tooltip>
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
