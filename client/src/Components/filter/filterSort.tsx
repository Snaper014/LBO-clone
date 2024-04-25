import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useContext } from "../../utils/Context";

export const FilterSort = () => {
  const list = ["Préférés", "Prix croissant", "Prix décroissant", "Nouveautés"];
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const initSelect = sort ? sort : "";
  const { active, setActive, WidthScreen } = useContext();

  const [select, setSelect] = React.useState<string>(initSelect);

  const AddOrDelete = (items: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const sort = currentSearchParams.get("sort");
    if (sort) {
      if (items === "1" || items === "2" || items === "3") {
        currentSearchParams.set("sort", items);
        currentSearchParams.delete("page");
        setSearchParams(currentSearchParams.toString());
        return;
      }
      currentSearchParams.delete("page");
      currentSearchParams.delete("sort");
    } else {
      currentSearchParams.append("sort", items);
      currentSearchParams.delete("page");
    }
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (sort === null) {
      setSelect("");
    }
  }, [sort]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 8) {
                return setActive(-1);
              }
              setActive(8);
            }}
            className={`w-full p-2 flex flex-row hover:bg-[#f4f2f2] 
                  flex-nowrap justify-evenly gap-2`}
          >
            TRIER PAR {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 8 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 8 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
                  -bottom-[270px] right-0 bg-white 
                                w-80 h-[260px] flex flex-col`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center flex-wrap px-2">
                {list.map((items, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelect(index.toString());
                      AddOrDelete(index.toString());
                    }}
                    className={`mb-1 h-12 w-[85%] 
                                ${
                                  select.includes(index.toString())
                                    ? "bg-[#0E14D3]"
                                    : "bg-[#F4F4F4]"
                                }
                                ${
                                  select.includes(index.toString())
                                    ? "text-white"
                                    : "text-black"
                                }
                                ${
                                  select.includes(index.toString())
                                    ? ""
                                    : "hover:bg-[#e4e4e4]"
                                } 
                                    px-2 flex items-center cursor-pointer`}
                  >
                    {items}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full bg-[#e4e4e4] py-2 flex flex-col border-b-[1px] border-b-[#c3c3c3]">
          <h2 className="uppercase font-bold mb-4">trier</h2>
          <div
            className="w-full h-full flex flex-row items-center 
              flex-nowrap gap-3 overflow-x-scroll mb-6"
          >
            {list.map((items, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelect(index.toString());
                  AddOrDelete(index.toString());
                }}
                className={`mb-1 h-12 bg-white border-2
                          ${index === 0 ? "ml-3" : ""}
                                ${
                                  select.includes(index.toString())
                                    ? "border-[#0E14D3]"
                                    : "border-[#F4F4F4]"
                                } uppercase
                      px-2 flex items-center cursor-pointer`}
              >
                {items}
              </button>
            ))}
          </div>
          <h2 className="uppercase font-bold mb-2">filtrer</h2>
        </div>
      )}
    </>
  );
};
