const { useQuery } = require("@apollo/client");
const { USERS } = require("../../../graphql/user");

const useGetUsers = (options = {}) => {
  const result = useQuery(USERS, options);
  return result;
};

export default useGetUsers;
