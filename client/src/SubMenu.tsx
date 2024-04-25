import { Link } from "react-router-dom";
import {
  clothes,
  topBrands,
  AllShoes,
  topBrandsShoes,
  AllAccessories,
  caps,
  topBrandsAccessories,
  TopBrandLifeStyle,
  BrandSport,
  Premium,
  sport,
  CulteGeek,
  hiphop,
} from "./Links";

type PropSubMenu = {
  index: number;
};

export const SubMenu = ({ index }: PropSubMenu) => {
  if (index === 2) {
    return (
      // Vêtements
      <div
        className="absolute z-10 bottom-[-500px] h-[500px]  max-[1425px]:w-[100%] w-[1422px] left-0
                            bg-white"
      >
        <div className="flex flex-row justify-center w-full flex-nowrap">
          <div className="text-black w-[285px] flex flex-col border-r border-r-solid border-r-black">
            <h2 className="mb-4 font-semibold">TOUS LES VÊTEMENTS</h2>
            {clothes.map((items, index) => (
              <Link
                reloadDocument
                className="mb-1 no-underline HoverLinks"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8">
            <h2 className="mb-4 font-semibold">TOP MARQUES</h2>
            {topBrands.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="w-[640px] flex flex-row flex-wrap mt-2 items-start justify-between">
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black  no-underline HoverLinks flex flex-col items-center"
              to={"/products/ensemble"}
            >
              <img
                src="/comme-des-loups_1.jpg"
                className="mb-1"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Ensembles</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px]  text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/jeans_pantalons"}
            >
              <img
                src="/lbo_pant.webp"
                className="mb-1"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Jeans - Pantalons</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/sweats_pulls"}
            >
              <img
                src="/image_desktop_3.webp"
                className="mb-1"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Sweats - Pulls</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/blousons_vestes"}
            >
              <img
                src="/image_desktop_4.webp"
                className="mb-1"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Doudounes</p>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (index === 3) {
    return (
      // Chaussures
      <div
        className="absolute z-10 bottom-[-500px] h-[500px]  max-[1425px]:w-[100%] w-[1422px] left-0
                            bg-white"
      >
        <div className="flex flex-row justify-center w-full flex-nowrap">
          <div className="text-black w-[285px] flex flex-col border-r border-r-solid border-r-black">
            <Link to={"/products/all_shoes"} 
              className="mb-4 font-semibold">TOUS LES CHAUSSURES</Link>
            {AllShoes.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8">
            <h2 className="mb-4 font-semibold">TOP MARQUES</h2>
            {topBrandsShoes.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="w-[640px] flex flex-row flex-wrap mt-2">
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black  no-underline HoverLinks flex flex-col items-center"
              to={"/products/adidas"}
            >
              <img
                src="/adidas_01.webp"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">adidas</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px]  text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/timberland"}
            >
              <img
                src="/image_desktop_timberland.jpg"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Timberland</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/asics"}
            >
              <img
                src="/image_desktop_asics.webp"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Asics</p>
            </Link>
            <Link
              className="max-[1100px]:w-[250px] w-[300px] h-[200px] text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/new_balance"}
            >
              <img
                src="/image_desktop_balance.webp"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">New Balance</p>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (index === 4) {
    return (
      // Accessoires
      <div
        className="absolute z-10 bottom-[-500px] h-[500px]  max-[1425px]:w-[100%] w-[1422px] left-0
                            bg-white"
      >
        <div className="flex flex-row justify-center w-full flex-nowrap">
          <div className="text-black w-[285px] flex flex-col border-r border-r-solid border-r-black">
          <Link to={"/products/accessoires"} 
              className="mb-4 font-semibold">TOUS LES ACCESSOIRES</Link>
            {AllAccessories.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8 border-r border-r-solid border-r-black">
          <Link to={"/products/casquettes"} 
              className="mb-4 font-semibold">CASQUETTES</Link>
            {caps.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8">
            <h2 className="mb-4 font-semibold">TOP MARQUES</h2>
            {topBrandsAccessories.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="w-[350px] flex flex-row flex-wrap mt-2">
            <Link
              className="w-[200px] h-[200px] text-black  no-underline HoverLinks flex flex-col items-center"
              to={"/products/casquettes"}
            >
              <img
                src="/image_desktop_cap.webp"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Casquettes</p>
            </Link>
            <Link
              className="w-[200px] h-[200px]  text-black no-underline HoverLinks flex flex-col items-center"
              to={"/products/accessoires"}
            >
              <img
                src="/image_desktop_accessories.jpg"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Accessoires</p>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (index === 5) {
    return (
      // Marques
      <div
        className="absolute font-[12px] z-10 bottom-[-600px] h-[600px]  max-[1425px]:w-[100%] w-[1422px] left-0
                            bg-white"
      >
        <div className="h-full flex flex-row justify-center w-full flex-nowrap">
          <div className="h-full flex flex-col justify-center w-[80%]">
            <div className="h-[80%] flex flex-row justify-center w-full flex-nowrap">
              <div className="h-full text-black w-[50%] flex flex-col flex-wrap border-r border-r-solid border-r-black">
                <h2 className="mb-4 pl-4 font-semibold">
                  TOP MARQUES LIFESTYLE
                </h2>
                <div className="w-full h-[90%] flex flex-col flex-wrap">
                  {TopBrandLifeStyle.map((items, index) => (
                    <Link
                      className="mb-1 pl-4 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                      to={`/products/${items.link}`}
                      key={index}
                    >
                      {items?.name?.length > 18
                        ? items?.name?.substring(0, 18) + "..."
                        : items?.name}
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
                  ))}
                </div>
              </div>
              <div className="text-black w-[25%] flex flex-col pl-8 border-r border-r-solid border-r-black">
                <h2 className="mb-4 font-semibold">SPORT</h2>
                {BrandSport.map((items, index) => (
                  <Link
                    className="mb-1 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                    to={`/products/${items.link}`}
                    key={index}
                  >
                    {items?.name?.length > 18
                      ? items?.name?.substring(0, 18) + "..."
                      : items?.name}
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
                ))}
              </div>
              <div className="text-black w-[25%] flex flex-col pl-8">
                <h2 className="mb-4 font-semibold">PREMIUM</h2>
                {Premium.map((items, index) => (
                  <Link
                    className="mb-1 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                    to={`/products/${items.link}`}
                    key={index}
                  >
                    {items?.name?.length > 18
                      ? items?.name?.substring(0, 18) + "..."
                      : items?.name}
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
                ))}
              </div>
            </div>
            <div className="w-full h-[20%] flex justify-center items-center">
              <Link
                to={"/marques"}
                id="MoreBrands"
                className="w-[80%] flex justify-center items-center h-14 text-black border-4 border-black text-center text-[24px]"
              >
                <span>VOIR PLUS DE MARQUES</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-center w-[20%] flex-nowrap">
            <div className="w-[350px] flex flex-row flex-wrap mt-2">
              <Link
                className="w-[200px] h-[200px] text-black  no-underline HoverLinks flex flex-col items-center"
                to={"/"}
              >
                <img
                  src="/image_desktop_cap.webp"
                  className="mb-2"
                  width={200}
                  height={180}
                ></img>
                <p className="font-semibold">The North Face</p>
              </Link>
              <Link
                className="w-[200px] h-[200px]  text-black no-underline HoverLinks flex flex-col items-center"
                to={"/"}
              >
                <img
                  src="/image_desktop_accessories.jpg"
                  className="mb-2"
                  width={200}
                  height={180}
                ></img>
                <p className="font-semibold">Tommy Hilfiger</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (index === 6) {
    return (
      // Artistes
      <div
        className="absolute z-10 bottom-[-500px] h-[500px]  max-[1425px]:w-[100%] w-[1422px] left-0
                            bg-white"
      >
        <div className="flex flex-row justify-center w-full flex-nowrap">
          <div className="text-black w-[285px] flex flex-col border-r border-r-solid border-r-black">
            <Link
              to={`/artists/hip-hop-rap`}
              reloadDocument
              className="mb-4 font-semibold"
            >
              HIP HOP / RAP
            </Link>
            {hiphop.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
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
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8 border-r border-r-solid border-r-black">
            <Link
              to={`/artists/culte-geek`}
              reloadDocument
              className="mb-4 font-semibold"
            >
              CULTE / GEEK
            </Link>
            {CulteGeek.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
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
            ))}
          </div>
          <div className="text-black w-[285px] flex flex-col pl-8">
            <Link
              to={`/artists/sport`}
              reloadDocument
              className="mb-4 font-semibold"
            >
              SPORT
            </Link>
            {sport.map((items, index) => (
              <Link
                className="mb-1 no-underline HoverLinks flex flex-row flex-nowrap gap-2"
                to={items.link}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
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
            ))}
          </div>
          <div className="w-[350px] flex flex-row flex-wrap mt-2">
            <Link
              className="w-[200px] h-[200px] text-black  no-underline HoverLinks flex flex-col items-center"
              to={"/"}
            >
              <img
                src="/image_desktop_om.webp"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Foot</p>
            </Link>
            <Link
              className="w-[200px] h-[200px]  text-black no-underline HoverLinks flex flex-col items-center"
              to={"/"}
            >
              <img
                src="/image_desktop_nba.jpg"
                className="mb-2"
                width={200}
                height={180}
              ></img>
              <p className="font-semibold">Nba</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
