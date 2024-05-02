import * as React from "react";
import { Page } from "./Page";
import { useNavigate, useParams, useLocation } from "react-router";
import { SearchProduct } from "../utils/fetch";
import { CardProduct } from "../Components/CardProduct";
import { FilterProduct } from "../Components/FilterCategory";
import { useContext } from "../utils/Context";
import { FilterMobile } from "../Components/FilterMobile";
import { TypeDataFetch } from "../utils/types";

export const SearchPage = () => {
  let { search } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page"));
  const Brands = queryParams.get("brand") || undefined;
  const Sizes = queryParams.get("sizes") || undefined;
  const Sexe = queryParams.get("sexe") || undefined;
  const Colors = queryParams.get("colors") || undefined;
  const Price = queryParams.get("price") || undefined;
  const Promos = queryParams.get("promos") || undefined;
  const ecoRes = queryParams.get("ecoLabel") || undefined;
  const Sort = queryParams.get("sort") || undefined;
  const [backButton, setBackButton] = React.useState(false);
  const [data, setData] = React.useState<TypeDataFetch | undefined>();
  const [displayMobileFilter, setDisplayMobileFilter] = React.useState(false);
  const { WidthScreen } = useContext();


  function handlePageChange(newPage: number, orientation: string) {
    if(newPage === 1){
      setBackButton(false);
  }
  const NextOrBack = orientation === "next" ? true : false;
  queryParams.set("page", newPage.toString());
  navigate({ search: queryParams.toString() });

    SearchProduct(
      search ? search : "",
      newPage.toString(),
      Brands,
      Sizes,
      Sexe,
      Colors,
      Price,
      Promos,
      ecoRes,
      Sort,
    )
    .then((newData) => {
      setData((prevData) => ({
        total: newData?.total,
        offset: NextOrBack ? newData?.offset : prevData?.offset,
        message: NextOrBack ? newData?.message : prevData?.message,
        response: NextOrBack
          ? [...(prevData?.response || []), ...(newData?.response || [])]
          : [...(newData?.response || []), ...(prevData?.response || [])],
      }));
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    if((currentPage < 0) || typeof currentPage !== "number"){
      navigate("/error");
  }
    SearchProduct(
      search ? search : "",
      currentPage.toString(),
      Brands,
      Sizes,
      Sexe,
      Colors,
      Price,
      Promos,
      ecoRes,
      Sort,
    )
      .then((response) => {
        setData(response);
          if(currentPage > 1 && response?.response.length > 0){
            setBackButton(true);
        }
      })
      .catch((error) => console.log(error));
  }, [Brands, Sizes, Sexe, Colors, Price, Promos, ecoRes, Sort, search]);


  return (
    <Page>
      <div className="w-full flex flex-col pt-4">
        {WidthScreen < 1024 ? (
          <h1 className="mb-5 text-center -tracking-wide self-center text-[30px] max-[230px]:text-[20px] font-bold">
            {data?.total} styles trouvés pour :{" "}
            <span className="uppercase">'{search}'</span>
          </h1>
        ) : (
          <div className="w-full h-auto flex flex-row p-3 mb-6">
            <div
              className="w-full flex flex-col px-12 items-center
                             border-l-8 border-l-[#0E14D3] 
                            justify-center border-r-8 border-r-[#0E14D3]"
            >
              <h1 className="-tracking-wide text-[40px] font-bold">
                {data?.total} styles trouvés pour :{" "}
                <span className="uppercase">'{search}'</span>
              </h1>
            </div>
          </div>
        )}
        <div className="w-full max-lg:mb-4 max-lg:flex max-lg:flex-row max-lg:flex-nowrap max-lg:justify-between max-lg:px-2">
          {WidthScreen < 1024 ? (
            <>
              <p className="text-[#717171]">{data?.total} styles trouvés</p>
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
              <p>afficher les {data?.total} résultats</p>
            </div>
          </>
        ) : null}

        {backButton && WidthScreen > 1024  ? (
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
          {!data?.response ? (
            data?.message ===
            "Oops ! Aucun produit ne correspond à votre recherche" ? (
              <p className="text-[#0E14D3] font-semibold">{data?.message}</p>
            ) : data?.response?.length === 0 ? (
              <p>pas de data </p>
            ) : (
              <p>chargement...</p>
            )
          ) : (
            data?.response.map((items, index) => (
              <CardProduct key={index} IndexKey={index} data={items} />
            ))
          )}
        </div>
          <div className="w-full max-sm:mb-10 mb-20 flex flex-col items-center justify-center">
            <div className="w-auto h-auto  flex flex-col items-center justify-between">
              <p className="mb-2">{data?.message ? data?.message : null}</p>
              <span className="h-[3px] max-[280px]:w-10/12 w-full rounded-xl bg-slate-700">
                <div
                  style={{
                    width: `${
                      ((data?.offset ? data?.offset : 1) /
                        (data?.total ? data?.total : 1)) *
                      100
                    }%`,
                  }}
                  className={`h-full bg-[#3857f3]`}
                ></div>
              </span>
            </div>
            {data?.message ===
            "Oops ! Aucun produit ne correspond à votre recherche" ? null : (
                (data?.offset ? data.offset: 0) >= (data?.total ? data?.total: 1) ? null  :  
                <button
                onClick={() => handlePageChange(currentPage + 1, "next")}
                className="max-[305px]:w-full hover:text-[#0E14D3] hover:font-semibold 
                  hover:border-[#0E14D3] p-5 mt-8 w-72 border-[3px] 
                  border-black self-center text-center uppercase"
              >
                {WidthScreen < 1024 ? "voir plus d'articles" : "Charger plus"}
              </button>)
            }
          </div>
      </div>
    </Page>
  );
};
