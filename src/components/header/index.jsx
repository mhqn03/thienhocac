import { Fragment, useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MaterialUISwitch } from "../uiSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import { useConfirm } from "material-ui-confirm";
import { ListSideBar } from "./mobile-side-bar";
import { AuthContext } from "../authProtect/AuthProtect";

function Header() {
  const { mode, setMode } = useColorScheme();
  const { setIsSignedIn } = useContext(AuthContext);
  const secret_key = import.meta.env.VITE_SECRET_KEY;
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = useConfirm();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut({
      title: "Log out",
      description: "Bạn có muốn đăng xuất?",
      confirmationText: "Có",
      cancellationText: "Không",
      dialogProps: {
        sx: {
          borderRadius: "13px",
        },
      },
    })
      .then(() => {
        setIsSignedIn(false);
        localStorage.removeItem(`${secret_key}`);
        localStorage.removeItem("current_userId");
        navigate("/sign-in");
      })
      .catch(() => {});
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
      }}
    >
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <MenuRoundedIcon
            sx={{
              display: { def: "block", xs: "none" },
              alignItems: "center",
              cursor: "pointer",
              transition: "all .2s linear",
              transform: state[anchor] ? "translateX(-100%)" : "translateX(0)",
            }}
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            sx={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-between",
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <ListSideBar />
            <Box
              className="css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop"
              onClick={toggleDrawer(anchor, false)}
            >
              <CloseRoundedIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  cursor: "pointer",
                  color: "white",
                  opacity: state[anchor] ? 0.6 : 0,
                  transition: "all 0.2s linear",
                  transform: state[anchor]
                    ? "translateY(0)"
                    : "translateY(120%)",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
                fontSize="medium"
                onClick={toggleDrawer(anchor, false)}
              />
            </Box>
          </Drawer>
        </Fragment>
      ))}

      <Link
        to="/"
        style={{
          all: "unset",
          marginLeft: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar
          src="./THClogo.png"
          alt="Logo"
          style={{
            m: 0,
            p: 0,
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        />
        <Typography
          variant="p"
          sx={{
            fontFamily: "Lobster",
            display: { def: "none", xs: "block" },
            cursor: "pointer",
          }}
        >
          Thiên Hồ Các
        </Typography>
      </Link>
      <TextField
        id="outlined-search"
        label="Search..."
        name="search"
        type="text"
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputRef.current.blur();
          }
        }}
        autoComplete="off"
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon
                sx={{
                  fontSize: "medium",
                  color: mode === "dark" ? "white" : "black",
                  cursor: "pointer",
                }}
                onClick={() => handleClick()}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseRoundedIcon
                sx={{
                  fontSize: "medium",
                  color: searchValue
                    ? mode === "dark"
                      ? "white"
                      : "black"
                    : "transparent",
                  cursor: searchValue ? "pointer" : "unset",
                }}
                onClick={() => {
                  setSearchValue("");
                  handleClick();
                }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          display: { def: "none", xs: "inline-flex" },
          maxWidth: 600,
          minWidth: 50,
          width: { xs: 200, sm: 300, md: 450, lg: 600 },
          label: {
            fontSize: 12,
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "#eeeeee",
          },
          "label.Mui-focused": {
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "#eeeeee",
          },
          "&:hover label": {
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "#eeeeee",
          },
          ".MuiOutlinedInput-root": {
            fieldset: {
              borderRadius: 4,
              height: 40,
              borderColor: (theme) =>
                theme.palette.mode === "light" ? "black" : "#eeeeee80",
            },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          onClick={() =>
            mode === "light" ? setMode("dark") : setMode("light")
          }
          sx={{
            display: { def: "none", xs: "inline-flex" },
          }}
        >
          <Tooltip
            sx={{
              p: 0,
              m: 0,
            }}
            title={mode === "light" ? "Chế độ sáng" : "Chế độ tối"}
          >
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ my: 0 }}
                  size="small"
                  defaultChecked={mode === "light" ? true : false}
                />
              }
            />
          </Tooltip>
        </Box>
        <Tooltip title="Đăng xuất">
          <Button
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#fff",
              borderRadius: 3,
            }}
            onClick={handleLogOut}
          >
            <LogoutRoundedIcon fontSize="small" />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Header;
