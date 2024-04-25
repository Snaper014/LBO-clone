import { register } from "swiper/element/bundle";

register();

export const MySwiper = ({
  picture,
  WidthScreen,
}: {
  picture?: string;
  WidthScreen: number;
}) => (
  <swiper-container
    className="mySwiper"
    pagination={true}
    height={WidthScreen}
    loop={true}
  >
    {picture?.split("*,").map((items, index) => (
      <swiper-slide key={index}>
        <img
          src={
            picture?.split("*,")?.length === index + 1
              ? items?.substring(0, items?.length - 1)
              : items
          }
          key={index}
          className={`h-full w-full`}
        ></img>
      </swiper-slide>
    ))}
  </swiper-container>
);
