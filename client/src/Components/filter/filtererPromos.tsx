import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ListPromos } from "../../Links";
import { useContext } from "../../utils/Context";

export const FilterPromos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const promos = searchParams.get("promos");
  const initSelect = promos ? promos.split("~") : [];
  const { active, setActive, WidthScreen } = useContext();
  const [list, setList] = React.useState(false);

  const [select, setSelect] = React.useState<string[]>(initSelect);

  const AddOrDelete = (items: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const promos = currentSearchParams.get("promos");
    if (promos?.split("~").some((value) => value === items)) {
      const promos = currentSearchParams.get("promos");
      //console.log("brand includes", promos);
      if (!promos?.includes("~")) {
        setSearchParams((params) => {
          params.delete("promos");
          return params;
        });
        return;
      }
      const Indexstr = promos.indexOf(items);
      const str = promos.charAt(Indexstr - 1) === "~" ? `~${items}` : `${items}`;
      const newValue = currentSearchParams.get("promos")?.replace(str, "");
      //console.log("newValue", newValue);
      if (newValue === "") {
        setSearchParams((params) => {
          params.delete("promos");
          return params;
        });
        return;
      }
      if (newValue === undefined) {
        return;
      }
      currentSearchParams.set("promos", newValue);
      currentSearchParams.delete("page");
    } else if (promos !== null) {
      const promos = currentSearchParams.get("promos");
      //console.log("promos !==null ", promos);
      currentSearchParams.set("promos", promos + `~${items}`);
      currentSearchParams.delete("page");
    } else {
      currentSearchParams.append("promos", items);
      currentSearchParams.delete("page");
      //console.log("promos premier ajout", promos);
    }
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (promos === null) {
      setSelect([]);
    }
  }, [promos]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 5) {
                return setActive(-1);
              }
              setActive(5);
            }}
            className={`w-full border-4 p-2 <gap-2> flex flex-row 
        flex-nowrap justify-evenly ${
          select.length > 0 ? "border-[#0E14D3]" : "border-[#e4e4e4]"
        }`}
          >
            PROMOS {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 5 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 5 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
          -bottom-[310px] right-0 bg-white 
                        w-96 h-[300px] flex flex-col items-center`}
            >
              <div className="w-full flex flex-row px-2 justify-between mb-2">
                <p>{select.length} séléctionné</p>
                <button
                  onClick={() => {
                    setSelect([]);
                    setSearchParams((params) => {
                      params.delete("promos");
                      params.delete("page");
                      return params;
                    });
                  }}
                  className="text-[#8f8f8f] underline"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="w-full flex flex-row flex-wrap justify-evenly px-1">
                {ListPromos.map((items, index) => (
                  <button
                    onClick={() => {
                      if (select.includes(items)) {
                        AddOrDelete(items);
                        const newTab = select.filter(
                          (element) => element !== items,
                        );
                        setSelect([...newTab]);
                      } else {
                        AddOrDelete(items);
                        setSelect((prev) => [...prev, items]);
                      }
                    }}
                    key={index}
                    className={`
                    ${
                      select.includes(items)
                        ? "border-[#0E14D3]"
                        : "border-[#F4F4F4]"
                    }
                    h-12 w-[22%] border-[3px] mb-1`}
                  >
                    -{items} %
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full flex flex-col mb-6">
          <button
            onClick={() => setList((prev) => !prev)}
            className="w-full text-[17px] mb-1 border-t-[1px] border-t-[#c3c3c3] font-semibold px-5 flex flex-row items-center justify-between"
          >
            <p className="h-16 py-5 uppercase">promotion</p>
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
            {ListPromos.map((items, index) => (
              <button
                onClick={() => {
                  if (select.includes(items)) {
                    AddOrDelete(items);
                    const newTab = select.filter(
                      (element) => element !== items,
                    );
                    setSelect([...newTab]);
                  } else {
                    AddOrDelete(items);
                    setSelect((prev) => [...prev, items]);
                  }
                }}
                key={index}
                className={`
                      ${list ? "px-4" : "px-2"}
                      ${
                        select.includes(items)
                          ? "border-[#0E14D3]"
                          : "border-[#F4F4F4]"
                      } ${index === 0 ? "ml-2" : ""}
                    border-[3px] mb-1 h-14`}
              >
                -{items} %
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
