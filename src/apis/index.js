import axios from "axios";

const url = import.meta.env.VITE_SECRET_API;
const mediaUrl = import.meta.env.VITE_MEDIA_SECRET_API;
const headers = {
  "Content-Type": "application/json",
};

export const getUserInfo = async () => {
  const response = await axios.get(`${url}`);
  return response.data;
};

export const postUserInfo = async (data) => {
  const response = await axios.post(`${url}`, JSON.stringify(data), {
    headers,
  });
  return response.data;
};

export const getMedia = async () => {
  const response = await axios.get(`${mediaUrl}`);
  return response.data;
};
