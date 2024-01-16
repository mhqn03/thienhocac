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
            ? media?.map((item, index) => <Details key={item.id} item={item} />)
            : filterDataBySearch?.map((item, index) => (
                <Details key={item.id} item={item} />
            ))
          : !searchValue
            ? filterDataByType?.map((item, index) => (
              <Details key={item.id} item={item} />
            ))
            : filterDataBySearchWithType?.map((item, index) => (
              <Details key={item.id} item={item} />
            ))}
      </Grid>
    </Container>
  );
};

export default MediaDetails;
