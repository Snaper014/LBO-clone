import * as React from "react";
import { Container } from "../Container";
import { useLocation } from "react-router-dom";
import { DesktopBar } from "../NaviguationBar/HomeBar/DesktopBar";
import { MobileBar } from "../NaviguationBar/HomeBar/MobileBar";
import { Footer } from "../Components/FooterCustom";
import { Search, MobileMenu } from "../NaviguationBar/SideBar";

type PropsPage = {
  children: React.ReactNode;
};

export const Page = ({ children }: PropsPage) => {
  let location = useLocation();
  const [hiddenNavBar, setHiddenNavBar] = React.useState(false);
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);
  const [HeightScreen, setHeightScreen] = React.useState(window.innerHeight);
  const [displaySearch, setDisplaySearch] = React.useState(false);
  const [displayMenu, setDisplayMenu] = React.useState(false);

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
            <div
              className={`z-30 top-0 left-0 w-full h-[152px]
            fixed flex items-center justify-center`}
            >
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
          isHome={location.pathname === "/" ? true : false}
          DynamicScrollBar={false}
          WidthScreen={WidthScreen}
          setDisplaySearch={setDisplaySearch}
          setDisplayMenu={setDisplayMenu}
        />
      ) : (
        <DesktopBar isHome={location.pathname === "/" ? true : false} />
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
      {children}
      <Footer WidthScreen={WidthScreen} />
    </Container>
  );
};
