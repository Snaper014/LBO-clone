import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { listSizes } from "../../Links";
import { useContext } from "../../utils/Context";

export const FilterSize = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { active, setActive, WidthScreen } = useContext();
  const sizes = searchParams.get("sizes");
  const initSelect = sizes ? sizes.split("~") : [];
  const [list, setList] = React.useState(false);

  const [select, setSelect] = React.useState<string[]>(initSelect);

  const AddOrDelete = (items: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const sizes = currentSearchParams.get("sizes");
    if (sizes?.split("~").some((value) => value === items)) {
      const sizes = currentSearchParams.get("sizes");
      //console.log("brand includes", sizes);
      if (!sizes?.includes("~")) {
        setSearchParams((params) => {
          params.delete("sizes");
          return params;
        });
        return;
      }
      const Indexstr = sizes.indexOf(items);
      const str = sizes.at(Indexstr - 1) === "~" ? `~${items}` : `${items}`;
      const newValue = currentSearchParams.get("sizes")?.replace(str, "");
      //console.log("newValue", newValue);
      if (newValue === "") {
        setSearchParams((params) => {
          params.delete("sizes");
          return params;
        });
        return;
      }
      if (newValue === undefined) {
        return;
      }
      currentSearchParams.set("sizes", newValue);
      currentSearchParams.delete("page");
    } else if (sizes !== null) {
      const sizes = currentSearchParams.get("sizes");
      //console.log("sizes !==null ", sizes);
      currentSearchParams.set("sizes", sizes + `~${items}`);
    } else {
      currentSearchParams.append("sizes", items);
      currentSearchParams.delete("page");
      //console.log("sizes premier ajout", sizes);
    }
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (sizes === null) {
      setSelect([]);
    }
  }, [sizes]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 1) {
                return setActive(-1);
              }
              setActive(1);
            }}
            className={`w-full border-4 p-2 flex flex-row 
        flex-nowrap justify-evenly gap-2 ${
          select.length > 0 ? "border-[#0E14D3]" : "border-[#e4e4e4]"
        }`}
          >
            TAILLE {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 1 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 1 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
          -bottom-[310px] left-0 bg-white overflow-y-scroll
                        w-96 h-[300px] flex flex-col items-center`}
            >
              <div className="w-full flex flex-row px-2 justify-between mb-2">
                <p>{select.length} séléctionné</p>
                <button
                  onClick={() => {
                    setSelect([]);
                    setSearchParams((params) => {
                      params.delete("sizes");
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
                {listSizes.map((items, index) => (
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
                    {items}
                  </button>
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
            {listSizes.map((items, index) => (
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
                {items}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
