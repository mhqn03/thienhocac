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
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/2.jpg",
      title: "image",
    },
    {
      _id: 2,
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/23.jpg",
      title: "image",
    },
    {
      _id: 3,
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/21.jpg",
      title: "image",
    },
    {
      _id: 4,
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/59.jpg",
      title: "image",
    },
    {
      _id: 5,
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/102.jpg",
      title: "image",
    },
    {
      _id: 6,
      coverUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1233.jpg",
      title: "image",
    },
    {
      _id: 7,
      coverUrl:
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
                gap: 10,
              }}
              item
              container
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item._id}
            >
              <Box>
                <Box sx={{ cursor: "pointer", m: 0, p: 0 }}>
                  <CardMedia
                    component="img"
                    alt="Album Image"
                    height="200"
                    width="200"
                    image={item.coverUrl}
                    sx={{ borderRadius: 8 }}
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
