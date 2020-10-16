import React, { useReducer, useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { authReducer } from "../reducers/authReducer";
import { AuthContext } from "../contexts";

const initialUser = () => {
  return Cookies.getJSON("user") || null;
};

const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(authReducer, [], initialUser);
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
    } else {
      if (user) {
        Cookies.set("user", JSON.stringify(user), {
          expires: user.expiresIn / 86400,
        });
      } else {
        Cookies.set("user", null);
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
