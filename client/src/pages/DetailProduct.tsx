import * as React from "react";
import { Page } from "./Page";
import { DetailProduct } from "../utils/fetch";
import { useParams } from "react-router";
import { TypeDataCard } from "../utils/types";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPatchCheck } from "react-icons/bs";
import { useContext } from "../utils/Context";
import { MySwiper } from "../Components/MySwiper";
import { PropsBasket } from "../utils/types";

type PropsCaractersProduct = {
  response?: TypeDataCard[];
};

export const CaractersProduct = () => {
  // skeletons
  let { typeProduct, id } = useParams();
  const { WidthScreen, setDataBasket } = useContext();
  const [data, setData] = React.useState<PropsCaractersProduct | undefined>();
  const [notAvailable, setNotAvailable] = React.useState(false);
  const [description, setDescription] = React.useState(false);
  const reference = React.useRef<HTMLDivElement>(null);
  const [select, setSelect] = React.useState({
    size: "",
    disable: false,
  });

  const AddToBasket = () => {
    if (localStorage.getItem("basket")) {
      const SameValue = JSON.parse(
        localStorage.getItem("basket") as string,
      )?.basket.some(
        (items: PropsBasket) =>
          BasketData?.sizeChoice === items?.sizeChoice &&
          BasketData?.title === items?.title,
      );
      const newData = JSON.parse(
        localStorage.getItem("basket") as string,
      )?.basket.map((items: PropsBasket) => {
        return BasketData?.sizeChoice === items?.sizeChoice &&
          BasketData?.title === items?.title
          ? { ...items, quantity: items?.quantity + 1 }
          : items;
      });
      const result = SameValue ? [...newData] : [...newData, BasketData];
      localStorage.setItem(
        "basket",
        JSON.stringify({
          basket: result,
        }),
      );
      setDataBasket(localStorage.getItem("basket"));
    } else {
      localStorage.setItem("basket", JSON.stringify({ basket: [BasketData] }));
      setDataBasket(localStorage.getItem("basket"));
    }
  };
  const GetDate = () => {
    const temp = 86400000 * 2;
    let gap = Date.now() + temp;
    const TestDate = new Date(gap).toLocaleString("fr-FR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    if (TestDate.includes("dimanche")) {
      gap += 86400000;
      let date1 = new Date(gap).toLocaleString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      return date1;
    }
    return TestDate;
  };

  // Suggestion Brand (Complétez votre style)

  React.useEffect(() => {
    if (description) {
      reference.current?.insertAdjacentHTML(
        "beforeend",
        data?.response?.[0]?.description as string,
      );
      return;
    }
    DetailProduct(typeProduct, id)
      .then((res) => {
        setSelect((prev) => {
          return res?.response?.at(0)?.productSizes === "undefined"
            ? { size: "Taille Unique", disable: false }
            : {size: prev.size, disable: prev.disable};
      });
        setData(res);
        window.scroll(0, 0);
      })
      .catch((error) => console.log(error));
  }, [description]);


  let BasketData = {
    id: data?.response?.[0]?.id,
    image: data?.response?.[0]?.image,
    href: data?.response?.[0]?.href,
    sticker: data?.response?.[0]?.sticker,
    promotion: data?.response?.[0]?.promotion,
    brand: data?.response?.[0]?.brand,
    title: data?.response?.[0]?.title,
    price: data?.response?.[0]?.price,
    size: data?.response?.[0]?.size,
    photos: data?.response?.[0]?.photos,
    logo: data?.response?.[0]?.logo,
    category: data?.response?.[0]?.category,
    sizeChoice: select?.size,
    quantity: 1,
  };

  return (
    <Page>
      <div className="w-full mt-6 mb-4 flex flex-row flex-nowrap max-lg:flex-col max-lg:mt-0">
        <div className="w-[65%] py-1 flex flex-row flex-wrap justify-around max-lg:w-full">
          {WidthScreen < 1024 ? (
            <MySwiper
              WidthScreen={WidthScreen}
              picture={data?.response?.at(0)?.photos}
            />
          ) : (
            <React.Fragment>
              {!data?.response?.at(0)
                ? null
                : data?.response
                    ?.at(0)
                    ?.photos?.split("*,")
                    .map((items, index) => (
                      <img
                        src={
                          data?.response?.at(0)?.photos?.split("*,")?.length ===
                          index + 1
                            ? items?.substring(0, items?.length - 1)
                            : items
                        }
                        key={index}
                        className="mb-4 h-auto w-[48%]"
                      ></img>
                    ))}
            </React.Fragment>
          )}
        </div>
        <div className="w-[35%] min-[1024px]:pl-5 max-lg:px-2  flex flex-col py-1 max-lg:w-full">
          {WidthScreen < 1024 || select.size === "Taille Unique" ? null : (
            <div className="w-full mb-8">
              <img
                src={data?.response?.at(0)?.logo}
                alt={data?.response?.at(0)?.title}
                className="w-[200px] h-[100px]"
              ></img>
            </div>
          )}
          <h2 className="w-full text-[18px] uppercase mb-3">
            {data?.response?.at(0)?.brand}
          </h2>
          <h2 className="w-full font-bold text-[21px] mb-8">
            {data?.response?.at(0)?.title}
          </h2>
          <div className="w-full flex font-[550] mb-8 flex-row max-[250px]:flex-col justify-between px-1">
            <span className="text-[22px] font-normal">
              {data?.response?.at(0)?.price} €
            </span>
            <span className="uppercase text-[#00aa5b]">livré en 48h</span>
          </div>
          <div className="w-full flex flex-row flex-wrap max-lg:px-0 px-2 mb-3">
            {!data?.response?.at(0)?.productSizes ||
              data?.response?.at(0)?.productSizes === "undefined"
              ? null
              : data?.response
                  ?.at(0)
                  ?.productSizes?.split("*,")
                  .map((items, index) => {
                    const splt = items.search("~");
                    const disabled = items.includes("~0");

                    return (
                      <button
                        onClick={() =>
                          setSelect({
                            size: items.substring(0, splt),
                            disable: disabled ? true : false,
                          })
                        }
                        className={`w-1/5 max-lg:w-[22%] max-[240px]:w-auto mr-1 mb-1 border-[3px]
                               ${
                                 select.size === items.substring(0, splt)
                                   ? select.disable
                                     ? "border-[#e82938]"
                                     : "border-[#00aa5b]"
                                   : "border-[#e4e4e4]"
                               } 
                              ${disabled ? "bg-[#f0f0f0]" : "bg-white"}
                              ${disabled ? "text-[#C3C3C3]" : "text-black"}   
                              p-1`}
                        key={index}
                      >
                        {items.substring(0, splt)}
                      </button>
                    );
                  })}
          </div>
          {select.size === "Taille Unique" ? (
            <div className="w-full mb-6">
              <div className="flex flex-col">
                <span className="text-[#00aa5b] font-semibold">en stock.</span>
                <span>Chez vous le {GetDate()}</span>
              </div>
            </div>
          ) : null}
          <div className="w-full mb-12">
            {select.size === "" ||
            select.size === "Taille Unique" ? null : select?.disable ? (
              <span className="flex flex-col">
                <span className="text-[#e82938] font-semibold">
                  La taille sélectionnée est indisponible.
                </span>
                <span className="text-black font-normal">
                  Restez au courant de sa disponibilité en indiquant votre
                  email.
                </span>
              </span>
            ) : (
              <div className="flex flex-col">
                <span className="text-[#00aa5b] font-semibold">
                  {select.size} - en stock.
                </span>
                <span>Chez vous le {GetDate()}</span>
              </div>
            )}
          </div>
          <div className="relative w-full z-1 mb-12 max-lg:flex max-lg:items-center max-lg:justify-center">
            <button
              onClick={() => AddToBasket()}
              onMouseOver={() => {
                if (select?.disable || select?.size === "") {
                  setNotAvailable(true);
                }
              }}
              onMouseOut={() => {
                if (select?.disable || select?.size === "") {
                  setNotAvailable(false);
                }
              }}
              disabled={select.disable || select?.size === "" ? true : false}
              className="uppercase w-[295px] max-lg:w-full max-[220px]:h-auto h-16 px-12 flex items-center justify-center 
                    text-white text-center bg-[#0E14D3]"
            >
              <span>ajouter au panier</span>
            </button>
            {select.disable || select?.size === "" ? (
              <p
                style={{
                  transform: `${
                    notAvailable ? "TranslateY(-30px)" : "TranslateY(0px)"
                  }`,
                }}
                className="absolute px-2 top-0 text-[14px] left-6 z-[-1] bg-[#282828] text-white"
              >
                {select?.size === ""
                  ? "Veuillez sélectionner une taille"
                  : "Produit indisponible dans cette taille"}
              </p>
            ) : null}
          </div>
          <div
            onClick={() => setDescription((prev) => !prev)}
            className="w-[80%] max-lg:w-[95%] cursor-pointer 
            self-center py-3 border-t-2 border-b-2 mb-4 flex flex-col"
          >
            <div
              className={`w-full 
                  ${
                    description ? "mb-12" : "mb-0"
                  } flex flex-row justify-between px-2 max-lg:px-0`}
            >
              <p className="text-[18px]">Description</p>
              <MdKeyboardArrowDown
                fontSize={20}
                style={{
                  transform: `${
                    description ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              />
            </div>
            {!description ? null : (
              <div ref={reference} className="w-full"></div>
            )}
          </div>
          <div className="w-full flex flex-row items-center">
            <BsPatchCheck fontSize={30} />
            <p className="pl-3 w-[80%]">
              Produit certifié authentique par La Brouette Officielle
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};
