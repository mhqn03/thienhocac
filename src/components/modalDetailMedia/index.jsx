import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

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
  overflowY: "auto",
};

const ModalDetailMedia = ({ open, setOpen, media }) => {
  const handleClose = () => setOpen(false);
  const customStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "24px",
    color: "white",
    zIndex: 1000,
  };
  const [images, setImages] = useState([]);
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  useEffect(() => {
    setImages(media.detailUrl?.map((item) => ({ original: item })));
  }, [media]);

  const form = useRef();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [user, setUser] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const toastOptions = { autoClose: 1000 };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!user.from_name) {
      toast.warning("Vui lòng nhập tên của bạn!", toastOptions);
    } else if (!validateEmail(user.from_email)) {
      toast.warning("Vui lòng nhập đúng định dạng Email!", toastOptions);
    } else {
      emailjs
        .sendForm(`${serviceId}`, `${templateId}`, form.current, `${publicKey}`)
        .then(
          (result) => {
            setUser({});
            toast.success("Gửi thông tin thành công", toastOptions);
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {media.name}
            <Tooltip title="Đóng" placement="right">
              <CloseRoundedIcon
                fontSize="medium"
                sx={{
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "all .2s linear",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
                onClick={handleClose}
              />
            </Tooltip>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { def: "column", lg: "row" },
              gap: { def: 1, md: 2 },
              ".image-gallery": {
                width: { def: "100%", lg: "80%" },
                ".image-gallery-slide-wrapper": {
                  ".css-3mhmj0 svg": {
                    opacity: 0,
                    transform: "translateX(40%)",
                    transition: "all 0.2s ease-in-out",
                  },
                  ".css-qm0hdc svg": {
                    opacity: 0,
                    transform: "translateX(-40%)",
                    transition: "all 0.2s ease-in-out",
                  },
                  "&:hover .css-3mhmj0 svg, &:hover .css-qm0hdc svg": {
                    opacity: 0.5,
                    transform: "translateX(0)",
                    "&:hover": {
                      opacity: 1,
                    },
                  },
                  ".image-gallery-slides": {
                    borderRadius: "10px",
                    backgroundColor: "black",
                    ".image-gallery-slide img": {
                      // height: "30rem",
                      width: "23rem",
                    },
                  },
                  ".image-gallery-fullscreen-button": {
                    height: "100%",
                    width: "100%",
                    opacity: 0,
                  },
                  ".image-gallery-index": {
                    padding: 1,
                    fontSize: 12,
                    borderRadius: "8px",
                    background: "rgba(0,0,0,.3)",
                  },
                },
              },
            }}
          >
            <ImageGallery
              items={images}
              autoPlay={false}
              showPlayButton={false}
              showThumbnails={false}
              disableKeyDown
              showIndex
              renderLeftNav={(onClick) => (
                <Box
                  sx={{
                    ...customStyles,
                    left: "10px",
                  }}
                  onClick={onClick}
                >
                  <ArrowBackIosRoundedIcon />
                </Box>
              )}
              renderRightNav={(onClick) => (
                <Box sx={{ ...customStyles, right: "10px" }} onClick={onClick}>
                  <ArrowForwardIosRoundedIcon />
                </Box>
              )}
            />
            <Box>
              <Typography id="modal-modal-description" sx={{ my: 2 }}>
                <Typography
                  variant="p"
                  sx={{ fontSize: { def: "20px", lg: "16px" } }}
                >
                  Thông tin sản phẩm:{" "}
                </Typography>
                <br />
                {`${media.name} (${media.substance})`} <br />
                {`Kích thước: ${media.size}`}
                <br />
                {`Giá: ${media.price}`}
              </Typography>
              <Typography variant="h6">Liên hệ</Typography>
              <form ref={form} onSubmit={handleSendEmail}>
                <TextField
                  id="outlined-name"
                  label="Nhập tên của bạn"
                  name="from_name"
                  type="text"
                  size="small"
                  onChange={handleInputChange}
                  inputRef={inputNameRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      inputNameRef.current.blur();
                      inputEmailRef.current.focus();
                    }
                  }}
                  autoComplete="off"
                  sx={{
                    maxWidth: 600,
                    minWidth: 50,
                    width: 200,
                    mt: 2,
                    label: {
                      fontSize: 12,
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    "label.Mui-focused": {
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    "&:hover label": {
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    ".MuiOutlinedInput-root": {
                      fieldset: {
                        borderRadius: 4,
                        height: 40,
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                      "&:hover fieldset": {
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-email"
                  label="Nhập email của bạn"
                  name="from_email"
                  type="text"
                  size="small"
                  onChange={handleInputChange}
                  inputRef={inputEmailRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      inputEmailRef.current.blur();
                      handleSendEmail(e);
                    }
                  }}
                  autoComplete="off"
                  sx={{
                    maxWidth: 600,
                    minWidth: 50,
                    width: 200,
                    mt: 1,
                    label: {
                      fontSize: 12,
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    "label.Mui-focused": {
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    "&:hover label": {
                      color: (theme) =>
                        theme.palette.mode === "light" ? "black" : "#eeeeee",
                    },
                    ".MuiOutlinedInput-root": {
                      fieldset: {
                        borderRadius: 4,
                        height: 40,
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                      "&:hover fieldset": {
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-sku"
                  name="sku"
                  type="text"
                  size="small"
                  defaultValue={media.SKU}
                  autoComplete="off"
                  sx={{
                    opacity: 0,
                    display: "none",
                  }}
                />
                <br />
                <Button
                  variant="outlined"
                  type="submit"
                  size="small"
                  onClick={(e) => handleSendEmail(e)}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "light" ? "black" : "#eeeeee80",
                    border: (theme) =>
                      theme.palette.mode === "light"
                        ? "1px solid #878787de"
                        : "1px solid #eeeeee80",
                    borderRadius: "1000px",
                    "&:hover": {
                      border: (theme) =>
                        theme.palette.mode === "light"
                          ? "1px solid #878787de"
                          : "1px solid #eeeeee80",
                    },
                    "&:active": {
                      transform: "scale(0.94)",
                    },
                    width: "max-content",
                    mt: 2,
                  }}
                >
                  Gửi
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalDetailMedia;
