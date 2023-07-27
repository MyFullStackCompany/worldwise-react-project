import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { Suspense, lazy } from "react";

import { CityList } from "./components";
import { CountriesList } from "./components";
import { City } from "./components";
import { Form } from "./components";
import { SpinnerFullPage } from "./components";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-e613a81c.css   29.72 kB │ gzip:   5.00 kB
// dist/assets/index-aa95518c.js   523.06 kB │ gzip: 148.05 kB

// BASE URL for API

/** 1. WE NEED TO SET THE REACT ROUTER ON APP COMPONENT
 *  - ON APP COMPONENT WE NEED TO PROVIDE THE PATH AND ELEMENT TO SPECIFIC PAGES
 */
function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            {/* Route Definitation
        - Define the URL which is called the path prop
    */}
            {/* / -> Root to Home Page */}
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            {/* Create Nested Route */}
            <Route path="app" element={<AppLayout />}>
              {/* This will become default as soon open the app URL */}
              <Route index element={<Navigate replace to="cities" />} />

              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* * -> catch the route which not match all the other route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
