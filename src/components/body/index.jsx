import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ModalDetailMedia from "../modalDetailMedia";

const MediaDetails = ({
  type,
  setType,
  searchValue,
  setSearchValue,
  media,
}) => {
  const [open, setOpen] = useState(false);
  const [mediaClicked, setMediaClicked] = useState(null);

  // console.log(type);

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            paddingBottom: "2rem",
          }}
        >
          {media?.map((item, index) => (
            <Grid
              sx={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
              item
              container
              def={6}
              sm={4}
              lg={3}
              key={item.id}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{ cursor: "pointer", m: 0, p: 0, position: "relative" }}
                >
                  <CardMedia
                    component="img"
                    alt="Album Image"
                    image={item.thumbnail}
                    sx={{
                      borderRadius: 2,
                      height: {
                        def: "200px",
                        sm: "230px",
                        md: "280px",
                        lg: "300px",
                      },
                      width: {
                        def: "140px",
                        sm: "170px",
                        md: "220px",
                        lg: "240px",
                      },
                      transition: "all .2s linear",
                      "&:hover": {
                        transform: "scale(0.98)",
                      },
                    }}
                    onClick={() => {
                      setOpen(true);
                      setMediaClicked(item);
                    }}
                  />
                  {item["out-of-stock"] && (
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "16px",
                        position: "absolute",
                        top: "10%",
                        left: "6%",
                        padding: { def: "5px", md: "7px", lg: "10px" },
                        bgcolor: "#6aa9abc2",
                        borderRadius: "20px",
                        color: "white",
                      }}
                    >
                      Hết hàng!
                    </Typography>
                  )}

                  {open && (
                    <ModalDetailMedia
                      open={open}
                      setOpen={setOpen}
                      media={mediaClicked}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="span"
                      id="skuMedia"
                      sx={{
                        fontWeight: "200",
                        opacity: "0.9",
                        fontSize: { def: "12px", md: "16px" },
                      }}
                    >
                      {item.type}
                    </Typography>
                    <Typography
                      variant="span"
                      id="skuMedia"
                      sx={{
                        fontWeight: "200",
                        opacity: "0.9",
                        fontSize: { def: "12px", md: "16px" },
                      }}
                    >
                      (mã: {item.SKU})
                    </Typography>
                  </Box>
                  <Typography
                    variant="span"
                    id="parameterMedia"
                    sx={{
                      fontSize: { def: "12px", md: "16px" },
                    }}
                  >
                    {`${item.name} (${item.substance})`} <br />
                    {`Kích thước: ${item.size}`}
                    <br />
                    {`Giá: ${item.price}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MediaDetails;
