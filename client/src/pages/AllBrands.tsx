import { Page } from "./Page";
import { AllBrands } from "../Links";
import { Link } from "react-router-dom";

export const BrandsPage = () => {
  const alphabet = [
    "#",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "y",
    "x",
    "z",
  ];

  return (
    <Page>
      <div className="w-full h-auto flex flex-col">
        {
          alphabet.map((element, index) => {
            const existingAlpha = element === "#" ?  true : AllBrands.some( (item) => 
                  item?.name[0].includes(element.toLocaleUpperCase()) 
          )
            if(!existingAlpha) return null;
              return (
                <div
                key={index}
                className="w-full mt-4 py-4 border-b border-b-[#c3c3c3] flex flex-row flex-nowrap"
              >
                <div className="h-full w-1/6 font-extrabold flex items-center max-[1024px]:items-start justify-center max-[1024px]:text-[30px] text-[50px] uppercase">
                  {element}
                </div>
                
                <div className={`h-full w-5/6 flex flex-row max-[350px]:flex-row max-[350px]:flex-items-start max-[350px]:justify-center flex-wrap items-center max-[1024px]:justify-start ${element  === "#" ? "": "justify-between"}`}>
                  {AllBrands.map((items, index) => {
                    const isAlpha = /[A-Z]/i;
                    if ( ((!isAlpha.test(items?.name[0])) && element === "#") 
                          || element.toLocaleUpperCase() === items?.name[0]) {
                      return (
                        <Link
                          className="text-[15px] max-[1024px]:text-[12px] flex flex-row max-[350px]:w-full gap-2 text-[#8f8f8f] ml-1 mb-2 max-[1024px]:mb-6  w-1/5 max-[1024px]:w-[48%] hover:text-black font-semibold"
                          to={`/products/${items.link}`}
                          key={index}
                        >
                          <p className="max-[350px]:text-center">
                            {items?.name?.length > 17
                              ? items?.name.substring(0, 17) + "..."
                              : items?.name}
                          </p>
                          {items?.sticker ? (
                            <div
                              className={`
                                ${
                                  items?.sticker !== "new"
                                    ? "text-black bg-[#efefef] h-5 w-7 text-center text-[12px]"
                                    : "text-white bg-[#0E14D3] h-5 w-7 text-center text-[12px]"
                                }
                            `}
                            >
                              {items?.sticker}
                            </div>
                          ) : null}
                        </Link>
                      );
                    } else return null;
                  })}
                </div>
              </div>
              )
          })
        }
      </div>
    </Page>
  );
};
