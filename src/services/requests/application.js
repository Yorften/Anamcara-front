import axiosClient from "../../axios-client";

const ApplicationRequest = {};

ApplicationRequest.store = (params) => {
  return axiosClient
    .post("/applications", params)
    .then((response) => response.data);
};

ApplicationRequest.index = (params) => {
  return axiosClient
    .get("/applications", params)
    .then((response) => response.data);
};

ApplicationRequest.show = (id, params) => {
  return axiosClient
    .get(`/applications/${id}`, params)
    .then((response) => response.data);
};

ApplicationRequest.update = (id, params) => {
  return axiosClient
    .patch(`/applications/${id}`, params)
    .then((response) => response.data);
};

ApplicationRequest.history = (params) => {
  return axiosClient
    .get("/applications/history", params)
    .then((response) => response.data);
};

ApplicationRequest.last = (params) => {
  return axiosClient
    .get("/applications/last", params)
    .then((response) => response.data);
};

export default ApplicationRequest;
