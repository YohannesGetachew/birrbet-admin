import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../graphql/user";

const useDeleteUser = () => {
  const mutation = useMutation(DELETE_USER);
  return mutation;
};

export { useDeleteUser };
