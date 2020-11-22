import React, { useReducer, useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { authReducer } from "./reducer";
import { AuthContext } from "./context";

const initialAuthData = () => {
  const authData = Cookies.getJSON("AuthData") || null;
  return authData;
};

const AuthContextProvider = (props) => {
  const [authData, dispatch] = useReducer(authReducer, [], initialAuthData);
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
    } else {
      if (authData) {
        const authDataWithoutProfile = {
          ...authData,
          userData: { ...authData.userData, profileImage: undefined },
        };
        Cookies.set("AuthData", JSON.stringify(authDataWithoutProfile), {
          expires: authData.expiresIn / 86400,
        });
        localStorage.setItem("profileImage", authData.userData.profileImage);
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
