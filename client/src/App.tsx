import "./App.css";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router";
import { BrandsPage } from "./pages/AllBrands";
import { CategoryArtist } from "./pages/CategoryArtists";
import { BrowserRouter } from "react-router-dom";
import { Error } from "./Error/Error";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "./Error/FallbackError";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Products } from "./pages/Products";
import { CaractersProduct } from "./pages/DetailProduct";
import { DataProvider } from "./utils/Context";
import { SearchPage } from "./pages/Search";
import { Auth } from "./auth";
import { Delivery } from "./pages/Delivery";
import { Basket } from "./pages/Basket";
import { Payout } from "./pages/Payout";
import { Confirm } from "./pages/Confirm";
import { Profil } from "./pages/Profil";
import { Orders } from "./pages/MyOrders";

function App() {
  const queryClient = new QueryClient();
  // tests
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={fallbackRender}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/marques" element={<BrandsPage />} />
              <Route path="/artists/:idArtist" element={<CategoryArtist />} />
              <Route path="/products/:product" element={<Products />} />
              <Route
                path="/detailproduct/:typeProduct/:id"
                element={<CaractersProduct />}
              />
              <Route path="/profil" element={<Profil />} />
              <Route path="/commandes" element={<Orders />} />
              <Route path="/search/:search" element={<SearchPage />} />
              <Route path="/checkout/basket" element={<Basket />} />
              <Route path="/checkout/delivery" element={<Delivery />} />
              <Route path="/checkout/paiement" element={<Payout />} />
              <Route path="/checkout/confirm" element={<Confirm />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
