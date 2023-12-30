import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";
import { MaterialUISwitch } from "~/components/uiSwitch";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChairAltRoundedIcon from "@mui/icons-material/ChairAltRounded";
import HomeMiniRoundedIcon from "@mui/icons-material/HomeMiniRounded";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import Man2RoundedIcon from "@mui/icons-material/Man2Rounded";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const ListSideBar = ({
  state,
  setState,
  anchor,
  type,
  setType,
  searchValue,
  setSearchValue,
}) => {
  const { mode, setMode } = useColorScheme();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (event.type === "keydown" && event.key === "Enter") {
      setState({ ...state, [anchor]: open });
    }
  };
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleClickListItemButton = (item) => {
    setType((prevState) => {
      const updatedType = {
        ...prevState,
        [item]: !prevState[item],
      };
      const allValuesAreTrue = Object.values(updatedType).every(
        (value) => value === true
      );
      if (allValuesAreTrue) {
        return Object.fromEntries(
          Object.keys(updatedType).map((key) => [key, false])
        );
      }
      return updatedType;
    });
  };

  const handleListItemClick = (item) => () => {
    handleClickListItemButton(item);
    setState({ ...state, [anchor]: false });
  };

  return (
    <Box
      sx={{
        width: 230,
        height: "100%",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
      }}
      role="presentation"
    >
      <List
        sx={{
          my: 2,
        }}
      >
        <ListItem>
          <TextField
            id="outlined-search"
            label="Nhập mã sản phẩm"
            name="search"
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={toggleDrawer(anchor, false)}
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
              maxWidth: 600,
              minWidth: 50,
              width: 200,
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
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{
          my: 2,
        }}
      >
        {[
          { text: "Bàn ghế", icon: <ChairAltRoundedIcon /> },
          { text: "Đôn kê", icon: <HomeMiniRoundedIcon /> },
          { text: "Tủ", icon: <KitchenRoundedIcon /> },
          { text: "Tượng gỗ", icon: <Man2RoundedIcon /> },
          { text: "Tiểu cảnh", icon: <VrpanoIcon /> },
        ].map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              my: "5px",
            }}
          >
            <ListItemButton
              onClick={handleListItemClick(item.text, anchor)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: (theme) =>
                    type[item?.text] ? `${theme.palette.secondary.main}` : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          onClick={() =>
            mode === "light" ? setMode("dark") : setMode("light")
          }
          sx={{
            my: 2,
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
        <ListItemText primary={"Giao diện"} />
      </Box>
    </Box>
  );
};
