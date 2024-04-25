import { FilterBrand } from "./filter/filterBrand";
import { FilterSize } from "./filter/filterSize";
import { FilterGenre } from "./filter/filterGenre";
import { FilterColor } from "./filter/filterColor";
import { FilterPrice } from "./filter/filterPrice";
import { FilterPromos } from "./filter/filtererPromos";
import { FilterEco } from "./filter/filterEco";
import { FilterSort } from "./filter/filterSort";
import { LuSettings2 } from "react-icons/lu";
import { useContext } from "../utils/Context";

export const FilterProduct = ({
  setDisplayMobileFilter,
}: {
  setDisplayMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { WidthScreen } = useContext();
  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="w-full px-5 mb-8 flex gap-3 flex-row flex-nowrap items-center">
          <div className="w-[85%] flex flex-row justify-between gap-4 flex-wrap">
            <FilterBrand setDisplay={() => {}} />
            <FilterSize />
            <FilterGenre />
            <FilterColor />
            <FilterPrice />
            <FilterPromos />
            <FilterEco />
          </div>
          <div className="w-[15%] flex items-center justify-end">
            <FilterSort />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setDisplayMobileFilter((prev) => !prev);
          }}
          className="gap-2 cursor-pointer font-bold h-full 
          flex flex-row items-center flex-nowrap uppercase"
        >
          <LuSettings2 fontSize={25} />
          <p>Filtrer</p>
        </div>
      )}
    </>
  );
};
