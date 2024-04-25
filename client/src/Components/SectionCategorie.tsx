import { Link } from "react-router-dom";

export const SectionCategorie = () => {
  return (
    <div className="w-full flex flex-row flex-wrap items-start max-[1024px]:justify-evenly justify-between mb-16">
      <Link
        to="/products/all_shoes?type=sneaker"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-01.webp"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Sneakers
        </p>
      </Link>
      <Link
        to="/products/blousons_vestes?type=Doudoune"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-02.webp"
        ></img>
        <p className=" h[20%] max-[285px]:text-[12px] w-full text-[1.5rem] py-4 font-semibold text-center">
          Doudoune
        </p>
      </Link>
      <Link
        to="/products/jeans_pantalons"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] max-lg:h-auto text-black h-[356px] flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-03.webp"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Jeans - Pantalons
        </p>
      </Link>
      <Link
        to="/products/sweats_pulls"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-04.jpg"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Sweets -Pulls
        </p>
      </Link>
      <Link
        to="/products/casquettes"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto  flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-08.webp"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Casquettes
        </p>
      </Link>
      <Link
        to="/products/ensemble"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-06.webp"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Ensembles
        </p>
      </Link>
      <Link
        to="/products/t_shirts"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-05.jpg"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Tee-shirts
        </p>
      </Link>
      <Link
        to="/products/polos"
        className="HoverLinks mb-4 no-underline max-[1024px]:w-[45%] max-[1400px]:w-[22%] w-[336px] text-black h-[356px] max-lg:h-auto flex flex-col"
      >
        <img
          className="h-[80%] w-full max-lg:h-auto"
          src="/section-07.webp"
        ></img>
        <p className="max-[285px]:text-[12px] h[20%] w-full text-[1.5rem] py-4 font-semibold text-center">
          Polos
        </p>
      </Link>
    </div>
  );
};
