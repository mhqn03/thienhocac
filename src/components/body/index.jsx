import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Details from "./details";

const MediaDetails = ({
  type,
  searchValue,
  media,
  filterDataBySearch,
  filterDataByType,
  filterDataBySearchWithType,
}) => {
  const [open, setOpen] = useState(false);
  const [mediaClicked, setMediaClicked] = useState(null);
  const valueOfType = Object.values(type).some((value) => value === true);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={4}
        sx={{
          paddingBottom: "2rem",
        }}
      >
        {!valueOfType
          ? !searchValue
            ? media?.map((item, index) => (
                <Details
                  key={item.id}
                  item={item}
                  open={open}
                  setOpen={setOpen}
                  mediaClicked={mediaClicked}
                  setMediaClicked={setMediaClicked}
                />
            ))
            : filterDataBySearch?.map((item, index) => (
                <Details
                  key={item.id}
                  item={item}
                  open={open}
                  setOpen={setOpen}
                  mediaClicked={mediaClicked}
                  setMediaClicked={setMediaClicked}
                />
            ))
          : !searchValue
            ? filterDataByType?.map((item, index) => (
              <Details
                key={item.id}
                item={item}
                open={open}
                setOpen={setOpen}
                mediaClicked={mediaClicked}
                setMediaClicked={setMediaClicked}
              />
            ))
            : filterDataBySearchWithType?.map((item, index) => (
              <Details
                key={item.id}
                item={item}
                open={open}
                setOpen={setOpen}
                mediaClicked={mediaClicked}
                setMediaClicked={setMediaClicked}
              />
            ))}
      </Grid>
    </Container>
  );
};

export default MediaDetails;
