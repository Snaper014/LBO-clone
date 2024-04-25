import { Link } from "react-router-dom";
import { FaSnapchatGhost, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { clothes, topBrands, informations, confidentialite } from "../Links";
import { GoPackageDependencies } from "react-icons/go";
import { LuTimer } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa6";
import { RiTruckLine } from "react-icons/ri";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export const Footer = ({ WidthScreen }: { WidthScreen: number }) => {
  return (
    <>
      <div className="h-24 max-[280px]:py-8 max-[1024px]:h-auto w-full bg-[#e4e4e4]">
        <ul className="h-full flex flex-row flex-nowrap w-full items-center max-[1024px]:justify-evenly justify-center">
          <li className="flex flex-row max-[1024px]:flex-col h-2/3 flex-nowrap max-[280px]:w-[30%] w-1/5 items-center justify-center">
            <i className="w-[30%] flex items-center justify-center">
              <GoPackageDependencies fontSize={35} />
            </i>
            <p className="max-[325px]:text-[10px] max-[280px]:w-full text-[15px] w-[70%] max-[1024px]:w-full">
              Satisfait ou rembours 14 jours pour changer d'avis
            </p>
          </li>
          <li className="max-[280px]:w-[30%] flex flex-row max-[1024px]:flex-col  h-2/3 flex-nowrap w-1/5 items-center justify-center">
            <i className="w-[33%] flex items-center justify-center">
              <LuTimer fontSize={35} />
            </i>
            <p className="max-[325px]:text-[10px] max-[280px]:w-full text-[15px] w-[70%] max-[1024px]:w-full">
              Livraison en 48H Domicile ou point relais
            </p>
          </li>
          <li className="max-[280px]:w-[30%] flex flex-row max-[1024px]:flex-col h-2/3 flex-nowrap w-1/5 items-center justify-center">
            <i className="w-[33%] flex items-center justify-center">
              <RiTruckLine fontSize={35} />
            </i>
            <p className="max-[325px]:text-[10px] max-[280px]:w-full text-[15px] w-[70%] max-[1024px]:w-full">
              Livraison gratuite dès 99€
            </p>
          </li>
          {WidthScreen > 1024 ? (
            <li className="flex flex-row h-2/3 flex-nowrap w-1/5 items-center justify-center">
              <i className="w-[33%] flex items-center justify-center">
                <IoShieldCheckmarkOutline fontSize={35} />
              </i>
              <p className="text-[15px] w-[70%] max-[280px]:w-full">
                Paiement en ligne sécurisé
              </p>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="w-full h-60 bg-[#0E14D3] flex flex-col items-center justify-evenly">
        <h2 className="max-[325px]:text-[13px] uppercase text-white font-semibold text-[18px] tracking-wider">
          inscrivez-vous à la newsletter
        </h2>
        <div className="w-[680px] max-[720px]:w-full h-[80px] flex flex-row flex-nowrap border-[3px] border-white">
          <input
            type="search"
            className="isHome w-[70%] bg-[#0E14D3] text-white border-none pl-3 font-semibold"
            placeholder="VOTRE ADRESSE E-MAIL"
          />
          <button className="w-[30%] bg-[#0E14D3] flex justify-center items-center border-l-2 border-white">
            <p className="text-white">GO</p>
          </button>
        </div>
      </div>
      <footer className="w-full max-[1024px]:h-auto h-[750px] bg-[#191919] flex flex-row max-[1024px]:flex-col flex-nowrap">
        <div
          className="h-full max-[1024px]:h-auto max-[1400px]:w-[70%] max-[1024px]:w-full w-[950px]
            max-[1024px]:flex-wrap 
            min-[1400px]:px-32 min-[1400px]:pt-16 min-[1400px]:pb-6 flex 
            flex-row items-start"
        >
          <div className="h-full text-[#868686] max-[1024px]:h-[470px] max-[1400px]:w-[30%] max-[1024px]:w-[50%] w-[285px] flex flex-col">
            <h2 className="max-[325px]:text-[13px] mb-10 pl-2 font-semibold uppercase text-white border-l-4 border-blue-600">
              catégories
            </h2>
            {clothes.map((items, index) => (
              <Link
                className="mb-3 max-[325px]:text-[10px] no-underline hover:text-white"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div
            className="h-full text-[#868686] max-[1024px]:h-auto max-[1024px]:mb-3
                max-[1024px]:w-[50%] w-[285px] flex flex-col mb-"
          >
            <h2 className="max-[325px]:text-[13px] mb-10 pl-2 font-semibold uppercase text-white border-l-4 border-blue-600">
              top marques
            </h2>
            {topBrands.map((items, index) => (
              <Link
                className="mb-3 max-[325px]:text-[10px] no-underline max-[1024px]:w-full hover:text-white"
                to={`/products/${items.link}`}
                key={index}
              >
                {items?.name?.length > 18
                  ? items?.name?.substring(0, 18) + "..."
                  : items?.name}
              </Link>
            ))}
          </div>
          <div className="h-full text-[#868686] max-[1400px]:w-[30%] max-[1024px]:w-full w-[285px] flex flex-col max-[280px]:flex-col max-[1024px]:flex-row">
            <div className="w-full max-[280px]:h-auto h-[70%] max-[1024px]:w-[50%] flex flex-col">
              <h2 className="max-[325px]:text-[13px] mb-10 pl-2 font-semibold uppercase text-white border-l-4 border-blue-600">
                aides & informations
              </h2>
              {informations.map((items, index) => (
                <Link
                  className="mb-3 max-[325px]:text-[10px] no-underline hover:text-white"
                  to={items.link}
                  key={index}
                >
                  {items?.name}
                </Link>
              ))}
            </div>
            <div className="w-full max-[1024px]:w-[50%] flex flex-col">
              <h2 className="mb-10 max-[325px]:text-[13px] pl-2 font-semibold uppercase text-white border-l-4 border-blue-600">
                confidentialité
              </h2>
              {confidentialite.map((items, index) => (
                <Link
                  className="mb-3 max-[325px]:text-[10px] no-underline hover:text-white"
                  to={items.link}
                  key={index}
                >
                  {items?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[100%] max-[1024px]:h-auto max-[1024px]:w-full max-[1400px]:w-[30%] w-[440px] flex flex-col">
          <div className="w-full max-[1024px]:h-80 h-[40%] bg-[#292B2D] flex flex-col items-center justify-center">
            <img
              className="mb-8"
              width="200px"
              height="50px"
              src="/SecondLogo.PNG"
            ></img>
            <div className="flex flex-row items-start justify-between flex-nowrap w-52 max-[260px]:w-full">
              <FaSnapchatGhost color="#868686" fontSize={35} />
              <FaInstagram color="#868686" fontSize={35} />
              <FaFacebookSquare color="#868686" fontSize={35} />
              <FaYoutube color="#868686" fontSize={35} />
            </div>
          </div>
          <div className="w-full max-[1024px]:h-[420px] h-[60%] bg-[#212223] text-white flex flex-col items-center justify-evenly">
            <img
              className="rounded-2xl"
              width="200px"
              height="200px"
              src="/LBO-logo.PNG"
            ></img>
            <p className="text-[24px] text-center">la brouette officielle</p>
          </div>
        </div>
      </footer>
    </>
  );
};
