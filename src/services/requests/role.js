import axiosClient from "../../axios-client";

const RoleRequest = {};

RoleRequest.syncRoles = () => {
  return axiosClient.post("/roles/sync").then((response) => response.data);
};

export default RoleRequest;
