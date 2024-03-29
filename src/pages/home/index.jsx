import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import MediaDetails from "~/components/body";
import Header from "~/components/header";
import "ldrs/dotSpinner";
import { useColorScheme } from "@mui/material/styles";
import { getMedia } from "~/apis";

function Home() {
  const { mode } = useColorScheme();
  const [media, setMedia] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState({
    ["Bàn ghế"]: false,
    ["Đôn kê"]: false,
    ["Tủ"]: false,
    ["Tượng gỗ"]: false,
    ["Tiểu cảnh"]: false,
    ["Sản phẩm khác"]: false,
  });
  useEffect(() => {
    (async () => {
      const result = await getMedia();
      setMedia(result);
    })();
  }, [setMedia]);

  const filterDataByType = useMemo(
    () =>
      media.filter((data) =>
        Object.keys(type).some((key) => type[key] && data.type === key)
      ),
    [media, type]
  );
  const filterDataBySearch = useMemo(
    () =>
      media.filter((data) =>
        data.SKU.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [media, searchValue]
  );
  const filterDataBySearchWithType = useMemo(
    () =>
      filterDataByType.filter((data) =>
        data.SKU.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [filterDataByType, searchValue]
  );

  if (!media) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <l-dot-spinner
          size="40"
          speed="0.9"
          color={mode === "dark" ? "white" : "#00000080"}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: { def: "3.2rem", md: "4rem" },
          width: "100%",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0",
          boxShadow: "0px 6px 10px -6px rgba(1, 1, 1, 0.5)",
          position: "fixed",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Header
          type={type}
          setType={setType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Box>

      <Box
        sx={{
          height: {
            def: "calc(100% - 3.2rem)",
            md: "calc(100% - 4rem)",
          },
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar-thumb": {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#00000090" : "",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#383838" : "",
          },
          position: "absolute",
          top: { def: "3.2rem", md: "4rem" },
          pt: "1.2rem",
        }}
      >
        <MediaDetails
          type={type}
          searchValue={searchValue}
          media={media}
          filterDataBySearch={filterDataBySearch}
          filterDataByType={filterDataByType}
          filterDataBySearchWithType={filterDataBySearchWithType}
        />
      </Box>
    </Box>
  );
}

export default Home;
