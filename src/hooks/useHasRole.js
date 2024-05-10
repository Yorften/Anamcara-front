import { useSelector } from "react-redux";

export const useHasRole = (roleName) => {
  const roles = useSelector((state) => state.auth.userRoles);

  if (roles.length === 0) {
    return false;
  }else{
    const hasRole = roles.some((role) => role.name === roleName);
    return hasRole;
  }
};
