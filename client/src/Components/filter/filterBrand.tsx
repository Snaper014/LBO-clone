import * as React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AllBrands } from "../../Links";
import { useSearchParams } from "react-router-dom";
import { useContext } from "../../utils/Context";

export const FilterBrand = ({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { active, setActive, WidthScreen } = useContext();
  const brand = searchParams.get("brand");
  const initSelect = brand ? brand.split("~") : [];
  const [search, setSearch] = React.useState("");

  const [select, setSelect] = React.useState<string[]>(initSelect);

  const AddOrDelete = (items: { name: string; sticker: null | string }) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const brand = currentSearchParams.get("brand");
    if (brand?.split("~").some((value) => value === items?.name)) {
      const brand = currentSearchParams.get("brand");
      //console.log("brand includes", brand);
      if (!brand?.includes("~")) {
        setSearchParams((params) => {
          params.delete("brand");
          return params;
        });
        return;
      }
      const Indexstr = brand.indexOf(items.name);
      const str =
        brand.charAt(Indexstr - 1) === "~" ? `~${items.name}` : `${items.name}`;
      const newValue = currentSearchParams.get("brand")?.replace(str, "");
      //console.log("newValue", newValue);
      if (newValue === "") {
        setSearchParams((params) => {
          params.delete("brand");
          return params;
        });
        return;
      }
      if (newValue === undefined) {
        return;
      }
      currentSearchParams.set("brand", newValue);
      currentSearchParams.delete("page");
    } else if (brand !== null) {
      const brand = currentSearchParams.get("brand");
      //console.log("brand !==null ", brand);
      currentSearchParams.set("brand", brand + `~${items.name}`);
      currentSearchParams.delete("page");
    } else {
      currentSearchParams.append("brand", items.name);
      currentSearchParams.delete("page");
      //console.log("brand premier ajout", brand);
    }
    setSearchParams(currentSearchParams.toString());
  };

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 0) {
                return setActive(-1);
              }
              setActive(0);
            }}
            className={`w-full border-4 p-2 flex flex-row 
        flex-nowrap justify-evenly gap-2 ${
          select.length > 0 ? "border-[#0E14D3]" : "border-[#e4e4e4]"
        }`}
          >
            MARQUES {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 0 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 0 ? (
            <div
              className={`absolute z-10 py-3 border border-[#e4e4e4]
          -bottom-[510px] left-0 bg-white 
                        w-80 h-[500px] flex flex-col items-center`}
            >
              <div className="w-full flex flex-row px-2 justify-between mb-2">
                <p>{select.length} séléctionné</p>
                <button
                  onClick={() => {
                    setSelect([]);
                    setSearchParams((params) => {
                      params.delete("brand");
                      params.delete("page");
                      return params;
                    });
                  }}
                  className="text-[#8f8f8f] underline"
                >
                  Réinitialiser
                </button>
              </div>
              <div
                className={`w-[85%] h-[45px] mb-3 flex flex-row flex-nowrap border-[3px] border-[#e4e4e4]`}
              >
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-[80%]
                 bg-[white]
                text-black border-none
                 pl-3 font-semibold`}
                  placeholder="Rechercher une marque"
                />
                <button
                  className={`w-[20%] border-none
              flex justify-center items-center`}
                >
                  <FiSearch color="black" fontSize={20} fontWeight={600} />
                </button>
              </div>
              <div className="w-full flex flex-col items-center overflow-y-scroll">
                {search === ""
                  ? AllBrands.map((items, index) => {
                      if (index < 8) {
                        return (
                          <li
                            onClick={() => {
                              if (select.includes(items?.name)) {
                                AddOrDelete(items);
                                const newTab = select.filter(
                                  (element) => element !== items.name,
                                );
                                setSelect([...newTab]);
                              } else {
                                AddOrDelete(items);
                                setSelect((prev) => [...prev, items?.name]);
                              }
                            }}
                            key={index}
                            className={`mb-1 h-12 w-[85%] 
                           ${
                             select.includes(items?.name)
                               ? "bg-[#0E14D3]"
                               : "bg-[#F4F4F4]"
                           }
                           ${
                             select.includes(items?.name)
                               ? "text-white"
                               : "text-black"
                           }
                           ${
                             select.includes(items?.name)
                               ? ""
                               : "hover:bg-[#e4e4e4]"
                           } 
                            px-2 flex items-center cursor-pointer`}
                          >
                            <p>{items.name}</p>
                          </li>
                        );
                      } else return null;
                    })
                  : AllBrands.map((items, index) => {
                      if (
                        items.name
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
                      ) {
                        return (
                          <li
                            onClick={() => {
                              if (select.includes(items?.name)) {
                                AddOrDelete(items);
                                const newTab = select.filter(
                                  (element) => element !== items?.name,
                                );
                                setSelect([...newTab]);
                              } else {
                                AddOrDelete(items);
                                setSelect((prev) => [...prev, items?.name]);
                              }
                            }}
                            key={index}
                            className={`mb-1 h-12 w-[85%] 
                                    ${
                                      select.includes(items?.name)
                                        ? "bg-[#0E14D3]"
                                        : "bg-[#F4F4F4]"
                                    }
                                    ${
                                      select.includes(items?.name)
                                        ? "text-white"
                                        : "text-black"
                                    }
                                    ${
                                      select.includes(items?.name)
                                        ? ""
                                        : "hover:bg-[#e4e4e4]"
                                    } 
                                     px-2 flex items-center cursor-pointer`}
                          >
                            <p>{items.name}</p>
                          </li>
                        );
                      } else return null;
                    })}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className={`fixed z-30 border border-[#e4e4e4]
                  right-0 bg-white 
                  w-[80%] h-[100vh] flex flex-col items-center`}
        >
          <div className="w-full bg-[#292b2d] p-3 mb-2 items-center text-white flex flex-row">
            <i
              onClick={() => setDisplay(false)}
              className="w-[10%] flex items-center justify-center cursor-pointer"
            >
              <MdKeyboardArrowLeft fontSize={30} />
            </i>
            <p className="uppercase flex items-center justify-center font-bold w-[90%]">
              filtrer par marque
            </p>
          </div>
          <div className="w-full flex flex-row px-2 justify-between mb-2">
            <p>{select.length} séléctionné</p>
            <button
              onClick={() => {
                setSelect([]);
                setSearchParams((params) => {
                  params.delete("brand");
                  params.delete("page");
                  return params;
                });
              }}
              className="text-[#8f8f8f] underline"
            >
              Réinitialiser
            </button>
          </div>
          <div
            className={`w-[85%] h-[45px] mb-3 flex flex-row flex-nowrap border-[3px] border-[#e4e4e4]`}
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-[80%]
           bg-[white]
          text-black border-none
           pl-3 font-semibold`}
              placeholder="Rechercher une marque"
            />
            <button
              className={`w-[20%] border-none
        flex justify-center items-center`}
            >
              <FiSearch color="black" fontSize={20} fontWeight={600} />
            </button>
          </div>
          <div className="w-full flex flex-col items-center overflow-y-scroll">
            {search === ""
              ? AllBrands.map((items, index) => {
                  if (index < 8) {
                    return (
                      <li
                        onClick={() => {
                          if (select.includes(items?.name)) {
                            AddOrDelete(items);
                            const newTab = select.filter(
                              (element) => element !== items.name,
                            );
                            setSelect([...newTab]);
                          } else {
                            AddOrDelete(items);
                            setSelect((prev) => [...prev, items?.name]);
                          }
                        }}
                        key={index}
                        className={`mb-1 h-12 w-[85%] 
                     ${
                       select.includes(items?.name)
                         ? "bg-[#0E14D3]"
                         : "bg-[#F4F4F4]"
                     }
                     ${
                       select.includes(items?.name)
                         ? "text-white"
                         : "text-black"
                     }
                     ${
                       select.includes(items?.name) ? "" : "hover:bg-[#e4e4e4]"
                     } 
                      px-2 flex items-center cursor-pointer`}
                      >
                        <p>{items.name}</p>
                      </li>
                    );
                  } else return null;
                })
              : AllBrands.map((items, index) => {
                  if (
                    items.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return (
                      <li
                        onClick={() => {
                          if (select.includes(items?.name)) {
                            AddOrDelete(items);
                            const newTab = select.filter(
                              (element) => element !== items?.name,
                            );
                            setSelect([...newTab]);
                          } else {
                            AddOrDelete(items);
                            setSelect((prev) => [...prev, items?.name]);
                          }
                        }}
                        key={index}
                        className={`mb-1 h-12 w-[85%] 
                              ${
                                select.includes(items?.name)
                                  ? "bg-[#0E14D3]"
                                  : "bg-[#F4F4F4]"
                              }
                              ${
                                select.includes(items?.name)
                                  ? "text-white"
                                  : "text-black"
                              }
                              ${
                                select.includes(items?.name)
                                  ? ""
                                  : "hover:bg-[#e4e4e4]"
                              } 
                               px-2 flex items-center cursor-pointer`}
                      >
                        <p>{items.name}</p>
                      </li>
                    );
                  } else return null;
                })}
          </div>
        </div>
      )}
    </>
  );
};
