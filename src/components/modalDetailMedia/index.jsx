import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EmblaCarousel from "../emblaCarouselLoop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
  "&::-webkit-scrollbar-thumb": {
    bgcolor: (theme) => (theme.palette.mode === "light" ? "#00000090" : ""),
  },
  "&::-webkit-scrollbar-thumb:hover": {
    bgcolor: (theme) => (theme.palette.mode === "light" ? "#383838" : ""),
  },
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
  // const customStyles = {
  //   position: "absolute",
  //   top: "50%",
  //   transform: "translateY(-50%)",
  //   cursor: "pointer",
  //   fontSize: "24px",
  //   color: "white",
  //   zIndex: 1000,
  // };
  const [images, setImages] = useState([]);
  const inputNameRef = useRef();
  const inputNumberRef = useRef();
  const inputEmailRef = useRef();
  useEffect(() => {
    // setImages(media.detailUrl?.map((item) => ({ original: item })));
    setImages(media.detailUrl);
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
  const validateNumber = (number) => {
    const re = /^\d{10}$/;
    return re.test(number);
  };
  const toastOptions = { autoClose: 1000 };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!user.from_name) {
      toast.warning("Vui lòng nhập tên của bạn!", toastOptions);
    } else if (!validateNumber(user.from_number)) {
      toast.warning(
        "Vui lòng nhập chính xác số điện thoại của bạn!",
        toastOptions
      );
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
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = media.detailUrl?.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

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
            {media.name} (Click vào từng ảnh để xem chi tiết)
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
              // ".image-gallery": {
              //   width: { def: "100%", lg: "80%" },
              //   ".image-gallery-slide-wrapper": {
              //     ".css-3mhmj0 svg": {
              //       opacity: 0,
              //       transform: "translateX(40%)",
              //       transition: "all 0.2s ease-in-out",
              //     },
              //     ".css-qm0hdc svg": {
              //       opacity: 0,
              //       transform: "translateX(-40%)",
              //       transition: "all 0.2s ease-in-out",
              //     },
              //     "&:hover .css-3mhmj0 svg, &:hover .css-qm0hdc svg": {
              //       opacity: 0.5,
              //       transform: "translateX(0)",
              //       "&:hover": {
              //         opacity: 1,
              //       },
              //     },
              //     ".image-gallery-slides": {
              //       borderRadius: "10px",
              //       backgroundColor: "black",
              //       // ".image-gallery-slide img": {},
              //     },
              //     ".image-gallery-fullscreen-button": {
              //       height: "100%",
              //       width: "100%",
              //       opacity: 0,
              //     },
              //     ".image-gallery-index": {
              //       padding: 1,
              //       fontSize: 12,
              //       borderRadius: "8px",
              //       background: "rgba(0,0,0,.3)",
              //     },
              //   },
              // },
            }}
          >
            {/* <ImageGallery
              items={images}
              autoPlay={false}
              showPlayButton={false}
              showThumbnails={false}
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
            /> */}
            <EmblaCarousel
              slides={SLIDES}
              options={OPTIONS}
              images={images}
              outOfStock={media["out-of-stock"]}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { def: "column", md: "row", lg: "column" },
                justifyContent: !media["out-of-stock"] && "center",
                gap: { sm: 0, md: 13 },
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  my: 2,
                  px: { md: "1rem", lg: 0 },
                  width: media["out-of-stock"]
                    ? { md: "20rem", lg: "12.8rem" }
                    : "100%",
                }}
              >
                <Typography
                  variant="p"
                  sx={{ fontSize: { def: "20px", lg: "16px" } }}
                >
                  Thông tin sản phẩm:
                </Typography>
                <br />
                Tên: {media.name} <br />
                Chất liệu: {media.substance} <br />
                Kích thước: {media.size} <br />
                {`Giá: ${media.price}`}
              </Typography>
              {!media["out-of-stock"] && (
                <Box
                  sx={{
                    px: { md: "1rem", lg: 0 },
                  }}
                >
                  <Typography variant="h6">Liên hệ</Typography>
                  <form
                    ref={form}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onSubmit={handleSendEmail}
                  >
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
                          inputNumberRef.current.focus();
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
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "label.Mui-focused": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "&:hover label": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
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
                      id="outlined-number"
                      label="Số điện thoại"
                      name="from_number"
                      type="number"
                      size="small"
                      onChange={handleInputChange}
                      inputRef={inputNumberRef}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          inputNumberRef.current.blur();
                          inputEmailRef.current.focus();
                        }
                      }}
                      autoComplete="off"
                      sx={{
                        maxWidth: 600,
                        minWidth: 50,
                        width: 200,
                        mt: 1,
                        "input[type='number']::-webkit-inner-spin-button, input[type='number']::-webkit-outer-spin-button":
                          {
                            WebkitAppearance: "none",
                            margin: 0,
                          },
                        label: {
                          fontSize: 12,
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "label.Mui-focused": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "&:hover label": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
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
                      label="Email của bạn"
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
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "label.Mui-focused": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
                        },
                        "&:hover label": {
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "black"
                              : "#eeeeee",
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
                          theme.palette.mode === "light"
                            ? "black"
                            : "#eeeeee80",
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
                      }}
                    >
                      Gửi
                    </Button>
                  </form>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalDetailMedia;
