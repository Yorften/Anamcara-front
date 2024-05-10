import axiosClient from "../../axios-client";

const TaskRequest = {};

TaskRequest.store = (params) => {
  return axiosClient.post("/tasks", params).then((response) => response.data);
};

TaskRequest.index = (params) => {
  return axiosClient.get("/tasks", params).then((response) => response.data);
};

TaskRequest.update = (id, params) => {
  return axiosClient
    .put(`/tasks/${id}`, params)
    .then((response) => response.data);
};

TaskRequest.delete = (id, params) => {
  return axiosClient
    .delete(`/tasks/${id}`, params)
    .then((response) => response.data);
};

TaskRequest.default = (params) => {
  return axiosClient.get("/tasks/default", params).then((response) => response.data);
};

TaskRequest.custom = (params) => {
  return axiosClient.get("/tasks/custom", params).then((response) => response.data);
};

TaskRequest.progress = (params) => {
  return axiosClient.post("/tasks/default/update-progress", params).then((response) => response.data);
};

TaskRequest.refresh = (params) => {
  return axiosClient.post("/tasks/default/refresh-progress", params).then((response) => response.data);
};

TaskRequest.customProgress = (params) => {
  return axiosClient.post("/tasks/custom/update-progress", params).then((response) => response.data);
};

TaskRequest.customRefresh = (params) => {
  return axiosClient.post("/tasks/custom/refresh-progress", params).then((response) => response.data);
};

export default TaskRequest;
