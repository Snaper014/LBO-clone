import * as React from 'react';
import { HeaderCheckout } from "../Components/HeaderCheckout";
import { StepsCheckout } from "../Components/StepsCheckout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import { useContext } from "../utils/Context";
import { PropsBasket } from "../utils/types";
import { addOrder } from "../utils/fetch";

export const Payout = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const { WidthScreen, DataBasket } = useContext();
  const infos = localStorage.getItem("infos");
  const infosPlus = JSON.parse(localStorage.getItem("infos") as string);
  
  React.useEffect(() => {
    if (!isLogin) {
      return navigate("/login?checkout=1");
    }
  }, [])

  return (
    <div className="w-full bg-[#F4F4F4]  max-lg:bg-[#ECECEC] flex flex-col items-center">
      <HeaderCheckout />
      {WidthScreen < 1024 ? null : <StepsCheckout active={3} />}
      {!infos ||
      infosPlus?.Nom === null ||
      infosPlus?.Nom === "" ||
      infosPlus?.Prenom === null ||
      infosPlus?.Prenom === "" ||
      infosPlus?.adress_facturation === null ||
      infosPlus?.adress_facturation === "" ||
      infosPlus?.adress_livraison === null ||
      infosPlus?.adress_livraison === "" ||
      infosPlus?.city === null ||
      infosPlus?.city === "" ||
      infosPlus?.zip_code === null ||
      infosPlus?.zip_code === "" ||
      infosPlus?.mail === null ||
      infosPlus?.mail === "" ? (
        <div className="m-2 h-[100vh]">
          <p className="text-[20px] mb-3">
            Vous n'avez pas correctement rempli les informations sur la
            livraison
          </p>
          <Link to="/checkout/delivery" className="underline text-[#8F8F8F]">
            Retour aux informations de livraisons
          </Link>
        </div>
      ) : (
        <form
          id="payout"
          action="/checkout/payout"
          method="post"
          className="w-[938px] h-[90vh] bg-[#F4F4F4] maxlg:py-2  max-lg:w-full mb-16 flex flex-col"
        >
          <p className="text-[26px] py-3 font-semibold">
            Montant :{" "}
            {!DataBasket ||
            JSON.parse(DataBasket as string)?.basket?.length === 0
              ? "0 "
              : JSON.parse(DataBasket)
                  ?.basket?.map(
                    (items: PropsBasket) => items?.quantity * items?.price,
                  )
                  .reduce((a: number, b: number) => a + b)}
            €
          </p>
          <label
            htmlFor="card"
            className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
          >
            Numéro de la carte
          </label>
          <input
            id="card"
            name="card"
            required
            autoComplete="card"
            type="text"
            className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
          />
          <label
            htmlFor="expi"
            className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
          >
            Date d'expiration
          </label>
          <div className="flex flex-row w-2/4 gap-2">
            <input
              id="expi"
              name="expi"
              type="date"
              required
              autoComplete="expi"
              className="w-[40%] h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <input
              id="expi"
              name="expi"
              required
              type="date"
              autoComplete="expi"
              className="w-[40%] h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
          </div>
          <label
            htmlFor="crypto"
            className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
          >
            Cryptogramme
          </label>
          <input
            id="crypto"
            name="crypto"
            required
            autoComplete="crypto"
            type="text"
            className="w-[30%] max-lg:w-full h-14 pl-3 mb-6 border-[3px] border-[#e4e4e4]"
          />
          <button
            onClick={() => {
              navigate("/checkout/confirm");
              addOrder(
                {
                  ...infosPlus,
                  data: JSON.parse(localStorage.getItem("basket") as string)
                    ?.basket,
                },
                isLogin
                  ? JSON.parse(localStorage.getItem("token_lbo") as string)
                      ?.userId
                  : "",
              )
                .then(() => {
                  console.log("ajout avec succès dans la bd");
                  localStorage.removeItem("basket");
                  localStorage.removeItem("infos");
                })
                .catch((error) => console.log(error));
            }}
            disabled={
              !DataBasket ||
              JSON.parse(DataBasket as string)?.basket?.length === 0
                ? true
                : false
            }
            className="bg-[#0E14D3] max-lg:w-full gap-4 w-full text-white h-16 flex items-center justify-center"
          >
            <span className="uppercase font-semibold">Payer</span>
          </button>
        </form>
      )}
    </div>
  );
};
