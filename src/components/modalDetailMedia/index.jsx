import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { def: "22rem", md: "40rem", lg: "60rem" },
  height: { def: "40rem", md: "45rem" },
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#2c3e50" : "#e0e0e0"),
  boxShadow: 24,
  borderRadius: "8px",
  border: "unset",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const ModalDetailMedia = ({ open, setOpen, media }) => {
  const handleClose = () => setOpen(false);
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {media.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <ImageGallery items={images} autoPlay={false} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`${media.name} (${media.substance})`} <br />
              {`Kích thước: ${media.size}`}
              <br />
              {`Giá: ${media.price}`}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalDetailMedia;
