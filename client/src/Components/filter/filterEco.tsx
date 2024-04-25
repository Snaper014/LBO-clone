import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import ReactSwitch from "react-switch";
import { useContext } from "../../utils/Context";

export const FilterEco = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const eco = searchParams.get("ecoLabel");
  const [checked, setChecked] = React.useState(false);
  const { active, setActive, WidthScreen } = useContext();

  const AddOrDelete = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const ecoLabel = currentSearchParams.get("ecoLabel");
    if (ecoLabel) {
      currentSearchParams.delete("ecoLabel");
    } else {
      currentSearchParams.append("ecoLabel", "ecoResponsable");
      currentSearchParams.delete("page");
    }

    setSearchParams(currentSearchParams.toString());
  };
  const handleChange = () => {
    setChecked((prev) => !prev);
    AddOrDelete();
  };

  React.useEffect(() => {
    if (eco === null) {
      setChecked(false);
    }
  }, [eco]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 6) {
                return setActive(-1);
              }
              setActive(6);
            }}
            className={`w-full border-4 p-2 flex flex-row 
                ${checked ? "border-[#0E14D3]" : "border-[#e4e4e4]"}
                flex-nowrap justify-evenly uppercase `}
          >
            eco-responsable
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 6 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 6 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
                -bottom-[110px] left-0 bg-white 
                              w-80 h-[100px] flex flex-col`}
            >
              <div className="w-full h-full flex justify-evenly flex-col flex-wrap px-2">
                <div className="w-full flex flex-row flex-nowrap justify-between px-2">
                  <p className="font-semibold uppercase">eco-responsable</p>
                  <ReactSwitch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#457CE3"
                    onHandleColor="#0E14D3"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
                <span className="w-full text-[12px] font-bold text-center">
                  Découvrez les produits certifiés éco-responsables
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full max-[315px]:flex-col pb-12 flex flex-row px-3 justify-between mb-4">
          <p className="font-semibold uppercase">eco-responsable</p>
          <ReactSwitch
            checked={checked}
            onChange={handleChange}
            onColor="#457CE3"
            onHandleColor="#0E14D3"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div>
      )}
    </>
  );
};
