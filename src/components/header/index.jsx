import { useContext } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { MaterialUISwitch } from "../uiSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, useColorScheme } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../authProtect/AuthProtect";

function Header() {
  const { mode, setMode } = useColorScheme();
  const { setIsSignedIn } = useContext(AuthContext);
  const secret_key = import.meta.env.VITE_SECRET_KEY;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
      <Box>home</Box>
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
        >
          <Tooltip
            sx={{
              p: 0,
              m: 0,
            }}
            title="Change theme"
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
        <Link style={{ m: 0, p: 0 }} to="/sign-in">
          <Button
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "#fff",
              borderRadius: 3,
            }}
            onClick={() => {
              setIsSignedIn(false);
              localStorage.removeItem(`${secret_key}`);
            }}
          >
            Log out
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
