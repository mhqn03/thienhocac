import Box from "@mui/material/Box";
import MediaDetails from "~/components/body";
import Header from "~/components/header";

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        "&::-webkit-scrollbar-thumb": {
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#00000090" : "",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          bgcolor: (theme) => (theme.palette.mode === "light" ? "#383838" : ""),
        },
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
      }}
    >
      <Box
        sx={{
          height: { def: "3.2rem", md: "4rem" },
          width: "100vw",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
          boxShadow: "0px 6px 10px -6px rgba(1, 1, 1, 0.5)",
          position: "fixed",
          top: 0,
        }}
      >
        <Header />
      </Box>

      <Box
        sx={{
          mt: { def: "5rem", md: "5.6rem" },
          height: { def: "calc(100vh - 3.2rem)", md: "calc(100vh - 4rem)" },
        }}
      >
        <MediaDetails />
      </Box>
    </Box>
  );
}

export default Home;
