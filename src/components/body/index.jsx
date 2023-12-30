import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const MediaDetails = () => {
  const [media, setMedia] = useState([
    {
      _id: 1,
      mediaUrl:
        "https://res.cloudinary.com/daiiinchx/image/upload/v1703954654/thien%20ho%20cac/z5025563400886_d73bbe24ba3cde96b3b16ce9abb2cd24_zn1w29.jpg",
      title: "image",
    },
    {
      _id: 2,
      mediaUrl:
        "https://res.cloudinary.com/daiiinchx/image/upload/v1703954770/thien%20ho%20cac/z5025565133606_aa4d72f0f3408ed98f2e3c453cb90232_nc8vkp.jpg",
      title: "image",
    },
    {
      _id: 3,
      mediaUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/21.jpg",
      title: "image",
    },
    {
      _id: 4,
      mediaUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/59.jpg",
      title: "image",
    },
    {
      _id: 5,
      mediaUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/102.jpg",
      title: "image",
    },
    {
      _id: 6,
      mediaUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1233.jpg",
      title: "image",
    },
    {
      _id: 7,
      mediaUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/555.jpg",
      title: "image",
    },
  ]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
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
              key={item._id}
            >
              <Box>
                <Box sx={{ cursor: "pointer", m: 0, p: 0 }}>
                  <CardMedia
                    component="img"
                    alt="Album Image"
                    image={item.mediaUrl}
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
                    }}
                  />
                </Box>
                <Typography variant="span" id="titleMedia">
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MediaDetails;
