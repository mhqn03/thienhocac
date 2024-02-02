import { useState } from "react";
import Box from "@mui/material/Box";
import useEmblaCarousel from "embla-carousel-react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const EmblaCarousel = ({ slides, options, images, outOfStock, thumbnail }) => {
  const [emblaRef] = useEmblaCarousel(options);
  const imageByIndex = (index) => images[index % images.length];
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
        "--brand-primary": "rgb(138, 180, 248)",
        "--brand-secondary": "rgb(193, 168, 226)",
        "--text-body": "rgb(222, 222, 222)",
        "--background-code-rgb-value": "12, 12, 12",
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
                  width: "3rem",
                  height: "max-content",
                  zIndex: 1,
                  position: "absolute",
                  top: "0.4rem",
                  right: "0.4rem",
                  borderRadius: "13px",
                  backgroundColor:
                    "rgba(var(--background-code-rgb-value), 0.85)",
                  fontWeight: "900",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="span"
                  sx={{
                    color: "var(--text-body)",
                    backgroundImage:
                      "linear-gradient(45deg, var(--brand-primary), var(--brand-secondary))",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1rem",
                  }}
                >
                  {index + 1}/{slides.length}
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
                  poster={thumbnail}
                  controls
                >
                  <source src={imageByIndex(index)} type="video/mp4" />
                </Box>
              ) : (
                <Typography
                  sx={{
                    display: "block",
                    height: "var(--slide-height)",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  variant="span"
                >
                  Error image
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmblaCarousel;
