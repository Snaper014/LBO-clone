import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useContext } from "../../utils/Context";

export const FilterGenre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexe = searchParams.get("sexe");
  const initSelect = sexe ? sexe.split("~") : [];
  const { active, setActive, WidthScreen } = useContext();
  const [select, setSelect] = React.useState<string[]>(initSelect);

  const AddOrDelete = (items: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const sexe = currentSearchParams.get("sexe");
    if (sexe?.split("~").some((value) => value === items)) {
      const sexe = currentSearchParams.get("sexe");
      if (!sexe?.includes("~")) {
        setSearchParams((params) => {
          params.delete("sexe");
          return params;
        });
        return;
      }
      const Indexstr = sexe.indexOf(items);
      const str = sexe.at(Indexstr - 1) === "~" ? `~${items}` : `${items}`;
      const newValue = currentSearchParams.get("sexe")?.replace(str, "");
      if (newValue === "") {
        setSearchParams((params) => {
          params.delete("sexe");
          return params;
        });
        return;
      }
      if (newValue === undefined) {
        return;
      }
      currentSearchParams.set("sexe", newValue);
      currentSearchParams.delete("page");
    } else if (sexe !== null) {
      const sexe = currentSearchParams.get("sexe");
      currentSearchParams.set("sexe", sexe + `~${items}`);
      currentSearchParams.delete("page");
    } else {
      currentSearchParams.append("sexe", items);
      currentSearchParams.delete("page");
    }
    setSearchParams(currentSearchParams.toString());
  };

  React.useEffect(() => {
    if (sexe === null) {
      // Reintiliasation pour la section mobile
      setSelect([]);
    }
  }, [sexe]);

  return (
    <>
      {WidthScreen > 1024 ? (
        <div className="h-[40px] w-auto relative">
          <button
            onClick={() => {
              if (active === 2) {
                return setActive(-1);
              }
              setActive(2);
            }}
            className={`w-full border-4 p-2 flex flex-row 
                flex-nowrap justify-evenly gap-2 ${
                  select.length > 0 ? "border-[#0E14D3]" : "border-[#e4e4e4]"
                }`}
          >
            SEXE {select.length > 0 ? `(${select.length})` : null}
            <MdKeyboardArrowDown
              fontSize={20}
              style={{
                transform: `${
                  active === 2 ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            />
          </button>
          {active === 2 ? (
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
                      params.delete("sexe");
                      params.delete("page");
                      return params;
                    });
                  }}
                  className="text-[#8f8f8f] underline"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center flex-wrap px-2">
                <button
                  onClick={() => {
                    if (select.includes("Femme")) {
                      AddOrDelete("Femme");
                      const newTab = select.filter(
                        (element) => element !== "Femme",
                      );
                      setSelect([...newTab]);
                    } else {
                      AddOrDelete("Femme");
                      setSelect((prev) => [...prev, "Femme"]);
                    }
                  }}
                  className={`mb-1 h-12 w-[85%] 
                        ${
                          select.includes("Femme")
                            ? "bg-[#0E14D3]"
                            : "bg-[#F4F4F4]"
                        }
                        ${
                          select.includes("Femme") ? "text-white" : "text-black"
                        }
                        ${select.includes("Femme") ? "" : "hover:bg-[#e4e4e4]"} 
                            px-2 flex items-center cursor-pointer`}
                >
                  Femme
                </button>
                <button
                  onClick={() => {
                    if (select.includes("Homme")) {
                      AddOrDelete("Homme");
                      const newTab = select.filter(
                        (element) => element !== "Homme",
                      );
                      setSelect([...newTab]);
                    } else {
                      AddOrDelete("Homme");
                      setSelect((prev) => [...prev, "Homme"]);
                    }
                  }}
                  className={`mb-1 h-12 w-[85%] 
                        ${
                          select.includes("Homme")
                            ? "bg-[#0E14D3]"
                            : "bg-[#F4F4F4]"
                        }
                        ${
                          select.includes("Homme") ? "text-white" : "text-black"
                        }
                        ${select.includes("Homme") ? "" : "hover:bg-[#e4e4e4]"} 
                            px-2 flex items-center cursor-pointer`}
                >
                  Homme
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <p className="h-16 py-5 w-full px-3 font-bold uppercase text-[17px]">
            Sexe
          </p>
          <div
            className="w-full h-full flex flex-row overflow-x-scroll 
                  items-center flex-wrap px-2 gap-2"
          >
            <button
              onClick={() => {
                if (select.includes("Femme")) {
                  AddOrDelete("Femme");
                  const newTab = select.filter(
                    (element) => element !== "Femme",
                  );
                  setSelect([...newTab]);
                } else {
                  AddOrDelete("Femme");
                  setSelect((prev) => [...prev, "Femme"]);
                }
              }}
              className={`mb-1 h-12
                        ${
                          select.includes("Femme")
                            ? "bg-[#0E14D3]"
                            : "bg-[#F4F4F4]"
                        }
                        ${
                          select.includes("Femme") ? "text-white" : "text-black"
                        }
                        ${select.includes("Femme") ? "" : "hover:bg-[#e4e4e4]"} 
                            px-2 flex items-center cursor-pointer`}
            >
              Femme
            </button>
            <button
              onClick={() => {
                if (select.includes("Homme")) {
                  AddOrDelete("Homme");
                  const newTab = select.filter(
                    (element) => element !== "Homme",
                  );
                  setSelect([...newTab]);
                } else {
                  AddOrDelete("Homme");
                  setSelect((prev) => [...prev, "Homme"]);
                }
              }}
              className={`mb-1 h-12
                        ${
                          select.includes("Homme")
                            ? "bg-[#0E14D3]"
                            : "bg-[#F4F4F4]"
                        }
                        ${
                          select.includes("Homme") ? "text-white" : "text-black"
                        }
                        ${select.includes("Homme") ? "" : "hover:bg-[#e4e4e4]"} 
                            px-2 flex items-center cursor-pointer`}
            >
              Homme
            </button>
          </div>
        </div>
      )}
    </>
  );
};
