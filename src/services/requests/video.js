import axiosClient from "../../axios-client";

const VideoRequest = {};

VideoRequest.store = (params) => {
  return axiosClient
    .post("/videos", params)
    .then((response) => response.data);
};

VideoRequest.index = (params) => {
  return axiosClient
    .get("/videos", params)
    .then((response) => response.data);
};

VideoRequest.destroy = (id, params) => {
  return axiosClient
    .delete(`/videos/${id}`, params)
    .then((response) => response.data);
};

export default VideoRequest;
