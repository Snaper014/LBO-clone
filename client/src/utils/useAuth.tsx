import * as React from "react";

export const useAuth = () => {
  const [isLogin, setTokenExist] = React.useState(
    localStorage.getItem("token_lbo") !== null ? true : false,
  );
  const Logout = () => setTokenExist(false);
  return { isLogin, Logout };
};
