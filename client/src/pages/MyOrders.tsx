import * as React from "react";
import { Page } from "./Page";
import { getInfoUser } from "../utils/fetch";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import { useContext } from "../utils/Context";
import { propsUserInfos, propsOrder, PropsBasket } from "../utils/types";

export const Orders = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const { userInfos, setUserInfos } = useContext();

  if (!isLogin) {
    navigate("/login");
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
      <div className="w-full flex flex-row flex-nowrap max-lg:flex-col">
        <div className="w-[20%] text-center max-lg:w-full max-lg:py-3">
          <h2 className="text-[24px] font-semibold">Mes commandes</h2>
        </div>
        <div className="w-[80%] max-lg:w-full flex flex-col lg:h-[700px] lg:overflow-y-scroll">
          {userInfos.products.map((items: propsOrder, index: number) => (
            <div
              key={index}
              className="w-full mb-4 border-[3px] border-[#0E14D3]"
            >
              <div className="w-full mb-6 gap-2 flex flex-col justify-around">
                <p className="text-[14px]">
                  Nom: <span className="font-semibold">{items.Nom}</span>
                </p>
                <p className="text-[14px]">
                  Prenom: <span className="font-semibold">{items.Prenom}</span>
                </p>
                <p className="text-[14px]">
                  adresse de facturation:{" "}
                  <span className="font-semibold">
                    {items.adress_facturation}
                  </span>
                </p>
                <p className="text-[14px]">
                  adresse de livraison:{" "}
                  <span className="font-semibold">
                    {items.adress_livraison}
                  </span>
                </p>
                <p className="text-[14px]">
                  ville: <span className="font-semibold">{items.city}</span>
                </p>
                <p className="text-[14px]">
                  code postal:{" "}
                  <span className="font-semibold">{items.zip_code}</span>
                </p>
                <p className="text-[14px]">
                  email: <span className="font-semibold">{items.mail}</span>
                </p>
                <p className="text-[14px]">
                  téléphone:{" "}
                  <span className="font-semibold">{items.phone}</span>
                </p>
                <p className="text-[14px]">
                  adresse complémentaire:{" "}
                  <span className="font-semibold">{items.Nom}</span>
                </p>
              </div>
              {items.data.map((element: PropsBasket, index: number) => (
                <div
                  className={`w-full max-lg:flex-col h-36 max-lg:h-auto max-lg:py-4 border-b border-b-black flex flex-row`}
                  key={index}
                >
                  <div
                    onClick={() =>
                      navigate(
                        `/detailproduct/${element?.category}/${element?.id}`,
                      )
                    }
                    className="w-[20%] cursor-pointer max-lg:w-full  flex items-center justify-center"
                  >
                    <img
                      src={element?.image}
                      className="h-32 w-32 max-lg:w-full max-lg:h-auto"
                    ></img>
                  </div>
                  <div className="px-3 w-[85%] max-lg:w-full items-center flex flex-row justify-between">
                    <div className="h-full w-[50%] flex flex-col">
                      <h2 className="font-semibold text-[18px]">
                        {element?.brand}
                      </h2>
                      <p
                        onClick={() =>
                          navigate(
                            `/detailproduct/${element?.category}/${element?.id}`,
                          )
                        }
                        className="cursor-pointer text-[12px] mb-1 w-full"
                      >
                        {element?.title}
                      </p>
                      <p className="mb-2">Taille : {element?.sizeChoice}</p>
                      <p>Quantité : {element?.quantity}</p>
                    </div>
                    <div className="pt-2 font-semibold max-lg:w-2/4 max-lg:h-full max-lg:flex max-lg:flex-col max-lg:items-end max-lg:justify-between">
                      <span className="max-lg:text-[22px]">
                        {element?.price} €
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};
