import * as React from "react";
import { Page } from "./Page";
import { AllBrands } from "../Links";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export const CategoryArtist = () => {
  let { idArtist } = useParams();
  const navigate = useNavigate();
  const [picture, setPicture] = React.useState({
    firstPicture: "",
    lastpicture: "",
  });

  /* 
   Ne pas oublier de faire les liens pour les diffèrents
   thèmes de la catégorie artiste
*/
  React.useEffect(() => {
    switch (idArtist) {
      case "hip-hop-rap":
        {
          setPicture({
            firstPicture: "../../public/image_desktop_ninho.jpg",
            lastpicture: "../../public/image_desktop_booba.webp",
          });
        }
        break;
      case "culte-geek":
        {
          setPicture({
            firstPicture: "../../public/image_desktop_looney .jpg",
            lastpicture: "../../public/image_desktop_dbz.webp",
          });
        }
        break;
      case "sport":
        {
          setPicture({
            firstPicture: "../../public/image_desktop_foot.jpg",
            lastpicture: "../../public/image_nba.jpg",
          });
        }
        break;
      default:
        navigate("/error");
    }
  }, []);
  const alphabet = [
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
        <h1 className="uppercase font-semibold self-center text-[40px] mt-3 mb-5">
          {idArtist?.split("-").join(" ")}
        </h1>
        <div className="w-full flex flex-row max-lg:flex-col min-[1024px]:justify-evenly">
          <img
            className="w-[48%] max-lg:w-full max-lg:h-auto h-80"
            src={picture.firstPicture}
          ></img>
          <img
            className="w-[48%] max-lg:w-full max-lg:h-auto h-80"
            src={picture.lastpicture}
          ></img>
        </div>
        <div className="w-full mt-4 py-4 border-b border-b-[#c3c3c3] flex flex-row flex-nowrap">
          <div className="h-full w-1/6 font-bold flex items-center justify-center text-[50px]">
            #
          </div>
          <div className="h-full w-5/6 flex flex-row flex-wrap items-center">
            {AllBrands.map((items, index) => {
              if (!alphabet.includes(items?.name[0]?.toLocaleLowerCase())) {
                const lien =
                  items?.name === ""
                    ? "47-brands"
                    : items?.name?.split(" ").join("-").toLocaleLowerCase();
                return (
                  <Link
                    className="text-[13px] text-[#8f8f8f] w-1/4 max-[1024px]:w-2/4 hover:text-black font-semibold"
                    to={lien}
                    key={index}
                  >
                    {items?.name}
                  </Link>
                );
              } else return null;
            })}
          </div>
        </div>
        {alphabet.map((element, index) => {
          const NoExistingAlpha = AllBrands.some(
            (alpha) => alpha?.name[0]?.toLocaleLowerCase() === element,
          );
          if (!NoExistingAlpha) {
            return null;
          } else
            return (
              <div
                key={index}
                className="w-full mt-4 py-4 border-b border-b-[#c3c3c3] flex flex-row flex-nowrap"
              >
                <div className="h-full w-1/6 font-extrabold flex items-center max-[1024px]:items-start justify-center max-[1024px]:text-[30px] text-[50px] uppercase">
                  {element}
                </div>
                <div className="h-full w-5/6 flex flex-row max-[350px]:flex-row max-[350px]:flex-items-start max-[350px]:justify-center flex-wrap items-center max-[1024px]:justify-start justify-between">
                  {AllBrands.map((items, index) => {
                    if (element === items?.name[0]?.toLocaleLowerCase()) {
                      const lien = items?.name
                        ?.split(" ")
                        .join("-")
                        .toLocaleLowerCase();
                      return (
                        <Link
                          className="text-[15px] max-[1024px]:text-[12px] flex flex-row max-[350px]:w-full gap-2 text-[#8f8f8f] ml-1 mb-2 max-[1024px]:mb-6  w-1/5 max-[1024px]:w-[48%] hover:text-black font-semibold"
                          to={lien}
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
            );
        })}
      </div>
    </Page>
  );
};
