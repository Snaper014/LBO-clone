import * as React from "react";
import { Link } from "react-router-dom";
import { TypeDataCard } from "../utils/types";

type PropsCardProduct = {
  IndexKey: number;
  isHome?: boolean;
  data?: TypeDataCard;
};

export const CardProduct = ({
  IndexKey,
  isHome = false,
  data,
}: PropsCardProduct) => {
  const reference = React.useRef<HTMLDivElement | null>(null);
  const HeightSticker = reference?.current?.getBoundingClientRect()?.height
    ? reference?.current?.getBoundingClientRect()?.height
    : 1;
  // checker .jpg ou .webp
  return (
    <Link
      to={`/detailproduct/${data?.category}/${data?.id}`}
      key={IndexKey}
      className={`
            ${isHome ? "min-[1422px]:w-[224px]" : "min-[1422px]:w-[325px]"}
            ${isHome ? "min-[1422px]:h-[303px]" : "min-[1422px]:h-[416px]"}
            ${isHome ? "max-[1024px]:w-[48%]" : "max-[1024px]:w-[48%]"}
            ${isHome ? "w-[15%]" : "w-[22%]"}
            ${isHome ? "min-[1422px]:text-[14px]" : "min-[1422px]:text-[16px]"}
            w-[15%] CardProduct relative mb-8 max-sm:mb-0
            text-[14px] max-[400px]:text-[13px] h-auto
            flex flex-col flex-nowrap overflow-hidden
        `}
    >
      <div className={`w-full h-3/4 max-[1422px]:h-auto`}>
        <img
          src={
            data?.image.includes(".jpg")
              ? data?.image
              : data?.photos?.split("*,")[0]
          }
          className="h-auto w-full bg-[#e4e4e4]"
        ></img>
      </div>
      <div className="relative AnimCard h-1/4 max-sm:h-[140px] max-[1422px]:h-[124px] pt-2  w-full bg-transparent flex flex-col flex-nowrap">
        <div className="absolute z-[1] top-0 left-0 bg-white h-full w-full flex flex-col flex-nowrap">
          <h2 className="font-bold">{data?.brand}</h2>
          <p
            className={`${isHome ? "min-[1422px]:h-4" : "min-[1422px]:h-5"} 
                min-[1422px]:h-5 mb-1 ${
                  isHome ? "" : "overflow-hidden"
                } w-full`}
          >
            {!isHome && window.innerWidth > 1024
              ? data?.title
              : (window.innerWidth < 280
                  ? data?.title.substring(
                      0,
                      window.innerWidth < 280 ? 10 : !isHome ? 60 : 22,
                    ) + "..."
                  : data?.title.substring(
                      0,
                      window.innerWidth > 1024 ? 22 : 60,
                    )) + "..."}
          </p>
          <p className="font-semibold">{data?.price} €</p>
        </div>
        <div
          style={{
            transform: `${
              Math.round(HeightSticker / 27) > 1
                ? `translateY(-${(Math.round(HeightSticker / 27) - 1) * 30}px)`
                : "translateY(0px)"
            }`,
          }}
          ref={reference}
          className={`absolute z-[1] 
            -top-[40px] bg-transparent flex flex-wrap flex-row gap-1`}
        >
          {!data?.promotion ? null : (
            <span
              className="p-1 max-[300px]:text-[10px] mr-1 text-white text-[14px] bg-[#0E14D3] 
                  font-bold uppercase"
            >
              - {data?.promotion} %
            </span>
          )}
          {!data?.sticker
            ? null
            : data?.sticker?.split("~").map((items, index) => {
                if (items.includes("top")) {
                  return (
                    <span
                      key={index}
                      className="p-1 max-[300px]:text-[10px] mr-1 text-black text-[13px] bg-white 
                            font-semibold uppercase"
                    >
                      TOP
                    </span>
                  );
                } else if (items.includes("Eco-responsable")) {
                  return (
                    <span
                      key={index}
                      className="p-1 max-[300px]:text-[10px] mr-1 text-white text-[13px] bg-[#5db078] 
                            font-semibold uppercase"
                    >
                      {items}
                    </span>
                  );
                } else if (items.includes("Exclu")) {
                  return (
                    <span
                      key={index}
                      className="p-1 max-[300px]:text-[10px] mr-1 text-white text-[13px] 
                            bg-[#4d4d4d] font-semibold uppercase"
                    >
                      {items}
                    </span>
                  );
                } else if (items.includes("new")) {
                  return (
                    <span
                      key={index}
                      className="p-1 max-[300px]:text-[10px] mr-1 text-white text-[13px] bg-[#0E14D3] 
                          font-semibold uppercase"
                    >
                      {items}
                    </span>
                  );
                } else return null;
              })}
        </div>
        <div className="absolute max-sm:hidden h-8 -bottom-8 pt-4 w-full">
          {data?.size ? (
            <p className="text-[#868686]">
              {data?.size?.split(",").join(" ") === "undefined"
                ? "Taille Unique"
                : data?.size?.split(",").join(" ")}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
