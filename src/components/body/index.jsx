import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getMedia } from "~/apis";
import ModalDetailMedia from "../modalDetailMedia";

const MediaDetails = ({
  type,
  setType,
  searchValue,
  setSearchValue,
  media,
  setMedia,
}) => {
  const [open, setOpen] = useState(false);
  const [mediaClicked, setMediaClicked] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await getMedia();
      setMedia(result);
    })();
  }, [setMedia]);

  // console.log(media);
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
                <Box sx={{ cursor: "pointer", m: 0, p: 0 }}>
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
                        transform: "scale(1.04)",
                      },
                    }}
                    onClick={() => {
                      setOpen(true);
                      setMediaClicked(item);
                    }}
                  />
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
