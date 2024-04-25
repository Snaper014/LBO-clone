import * as React from "react";
import { RxCross1 } from "react-icons/rx";
import { FilterSort } from "./filter/filterSort";
import { FilterBrand } from "./filter/filterBrand";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FilterSize } from "./filter/filterSize";
import { FilterGenre } from "./filter/filterGenre";
import { FilterColor } from "./filter/filterColor";
import { FilterPrice } from "./filter/filterPrice";
import { FilterPromos } from "./filter/filtererPromos";
import { FilterEco } from "./filter/filterEco";

export const FilterMobile = ({
  setDisplayMobileFilter,
}: {
  setDisplayMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams);
  const [display, setDisplay] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("noscroll");
  }, []);

  return (
    <>
      <div className="fixed pb-14 z-30 top-0 right-0 h-[100vh] overflow-y-scroll w-4/5 bg-white flex flex-col">
        <div className="w-full max-[315px]:text-[10px] bg-[#292b2d] p-3 text-white flex flex-row justify-between">
          <i
            className="cursor-pointer flex items-center justify-center"
            onClick={() => {
              setDisplayMobileFilter(false);
              document.body.classList.remove("noscroll");
            }}
          >
            <RxCross1 fontSize={30} />
          </i>
          <p className="py-2">FILTRES</p>
          <button
            onClick={() => {
              currentSearchParams.delete("brand");
              currentSearchParams.delete("sizes");
              currentSearchParams.delete("sexe");
              currentSearchParams.delete("colors");
              currentSearchParams.delete("price");
              currentSearchParams.delete("ecoLabel");
              currentSearchParams.delete("sort");
              currentSearchParams.delete("promos");
              currentSearchParams.delete("page");
              setSearchParams(currentSearchParams.toString());
            }}
            className="font-[200]"
          >
            Réinitialiser
          </button>
        </div>
        <FilterSort />
        <button
          onClick={() => setDisplay((prev) => !prev)}
          className="w-full text-[17px] border-b-[1px] border-b-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
        >
          <p className="h-16 py-5">MARQUES</p>
          <MdKeyboardArrowRight />
        </button>
        {display ? <FilterBrand setDisplay={setDisplay} /> : null}
        <FilterSize />
        <FilterGenre />
        <FilterColor />
        <FilterPrice />
        <FilterPromos />
        <FilterEco />
      </div>
      <div
        onClick={() => {
          setDisplayMobileFilter(false);
          document.body.classList.remove("noscroll");
        }}
        className="fixed z-20 shadow h-full w-full top-0 right-0 left-0 bottom-0"
      ></div>
    </>
  );
};
