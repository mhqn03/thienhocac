import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";
import { MaterialUISwitch } from "~/components/uiSwitch";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChairAltRoundedIcon from "@mui/icons-material/ChairAltRounded";
import HomeMiniRoundedIcon from "@mui/icons-material/HomeMiniRounded";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import Man2RoundedIcon from "@mui/icons-material/Man2Rounded";

export const ListSideBar = () => {
  const { mode, setMode } = useColorScheme();

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
      <List>
        {[
          { text: "Bàn ghế", icon: <ChairAltRoundedIcon /> },
          { text: "Đôn kê", icon: <HomeMiniRoundedIcon /> },
          { text: "Tủ", icon: <KitchenRoundedIcon /> },
          { text: "Tượng gỗ", icon: <Man2RoundedIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                // click vào item ở mobile side bar
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
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
