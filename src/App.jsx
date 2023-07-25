import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import { CityList } from "./components";
import { CountriesList } from "./components";
import { City } from "./components";
import { Form } from "./components";
import { CitiesProvider } from "./contexts/CitiesContext";

// BASE URL for API

/** 1. WE NEED TO SET THE REACT ROUTER ON APP COMPONENT
 *  - ON APP COMPONENT WE NEED TO PROVIDE THE PATH AND ELEMENT TO SPECIFIC PAGES
 */
function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
