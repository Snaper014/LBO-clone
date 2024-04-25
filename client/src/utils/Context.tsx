import * as React from "react";
import { propsUserInfos } from "./types";

type UserContextType = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  WidthScreen: number;
  setWidthScreen: React.Dispatch<React.SetStateAction<number>>;
  displayMobileFilter: boolean;
  setDisplayMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
  userInfos: propsUserInfos;
  setUserInfos: React.Dispatch<React.SetStateAction<propsUserInfos>>;
  DataBasket: string | null;
  setDataBasket: React.Dispatch<React.SetStateAction<string | null>>;
};

const initContextState = {
  active: -1,
  setActive: () => {},
  WidthScreen: 1024,
  setWidthScreen: () => {},
  displayMobileFilter: false,
  setDisplayMobileFilter: () => {},
  userInfos: {
    email: "",
    lastName: "",
    firstName: "",
    genre: "",
    date_day: "",
    date_month: "",
    date_year: "",
    id: "",
    products: [],
  },
  setUserInfos: () => {},
  DataBasket: "",
  setDataBasket: () => {},
};
const Context = React.createContext<UserContextType>(initContextState);
type ChildrenType = { children?: React.ReactNode };

export const DataProvider = ({ children }: ChildrenType) => {
  const [active, setActive] = React.useState(-1);
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);
  const [displayMobileFilter, setDisplayMobileFilter] = React.useState(false);
  const [userInfos, setUserInfos] = React.useState<propsUserInfos>({
    email: "",
    lastName: "",
    firstName: "",
    genre: "",
    date_day: "",
    date_month: "",
    date_year: "",
    id: "",
    products: [],
  });
  const [DataBasket, setDataBasket] = React.useState(
    localStorage.getItem("basket"),
  );

  React.useEffect(() => {
    const ResizeWidth = () => {
      setWidthScreen(window.innerWidth);
    };
    window.addEventListener("resize", ResizeWidth);
    return () => {
      window.removeEventListener("resize", ResizeWidth);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        active,
        setActive,
        WidthScreen,
        setWidthScreen,
        displayMobileFilter,
        setDisplayMobileFilter,
        userInfos,
        setUserInfos,
        DataBasket,
        setDataBasket,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "Vous venez d'utilisez le hook personnalisé hors de son contexte",
    );
  }
  return context;
};
