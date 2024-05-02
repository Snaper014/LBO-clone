import * as React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdOutlineExitToApp,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaSnapchatGhost, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { clothes, TypeClothes, AllShoes, AllAccessories } from "../Links";
import { GoPackageDependencies, GoPlus } from "react-icons/go";
import { useContext } from "../utils/Context";
import { getInfoUser } from "../utils/fetch";
import { propsUserInfos } from "../utils/types";
import { useAuth } from "../utils/useAuth";

type Propssearch = {
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Search = ({ setDisplaySearch }: Propssearch) => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 px-1 z-30 w-[100vw]
            h-[100vh] bg-white`}
    >
      <div className="w-full h-[80px] mb-3 flex flex-row items-center justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.code === "Enter") {
              navigate(`/search/${search}`);
              setDisplaySearch(false);
            } else return null;
          }}
          type="search"
          className={`w-[85%] max-[550px]:w-[70%] bg-[white] h-12 text-black
                border-[3px] border-[#e4e4e4] pl-3 font-semibold
                `}
          placeholder="Rechercher"
        />
        <i
          className="w-[10%] cursor-pointer max-[550px]:w-[30%] flex items-center justify-center"
          onClick={() => setDisplaySearch((prev) => !prev)}
        >
          <RxCross1 fontSize={35} />
        </i>
      </div>
      <div className="w-full flex flex-col px-2">
        <div className="w-full mb-3 px-2 flex flex-row items-center justify-between">
          <h2 className="text-[22px] max-[250px]:w-[18px] font-semibold">
            Les dernières recherches
          </h2>
          <button className="text-[12px] mr-1 text-[#8f8f8f] underline">
            effacer
          </button>
        </div>
      </div>
    </div>
  );
};

export const MobileMenu = ({
  setDisplayMenu,
  Height,
  Width,
}: {
  setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
  Height: number;
  Width: number;
}) => {
  const [active, setActive] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const { userInfos, setUserInfos } = useContext();
  const { isLogin, Logout } = useAuth();
  // const [tokenExist, setTokenExist] = React.useState(
  //   localStorage.getItem("token_lbo") !== null ? true : false,
  // );

  React.useEffect(() => {
    document.body.classList.add("noscroll");
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
  }, []);
  return (
    <>
      <div
        style={{
          height: `${Height}px`,
          overflowY: "scroll",
          width: `${Width * 0.85}px`,
        }}
        className={`fixed m-0 top-0 left-0 z-30 
                flex flex-col items-start justify-start bg-white`}
      >
        <div className="w-full max-[285px]:overflow-x-hidden max-[285px]:w-[245px]">
          <button
            onClick={() => {
              setDisplayMenu(false);
              document.body.classList.remove("noscroll");
            }}
            className="w-full h-14 flex px-3 flex-row justify-end items-center 
          bg-[#292b2d] text-white gap-1"
          >
            <p className="h-14 py-4">FERMER</p>{" "}
            <RxCross1 fontSize={18} color="white" />
          </button>
          <div className="w-full border-b-[1px] border-b-[#c3c3c3] py-1 flex flex-row flex-nowrap items-center justify-evenly">
            <Link
              onClick={() => {
                setDisplayMenu(false);
                document.body.classList.remove("noscroll");
              }}
              to="/products/nouveautes"
              className="h-12  max-[380px]:h-16 max-[380px]:w-[99px] w-[31%] font-semibold text-[14px] uppercase text-center border border-black py-3"
            >
              nouveautés
            </Link>
            <Link
              onClick={() => {
                setDisplayMenu(false);
                document.body.classList.remove("noscroll");
              }}
              to="/products/top_ventes_sizes"
              className="h-12 max-[285px]:w-[60px] max-[380px]:h-16 w-[31%] max-[380px]:w-[25%] font-semibold text-[14px] uppercase text-center border border-black py-3"
            >
              top ventes
            </Link>
            <Link
              to="/products/nouveautes"
              className="h-12 max-[285px]:w-[60px] max-[380px]:h-16 w-[31%] max-[380px]:w-[25%] font-semibold text-[14px] uppercase text-center border border-black py-3"
            >
              promos
            </Link>
          </div>
          <button
            onClick={() => {
              setActive(true);
              setIndex(1);
            }}
            className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold  px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">VÊTEMENTS</p>
            <MdKeyboardArrowRight />
          </button>
          <button
            onClick={() => {
              setActive(true);
              setIndex(2);
            }}
            className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">CHAUSSURES</p>
            <MdKeyboardArrowRight />
          </button>
          <button
            onClick={() => {
              setActive(true);
              setIndex(3);
            }}
            className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">ACCESOIRES</p>
            <MdKeyboardArrowRight />
          </button>
          <Link
            onClick={() => document.body.classList.remove("noscroll")}
            to="/marques"
            className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">MARQUES</p>
            <GoPlus />
          </Link>
          <button
            onClick={() => {
              setActive(true);
              setIndex(4);
            }}
            className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">ARTISTES</p>
            <MdKeyboardArrowRight />
          </button>
          <Link 
              to="/products/nouveautes"
              className="w-full text-red-600 text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold h-16 px-5 py-3 flex flex-row items-center justify-between">
                <p className="h-16 py-5">PROMOS 🔥</p>
                <GoPlus color="black" />
          </Link>
          <div className="w-full h-16 bg-[#292b2d] flex flex-row flex-nowrap">
            {isLogin ? (
              <p className="w-full text-white font-semibold py-3 text-center max-[285px]:text-[14px] h-full text-[17px]">
                Bienvenue {userInfos?.firstName} !
              </p>
            ) : (
              <React.Fragment>
                <Link
                  onClick={() => document.body.classList.remove("noscroll")}
                  to="/login"
                  className="max-[285px]:text-[14px] h-full text-[17px] uppercase border-r-2 border-r-white text-white text-center font-semibold py-5 w-2/4"
                >
                  me connecter
                </Link>
                <Link
                  onClick={() => document.body.classList.remove("noscroll")}
                  to="/register"
                  className="max-[285px]:text-[14px] h-full text-[17px] uppercase text-white text-center font-semibold py-5 w-2/4"
                >
                  créer mon compte
                </Link>
              </React.Fragment>
            )}
          </div>
          <Link
            onClick={() => document.body.classList.remove("noscroll")}
            to={`${isLogin ? "/commandes" : "/login"}`}
            className="w-full flex px-3 flex-row justify-start items-center gap-2"
          >
            <GoPackageDependencies fontSize={25} />
            <p className="h-14 py-3">MES COMMANDES</p>
          </Link>
          <Link
            onClick={() => document.body.classList.remove("noscroll")}
            to={`${isLogin ? "/profil" : "/login"}`}
            className="w-full flex px-3 flex-row justify-start items-center gap-2"
          >
            <AiOutlineUser fontSize={25} />
            <p className="h-14 py-3">MON PROFIL</p>
          </Link>
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
          <div className="flex flex-row items-center justify-between flex-nowrap w-full h-28">
            <i className="w-1/4 h-2/4 flex justify-center">
              <FaSnapchatGhost color="#868686" fontSize={35} />
            </i>
            <i className="w-1/4 h-2/4 flex justify-center">
              <FaInstagram color="#868686" fontSize={30} />
            </i>
            <i className="w-1/4 h-2/4 flex justify-center">
              <FaFacebookSquare color="#868686" fontSize={30} />
            </i>
            <i className="w-1/4 h-2/4 flex justify-center">
              <FaYoutube color="#868686" fontSize={30} />
            </i>
          </div>
        </div>
      </div>
      {active ? (
        <MobileSubMenu
          setActive={setActive}
          Height={Height}
          Width={Width}
          index={index}
        />
      ) : null}
      <div
        onClick={() => {
          setDisplayMenu(false);
          document.body.classList.remove("noscroll");
        }}
        style={{ height: `${Height}px`, width: `${Width}px` }}
        className="fixed z-20 shadow top-0 right-0 left-0 bottom-0"
      ></div>
    </>
  );
};

type PropsMobileSubMenu = {
  Height: number;
  Width: number;
  index: number;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileSubMenu = ({
  Height,
  Width,
  index,
  setActive,
}: PropsMobileSubMenu) => {
  const [display, setDisplay] = React.useState({ active: true, idx: -1 });
  if (index === 1) {
    return (
      <div
        style={{
          height: `${Height}px`,
          overflowY: "scroll",
          width: `${Width * 0.85}px`,
        }}
        className={`fixed m-0 top-0 left-0 z-30 
                  flex flex-col items-start justify-start bg-white`}
      >
        <button
          onClick={() => {
            setActive(false);
          }}
          className="w-full h-14 flex px-3 flex-row justify-start items-center 
          bg-[#292b2d] text-white gap-1"
        >
          <MdKeyboardArrowLeft fontSize={24} color="white" />
          <p className="h-14 py-4 font-semibold">VÊTEMENTS</p>
        </button>
        {clothes.map((element, index) => {
          if (index === 10) {
            return (
              <li className="w-full h-auto flex flex-col" key={index}>
                <Link
                  to={`products/${element.link}`}
                  className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
                      px-5 flex  "font-normal"
                      flex-row items-center justify-between`}
                >
                  <p className="h-16 py-5">{element.name}</p>
                  <GoPlus />
                </Link>
              </li>
            );
          } else
            return (
              <li
                onClick={() =>
                  setDisplay({ active: !display.active, idx: index })
                }
                className="w-full h-auto flex flex-col"
                key={index}
              >
                <button
                  className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
                  px-5 flex ${
                    display.idx === index && display.active === true
                      ? "font-semibold"
                      : "font-normal"
                  } 
                  flex-row items-center justify-between`}
                >
                  <p className="h-16 py-5">{element.name}</p>
                  <i
                    className={`${
                      display.idx === index && display.active === true
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    <MdKeyboardArrowDown />
                  </i>
                </button>
                {display.idx === index && display.active === true ? (
                  <ul className="h-auto bg-[#f1f1f1]">
                    {TypeClothes.map((items, id) => {
                      if (display.idx === id) {
                        return (
                          <React.Fragment key={id}>
                            {items.map((subitems, subId) => (
                              <li
                                key={subId}
                                className="w-full px-5 border-b border-b-[#c3c3c3]"
                              >
                                <Link
                                  reloadDocument
                                  to={subitems.link}
                                  className="h-full w-full"
                                >
                                  <p className="h-14 max-[250px]:h-auto max-[250px]:py-6 text-[14px] py-2 w-full">
                                    {subitems.name}
                                  </p>
                                </Link>
                              </li>
                            ))}
                          </React.Fragment>
                        );
                      } else return null;
                    })}
                  </ul>
                ) : null}
              </li>
            );
        })}
      </div>
    );
  } else if (index === 2) {
    return (
      <div
        style={{
          height: `${Height}px`,
          overflowY: "scroll",
          width: `${Width * 0.85}px`,
        }}
        className={`fixed m-0 top-0 left-0 z-30 
                  flex flex-col items-start justify-start bg-white`}
      >
        <button
          onClick={() => {
            setActive(false);
          }}
          className="w-full h-14 flex px-3 flex-row justify-start items-center 
          bg-[#292b2d] text-white gap-1"
        >
          <MdKeyboardArrowLeft fontSize={24} color="white" />
          <p className="h-14 py-4 font-semibold">CHAUSSURES</p>
        </button>
        {AllShoes.map((element, index) => (
          <li className="w-full h-auto flex flex-col" key={index}>
            <Link
              to={element.link}
              reloadDocument
              className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
                    px-5 flex  "font-normal"
                    flex-row items-center justify-between`}
            >
              <p className="h-16 py-5">{element.name}</p>
              <GoPlus />
            </Link>
          </li>
        ))}
      </div>
    );
  } else if (index === 3) {
    return (
      <div
        style={{
          height: `${Height}px`,
          overflowY: "scroll",
          width: `${Width * 0.85}px`,
        }}
        className={`fixed m-0 top-0 left-0 z-30 
               flex flex-col items-start justify-start bg-white`}
      >
        <button
          onClick={() => {
            setActive(false);
          }}
          className="w-full h-14 flex px-3 flex-row justify-start items-center 
       bg-[#292b2d] text-white gap-1"
        >
          <MdKeyboardArrowLeft fontSize={24} color="white" />
          <p className="h-14 py-4 font-semibold">ACCESSOIRES</p>
        </button>
        {AllAccessories.map((element, index) => (
          <li className="w-full h-auto flex flex-col" key={index}>
            <Link
              to={element.link}
              reloadDocument
              className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
                 px-5 flex  "font-normal"
                 flex-row items-center justify-between`}
            >
              <p className="h-16 py-5">{element.name}</p>
              <GoPlus />
            </Link>
          </li>
        ))}
      </div>
    );
  } else if (index === 4) {
    return (
      <div
        style={{
          height: `${Height}px`,
          overflowY: "scroll",
          width: `${Width * 0.85}px`,
        }}
        className={`fixed m-0 top-0 left-0 z-30 
           flex flex-col items-start justify-start bg-white`}
      >
        <button
          onClick={() => {
            setActive(false);
          }}
          className="w-full h-14 flex px-3 flex-row justify-start items-center 
   bg-[#292b2d] text-white gap-1"
        >
          <MdKeyboardArrowLeft fontSize={24} color="white" />
          <p className="h-14 py-4 font-semibold">ACCESSOIRES</p>
        </button>
        <li className="w-full h-auto flex flex-col">
          <Link
            to={`/artists/hip-hop-rap`}
            reloadDocument
            className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
             px-5 flex  "font-normal"
             flex-row items-center justify-between`}
          >
            <p className="h-16 py-5">Hip Hop / RAP</p>
            <GoPlus />
          </Link>
        </li>
        <li className="w-full h-auto flex flex-col">
          <Link
            to={`/artists/culte-geek`}
            reloadDocument
            className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
             px-5 flex  "font-normal"
             flex-row items-center justify-between`}
          >
            <p className="h-16 py-5">Culte / Geek</p>
            <GoPlus />
          </Link>
        </li>
        <li className="w-full h-auto flex flex-col">
          <Link
            to={`/artists/sport`}
            reloadDocument
            className={`w-full text-[#393939] border-b-[1px] border-b-[#c3c3c3] 
             px-5 flex  "font-normal"
             flex-row items-center justify-between`}
          >
            <p className="h-16 py-5">Sport</p>
            <GoPlus />
          </Link>
        </li>
      </div>
    );
  } else return null;
};
