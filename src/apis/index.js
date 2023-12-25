import axios from "axios";

const url = import.meta.env.VITE_SECRET_API;
const headers = {
  "Content-Type": "application/json",
};

export const fetchUserInfo = async () => {
  const response = await axios.get(`${url}`);
  return response.data;
};

export const postUserInfo = async (form) => {
  const response = await axios.post(`${url}`, JSON.stringify(form), {
    headers,
  });
  return response.data;
};
