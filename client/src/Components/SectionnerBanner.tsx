import { Link } from "react-router-dom";

type PropsSecBanner = {
  firstPicture: string;
  lastPicture: string;
  link1: string;
  link2: string;
};

export const SectionBanner = ({
  firstPicture,
  lastPicture,
  link1,
  link2
}: PropsSecBanner) => {
  return (
    <div className="w-full flex flex-row max-[1024px]:flex-col max-[1024px]:gap-12 items-center justify-evenly mb-16">
      <Link
        to={link1}
        className="text-white max-[1400px]:w-[45%] w-[651px] 
            h-[291px] flex max-[1024px]:w-[95%] 
            justify-center items-center"
      >
        <img width="100%" className="h-full" src={firstPicture}></img>
      </Link>
      <Link
          to={link2} 
          className="text-white max-[1400px]:w-[45%] max-[1024px]:w-[95%] w-[651px] max-[1024px]:h-[300px] h-[291px] flex justify-center items-center">
        <img width="100%" className="h-full" src={lastPicture}></img>
      </Link>
    </div>
  );
};
