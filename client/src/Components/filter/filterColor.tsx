import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ListColors } from "../../Links";
import { useContext } from "../../utils/Context";

export const FilterColor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const colors = searchParams.get("colors");
  const initSelect = colors ? colors.split("~") : [];
  const { active, setActive, WidthScreen } = useContext();
  const [list, setList] = React.useState(false);

  const [select, setSelect] = React.useState<string[]>(initSelect);

  const AddOrDelete = (items: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const colors = currentSearchParams.get("colors");
    if (colors?.split("~").some((value) => value === items)) {
      const colors = currentSearchParams.get("colors");
      //console.log("colors includes", colors);
      if (!colors?.includes("~")) {
        setSearchParams((params) => {
          params.delete("colors");
          return params;
        });
        return;
      }
      const Indexstr = colors.indexOf(items);
      const str = colors.at(Indexstr - 1) === "~" ? `~${items}` : `${items}`;
      const newValue = currentSearchParams.get("colors")?.replace(str, "");
      //console.log("newValue", newValue);
      if (newValue === "") {
        setSearchParams((params) => {
          params.delete("colors");
          return params;
        });
        return;
      }
      if (newValue === undefined) {
        return;
      }
      currentSearchParams.set("colors", newValue);
      currentSearchParams.delete("page");
    } else if (colors !== null) {
      const colors = currentSearchParams.get("colors");
      //console.log("colors !==null ", colors);
      currentSearchParams.set("colors", colors + `~${items}`);
      currentSearchParams.delete("page");
    } else {
      currentSearchParams.append("colors", items);
      currentSearchParams.delete("page");
      //console.log("colors premier ajout", colors);
    }
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (colors === null) {
      setSelect([]);
    }
  }, [colors]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 3) {
                return setActive(-1);
              }
              setActive(3);
            }}
            className={`w-full border-4 p-2 flex gap-2 flex-row 
                flex-nowrap justify-evenly ${
                  select.length > 0 ? "border-[#0E14D3]" : "border-[#e4e4e4]"
                }`}
          >
            COULEUR {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 3 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 3 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
                -bottom-[170px] left-0 bg-white 
                              w-80 h-[160px] flex flex-col`}
            >
              <div className="w-full mb-2 flex flex-row flex-nowrap justify-between px-2">
                <p>{select.length} séléctionné</p>
                <button
                  onClick={() => {
                    setSelect([]);
                    setSearchParams((params) => {
                      params.delete("colors");
                      params.delete("page");
                      return params;
                    });
                  }}
                  className="text-[#8f8f8f] underline"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="w-full h-full flex justify-evenly flex-row flex-wrap px-2">
                {ListColors.map((items, index) => (
                  <button
                    onClick={() => {
                      if (select.includes(items?.name)) {
                        AddOrDelete(items?.name);
                        const newTab = select.filter(
                          (element) => element !== items?.name,
                        );
                        setSelect([...newTab]);
                      } else {
                        AddOrDelete(items?.name);
                        setSelect((prev) => [...prev, items?.name]);
                      }
                    }}
                    key={index}
                    style={{ backgroundColor: `${items?.color}` }}
                    className={`w-8 h-8 mb-1 mx-2 
                    ${select.includes(items?.name) ? "border-[#0E14D3]" : ""}
                    ${select.includes(items?.name) ? "border-[3px]" : ""}
                    ${items?.name === "Blanc" ? "border" : ""}
                    ${
                      items?.name === "Blanc"
                        ? select.includes(items?.name)
                          ? "border-[#0E14D3]"
                          : "border-black"
                        : ""
                    }
                    `}
                  ></button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full flex flex-col mb-3">
          <button
            onClick={() => setList((prev) => !prev)}
            className="w-full text-[17px] mb-1 border-t-[1px] border-t-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5">TAILLE</p>
            <MdKeyboardArrowDown
              style={{
                transform: `${list ? "rotate(180deg)" : "rotate(0deg)"}`,
              }}
            />
          </button>
          <div
            className={`
              ${list ? "" : "overflow-x-scroll"}
              ${list ? "flex-wrap" : ""}
              w-full gap-1 flex flex-row px-1`}
          >
            {ListColors.map((items, index) => (
              <button
                onClick={() => {
                  if (select.includes(items?.name)) {
                    AddOrDelete(items?.name);
                    const newTab = select.filter(
                      (element) => element !== items?.name,
                    );
                    setSelect([...newTab]);
                  } else {
                    AddOrDelete(items?.name);
                    setSelect((prev) => [...prev, items?.name]);
                  }
                }}
                key={index}
                style={{ backgroundColor: `${items?.color}` }}
                className={`w-12 h-12 mb-1 mx-2 p-6
              ${select.includes(items?.name) ? "border-[#0E14D3]" : ""}
              ${select.includes(items?.name) ? "border-[3px]" : ""}
              ${items?.name === "Blanc" ? "border" : ""}
              ${
                items?.name === "Blanc"
                  ? select.includes(items?.name)
                    ? "border-[#0E14D3]"
                    : "border-black"
                  : ""
              }
              `}
              ></button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
