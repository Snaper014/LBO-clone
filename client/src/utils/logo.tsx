export const Logo = ({
  color,
  secondColor,
}: {
  color: string;
  secondColor: string;
}) => {
  return (
    <div className="relative bg-transparent w-full h-full flex flex-row flex-nowrap justify-between">
      <div className="relative -top-2 max-lg:top-0 left-0 w-[87%] px-1 h-full flex flex-col items-start">
        <div className="container-logo-one h-[46%] w-full flex items-start justify-start">
          <p
            style={{ color: `${color}` }}
            className={`h-full text-right Font-logo-1 w-full tracking-[-2px] uppercase max-[260px]:ml-1 max-[260px]:font-bold font-extrabold text-nowrap`}
          >
            La brouette
          </p>
        </div>
        <div className="container-logo-two h-[53%] w-full">
          <p
            style={{ color: `${color}`}}
            className={`Font-logo-2 ml-1 h-full text-right tracking-tighter uppercase max-[260px]:ml-0 max-[260px]:font-bold font-extrabold text-nowrap`}
          >
            officielle
          </p>
        </div>
      </div>
      <div
        style={{ backgroundColor: `${color}` }}
        className={`container-logo-three w-[8%] h-full flex justify-center`}
      >
        <p
          style={{ color: `${secondColor}` }}
          className={`flex items-center justify-center text-center -rotate-90 font-bold`}
        >
          <span className="Font-logo-3 font-extrabold">.COM</span>
        </p>
      </div>
    </div>
  );
};

// <div className="flex flex-col gap-3">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="290px"
//   height="71px"
//   viewBox="0 0 189.8 51.5"
// >
//   <title>La brouette officielle</title>
//   <path
//     fill="red"
//     d="M11.6 21.5h5.7l1.1-3h7.3l1 3h5.8L24.2.4H20l-8.3 20.8v-4.4H5.4V.4H0v21.1h11.6zM22 6.9l2.2 7.2h-4.4L22 6.9zM54.2 19.6c1.3-1.1 1.9-2.9 1.9-4.6 0-2.4-1.2-4.1-3.5-4.9 1.6-.9 2.4-2.4 2.4-4.2 0-1.3-.4-2.5-1.3-3.5-1.8-2-4.2-2-6.7-2h-6.5v21.1h6.7c2.9 0 4.9 0 7-1.9zM45.8 5.1h2.1c1.1 0 2.1.3 2.1 1.6s-1 1.7-2.1 1.7h-2V5.1zm0 7.8h2.7c1.3 0 2.5.3 2.5 1.8 0 1.6-1.2 2-2.5 2h-2.7v-3.8zM67.8 21.9c6.2 0 11.2-4.7 11.2-11C79 4.7 74 0 67.8 0c-3.6 0-6.7 1.5-8.9 4.3-.5.7-1.1 1.5-1.4 2.4-.6 1.5-.8 2.9-.8 4.5 0 6 5.2 10.7 11.1 10.7zm.1-17.2c3.4 0 5.7 3 5.7 6.2s-2.3 6.2-5.7 6.2c-3.5 0-5.8-2.9-5.8-6.3 0-3.2 2.3-6.1 5.8-6.1zM88.6 21.9c2.2 0 4.3-.7 5.9-2.3 1.8-1.8 2.1-4 2.1-6.5V.4h-5.4v12.7c0 2-.1 4-2.7 4-2.4 0-2.7-2.1-2.7-4V.4h-5.4v12.7c0 2.7.2 4.5 2.1 6.5 1.5 1.6 3.9 2.3 6.1 2.3zM110.9.4H97.3v4.7h4.1v16.4h5.4V5.1h4.1zM111.7.4h5.4v21.1h-5.4zM150.8 21.9c2.2 0 4.3-.7 5.9-2.3 1.8-1.8 2.1-4 2.1-6.5V.4h-5.4v12.7c0 2-.1 4-2.7 4-2.4 0-2.7-2.1-2.7-4V.4h-5.4v12.7c0 2.7.2 4.5 2.1 6.5 1.6 1.6 3.9 2.3 6.1 2.3zM161.1 21.5h11.7v-4.8h-6.5v-3.6h6.3V8.4h-6.3V5.1h6.5V.4h-11.7zM13.9 23.6c-4.5 0-8.5 1.9-11.2 5.4-.6 1-1.3 2-1.7 3-.7 1.8-1 3.7-1 5.6C0 45.2 6.4 51 13.9 51c7.8 0 14-5.9 14-13.7 0-7.7-6.2-13.7-14-13.7zm.1 21.5c-4.4 0-7.3-3.6-7.3-7.9 0-4.1 2.9-7.7 7.2-7.7s7.2 3.7 7.2 7.8c.1 4.1-2.8 7.8-7.1 7.8zM29.8 50.6h6.4V40.5h7.7v-5.9h-7.7v-4.5h8v-6H29.8zM46.1 50.6h6.4V40.5h7.7v-5.9h-7.7v-4.5h8v-6H46.1zM62.4 24.1h6.8v26.4h-6.8zM84.9 29.6c3 0 5.4 1.9 6.4 4.6h7.1c-.3-1.5-.9-3-1.8-4.3-2.6-4-6.9-6.2-11.6-6.2-7.7 0-13.9 5.9-13.9 13.7S77.3 51.1 85 51.1c6.4 0 11.8-4.1 13.4-10.4h-7.1c-1.2 2.6-3.4 4.5-6.4 4.5-4.3 0-7.1-3.8-7.1-7.9 0-4.1 2.8-7.7 7.1-7.7zM100.1 24.1h6.8v26.4h-6.8zM109.8 50.6h14.7v-6h-8.2v-4.5h7.9v-5.9h-7.9v-4.1h8.2v-6h-14.7zM133.8 24.1h-6.7v26.5h14.5v-6h-7.8zM149.4 24.1h-6.7v26.5h14.6v-6h-7.9zM158.1 50.6h14.7v-6h-8.2v-4.5h8v-5.9h-8v-4.1h8.2v-6h-14.7zM139.1 16.8c1.3-1.9 1.7-3.8 1.7-6.1 0-6.1-5.2-10.8-11.2-10.8-6.2 0-11.1 4.9-11.1 11s5.1 10.8 11.1 10.8c2.2 0 4-.5 5.9-1.6 1.2 1.3 3.3 1.6 5 1.6.5 0 .9 0 1.3-.1v-4.3c-.8.4-2 .2-2.7-.5zm-4.2-3.3c-.6 1.4-1.5 2.5-2.9 3.1-.7.4-1.6.5-2.4.5-.9 0-1.7-.2-2.5-.6-2-1-3.2-3.2-3.2-5.7 0-.3 0-.6.1-.8 0-.3.1-.7.2-.9.3-.9.7-1.8 1.3-2.5l.1-.1c1-1.1 2.4-1.8 4.1-1.8h.7c3 .3 5.1 2.8 5.1 5.9 0 1-.2 2-.6 2.9z"
//   ></path>
//   <path d="M111.1 18h0z"></path>
//   <path
//     fill="red"
//     d="M182.5 21.9c-1.5 0-2.9 1.1-2.9 2.7s1.3 2.7 2.9 2.7c1.6 0 2.9-1.1 2.9-2.7-.1-1.6-1.4-2.7-2.9-2.7z"
//     className="st0"
//   ></path>
//   <path
//     fill="red"
//     d="M175.2.4v51.1h14.6V.4h-14.6zm2.3 14.5l6.5-2-6.5-1.9V7.8h9.8v2.3L180 10l7.4 2.1v1.7l-7.4 2.1 7.4-.1v2.3h-9.8v-3.2zm9.9 29.1h-2.3v-2.3h2.3V44zm-5-3.4c-2.9 0-5.1-2.3-5.1-5.1 0-1.8.8-3.3 2.3-4.3.5-.3 1-.6 1.6-.7v2.6c-1 .4-1.7 1.3-1.7 2.4 0 1.6 1.4 2.6 2.9 2.6s2.9-1 2.9-2.6c0-1.1-.7-1.9-1.7-2.4v-2.6c2.3.6 3.9 2.6 3.9 5 0 2.8-2.2 5.1-5.1 5.1zm.2-10.8c-.7 0-1.4-.1-2.1-.4-.4-.1-.8-.4-1.1-.6-1.3-1-2-2.5-2-4.2 0-2.9 2.2-5.2 5.1-5.2 2.9 0 5.1 2.3 5.1 5.2-.1 2.8-2.2 5.2-5 5.2z"></path>
// </svg>
