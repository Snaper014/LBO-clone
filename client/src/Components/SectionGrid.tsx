import * as React from "react";
import { Link } from "react-router-dom";

export const SectionGrid = ({ WidthScreen }: { WidthScreen: number }) => {
  const [select, setSelect] = React.useState(-1);
  return (
    <div
      className={`${WidthScreen < 1024 ? "Mobile-gridMos" : "gridMos"} 
          max-[1024px]:h-[auto] h-[750px] max-[1400px]:w-[95%] w-[1060px]`}
    >
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-un" : "un"}`}
        onMouseOver={() => setSelect(1)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_50.webp"></img>
        {select === 1 ? (
          <Link
            to="/products/new_balance"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              NEW BALANCE
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-deux" : "deux"}`}
        onMouseOver={() => setSelect(2)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_51.webp"></img>
        {select === 2 ? (
          <Link
            to="/products/adidas"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              ADIDAS
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-trois" : "trois"}`}
        onMouseOver={() => setSelect(3)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_52.jpg"></img>
        {select === 3 ? (
          <Link
            to="/products/timberland"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              TIMBERLAND
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${
          WidthScreen < 1024 ? "mobile-quatre" : "quatre"
        }`}
        onMouseOver={() => setSelect(4)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_53.webp"></img>
        {select === 4 ? (
          <Link
            to="/products/schott_nyc"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              SCHOTT
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-cinq" : "cinq"}`}
        onMouseOver={() => setSelect(5)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_54.webp"></img>
        {select === 5 ? (
          <Link
            to="/products/vans"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              VANS
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-six" : "six"}`}
        onMouseOver={() => setSelect(6)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_55.jpg"></img>
        {select === 6 ? (
          <Link
            to="/products/sweats_pulls"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              SWEATS
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-sept" : "sept"}`}
        onMouseOver={() => setSelect(7)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_56.webp"></img>
        {select === 7 ? (
          <Link
            to="/products/jeans_pantalons?type=cargo"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              PANTALONS CARGO
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-huit" : "huit"}`}
        onMouseOver={() => setSelect(8)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_57.jpg"></img>
        {select === 8 ? (
          <Link
            to="/products/asics"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white">
              ASICS
            </p>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${WidthScreen < 1024 ? "mobile-neuf" : "neuf"}`}
        onMouseOver={() => setSelect(9)}
        onMouseOut={() => setSelect(-1)}
      >
        <img className="h-full w-full" src="/image_desktop_58.webp"></img>
        {select === 9 ? (
          <Link
            to="/products/cartes_cadeaux"
            className="w-full h-full BlueTransparent absolute top-0 bottom-0 left-0 right-0 bg-transparent no-underline flex items-center justify-center"
          >
            <p className="bg-transparent text-white p-5 border-2 border-white uppercase">
              idées cadeaux
            </p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
