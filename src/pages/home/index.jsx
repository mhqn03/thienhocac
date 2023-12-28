import Box from "@mui/material/Box";
import Container from "~/components/container";
import Header from "~/components/header";

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
      }}
    >
      {/* header */}
      <Box
        sx={{
          height: "3rem",
          boxShadow: "0px 6px 10px -6px rgba(1, 1, 1, 0.5)",
        }}
      >
        <Header />
      </Box>

      {/* container */}
      <Box
        sx={{
          height: "calc(100vh - 3rem)",
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : ""),
        }}
      >
        <Container />
      </Box>
    </Box>
  );
}

export default Home;
