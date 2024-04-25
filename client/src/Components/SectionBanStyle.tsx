import { Link } from "react-router-dom";

type SectionBanStyle = {
  WidthScreen: number;
};

export const SectionBanStyle = ({ WidthScreen }: SectionBanStyle) => {
  return (
    <div className="mb-5 max-[1024px]:mb-20 px-7 max-[1024px]:px-0 max-[1024px]:w-full w-[88%] h-[1060px] max-[1024px]:h-auto relative z-10">
      <div className="w-full flex h-full flex-row max-[1024px]:flex-col flex-nowrap">
        <div className="h-full w-3/6 max-[1024px]:w-full flex flex-col items-center max-[1024px]:mb-8">
          <Link to="/products/the_north_face">
          <img
            className="mb-7 h-[733px] w-[92%] max-[1024px]:w-[98%]"
            src="/image_desktop_30.webp"
          ></img>
          </Link>
          <div className="w-full max-[1024px]:h-[520px] flex flex-row flex-nowrap items-start justify-around">
            <Link
              to="/products/boss"
              className="HoverLinks mb-4 max-[1024px]:w-[48%] no-underline w-[42%] text-black h-[250px] flex flex-col"
            >
              <img
                width="100%"
                height="100%"
                src="/image_desktop_33webp.webp"
              ></img>
              <p className="max-[260px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
                Boss
              </p>
            </Link>
            <Link
              to="/products/tommy_hilfiger"
              className="HoverLinks mb-4 no-underline max-[1024px]:w-[48%] w-[42%] text-black h-[250px] flex flex-col"
            >
              <img
                width="100%"
                height="100%"
                src="/image_desktop_32.webp"
              ></img>
              <p className="max-[260px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
                Tommy Hilfiger
              </p>
            </Link>
          </div>
        </div>
        <div className="h-full w-3/6 max-[1024px]:w-full flex flex-col items-center max-[1024px]:mb-8">
        <Link to="/products/new_balance">
          <img
            className="mb-7 h-[733px] w-[92%] max-[1024px]:w-[98%]"
            src="/image_desktop_31.webp"
          ></img>
          </Link>
          <div className="w-full max-[1024px]:h-[460px] flex flex-row flex-nowrap items-start justify-around">
            <Link
              to="/products/calvin_klein"
              className="HoverLinks mb-4 max-[1024px]:w-[48%] no-underline w-[42%] text-black h-[250px] flex flex-col"
            >
              <img
                width="100%"
                height="100%"
                src="/image_desktop_34.webp"
              ></img>
              <p className="max-[260px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
                Calvin Klein
              </p>
            </Link>
            <Link
              to="/"
              className="HoverLinks mb-4 no-underline max-[1024px]:w-[48%] w-[42%] text-black h-[250px] flex flex-col"
            >
              <img
                width="100%"
                height="100%"
                src="/image_desktop_35webp.webp"
              ></img>
              <p className="max-[260px]:text-[12px] h[20%] max-[420px]:h-auto w-full text-[1.5rem] py-4 font-semibold text-center">
                Boutique Femme
              </p>
            </Link>
          </div>
        </div>
      </div>
      {WidthScreen > 1024 ? (
        <div
          className="w-full h-[760px] -z-10 
          top-[10%] absolute left-0 right-0 border-4 border-[#0E14D3]"
        ></div>
      ) : null}
    </div>
  );
};
