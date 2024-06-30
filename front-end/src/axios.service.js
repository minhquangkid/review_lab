import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true,
  //   credentials: "include",
});

axiosClient.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
