import axios from "axios";
import { propsOrder } from "./types";

export const API = axios.create({
    baseURL: `${import.meta.env.VITE_URL_AUTH}`,
    withCredentials: true,
  });
  
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("token_lbo")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("token_lbo") as string)?.token
      }`;
    }
    return req;
  });

type BodyRes = { 
        genre: string; 
        firstName: string; 
        lastName: string; 
        date_day: string; 
        date_month: string; 
        date_year: string; 
        email: string; 
        password: string; 
    }

export const DetailProduct = async (
    typeProduct?: string,
    id?: string
) => {
    const response = await 
    fetch(`${import.meta.env.VITE_URL_SERVER}/detailproduct/${typeProduct}/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));

    return response;
}

export const SearchProduct = async (
    search: string, 
    page:string = "1", 
    brand:string | null | undefined = "",
    sizes: string | null | undefined = "",
    sexe:string | null | undefined = "",
    colors:string | null | undefined = "",
    price:string | null | undefined = "",
    promos:string | null | undefined = "",
    ecoLabel:string | null | undefined = "",
    sort:string | null | undefined = "",
    ) => {
    const reponse = await fetch(
        `${import.meta.env.VITE_URL_SERVER}/search/${search}?page=${page}&brand=${brand}&sizes=${sizes}&sexe=${sexe}&colors=${colors}&price=${price}&promos=${promos}&ecoLabel=${ecoLabel}&sort=${sort}`,
        {
        method: "GET"
    })
    .then(res => res.json())
    .catch(error => console.log(error));
   return reponse;

}

export const getProduct = async (
    category: string, 
    page:string = "1", 
    brand:string | null | undefined = "",
    sizes: string | null | undefined = "",
    sexe:string | null | undefined = "",
    colors:string | null | undefined = "",
    price:string | null | undefined = "",
    promos:string | null | undefined = "",
    ecoLabel:string | null | undefined = "",
    sort:string | null | undefined = "",
    ) => {
    const reponse = await fetch(
        `${import.meta.env.VITE_URL_SERVER}/products/${category}?page=${page}&brand=${brand}&sizes=${sizes}&sexe=${sexe}&colors=${colors}&price=${price}&promos=${promos}&ecoLabel=${ecoLabel}&sort=${sort}`,
        {
        method: "GET"
    })
    .then(res => res.json())
    .catch(error => console.log(error));
   return reponse; 
}

export const getInfoUser = async (id?: string) => await API.get(`/infos/${id}`);
export const SignUp = async (response: BodyRes) => await API.post(`/sign-up`, response);
export const SignIn = async (response: BodyRes) => await API.post(`/sign-in`, response);
export const addOrder = async (response: propsOrder, id: string) => await API.post(`addOrder/${id}`, response);