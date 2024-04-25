import { Link, useNavigate } from "react-router-dom";
import { HeaderCheckout } from "../Components/HeaderCheckout";
import { StepsCheckout } from "../Components/StepsCheckout";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useContext } from "../utils/Context";
import { PropsBasket } from "../utils/types";
import { FaRegTrashAlt } from "react-icons/fa";

export const Basket = () => {
  const { DataBasket, setDataBasket, WidthScreen, } = useContext();
  const naviguate = useNavigate();
  console.log("longueur", JSON.parse(DataBasket as string)?.basket?.length);
  const DeleteProduct = (items: PropsBasket) => {
    const newData = JSON.parse(
      localStorage.getItem("basket") as string,
    )?.basket.filter((element: PropsBasket) => {
      return (
        items?.id !== element?.id && element?.sizeChoice !== items?.sizeChoice
      );
    });
    localStorage.setItem(
      "basket",
      JSON.stringify({
        basket: [...newData],
      }),
    );
    setDataBasket(localStorage.getItem("basket"));
  };
  const ModifyQty = (
    e: React.ChangeEvent<HTMLSelectElement>,
    items: PropsBasket,
  ) => {
    const newData = JSON.parse(
      localStorage.getItem("basket") as string,
    )?.basket.map((element: PropsBasket) => {
      return items?.id === element?.id &&
        element?.sizeChoice === items?.sizeChoice
        ? { ...element, quantity: parseInt(e.target.value) }
        : element;
    });
    localStorage.setItem(
      "basket",
      JSON.stringify({
        basket: [...newData],
      }),
    );
    setDataBasket(localStorage.getItem("basket"));
  };
  return (
    <div className="w-full max-[300px]:w-[300px] bg-[#F4F4F4] max-[300px]:overflow-x-scroll max-lg:bg-[#ECECEC] flex flex-col items-center">
      <HeaderCheckout />
      {WidthScreen < 1024 ? (
        <div className="w-full h-12 py-2 bg-white border-b border-b-black flex items-center">
          <h4 className="font-bold text-[28px]">Panier</h4>
        </div>
      ) : (
        <StepsCheckout active={1} />
      )}
      <main className="w-[938px] bg-[#F4F4F4] maxlg:py-2 max-[300px]:w-[300px] max-lg:w-full mb-16 flex flex-col">
        <div className="w-full flex flex-row max-lg:flex-col flex-nowrap">
          <div
            className={`
                    ${
                      !DataBasket || DataBasket?.length < 4
                        ? "h-[362px]"
                        : "h-auto"
                    } `}
          >
            <div
              className={`w-[550px] max-lg:w-full pb-3 flex flex-col justify-center max-lg:px-0 px-2`}
            >
              {!DataBasket ||
              JSON.parse(DataBasket as string)?.basket?.length === 0 ? (
                <p className="bg-white py-3 px-2">
                  Vous n'avez pas de produit dans votre panier
                </p>
              ) : (
                JSON.parse(DataBasket)?.basket.map(
                  (items: PropsBasket, index: number) => (
                    <div
                      className={`w-full h-36 max-lg:h-auto max-lg:py-4 border-b border-b-black flex flex-row`}
                      key={index}
                    >
                      <div
                        onClick={() =>
                          naviguate(
                            `/detailproduct/${items?.category}/${items?.id}`,
                          )
                        }
                        className="w-[20%] cursor-pointer max-lg:w-40 flex items-center justify-center"
                      >
                        <img src={items?.image} className="h-28 w-28"></img>
                      </div>
                      <div className="px-3 w-[85%] items-center flex flex-row justify-between">
                        <div className="h-full w-[50%] flex flex-col">
                          <h2 className="font-semibold text-[18px]">
                            {items?.brand}
                          </h2>
                          <p
                            onClick={() =>
                              naviguate(
                                `/detailproduct/${items?.category}/${items?.id}`,
                              )
                            }
                            className="cursor-pointer text-[12px] mb-1 w-full"
                          >
                            {items?.title}
                          </p>
                          <p className="mb-2">Taille : {items?.sizeChoice}</p>
                          {WidthScreen < 1024 ? null : (
                            <div
                              onClick={() => DeleteProduct(items)}
                              className="cursor-pointer flex flex-row gap-2 items-center flex-nowrap"
                            >
                              <FaRegTrashAlt fontSize={15} />
                              <p className="text-[#A3A3A3] text-[12px]">
                                supprimer
                              </p>
                            </div>
                          )}
                          {WidthScreen < 1024 ? (
                            <select
                              name="quantity"
                              required
                              value={items?.quantity}
                              onChange={(e) => ModifyQty(e, items)}
                              autoComplete="quantity"
                              className="mt-2 w-[105px] py-2 block"
                            >
                              {Array(12)
                                .fill(0)
                                .map((items, index) => (
                                  <option key={index} value={index + 1}>
                                    quantité: {index + 1 + items}
                                  </option>
                                ))}
                            </select>
                          ) : null}
                        </div>
                        <div className="pt-2 font-semibold max-lg:w-2/4 max-lg:h-full max-lg:flex max-lg:flex-col max-lg:items-end max-lg:justify-between">
                          <span className="max-lg:text-[22px]">
                            {items?.price * items?.quantity} €
                          </span>
                          {WidthScreen > 1024 ? null : (
                            <div
                              onClick={() => DeleteProduct(items)}
                              className=" cursor-pointer flex flex-row gap-2 items-center flex-nowrap"
                            >
                              <FaRegTrashAlt fontSize={15} />
                            </div>
                          )}
                        </div>
                        {WidthScreen < 1024 ? null : (
                          <select
                            name="quantity"
                            required
                            value={items?.quantity}
                            onChange={(e) => ModifyQty(e, items)}
                            autoComplete="quantity"
                            className="h-12 border-[3px] border-[#e4e4e4]"
                          >
                            {Array(12)
                              .fill(0)
                              .map((items, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1 + items}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ),
                )
              )}
            </div>
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
                onClick={() => {
                  naviguate("/checkout/delivery");
                }}
                disabled={
                  !DataBasket ||
                  JSON.parse(DataBasket as string)?.basket?.length === 0
                    ? true
                    : false
                }
                className="bg-[#0E14D3] max-lg:w-full gap-4 w-full text-white h-20 flex items-center justify-center"
              >
                <span className="uppercase">Valider mon panier</span>
                <MdKeyboardArrowRight fontSize={25} color="white" />
              </button>
            </div>
          </div>
        </div>
        {WidthScreen < 1024 ? null : (
          <div className="w-full mt-2 flex flex-row flex-nowrap gap-1">
            <MdKeyboardArrowLeft fontSize={25} color="#8F8F8F" />
            <Link to="/" className="text-[#8F8F8F]">
              Retour à l'acceuil
            </Link>
          </div>
        )}
      </main>
      <footer className="w-full max-[300px]:w-[300px] bg-[#e4e4e4] text-center h-12 flex items-center justify-center">
        <span>© 2024 - LaBrouetteOfficielle.com</span>
      </footer>
    </div>
  );
};
