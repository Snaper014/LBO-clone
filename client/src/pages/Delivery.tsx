import * as React from "react";
import { HeaderCheckout } from "../Components/HeaderCheckout";
import { StepsCheckout } from "../Components/StepsCheckout";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import { useContext } from "../utils/Context";
import { PropsBasket } from "../utils/types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getInfoUser } from "../utils/fetch";

export const Delivery = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const { WidthScreen, DataBasket } = useContext();

  const [query, setQuery] = React.useState({
    Nom: "",
    Prenom: "",
    adress_facturation: "",
    adress_livraison: "",
    city: "",
    zip_code: "",
    mail: "",
    phone: "",
    adress_comp: "",
  });
  const handleParam = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("infos", JSON.stringify(query));
    navigate("/checkout/paiement");
  };

  React.useEffect(() => {
    if (isLogin) {
      getInfoUser(
        JSON.parse(localStorage.getItem("token_lbo") as string)?.userId,
      )
        .then((res) => {
          setQuery({
            ...query,
            Nom: res?.data?.data?.lastName,
            Prenom: res?.data?.data?.firstName,
            mail: res?.data?.data?.email,
          });
        })
        .catch((error) => console.log(error));
    }else return navigate("/login?checkout=1");
  }, [isLogin]);

  return (
    <div className="w-full  bg-[#F4F4F4]  max-lg:bg-[#ECECEC] flex flex-col items-center">
      <HeaderCheckout />
      {WidthScreen < 1024 ? null : <StepsCheckout active={2} />}
      <form
        onSubmit={formSubmit}
        id="delivery"
        action="checkout/delivery"
        method="POST"
        className="w-[938px] bg-[#F4F4F4] maxlg:py-2  max-lg:w-full mb-16 flex flex-col"
      >
        <div className="w-full flex flex-row max-lg:flex-col flex-nowrap">
          <div
            className={`w-[550px] max-lg:w-full pb-3 flex flex-col justify-center max-lg:px-0 px-2`}
          >
            <label
              htmlFor="Nom"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Nom
            </label>
            <input
              id="Nom"
              name="Nom"
              required
              min={1}
              value={query.Nom}
              onChange={(e) => handleParam(e)}
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="Prenom"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Prenom
            </label>
            <input
              id="Prenom"
              name="Prenom"
              required
              value={query.Prenom}
              onChange={(e) => handleParam(e)}
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="mail"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Adresse email
            </label>
            <input
              id="mail"
              name="mail"
              required
              value={query.mail}
              onChange={(e) => handleParam(e)}
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="phone"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Téléphone (facultatif)
            </label>
            <input
              id="phone"
              name="phone"
              value={query.phone}
              onChange={(e) => handleParam(e)}
              autoComplete="phone"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="adress_facturation"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Adresse de facturation
            </label>
            <input
              id="adress_facturation"
              name="adress_facturation"
              required
              value={query.adress_facturation}
              onChange={(e) => handleParam(e)}
              autoComplete="adress-facturation"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="adress_livraison"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Adresse de livraison
            </label>
            <input
              id="adress_livraison"
              name="adress_livraison"
              required
              value={query.adress_livraison}
              onChange={(e) => handleParam(e)}
              autoComplete="adress-livraison"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="adress_comp"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Adresse complémentaire (facultative)
            </label>
            <input
              id="adress_comp"
              name="adress_comp"
              value={query.adress_comp}
              onChange={(e) => handleParam(e)}
              autoComplete="adress-comp"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="zip_code"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Code Postale
            </label>
            <input
              id="zip_code"
              name="zip_code"
              required
              value={query.zip_code}
              onChange={(e) => handleParam(e)}
              autoComplete="zip_code"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
            <label
              htmlFor="city"
              className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
            >
              Ville
            </label>
            <input
              id="city"
              name="city"
              required
              value={query.city}
              onChange={(e) => handleParam(e)}
              autoComplete="city"
              type="text"
              className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
            />
          </div>
          <div className="h-full max-lg:w-full w-[365px] flex justify-center">
            <div className="w-[320px] max-lg:w-full justify-center px-3 h-[320px] max-lg:bg-[#ECECEC] bg-white flex flex-col">
              <h2 className="font-bold uppercase text-[22px]">Total</h2>
              <div className="flex flex-row flex-nowrap px-2 justify-between">
                <p className="font-bold">Sous-total</p>
                <span className="font-bold">
                  {!DataBasket ||
                  JSON.parse(DataBasket as string)?.basket?.length === 0
                    ? "0"
                    : JSON.parse(DataBasket)
                        ?.basket?.map(
                          (items: PropsBasket) =>
                            items?.quantity * items?.price,
                        )
                        .reduce((a: number, b: number) => a + b)}{" "}
                  €
                </span>
              </div>
              <div className="flex border-b-2 py-2 border-b-[#E4E4E4] flex-row flex-nowrap px-2 justify-between">
                <p className="font-bold">Livraison rapide 48h</p>
                <span className="font-bold text-[#00aa5b]">Gratuite</span>
              </div>
              <div className="flex py-2 flex-row flex-nowrap px-2 justify-between">
                <p className="font-bold text-[28px]">Total</p>
                <span className="font-bold text-[28px]">
                  {!DataBasket ||
                  JSON.parse(DataBasket as string)?.basket?.length === 0
                    ? "0 "
                    : JSON.parse(DataBasket)
                        ?.basket?.map(
                          (items: PropsBasket) =>
                            items?.quantity * items?.price,
                        )
                        .reduce((a: number, b: number) => a + b)}{" "}
                  €
                </span>
              </div>
              <button
                type="submit"
                name="submit"
                aria-label="submit infos"
                disabled={
                  !DataBasket ||
                  JSON.parse(DataBasket as string)?.basket?.length === 0
                    ? true
                    : false
                }
                className="bg-[#0E14D3] max-lg:w-full gap-4 w-full text-white h-20 flex items-center justify-center"
              >
                <span className="uppercase">Valider les informations</span>
                <MdKeyboardArrowRight fontSize={25} color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
      <footer className="w-full bg-[#e4e4e4] text-center h-12 flex items-center justify-center">
        <span>© 2024 - LaBrouetteOfficielle.com</span>
      </footer>
    </div>
  );
};
