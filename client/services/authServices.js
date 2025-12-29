import axiosInstance from "../api/axiosInstance";


export const registerUser = async (data) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};


export const loginUser = async (data) => {
  const response = await axiosInstance.post("/login", data);

  // Save token
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user));
  }

  return response.data;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
};
