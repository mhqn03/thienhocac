import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hashingPassword } from "~/utils";
import { getUserInfo, postUserInfo } from "~/apis";

function SignUpPage() {
  const toastOptions = { autoClose: 1000 };
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // validate
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password));
  };

  const handleSubmit = async () => {
    if (!validateEmail(user.email)) {
      toast.warning("Vui lòng nhập đúng định dạng Email!", toastOptions);
    } else if (!validatePassword(user.password)) {
      toast.warning(
        <div>
          Mật khẩu cần 1 chữ cái viết hoa,
          <br />1 chữ số và ít nhất 8 ký tự.
        </div>
      );
    } else {
      const result = await getUserInfo();
      if (result.map((e) => e.email).includes(user.email)) {
        toast.warning("Tài khoản đã tồn tại!", toastOptions);
      } else {
        const hashP = hashingPassword(user.password);
        user.password = hashP.hashedPassword;
        user.salt = hashP.salt;
        await postUserInfo(user);
        toast.success("Tạo tài khoản thành công!", toastOptions);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
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
        <Typography variant="h6">Sign Up</Typography>
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
          Sign up
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
            <Avatar
              src="./google.svg"
              alt="Google"
              sizes="small"
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
              placement="top-start"
            >
              <Avatar
                src="./facebook.svg"
                alt="Facebook"
                sizes="small"
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
          Have an account.
          <Link
            to="/sign-in"
            style={{
              all: "unset",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign in
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
