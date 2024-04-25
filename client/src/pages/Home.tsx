import * as React from "react";
import { Container } from "../Container";
import { Link } from "react-router-dom";
import { DesktopBar } from "../NaviguationBar/HomeBar/DesktopBar";
import { MobileBar } from "../NaviguationBar/HomeBar/MobileBar";
import { SectionBanner } from "../Components/SectionnerBanner";
import { SectionBanStyle } from "../Components/SectionBanStyle";
import { SectionGrid } from "../Components/SectionGrid";
import { Footer } from "../Components/FooterCustom";
import { SectionCategorie } from "../Components/SectionCategorie";
import { Search, MobileMenu } from "../NaviguationBar/SideBar";
import { TopVentesCard } from "../Components/TopVentesCard";

function Home() {
  const [hiddenNavBar, setHiddenNavBar] = React.useState(false);
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);
  const [HeightScreen, setHeightScreen] = React.useState(window.innerHeight);
  const [displaySearch, setDisplaySearch] = React.useState(false);
  const [displayMenu, setDisplayMenu] = React.useState(false);
  let Screen = WidthScreen > 1425 ? 1422 : WidthScreen;

  //console.log("displaymenu", displayMenu);

  React.useEffect(() => {
    const ResizeWidth = () => {
      if (displayMenu && window.innerWidth > 1024) {
        document.body.classList.remove("noscroll");
      }
      setWidthScreen(window.innerWidth);
      setHeightScreen(window.innerHeight);
    };
    let lastScrollTop = 0;
    const DisplayNavBar = () => {
      let scrollTop = window.scrollY;
      if (scrollTop <= 300) {
        setHiddenNavBar(false);
        return null;
      }
      if (scrollTop > lastScrollTop) {
        const gap = scrollTop - lastScrollTop > 60 ? true : false;
        if (gap) {
          setHiddenNavBar(false);
        } else return null;
        //console.log("scroll descend");
      } else if (scrollTop < lastScrollTop) {
        const gap = lastScrollTop - scrollTop > 100 ? true : false;

        if (gap) {
          setHiddenNavBar(true);
        } else return null;
        //console.log("scroll monte");
      }

      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", DisplayNavBar);
    window.addEventListener("resize", ResizeWidth);
    return () => {
      window.removeEventListener("resize", ResizeWidth);
      window.removeEventListener("scroll", DisplayNavBar);
    };
  }, []);

  return (
    <Container>
      {hiddenNavBar ? (
        <>
          {WidthScreen > 1024 ? (
            <div className="z-20 top-0 left-0 h-[152px] w-full fixed flex items-center justify-center">
              <DesktopBar isHome={false} />
            </div>
          ) : (
            <MobileBar
              isHome={false}
              WidthScreen={WidthScreen}
              setDisplaySearch={setDisplaySearch}
              setDisplayMenu={setDisplayMenu}
            />
          )}
        </>
      ) : null}
      {WidthScreen < 1024 ? (
        <MobileBar
          isHome
          WidthScreen={WidthScreen}
          setDisplaySearch={setDisplaySearch}
          setDisplayMenu={setDisplayMenu}
        />
      ) : (
        <DesktopBar isHome />
      )}
      {displaySearch && WidthScreen < 1024 ? (
        <Search setDisplaySearch={setDisplaySearch} />
      ) : null}
      {displayMenu && WidthScreen < 1024 ? (
        <MobileMenu
          setDisplayMenu={setDisplayMenu}
          Height={HeightScreen}
          Width={WidthScreen}
        />
      ) : null}
      <div className="w-full mb-16 max-[524px]:mb-0 ">
        {WidthScreen < 1024 ? (
          <Link to={`/products/polo_ralph_lauren`}>
          <img
            className={`mb-4 w-[${WidthScreen}px]`}
            src={"/image_mobile_1.webp"}
          ></img>
          </Link>
        ) : (
          <Link to={`/products/polo_ralph_lauren`}>
            <img
              width={`${Screen}px`}
              className="mb-4 h-[701px]"
              src={"/image_desktop_1.jpg"}
            ></img>
          </Link>
        )}
      </div>
      <SectionBanner
        firstPicture="/image_desktop_10.webp"
        link1="/products/top_ventes_sizes"
        lastPicture="/image_desktop_11.webp"
        link2="/products/nouveautes"
      />
      <p className="mt-5 mb-5 uppercase min-[520px]:tracking-[2.6rem] max-[260px]:tracking-[0.5rem] min-[525px]:tracking-[1rem] max-[520px]:text-[0.80rem] text-[1.3rem] text-[#0E14D3]">
        sélection
      </p>
      <p className="mt-5 mb-5 max-[520px]:text-[1.5rem] text-black text-[4.5rem] font-semibold">
        Top Catégories
      </p>
      <SectionCategorie />
      <SectionBanner
        firstPicture="/image_desktop_20.jpg"
        link1="/"
        lastPicture="/image_desktop_21.jpg"
        link2="/products/comme_des_loups"
      />
      <TopVentesCard />

      <p className="mt-5 mb-5 uppercase max-[260px]:tracking-[0.5rem] min-[520px]:tracking-[2.6rem] min-[525px]:tracking-[1rem] max-[520px]:text-[0.80rem] text-[1.3rem] text-[#0E14D3]">
        sélection
      </p>
      <p className="mt-5 mb-5 text-center text-black max-[520px]:text-[1.5rem] text-[4.5rem] font-semibold">
        Les Styles Du Moment
      </p>

      <SectionBanStyle WidthScreen={WidthScreen} />

      <p className="mt-5 mb-5 uppercase max-[260px]:tracking-[0.5rem] min-[520px]:tracking-[2.6rem] min-[525px]:tracking-[1rem] max-[520px]:text-[0.80rem] text-[1.3rem] text-[#0E14D3]">
        INSTAGRAM
      </p>
      <p className="my-4 text-black max-[520px]:text-[1.5rem] text-[4.5rem] font-semibold">
        SUIVEZ-NOUS
      </p>
      <p className="mt-4 mb-5 text-black">
        Identifiez-nous, on partage vos meilleurs looks !
      </p>
      <SectionGrid WidthScreen={WidthScreen} />
      <Footer WidthScreen={WidthScreen} />
    </Container>
  );
}

export { Home };
