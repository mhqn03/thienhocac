import Box from "@mui/material/Box";
import MediaDetails from "~/components/body";
import Header from "~/components/header";

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        // "&::-webkit-scrollbar-track": {
        //   px: 2,
        // },
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
      }}
    >
      <Box
        sx={{
          height: "3.2rem",
          width: "100vw",
          boxShadow: "0px 6px 10px -6px rgba(1, 1, 1, 0.5)",
          position: "fixed",
          top: 0,
        }}
      >
        <Header />
      </Box>

      <Box
        sx={{
          mt: "5rem",
          height: "calc(100vh - 3.2rem)",
        }}
      >
        <MediaDetails />
      </Box>
    </Box>
  );
}

export default Home;
