export const StepsCheckout = ({ active }: { active: number }) => {
  const names = ["Panier", "Livraison", "Paiement", "Confirmation"];
  return (
    <div className="relative w-[896px] h-24 py-2 flex items-center justify-center">
      <span
        className={`absolute top-8 left-[131px] h-[2px] w-[186px] 
                    ${active >= 2 ? "bg-[#00AA5B]" : "bg-[#E4E4E4]"}`}
      ></span>
      <span
        className={`absolute top-8 h-[2px] w-[186px] 
                    ${active >= 3 ? "bg-[#00AA5B]" : "bg-[#E4E4E4]"}`}
      ></span>
      <span
        className={`absolute top-8 right-[131px] h-[2px] w-[186px] 
                        ${active >= 4 ? "bg-[#00AA5B]" : "bg-[#E4E4E4]"}   
                `}
      ></span>
      {Array(4)
        .fill(0)
        .map((items, index) => (
          <div
            className="h-full w-56 flex flex-row flex-nowrap items-center justify-center"
            key={index}
          >
            <div className="flex flex-col items-center justify-between">
              <div
                className={`h-8 w-8 mb-2 p-4 rounded-full border-[3px]
                                ${
                                  active === items + index + 1
                                    ? "border-[#00AA5B]"
                                    : active > items + index + 1
                                      ? "border-[#00AA5B]"
                                      : "border-[#C3C3C3]"
                                }
                              flex items-center justify-center ${
                                active > items + index + 1
                                  ? "bg-[#00AA5B]"
                                  : "bg-transparent"
                              }`}
              >
                <p
                  className={`${
                    active === items + index + 1
                      ? "text-[#00AA5B]"
                      : active > items + index + 1
                        ? "text-white"
                        : "text-[#C3C3C3]"
                  } font-semibold text-[24px]`}
                >
                  {items + index + 1}
                </p>
              </div>
              <span
                className={`${
                  active === items + index + 1
                    ? "text-[#00AA5B]"
                    : active > items + index + 1
                      ? "text-[#00AA5B]"
                      : "text-[#C3C3C3]"
                } `}
              >
                {names[index]}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
