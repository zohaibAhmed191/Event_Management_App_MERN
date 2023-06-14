import axios from "axios";
const api = axios.create();
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
const baseUrl = "http://localhost:3131";
const header = { withCredentials: true };

export const onLogin = (body) => {
  const response = axios.post(`${baseUrl}/api/user/login`, body, header);
  return response;
};
export const onRegister = (body) => {
  const response = axios.post(`${baseUrl}/api/user/register`, body, header);
  return response;
};
export const CreateNewEvent = async (body) => {
  const response = axios.post(`${baseUrl}/api/event`, body, header);
  return response;
};
export const getAllEvents = async () => {
  const response = axios.get(`${baseUrl}/api/event`, header);
  return response;
};

export const getEvent = async (id) => {
  const response = axios.get(`${baseUrl}/api/event/${id}`, header);
  return response;
};
export const UpdateEvent = async (body, id) => {
  const response = axios.put(`${baseUrl}/api/event/${id}`, body, header);
  return response;
};
export const DeleteEvent = async (id) => {
  const response = axios.delete(`${baseUrl}/api/event/${id}`, header);
  return response;
};

export const logout = () => {
  const response = axios.post(`${baseUrl}/api/user/logout`, header);
  return response;
};
