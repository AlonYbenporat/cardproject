import axios from "axios";
import { BaseUrlusers, api } from "./ConstantsApi";

const token = localStorage.getItem("token");
export const loginUser = (userEmail, userPassword) => {
  return api
    .post("users/login", {
      email: userEmail,
      password: userPassword,
    })
    .then((response) => {
      localStorage.setItem("token", response.data);
      const tokenPayload = JSON.parse(atob(response.data.split(".")[1]));
      const { _id, isBusiness, isAdmin } = tokenPayload;

      return {
        success: true,
        message: "User logged in successfully",
        token: response.data,
        user: { _id, isBusiness, isAdmin },
      };
    })
    .catch((error) => {
      localStorage.setItem("token", null);
      console.error(error);
      return {
        success: false,
        message: error.response.data,
      };
    });
};

export const registerUser = (userObj) => {
  return api
    .post("users", userObj)
    .then((response) => {
      return {
        success: true,
        message: response.data,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: error.response.data,
      };
    });
};

export const fetchUserData = async (userId, token) => {
  try {
    const response = await axios.get(`${BaseUrlusers}${userId}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
