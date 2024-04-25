import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Logo } from "../../utils/logo";

type PropsMobileBar = {
  isHome: boolean;
  WidthScreen: number;
  DynamicScrollBar?: boolean;
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileBar = ({
  isHome,
  WidthScreen,
  DynamicScrollBar = true,
  setDisplaySearch,
  setDisplayMenu,
}: PropsMobileBar) => {
  const navigate = useNavigate();
  const checkWidth = WidthScreen < 285 ? 20 : 35;
  let DataBasket = localStorage.getItem("basket");

  return (
    <div
      className={`${isHome ? "absolute" : DynamicScrollBar ? "fixed" : "a"}
        flex flex-start justify-between
        ${isHome ? "" : "border-b "} 
        ${isHome ? "" : "border-b-[#c3c3c3]"}
        ${isHome ? "bg-transparent" : "bg-white"}
        z-20 top-0 left-0 w-full h-[80px]`}
    >
      <div className="h-full w-[170px] flex flex-row gap-3 items-center">
        <i
          className="cursor-pointer"
          onClick={() => setDisplayMenu((prev) => !prev)}
        >
          <GiHamburgerMenu
            fontSize={checkWidth}
            color={`${isHome ? "white" : "black"}`}
          />
        </i>
        <Link to="/">
          <div className="w-[140px] max-[260px]:w-[76px] max-[260px]:h-8 h-[51px]">
            <Logo
                  color={`${isHome ? "#FFFFFF" : "#0E14D3"}`}
                  secondColor={`${isHome ? "#474747" : "#FFFFFF"}`}
              />
          </div>
        </Link>
      </div>
      <div className="h-full w-1/4 flex items-center justify-evenly">
        <i
          className="cursor-pointer"
          onClick={() => setDisplaySearch((prev) => !prev)}
        >
          <FiSearch
            fontSize={checkWidth}
            color={`${isHome ? "white" : "black"}`}
          />
        </i>
        <div onClick={() => navigate("/checkout/basket")} className="relative">
          <i className="cursor-pointer">
            <MdOutlineShoppingBag
              color={`${isHome ? "white" : "black"}`}
              fontSize={checkWidth}
            />
          </i>
          {!DataBasket ||
          JSON.parse(DataBasket)?.basket?.length === 0 ? null : (
            <span
              className="absolute rounded-full flex items-center justify-center 
                -top-3 -right-3 h-6 w-6 bg-[#0E14D3] text-white font-semibold"
            >
              <span>
                {JSON.parse(DataBasket)
                  ?.basket?.map((items: any) => items?.quantity)
                  .reduce((a: any, b: any) => a + b)}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
