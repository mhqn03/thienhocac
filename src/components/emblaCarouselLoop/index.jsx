import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import useEmblaCarousel from "embla-carousel-react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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

  const fullScreenRef = useRef();
  const [fullScreen, setFullScreen] = useState(null);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      fullScreenRef.current.requestFullscreen();
      setFullScreen(true);
    }
  };

  // const handleKeyDown = useCallback(
  //   (e) => {
  //     if (e.key === "Escape" && fullScreen) {
  //       setFullScreen(false);
  //     }
  //   },
  //   [fullScreen]
  // );

  // useEffect(() => {
  //   if (fullScreen) {
  //     document.addEventListener("keydown", handleKeyDown);
  //   } else {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [fullScreen, handleKeyDown]);

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
      <Box ref={fullScreenRef}>
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
                    width: "2rem",
                    zIndex: 1,
                    position: "absolute",
                    top: "0.3rem",
                    right: "0.3rem",
                    borderRadius: "12px",
                    backgroundColor:
                      "rgba(var(--background-code-rgb-value), 0.85)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      fontSize: ".8rem",
                    }}
                  >
                    {index + 1}/{slides.length}
                  </Typography>
                </Box>
                {checkUrlType(imageByIndex(index)) === "image" ? (
                  !fullScreen ? (
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
                      onClick={toggleFullscreen}
                    />
                  ) : (
                    <CardMedia
                      sx={{
                        height: "100vh",
                        width: "100vw",
                        objectFit: "contain",
                      }}
                      component="img"
                      image={imageByIndex(index)}
                      alt="Details Image"
                      onClick={toggleFullscreen}
                      tabIndex={0}
                      // onKeyDown={handleKeyDown}
                    />
                  )
                ) : checkUrlType(imageByIndex(index)) === "video" ? (
                  <Box
                    component="video"
                    sx={{
                      display: fullScreen ? "flex" : "block",
                      justifyContent: fullScreen && "center",
                      alignItems: fullScreen && "center",
                      height: !fullScreen ? "var(--slide-height)" : "100vh",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      "&::-webkit-media-controls-fullscreen-button": {
                        display: fullScreen && "none",
                      },
                    }}
                    poster={thumbnail}
                    tabIndex={0}
                    // onKeyDown={handleKeyDown}
                    controls
                  >
                    <source src={imageByIndex(index)} type="video/mp4" />
                    {/* {fullScreen && <CloseRoundedIcon />} */}
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
    </Box>
  );
};

export default EmblaCarousel;
