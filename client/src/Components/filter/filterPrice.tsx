import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useContext } from "../../utils/Context";

export const FilterPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const price = searchParams.get("price");
  const { active, setActive, WidthScreen } = useContext();
  const [message, setMessage] = React.useState({
    min: false,
    max: false,
  });
  const [value, setValue] = React.useState({
    min: "",
    max: "",
  });


  const AddOrDelete = (ValMin: string, ValMax: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const price = currentSearchParams.get("price");
    let Min = parseInt(ValMin);
    let Max = parseInt(ValMax);
    if (Number.isNaN(Min) || Min < 0) {
      //console.log("nombre incorrect");
      setMessage((prev) => {
        return {
          min: true,
          max: prev.max,
        };
      });
      currentSearchParams.delete("price");
      currentSearchParams.delete("page");
      setSearchParams(currentSearchParams.toString());
      return;
    }
    if (Number.isNaN(Max) || Max < 0) {
      //console.log("nombre incorrect");
      setMessage((prev) => {
        return {
          min: prev.min,
          max: true,
        };
      });
      currentSearchParams.delete("price");
      currentSearchParams.delete("page");
      setSearchParams(currentSearchParams.toString());
      return;
    }
    if (Min > Max) {
      Min = 0;
      setValue((prev) => {
        return {
          min: Min.toString(),
          max: prev.max,
        };
      });
      currentSearchParams.set("price", Min.toString() + "~" + Max.toString());
      currentSearchParams.delete("page");
      setSearchParams(currentSearchParams.toString());
      return;
    }
    if (price === null) {
      currentSearchParams.append(
        "price",
        Min.toString() + "~" + Max.toString(),
      );
      currentSearchParams.delete("page");
      setSearchParams(currentSearchParams.toString());
      return;
    }
    currentSearchParams.set("price", Min.toString() + "~" + Max.toString());
    currentSearchParams.delete("page");
    // console.log("ValMin", Min);
    // console.log("ValMax", Max);
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (price === null) {
      setValue({
        min: "",
        max: "",
      });
      setMessage({
        min: false,
        max: false,
      });
    }
  }, [price]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 4) {
                return setActive(-1);
              }
              setActive(4);
            }}
            className={`w-full border-4 p-2 flex gap-2 flex-row 
                flex-nowrap justify-evenly uppercase border-[#e4e4e4]`}
          >
            gamme de prix
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 4 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 4 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
                -bottom-[210px] left-0 bg-white 
                              w-80 h-[200px] flex flex-col`}
            >
              <div className="w-full mb-1 flex flex-row flex-nowrap justify-end px-2">
                <button
                  onClick={() => {
                    setValue({ min: "", max: "" });
                    setSearchParams((params) => {
                      params.delete("price");
                      params.delete("page");
                      return params;
                    });
                  }}
                  className="text-[#8f8f8f] underline text-[12px]"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="w-full h-full flex justify-evenly flex-col flex-wrap px-2">
                <p>Prix min : </p>
                <div className="w-full flex fex-row flex-nowrap justify-evenly">
                  <input
                    className="w-3/4 border-2 border-[#e4e4e4]"
                    type="text"
                    value={value.min}
                    onChange={(e) => {
                      setValue((val) => {
                        return {
                          min: e.target.value,
                          max: val.max,
                        };
                      });
                      setMessage((prev) => {
                        return {
                          min: false,
                          max: prev.max,
                        };
                      });
                      AddOrDelete(e.target.value, value.max);
                    }}
                  ></input>
                  <i>€</i>
                </div>
                {message.min ? (
                  <span className="w-full text-[12px] text-red-600 text-center">
                    Valeur minimum invalide, veuillez renseignez une valeur
                    correct
                  </span>
                ) : null}
                <p>Prix max : </p>
                <div className="w-full flex fex-row flex-nowrap justify-evenly">
                  <input
                    className="w-3/4 border-2 border-[#e4e4e4]"
                    type="text"
                    value={value.max}
                    onChange={(e) => {
                      setValue((val) => {
                        return {
                          min: val.min,
                          max: e.target.value,
                        };
                      });
                      setMessage((prev) => {
                        return {
                          min: prev.min,
                          max: false,
                        };
                      });
                      AddOrDelete(value.min, e.target.value);
                    }}
                  ></input>
                  <i>€</i>
                </div>
                {message.max ? (
                  <span className="w-full text-[12px] text-red-600 text-center">
                    Valeur maximum invalide, veuillez renseignez une valeur
                    correct
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full h-full flex justify-evenly mb-3 flex-col flex-wrap px-2">
          <h2 className="w-[85%] text-[17px] font-bold uppercase mb-3">
            gamme de prix
          </h2>
          <p>Prix min : </p>
          <div className="w-full flex fex-row flex-nowrap justify-evenly">
            <input
              className="w-3/4 border-2 border-[#e4e4e4]"
              type="text"
              value={value.min}
              onChange={(e) => {
                setValue((val) => {
                  return {
                    min: e.target.value,
                    max: val.max,
                  };
                });
                setMessage((prev) => {
                  return {
                    min: false,
                    max: prev.max,
                  };
                });
                AddOrDelete(e.target.value, value.max);
              }}
            ></input>
            <i>€</i>
          </div>
          {message.min ? (
            <span className="w-full text-[12px] text-red-600 text-center">
              Valeur minimum invalide, veuillez renseignez une valeur correct
            </span>
          ) : null}
          <p>Prix max : </p>
          <div className="w-full flex fex-row flex-nowrap justify-evenly">
            <input
              className="w-3/4 border-2 border-[#e4e4e4]"
              type="text"
              value={value.max}
              onChange={(e) => {
                setValue((val) => {
                  return {
                    min: val.min,
                    max: e.target.value,
                  };
                });
                setMessage((prev) => {
                  return {
                    min: prev.min,
                    max: false,
                  };
                });
                AddOrDelete(value.min, e.target.value);
              }}
            ></input>
            <i>€</i>
          </div>
          {message.max ? (
            <span className="w-full text-[12px] text-red-600 text-center">
              Valeur maximum invalide, veuillez renseignez une valeur correct
            </span>
          ) : null}
        </div>
      )}
    </>
  );
};
