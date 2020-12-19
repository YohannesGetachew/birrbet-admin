import { useMutation } from "@apollo/client";
import { CHANGE_USER_ACTIVE } from "../../../graphql/user";

const useChangeUserActive = () => {
  const mutation = useMutation(CHANGE_USER_ACTIVE);
  return mutation;
};

export { useChangeUserActive };
