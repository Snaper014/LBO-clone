import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineShoppingBag, MdOutlineExitToApp } from "react-icons/md";
import { SubMenu } from "../../SubMenu";
import { GoPackageDependencies } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useContext } from "../../utils/Context";
import { propsUserInfos } from "../../utils/types";
import { getInfoUser } from "../../utils/fetch";
import { PropsBasket } from "../../utils/types";
import { useAuth } from "../../utils/useAuth";
import { Logo } from "../../utils/logo";

type PropsDesktopBar = {
  isHome: boolean;
};

export const DesktopBar = ({ isHome }: PropsDesktopBar) => {
  const [active, setActive] = React.useState(-1);
  const [search, setSearch] = React.useState("");
  const [options, setOptions] = React.useState({
    profil: false,
    basket: false,
  });
  const { userInfos, setUserInfos, DataBasket } = useContext();
  const { isLogin, Logout } = useAuth();

  const navigate = useNavigate();
  const liste = [
    { name: "Nouveautés", link: "nouveautes" },
    { name: "Top ventes", link: "top_ventes_sizes" },
    { name: "Vêtements", link: "" },
    { name: "Chaussures", link: "" },
    { name: "Accessoires", link: "" },
    { name: "Marques", Link: "/marques" },
    { name: "Artistes", link: "" },
    { name: "promos", link: "nouveautes" },
  ];
  React.useEffect(() => {
    if (isLogin) {
      getInfoUser(
        JSON.parse(localStorage.getItem("token_lbo") as string)?.userId,
      )
        .then((res) => {
          const result: propsUserInfos = res?.data?.data;
          setUserInfos(result);
        })
        .catch((error) => console.log(error));
    }
    // appel api
  }, [isLogin]);

  return (
    <div
      className={`${isHome ? "absolute" : ""} 
      z-20 top-0 left-0 max-[1425px]:w-[100%] h-[152px] w-[1422px] bg-transparent`}
    >
      <div
        className={`w-full h-[97px] ${
          isHome ? "bg-transparent" : "bg-[white]"
        } flex flex-row flex-nowrap`}
      >
        <div className="max-[1425px]:w-[25%] w-[320px] flex justify-center items-center">
          <Link to="/">
            <div className="w-[220px] h-[60px]">
              <Logo
                color={`${isHome ? "#FFFFFF" : "#0E14D3"}`}
                secondColor={`${isHome ? "#474747" : "#FFFFFF"}`}
              />
            </div>
          </Link>
        </div>
        <div className="max-[1425px]:w-[50%] w-[820px] h-full flex items-center justify-between">
          <div
            className={`max-[1425px]:w-[90%] w-[700px] h-[52px] flex flex-row border-4 ${
              isHome ? "border-white" : "border-[#e4e4e4]"
            }`}
          >
            <button
              onClick={() => navigate(`/search/${search}`)}
              className={`w-[10%] 
              ${isHome ? "bg-transparent" : "bg-[white]"} 
              flex justify-center items-center border-r-2 
              ${isHome ? "border-r-white" : "border-r-[#e4e4e4]"} 
              ${isHome ? "border-white" : "border-[#e4e4e4]"}`}
            >
              <FiSearch
                color={`${isHome ? "white" : "black"}`}
                fontSize={25}
                fontWeight={600}
              />
            </button>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.code === "Enter") {
                  navigate(`/search/${search}`);
                } else return null;
              }}
              className={`w-[90%]
                ${isHome ? "isHome" : "notHome"}
                ${isHome ? "bg-transparent" : "bg-[white]"}
                ${isHome ? "text-white" : "text-black"}
                ${isHome ? "border-white" : "border-[#e4e4e4]"}
                ${isHome ? "border-l-white" : "border-l-[#e4e4e4]"}
                  border-l-2 border-white pl-3 font-semibold`}
              placeholder="Rechercher"
            />
          </div>
          <div className="max-[1425px]:w-[10%] flex items-center justify-center">
            <p
              className={`HoverLinks ${
                isHome ? "text-white" : "text-black"
              } cursor-pointer text-[18px] font-medium`}
            >
              Aide
            </p>
          </div>
        </div>
        <div className="max-[1425px]:w-[25%] w-[215px] gap-4 flex flex-row justify-center items-center">
          <div
            onMouseOver={() =>
              setOptions((prev) => {
                return { profil: true, basket: prev.basket };
              })
            }
            onMouseOut={() =>
              setOptions((prev) => {
                return { profil: false, basket: prev.basket };
              })
            }
            className="relative cursor-pointer"
          >
            <i className="relative">
              <AiOutlineUser
                color={`${isHome ? "white" : "black"}`}
                fontSize={35}
              />
              {isLogin ? (
                <div className="absolute -top-1 right-0 rounded-full h-4 w-4 bg-[#0E14D3]"></div>
              ) : null}
            </i>
            {!options.profil ? null : (
              <div
                className={`absolute z-20 ${
                  isLogin ? "-bottom-[215px]" : "-bottom-40"
                } w-96  -right-20 bg-white flex flex-col`}
              >
                <div className="w-full h-12 bg-[#282828] text-white flex flex-row flex-nowrap items-center justify-center">
                  {isLogin ? (
                    <p>Bienvenue {userInfos?.firstName} !</p>
                  ) : (
                    <>
                      <Link
                        to={"/login"}
                        className="w-2/5 h-2/3 text-center border-r-2 border-r-white underline"
                      >
                        Se connecter
                      </Link>
                      <Link
                        to={"/register"}
                        className="w-2/5 h-2/3 text-center underline"
                      >
                        Créer un compte
                      </Link>
                      <i
                        onClick={() =>
                          setOptions((prev) => {
                            return { profil: false, basket: prev.basket };
                          })
                        }
                        className="w-1/5 flex cursor-pointer justify-center items-center"
                      >
                        <RxCross1 fontSize={25} color="white" />
                      </i>
                    </>
                  )}
                </div>
                <Link
                  to={`${isLogin ? "/commandes" : "/login"}`}
                  className="w-full flex px-3 flex-row justify-start items-center gap-3"
                >
                  <GoPackageDependencies fontSize={30} />
                  <p className="h-14 py-5">MES COMMANDES</p>
                </Link>
                <Link
                  to={`${isLogin ? "/profil" : "/login"}`}
                  className="w-full flex px-3 flex-row justify-start items-center gap-3"
                >
                  <AiOutlineUser fontSize={30} />
                  <p className="h-14 py-5">MON PROFIL</p>
                </Link>
                <div>
                  {isLogin ? (
                    <div
                      onClick={() => {
                        Logout();
                        localStorage.removeItem("token_lbo");
                      }}
                      className="w-full cursor-pointer flex px-3 flex-row justify-start items-center gap-3"
                    >
                      <MdOutlineExitToApp fontSize={30} />
                      <p className="h-14 py-5 uppercase">se déconnecter</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          <div
            onMouseOver={() =>
              setOptions((prev) => {
                return { profil: prev.profil, basket: true };
              })
            }
            onMouseOut={() =>
              setOptions((prev) => {
                return { profil: prev.profil, basket: false };
              })
            }
            className="relative"
          >
            <MdOutlineShoppingBag
              color={`${isHome ? "white" : "black"}`}
              fontSize={35}
            />
            {!DataBasket ||
            JSON.parse(DataBasket)?.basket?.length === 0 ? null : (
              <span
                className={`absolute rounded-full flex items-center justify-center  
                -top-3 right-0 h-6 w-6 bg-[#0E14D3] text-white font-semibold`}
              >
                <span>
                  {JSON.parse(DataBasket)
                    ?.basket?.map((items: PropsBasket) => items?.quantity)
                    .reduce((a: number, b: number) => a + b)}
                </span>
              </span>
            )}
            {!options.basket ||
            !DataBasket ||
            JSON.parse(DataBasket)?.basket?.length === 0 ? null : (
              <div
                className={`z-30 w-[420px] pb-3 absolute -right-3 bg-white flex flex-col
                  justify-center px-2`}
              >
                <div
                  className={`
                      w-full 
                      ${
                        JSON.parse(DataBasket)?.basket?.length > 3
                          ? "h-[380px] overflow-y-scroll"
                          : ""
                      }
                  `}
                >
                  {JSON.parse(DataBasket)?.basket.map(
                    (items: PropsBasket, index: number) => (
                      <Link
                        reloadDocument
                        to={`/detailproduct/${items?.category}/${items?.id}`}
                        className={`w-full h-36 border-b border-b-black flex flex-row`}
                        key={index}
                      >
                        <div className="w-[30%] flex items-center justify-center">
                          <img src={items?.image} className="h-24 w-24"></img>
                        </div>
                        <div className="w-[70%] flex flex-row justify-between">
                          <div className="h-full w-[85%] flex flex-col">
                            <h2 className="font-semibold text-[18px]">
                              {items?.brand}
                            </h2>
                            <p className="text-[12px] mb-1 w-4/5">
                              {items?.title}
                            </p>
                            <p className="mb-1">Taille : {items?.sizeChoice}</p>
                            {items?.quantity < 2 ? null : (
                              <p>qty: {items?.quantity}</p>
                            )}
                          </div>
                          <div className="h-full pt-2 w-[15%] font-semibold">
                            <span className="w-full">
                              {items?.price * items?.quantity} €
                            </span>
                          </div>
                        </div>
                      </Link>
                    ),
                  )}
                </div>
                <div className="w-full flex flex-col items-center">
                  <span className="text-[16px] mt-2 mb-6 self-end uppercase text-[#00aa5b]">
                    livraison gratuite
                  </span>
                  <Link
                    className="bg-[#0E14D3] w-full text-white h-20 flex items-center justify-center"
                    to="/checkout/basket"
                  >
                    <span>
                      Mon Panier (
                      {JSON.parse(DataBasket)
                        ?.basket?.map((items: PropsBasket) => items?.quantity)
                        .reduce((a: number, b: number) => a + b)}
                      )
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <img
            src="https://flagcdn.com/h20/fr.png"
            srcSet="https://flagcdn.com/h48/fr.png 2x"
            height="20"
            alt="France"
          ></img>
        </div>
      </div>
      <nav
        className={`
        ${isHome ? "bg-transparent" : "bg-[white]"}
        ${isHome ? "" : "border-b-[#e4e4e4]"}
        ${isHome ? "" : "border-t-[#e4e4e4]"}
        ${isHome ? "" : "border-t"}  
        w-full h-[50px] border-b ${
          isHome ? "text-white" : "text-black"
        } relative`}
      >
        <ul className="w-full gap-6 h-full flex justify-center items-center">
          {liste.map((items, index) => (
            <React.Fragment key={index}>
              <li
                onMouseOver={() => setActive(index)}
                onMouseOut={() => setActive(-1)}
                key={index}
                className={`h-full flex justify-center items-center cursor-pointer
                            `}
              >
                <div className="uppercase relative w-full h-full flex justify-center items-center">
                  {items.name === "Nouveautés" ||
                  items.name === "Top ventes" ||
                  items.name === "promos" ? (
                    <Link reloadDocument to={`/products/${items.link}`}>
                      {items.name}
                    </Link>
                  ) : (
                    items.name === "Marques" ? 
                      <Link to={"/marques"}>{items.name}</Link>
                      : items.name
                  )}
                  <span
                    className={`${
                      isHome ? "AnimNav" : "AnimNav-second"
                    } absolute bottom-0 left-[50%] w-2 h-1 bg-transparent`}
                  ></span>
                </div>
                {active === index ? <SubMenu index={active} /> : null}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
};
