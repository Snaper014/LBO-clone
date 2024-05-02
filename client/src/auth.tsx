import * as React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SignUp, SignIn } from "./utils/fetch";
import { Link } from "react-router-dom";
import { HeaderCheckout } from "./Components/HeaderCheckout";
import { StepsCheckout } from "./Components/StepsCheckout";

export const Auth = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkout = queryParams.get("checkout");
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = React.useState(
    location.pathname === "/login" ? true : false,
  );
  const [isMan, setIsMan] = React.useState({
    checked: true,
    res: "",
  });
  const [query, setQuery] = React.useState({
    genre: "M",
    firstName: "",
    lastName: "",
    date_day: "01",
    date_month: "01",
    date_year: "2024",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [notification, setNotification] = React.useState({
    incorrectEmailLogin: [false, ""],
    incorrectPasswordLogin: [false, ""],
    incorrectLastNameR: [false, ""],
    incorrectFirstNameR: [false, ""],
    emailNoValid: [false, ""],
    incorrectPassword: [false, ""],
    existingUser: [false, ""],
  });
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignIn) {
      SignIn(query)
        .then((response) => {
          const { id } = jwtDecode<{ id: string }>(response?.data?.token);
          localStorage.setItem(
            "token_lbo",
            JSON.stringify({ token: response?.data?.token, userId: id }),
          );
          navigate(`${checkout ? "/checkout/delivery" : "/"}`);
        })
        .catch((error) => {
          const reason = error?.response?.data?.reason;
          const message = error?.response?.data?.message;
          if (reason === "incorrectEmailLogin") {
            setNotification((prev) => {
              return { ...prev, incorrectEmailLogin: [true, message] };
            });
          }
          if (reason === "incorrectPasswordLogin") {
            setNotification((prev) => {
              return { ...prev, incorrectPasswordLogin: [true, message] };
            });
          }
        });
    } else {
      SignUp(query)
        .then((response) => {
          const { id } = jwtDecode<{ id: string }>(response?.data?.token);
          localStorage.setItem(
            "token_lbo",
            JSON.stringify({ token: response?.data?.token, userId: id }),
          );
          navigate(`${checkout ? "/checkout/delivery" : "/"}`);
        })
        .catch((error) => {
          const reason = error?.response?.data?.reason;
          const message = error?.response?.data?.message;
          if (reason === "incorrectLastNameR") {
            setNotification((prev) => {
              return { ...prev, incorrectLastNameR: [true, message] };
            });
          }
          if (reason === "incorrectFirstNameR") {
            setNotification((prev) => {
              return { ...prev, incorrectFirstNameR: [true, message] };
            });
          }
          if (reason === "emailNoValid") {
            setNotification((prev) => {
              return { ...prev, emailNoValid: [true, message] };
            });
          }
          if (reason === "incorrectPassword") {
            setNotification((prev) => {
              return { ...prev, incorrectPassword: [true, message] };
            });
          }
          if (reason === "existingUser") {
            setNotification((prev) => {
              return { ...prev, existingUser: [true, message] };
            });
          }
        });
    }
  };

  const handleParam = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-auto">
      <div
        className={`w-full h-auto ${
          checkout ? "pt-0 pb-16" : "py-16"
        } max-lg:py-0 bg-[#f4f4f4] flex flex-col items-center`}
      >
        {checkout ? (
          <React.Fragment>
            <HeaderCheckout />
            <StepsCheckout active={2} />
          </React.Fragment>
        ) : (
          <Link
            to="/"
            className="w-full h-full mb-9 max-lg:mb-0 max-lg:py-2 flex items-center justify-center"
          >
            <img
              className="h-20 w-56 max-[280px]:w-2/4 max-[280px]:h-14"
              src={"../public/logo.PNG"}
            ></img>
          </Link>
        )}

        <div
          className="w-[90%] max-lg:w-full px-28 max-lg:px-2 py-12 flex flex-row max-lg:flex-col
                    flex-nowrap bg-white"
        >
          <div
            className={` max-lg:border-none
            border-r-2 border-r-black w-2/4 max-lg:w-full 
            max-lg:mb-12 flex flex-col items-center`}
          >
            <h2 className="font-bold text-[25px] mb-8">Déjà inscrit ?</h2>
            {isSignIn ? (
              <form
                onSubmit={formSubmit}
                id="login"
                action="/login"
                method="post"
                className="w-full flex flex-col items-start justify-start"
              >
                <label
                  htmlFor="Email"
                  className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                >
                  Adresse email
                </label>
                <input
                  id="Email"
                  name="email"
                  required
                  autoComplete="email"
                  type="text"
                  value={query.email}
                  onChange={(e) => {
                    handleParam(e);
                    setNotification((prev) => {
                      return { ...prev, incorrectEmailLogin: [false, ""] };
                    });
                  }}
                  className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
                />
                {notification.incorrectEmailLogin[0] ? (
                  <span className="text-[0.8em] mb-2 font-semibold text-[#DE1B1B]">
                    {notification.incorrectEmailLogin[1]}
                  </span>
                ) : null}
                <label
                  htmlFor="password"
                  className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                >
                  Mot de passe
                </label>
                <div
                  className="w-[90%] max-lg:w-full relative flex flex-row flex-nowrap 
                    h-14 mb-2 border-[3px] border-[#e4e4e4]"
                >
                  <input
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    value={query.password}
                    onChange={(e) => {
                      handleParam(e);
                      setNotification((prev) => {
                        return { ...prev, incorrectPasswordLogin: [false, ""] };
                      });
                    }}
                    className="w-full h-full pl-3"
                  />
                  <i
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword((prev) => !prev);
                    }}
                    className="w-[10%] cursor-pointer absolute right-0 h-full flex items-center justify-center"
                  >
                    {query.password === "" ? null : showPassword ? (
                      <AiOutlineEyeInvisible fontSize={20} />
                    ) : (
                      <AiOutlineEye fontSize={20} />
                    )}
                  </i>
                </div>
                {notification?.incorrectPasswordLogin[0] ? (
                  <span className="text-[0.8em] mb-2 font-semibold text-[#DE1B1B]">
                    {notification?.incorrectPasswordLogin[1]}
                  </span>
                ) : null}
                <button
                  type="submit"
                  name="submit"
                  aria-label="submit form"
                  className="bg-[#0E14D3] mt-12 max-lg:w-full max-lg:h-16 self-center w-64 text-white h-20 flex items-center justify-center"
                >
                  <p className="uppercase">se connecter</p>
                  <MdKeyboardArrowRight color="white" fontSize={25} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSignIn(true)}
                className="border-2 border-black self-center w-64 h-20 flex items-center justify-center max-lg:w-full max-lg:h-16 "
              >
                <p className="uppercase">se connecter</p>
                <MdKeyboardArrowRight fontSize={25} />
              </button>
            )}
          </div>

          <div className="max-lg:w-full w-2/4 px-4 flex flex-col items-center">
            <h2 className="font-bold text-[25px] mb-8">Créer un compte</h2>
            {isSignIn ? (
              <button
                onClick={() => setIsSignIn(false)}
                className="border-2 border-black self-center w-64 h-20 flex items-center justify-center max-lg:w-full max-lg:h-16 "
              >
                <p className="uppercase">s'inscrire</p>
                <MdKeyboardArrowRight fontSize={25} />
              </button>
            ) : (
              <form
                onSubmit={formSubmit}
                id="register"
                action="/register"
                method="post"
                className="w-full flex flex-col items-start justify-start"
              >
                <div className="w-full flex flex-col">
                  <h2 className="uppercase text-[#686868] mb-2">civilité</h2>
                  <div className="w-full flex flex-row flex-nowrap mb-4">
                    <div className="flex flex-row flex-nowrap mr-8">
                      <input
                        onChange={(e) => {
                          setIsMan({ checked: e.target.checked, res: "M" });
                          setQuery((prev) => ({ ...prev, genre: "M" }));
                        }}
                        id="civility-m"
                        name="civility-m"
                        autoComplete="civility-m"
                        type="radio"
                        checked={isMan.checked ? true : false}
                        className="mr-2 h-5 w-5"
                      />
                      <label htmlFor="civility-m">M</label>
                    </div>
                    <div className="flex flex-row flex-nowrap">
                      <input
                        onChange={(e) => {
                          setIsMan({ checked: !e.target.checked, res: "Mme" });
                          setQuery((prev) => ({ ...prev, genre: "Mme" }));
                        }}
                        id="civility-mme"
                        name="civility-mme"
                        autoComplete="civility-mme"
                        type="radio"
                        checked={!isMan.checked ? true : false}
                        className="mr-2 h-5 w-5"
                      />
                      <label htmlFor="civility-mme">Mme</label>
                    </div>
                  </div>

                  <label
                    htmlFor="lastName"
                    className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                  >
                    Nom
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="lastName"
                    type="text"
                    value={query.lastName}
                    onChange={(e) => {
                      handleParam(e);
                      setNotification((prev) => {
                        return { ...prev, incorrectLastNameR: [false, ""] };
                      });
                    }}
                    className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
                  />
                  {notification?.incorrectLastNameR[0] ? (
                    <span className="text-[0.8em] mb-4 font-semibold text-[#DE1B1B]">
                      {notification?.incorrectLastNameR[1]}
                    </span>
                  ) : null}
                  <label
                    htmlFor="firstName"
                    className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                  >
                    Prenom
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="firstName"
                    type="text"
                    value={query.firstName}
                    onChange={(e) => {
                      handleParam(e);
                      setNotification((prev) => {
                        return { ...prev, incorrectFirstNameR: [false, ""] };
                      });
                    }}
                    className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
                  />
                  {notification?.incorrectFirstNameR[0] ? (
                    <span className="text-[0.8em] mb-4 font-semibold text-[#DE1B1B]">
                      {notification?.incorrectFirstNameR[1]}
                    </span>
                  ) : null}
                  <h2 className="mb-1 text-[#868686] font-semibold">
                    Date de naissance
                  </h2>
                  <div
                    className="w-full flex flex-row flex-nowrap 
                        items-center justify-between mb-8"
                  >
                    <select
                      id="date_day"
                      name="date_day"
                      required
                      autoComplete="date_day"
                      value={query.date_day}
                      onChange={(e) => handleParam(e)}
                      className="w-[30%] h-12 border-[3px] border-[#e4e4e4]"
                    >
                      {Array(31)
                        .fill(0)
                        .map((items, index) => (
                          <option
                            key={index}
                            value={
                              index + 1 + items < 10
                                ? `0${index + 1}`
                                : index + 1
                            }
                          >
                            {index + 1 + items < 10
                              ? `0${index + 1 + items}`
                              : index + 1 + items}
                          </option>
                        ))}
                      {/* <option value="02">02</option>
                        <option value="03">03</option> */}
                    </select>
                    <select
                      id="date_month"
                      name="date_month"
                      required
                      autoComplete="date_month"
                      value={query.date_month}
                      onChange={(e) => handleParam(e)}
                      className="w-[30%] h-12 border-[3px] border-[#e4e4e4]"
                    >
                      {Array(12)
                        .fill(0)
                        .map((items, index) => (
                          <option
                            key={index}
                            value={
                              index + 1 + items < 10
                                ? `0${index + 1}`
                                : index + 1
                            }
                          >
                            {index + 1 + items < 10
                              ? `0${index + 1 + items}`
                              : index + 1 + items}
                          </option>
                        ))}
                    </select>
                    <select
                      id="date_year"
                      name="date_year"
                      required
                      autoComplete="date_year"
                      value={query.date_year}
                      onChange={(e) => handleParam(e)}
                      className="w-[30%] h-12 border-[3px] border-[#e4e4e4]"
                    >
                      {Array(100)
                        .fill(1924)
                        .map((items, index) => (
                          <option key={index} value={index + 1 + items}>
                            {index + 1 + items}
                          </option>
                        ))}
                    </select>
                  </div>
                  <label
                    htmlFor="Email"
                    className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                  >
                    Adresse email
                  </label>
                  <input
                    id="Email"
                    name="email"
                    required
                    autoComplete="email"
                    type="text"
                    value={query.email}
                    onChange={(e) => {
                      handleParam(e);
                      setNotification((prev) => {
                        return { ...prev, emailNoValid: [false, ""] };
                      });
                      setNotification((prev) => {
                        return { ...prev, existingUser: [false, ""] };
                      });
                    }}
                    className="w-[90%] max-lg:w-full h-14 pl-3 mb-3 border-[3px] border-[#e4e4e4]"
                  />
                  {notification?.emailNoValid[0] ? (
                    <span className="text-[0.8em] mb-4 font-semibold text-[#DE1B1B]">
                      {notification?.emailNoValid[1]}
                    </span>
                  ) : null}
                  {notification.existingUser[0] ? (
                    <span className="text-[0.8em] mb-4 font-semibold text-[#DE1B1B]">
                      {notification.existingUser[1]}
                    </span>
                  ) : null}
                  <label
                    htmlFor="password"
                    className="mb-1 text-[14px] outline-[3px] font-semibold text-[#868686]"
                  >
                    Mot de passe
                  </label>
                  <div
                    className="w-[90%] max-lg:w-full flex flex-row flex-nowrap 
                    h-14 border-[3px] border-[#e4e4e4]"
                  >
                    <input
                      id="password"
                      name="password"
                      required
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      value={query.password}
                      onChange={(e) => {
                        handleParam(e);
                        setNotification((prev) => {
                          return { ...prev, incorrectPassword: [false, ""] };
                        });
                      }}
                      className="w-full h-full pl-3"
                    />
                  </div>
                  <span className="mb-1 text-[13px] w-full text-[#868686]">
                    8 caratères minimum dont 1 lettre miniscule, 1 lettre
                    majscule et un chiffre.
                  </span>
                  {notification?.incorrectPassword[0] ? (
                    <span className="text-[0.8em] mb-4 font-semibold text-[#DE1B1B]">
                      {notification?.incorrectPassword[1]}
                    </span>
                  ) : null}
                  <button
                    type="submit"
                    name="submit"
                    aria-label="submit form"
                    className="bg-[#0E14D3] max-lg:w-full max-lg:h-16  mt-12 self-center w-64 text-white h-20 flex items-center justify-center"
                  >
                    <p className="uppercase">s'inscrire</p>
                    <MdKeyboardArrowRight color="white" fontSize={25} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#e4e4e4] text-center h-12 flex items-center justify-center">
        <span>© 2024 - LaBrouetteOfficielle.com</span>
      </footer>
    </div>
  );
};
