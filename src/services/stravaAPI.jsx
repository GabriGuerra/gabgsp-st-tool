import axios from "axios";

const stravaAPI = axios.create({
  baseURL: "https://www.strava.com/api/v3",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  stravaAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default stravaAPI;
