import React, { useReducer, useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { authReducer } from "./reducer";
import { AuthContext } from "./context";

const initialAuthData = () => {
  return Cookies.getJSON("AuthData") || null;
};

// authData {
//   accessToken: String!
//   refreshToken: String!
//   tokenType: String
//   expiresIn: Float!
// }
const AuthContextProvider = (props) => {
  const [authData, dispatch] = useReducer(authReducer, [], initialAuthData);
  const hasMount = useRef(false);
  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
    } else {
      if (authData) {
        Cookies.set(
          "AuthData",
          { ...authData },
          {
            expires: authData.expiresIn / 86400,
          }
        );
      } else {
        Cookies.set("AuthData", null);
      }
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
