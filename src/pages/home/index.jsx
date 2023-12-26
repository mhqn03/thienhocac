import Box from "@mui/material/Box";
import Header from "~/components/header";

function Home() {
  return (
    <Box>
      <Box
        sx={{
          height: "3rem",
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          height: "calc(100% - 3rem)",
        }}
      ></Box>
    </Box>
  );
}

export default Home;
