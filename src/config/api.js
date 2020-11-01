import axios from "axios";

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};
//dev
/*export const urlAsset = {
  avatar: "http://localhost:5000/public/avatars/",
  thumbnail: "http://localhost:5000/public/thumbnails/",
  file: "http://localhost:5000/public/files/",
};
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});*/

//production
export const urlAsset = {
  avatar: "https://library-api-rizky-iqbal.herokuapp.com/public/avatars/",
  thumbnail: "https://library-api-rizky-iqbal.herokuapp.com/public/thumbnails/",
  file: "https://library-api-rizky-iqbal.herokuapp.com/public/files/",
};
export const API = axios.create({
  baseURL: "https://library-api-rizky-iqbal.herokuapp.com/api/v1",
});
