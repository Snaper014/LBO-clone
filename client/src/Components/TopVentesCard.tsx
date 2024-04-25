import * as React from "react";
import { Link } from "react-router-dom";
import { TypeDataFetch } from "../utils/types";
import { CardProduct } from "./CardProduct";
import { getProduct } from "../utils/fetch";
//import { useQuery } from "@tanstack/react-query";

export const TopVentesCard = () => {
  const [data, setData] = React.useState<TypeDataFetch | undefined>();

  React.useEffect(() => {
    getProduct("top_ventes_sizes")
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  }, []);
  //console.log("data", data);

  return (
    <div className="w-full mb-12 flex flex-col">
      <h2 className="w-full mb-5 text-[50px] font-extrabold text-center">
        Top Ventes
      </h2>
      <div className="w-full flex flex-row flex-nowrap max-[1024px]:flex-wrap justify-around">
        {!data?.data ? (
          <p>pas de data</p>
        ) : (
          data?.data.map((items, index) => {
            if (index < 6) {
              return (
                <CardProduct key={index} isHome IndexKey={index} data={items} />
              );
            } else return null;
          })
        )}
      </div>
      <Link
        className="max-[305px]:w-full hover:text-[#0E14D3] hover:font-semibold 
        hover:border-[#0E14D3] p-5 mt-8 w-72 border-[3px] 
        border-black self-center text-center"
        to={"/products/top_ventes_sizes"}
      >
        TOUS LES TOP VENTES
      </Link>
    </div>
  );
};
