import { useState, useEffect } from "react";
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

// BASE URL for API
const BASE_URL = "http://localhost:9000";

/** 1. WE NEED TO SET THE REACT ROUTER ON APP COMPONENT
 *  - ON APP COMPONENT WE NEED TO PROVIDE THE PATH AND ELEMENT TO SPECIFIC PAGES
 */
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    /* Using a normal fetch and then */
    // fetch("http://localhost:9000/cities")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    /** USING ASYNC FUNCTION */
    async function fetchCities() {
      try {
        // Start Loading
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // console.log(data);
        setCities(data);
      } catch (err) {
        alert("There was an error loading data");
      } finally {
        // End Loading
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
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

          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />

          <Route path="cities/:id" element={<City />} />

          <Route
            path="countries"
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        {/* * -> catch the route which not match all the other route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
