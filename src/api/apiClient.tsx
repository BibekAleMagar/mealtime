import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
});

export default apiClient;
