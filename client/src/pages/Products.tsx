import * as React from "react";
import { Page } from "./Page";
import { useNavigate, useParams, useLocation } from "react-router";
import { getProduct } from "../utils/fetch";
import { CardProduct } from "../Components/CardProduct";
import { FilterProduct } from "../Components/FilterCategory";
import { useContext } from "../utils/Context";
import { FilterMobile } from "../Components/FilterMobile";
import { TypeDataFetch } from "../utils/types";

export const Products = () => {
  // skeletons data
  let { product } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const Brands = queryParams.get("brand") || undefined;
  const Type = queryParams.get("type") || undefined;
  const Sizes = queryParams.get("sizes") || undefined;
  const Sexe = queryParams.get("sexe") || undefined;
  const Colors = queryParams.get("colors") || undefined;
  const Price = queryParams.get("price") || undefined;
  const Promos = queryParams.get("promos") || undefined;
  const ecoRes = queryParams.get("ecoLabel") || undefined;
  const Sort = queryParams.get("sort") || undefined;
  const [displayBB, setDisplayBB] = React.useState(false);
  const [data, setData] = React.useState<TypeDataFetch | undefined>();
  const [displayMobileFilter, setDisplayMobileFilter] = React.useState(false);
  const { WidthScreen } = useContext();
  const lastPage =
    currentPage * 48 >= (data?.length ? data?.length : 6000) ? false : true;

  function handlePageChange(newPage: number, orientation: string) {
    const NextOrBack = orientation === "next" ? true : false;
    const offset = data?.offset ? data?.offset : 0;
    const resultPage =
      offset + 48 === currentPage * 48 ? newPage : (offset + 48) / 48;
    const responsePage = NextOrBack
      ? resultPage.toString()
      : newPage.toString();
    queryParams.set("page", responsePage);
    navigate({ search: queryParams.toString() });
    setDisplayBB(
      NextOrBack
        ? currentPage > 2 && WidthScreen > 1024
        : currentPage > 2 && WidthScreen > 1024
          ? true
          : false,
    );

    getProduct(
      product ? product : "",
      responsePage,
      Brands,
      Sizes,
      Sexe,
      Colors,
      Price,
      Promos,
      ecoRes,
      Sort,
      Type
    )
      .then((response) => {
        setData((prevData) => ({
          length: response?.length,
          offset: NextOrBack ? response?.offset : prevData?.offset,
          message: NextOrBack ? response?.message : prevData?.message,
          data: NextOrBack
            ? [...(prevData?.data || []), ...(response?.data || [])]
            : [...(response?.data || []), ...(prevData?.data || [])],
        }));
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    getProduct(
      product ? product : "",
      currentPage.toString(),
      Brands,
      Sizes,
      Sexe,
      Colors,
      Price,
      Promos,
      ecoRes,
      Sort,
      Type
    )
      .then((response) => {
        setDisplayBB(currentPage > 1 && WidthScreen > 1024 ? true : false);
        setData(response);
      })
      .catch((error) => console.log(error));
  }, [Brands, Sizes, Sexe, Colors, Price, Promos, ecoRes, Sort, product]);

  //console.log("data", data);
  // console.log("location", location);
  //console.log("displaybb", displayBB);
  //console.log("currentpage", currentPage);

  return (
    <Page>
      <div className="w-full flex flex-col pt-4">
        {WidthScreen < 1024 ? (
          <h1 className="uppercase mb-5 text-center -tracking-wide self-center text-[30px] max-[230px]:text-[20px] font-bold">
            {product}
          </h1>
        ) : (
          <div className="w-full h-auto flex flex-row p-3 mb-4">
            <div className="w-auto flex flex-col px-12 justify-center border-r-8 border-r-[#0E14D3]">
              <h1 className="uppercase -tracking-wide text-[40px] font-bold">
                {product}
              </h1>
              {data?.length ? (
                <p className="text-[#717171] text-[14px]">
                  {data?.length} styles
                </p>
              ) : null}
            </div>
            <p className="w-[65%] px-8 py-2">
              Le plus grand choix de marques urbaines en ligne, c'est sur
              LaBrouetteOfficielle.com ! Venez retrouver des marques légendaires
              comme Nike, Adidas ou encore Puma. Avec + de 30 000 références de
              t-shirts, sweats, baskets et chaussures, LaBrouetteOfficielle.com
              est le leader dans la vente en ligne de produits dérivés
              d'artistes Hip-Hop. Cette page vous fait découvrir les tendances
              actuelles et futures de la mode urbaine.
            </p>
          </div>
        )}
        <div className="w-full max-lg:mb-4 max-lg:flex max-lg:flex-row max-lg:flex-nowrap max-lg:justify-between max-lg:px-2">
          {WidthScreen < 1024 ? (
            <>
              <p className="text-[#717171]">{data?.length} styles trouvés</p>
              <FilterProduct setDisplayMobileFilter={setDisplayMobileFilter} />
            </>
          ) : (
            <FilterProduct setDisplayMobileFilter={setDisplayMobileFilter} />
          )}
        </div>
        {displayMobileFilter && WidthScreen < 1024 ? (
          <>
            <FilterMobile setDisplayMobileFilter={setDisplayMobileFilter} />
            <div
              onClick={() => {
                setDisplayMobileFilter(false);
                document.body.classList.remove("noscroll");
              }}
              className="fixed cursor-pointer z-40 h-[8vh] flex items-center justify-center  
                bg-[#0E14D3] bottom-0 right-0 w-[80%] 
              text-white font-bold uppercase text-center"
            >
              <p>afficher les {data?.length} résultats</p>
            </div>
          </>
        ) : null}

        {displayBB && lastPage && WidthScreen > 1024 ? (
          <div className="w-full max-sm:mb-10 mb-10 flex flex-col items-center justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1, "prev")}
              className="max-[305px]:w-full hover:text-[#0E14D3] hover:font-semibold 
                hover:border-[#0E14D3] p-5 mt-8 w-72 border-[3px] 
                border-black self-center text-center uppercase"
            >
              voir précédent
            </button>
          </div>
        ) : null}
        <div className="w-full flex flex-row flex-wrap justify-evenly mb-8">
          {data?.data?.length === 0 || !data?.data ? (
            data?.message ===
            "Oops ! Aucun produit ne correspond à votre recherche" ? (
              <p className="text-[#0E14D3] font-semibold">{data?.message}</p>
            ) : (
              <p>pas de data</p>
            )
          ) : (
            data?.data.map((items, index) => (
              <CardProduct key={index} IndexKey={index} data={items} />
            ))
          )}
        </div>
        {currentPage * 48 >= (data?.length ? data?.length : 6000) ? null : (
          <div className="w-full max-sm:mb-10 mb-20 flex flex-col items-center justify-center">
            <div className="w-auto h-auto  flex flex-col items-center justify-between">
              <p className="mb-2">{data?.message ? data?.message : null}</p>
              <span className="h-[3px] max-[280px]:w-10/12 w-full rounded-xl bg-slate-700">
                <div
                  style={{
                    width: `${
                      ((data?.offset ? data?.offset : 1) /
                        (data?.length ? data?.length : 1)) *
                      100
                    }%`,
                  }}
                  className={`h-full bg-[#3857f3]`}
                ></div>
              </span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1, "next")}
              className="max-[305px]:w-full hover:text-[#0E14D3] hover:font-semibold 
                hover:border-[#0E14D3] p-5 mt-8 w-72 border-[3px] 
                border-black self-center text-center uppercase"
            >
              {WidthScreen < 1024 ? "voir plus d'articles" : "Charger plus"}
            </button>
          </div>
        )}
      </div>
    </Page>
  );
};
