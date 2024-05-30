import axios from "axios";
import Cookies from "js-cookie";
const AuthUrl = import.meta.env.VITE_REACT_APP_AUTH_BACKEND_URL;

export const login = async ({ email, password }) => {
  try {
    const reqUrl = `${AuthUrl}/login`;
    const responce = await axios.post(reqUrl, { email, password });
    Cookies.set("token", responce.data.token);
    Cookies.set("userName", responce.data.username);
    Cookies.set("userId", responce.data._id);
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const register = async ({ username, email, password }) => {
  try {
    const reqUrl = `${AuthUrl}/register`;
    const responce = await axios.post(reqUrl, { username, email, password });
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
