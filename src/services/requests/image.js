import axiosClient from "../../axios-client";

const ImageRequest = {};

ImageRequest.store = (params) => {
  return axiosClient.post("/images", params).then((response) => response.data);
};

ImageRequest.index = (params) => {
  return axiosClient.get("/images", params).then((response) => response.data);
};

ImageRequest.destroy = (id, params) => {
  return axiosClient
    .delete(`/images/${id}`, params)
    .then((response) => response.data);
};

export default ImageRequest;
