import { Link } from "react-router-dom";

export const HeaderCheckout = () => {
  return (
    <div className="w-full h-28 max-lg:h-auto max-lg:py-2 bg-[#ECECEC] max-lg:px-3 px-12 max-[360px]:flex-col flex flex-row  items-center justify-between">
      <Link
        to="/"
        className="h-20 max-[360px]:mb-2 max-lg:h-12 max-lg:mb-0 max-lg:py-2 flex items-center justify-center"
      >
        <img
          className="h-full w-56 max-lg:w-28"
          src={"../../public/logo.PNG"}
        ></img>
      </Link>
      <h1 className="font-bold text-center uppercase max-lg:font-normal text-3xl max-lg:text-xl">
        paiement securisé
      </h1>
    </div>
  );
};
