import * as React from 'react';
import { HeaderCheckout } from "../Components/HeaderCheckout";
import { StepsCheckout } from "../Components/StepsCheckout";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import { useContext } from "../utils/Context";
import { Link } from "react-router-dom";

export const Confirm = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const { WidthScreen, setDataBasket } = useContext();
  const infos = localStorage.getItem("infos");

  React.useEffect(() => {
    if (!isLogin) {
      navigate("/login?checkout=1");
      return;
    }

  }, [isLogin])
  

  return (
    <div className="w-full bg-[#F4F4F4]  max-lg:bg-[#ECECEC] flex flex-col items-center">
      <HeaderCheckout />
      {WidthScreen < 1024 ? null : <StepsCheckout active={4} />}
      <main className="w-[938px] h-[90vh] bg-[#F4F4F4] maxlg:py-2 max-lg:w-full mb-16 flex flex-col items-center justify-center">
        {!infos ? (
          <Navigate to={"/checkout/delivery"} />
        ) : (
          <div className="w-2/4 h-52 max-lg:w-full flex flex-col items-center justify-center">
            <h2 className="font-semibold text-[30px]">Félications !</h2>
            <p className="mb-3">
              Vous venez de passez votre commande avec succès
            </p>
            <Link
              onClick={() => setDataBasket(null)}
              to="/"
              className="underline"
            >
              Retour à l'accueil
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
