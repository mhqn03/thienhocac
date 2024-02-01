import { useState } from "react";
import Box from "@mui/material/Box";
import useEmblaCarousel from "embla-carousel-react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const EmblaCarousel = ({ slides, options, images, outOfStock }) => {
  const [emblaRef] = useEmblaCarousel(options);
  const imageByIndex = (index) => images[index % images.length];
  const [fullScreen, setFullScreen] = useState(false);
  const checkUrlType = (url) => {
    const extension = url?.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const videoExtensions = ["mp4", "avi", "mov", "mkv"];

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown";
    }
  };

  return (
    <Box
      sx={{
        "--slide-spacing": "1rem",
        "--slide-size": "100%",
        "--slide-height": {
          def: "18rem",
          sm: "20rem",
          md: outOfStock ? "26rem" : "30rem",
        },
        padding: { sm: 0, md: "1rem" },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "10px",
        }}
        ref={emblaRef}
      >
        <Box
          sx={{
            backfaceVisibility: "hidden",
            display: "flex",
            touchAction: "pan-y",
            marginLeft: "calc(var(--slide-spacing) * -1)",
          }}
        >
          {slides.map((index) => (
            <Box
              sx={{
                flex: "0 0 var(--slide-size)",
                minWidth: "0",
                paddingLeft: "var(--slide-spacing)",
                position: "relative",
              }}
              key={index}
            >
              <Box
                sx={{
                  width: "4.6rem",
                  height: "4.6rem",
                  zIndex: 9999,
                  position: "absolute",
                  top: "0.6rem",
                  right: "0.6rem",
                  borderRadius: "50%",
                  backgroundColor:
                    "rgba(var(--background-site-rgb-value), 0.85)",
                  lineHeight: "4.6rem",
                  fontWeight: "900",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="span"
                  sx={{
                    color: "var(--brand-primary)",
                    backgroundImage:
                      "linear-gradient(45deg, var(--brand-primary), var(--brand-secondary))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.6rem",
                    display: "block",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
              {checkUrlType(imageByIndex(index)) === "image" ? (
                <CardMedia
                  sx={{
                    display: "block",
                    height: "var(--slide-height)",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  component="img"
                  image={imageByIndex(index)}
                  alt="Details Image"
                  onClick={() => setFullScreen(true)}
                />
              ) : checkUrlType(imageByIndex(index)) === "video" ? (
                <Box
                  component="video"
                  sx={{
                    display: "block",
                    height: "var(--slide-height)",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  controls
                >
                  <source src={imageByIndex(index)} type="video/mp4" />
                </Box>
              ) : (
                <Typography variant="span">Error image</Typography>
              )}
              {/* {fullScreen && (
                <CardMedia
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, .8)",
                  }}
                  onClick={() => setFullScreen(false)}
                  component="img"
                  image={imageByIndex(index)}
                  alt="Details Image"
                />
              )} */}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmblaCarousel;
