import axios from "axios";

// Use environment variable for backend URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // dynamically points to backend
});

export const createPoll = (data) => API.post("/polls", data);
export const getPoll = (id) => API.get(`/polls/${id}`);
export const votePoll = (id, optionIndex) =>
  API.post(`/polls/${id}/vote`, { optionIndex });
