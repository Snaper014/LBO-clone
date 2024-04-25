import * as React from "react";
import { Page } from "./Page";
import { getInfoUser } from "../utils/fetch";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import { Link } from "react-router-dom";
import { useContext } from "../utils/Context";
import { propsUserInfos } from "../utils/types";

export const Profil = () => {
  const navaigate = useNavigate();
  const { isLogin } = useAuth();
  const { userInfos, setUserInfos } = useContext();

  if (!isLogin) {
    navaigate("/login");
    return;
  }
  React.useEffect(() => {
    getInfoUser(JSON.parse(localStorage.getItem("token_lbo") as string)?.userId)
      .then((res) => {
        const result: propsUserInfos = res?.data?.data;
        setUserInfos(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Page>
      <div className="w-full px-6 max-lg:px-0 flex flex-col">
        <div className="mb-2 flex h-auto flex-row flex-nowrap items-center gap-2">
          <div className="w-20 h-20 text-[24px] text-white bg-[#0E14D3] rounded-full flex items-center justify-center">
            {userInfos.firstName.substring(0, 1)}
            {userInfos.lastName.substring(0, 1)}
          </div>
          <p className="font-semibold text-2xl max-[450px]:text-[16px]">
            {userInfos.firstName}
          </p>
          <p className="font-semibold text-2xl max-[450px]:text-[16px]">
            {userInfos.lastName}
          </p>
        </div>
        <p className="w-full mb-2 font-semibold text-2xl max-[450px]:text-[16px]">
          email : {userInfos?.email}
        </p>
        <p className="w-full mb-4 font-semibold text-2xl max-[450px]:text-[16px]">
          date de naissance : {userInfos?.date_day} / {userInfos?.date_month} /{" "}
          {userInfos?.date_year}
        </p>
        <Link
          to="/commandes"
          className="bg-[#0E14D3] max-lg:w-full max-lg:h-16  mt-12 self-center w-64 text-white h-20 flex items-center justify-center"
        >
          Mes commandes
        </Link>
      </div>
    </Page>
  );
};
