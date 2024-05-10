import axiosClient from "../../axios-client";

const CharacterRequest = {};

CharacterRequest.store = (params) => {
  return axiosClient
    .post("/characters", params)
    .then((response) => response.data);
};

CharacterRequest.index = (params) => {
  return axiosClient
    .get("/characters", params)
    .then((response) => response.data);
};

CharacterRequest.update = (id, params) => {
  return axiosClient
    .put(`/characters/${id}`, params)
    .then((response) => response.data);
};

CharacterRequest.delete = (id) => {
  return axiosClient
    .delete(`/characters/${id}`)
    .then((response) => response.data);
};

CharacterRequest.checklist = (params) => {
  return axiosClient
    .get("/characters/tasks", params)
    .then((response) => response.data);
};

export default CharacterRequest;
