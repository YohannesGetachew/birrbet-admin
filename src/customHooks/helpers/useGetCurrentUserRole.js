import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const useGetCurrentUserRole = () => {
  const { authData } = useContext(AuthContext);
  const currentUserRole = authData.userData.role;
  return currentUserRole;
};

export default useGetCurrentUserRole;
