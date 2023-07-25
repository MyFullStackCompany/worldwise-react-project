import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";

// 1 Create a new context
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /** LOCAL STATE */
  // If local state where the useState only used by the specific component
  // Then we can place this useState on the component it self
  /** GLOBAL STATE */
  // If the useState used by multiple component
  // Then it is a global state, then we need to placed on the context
  // Finally place the value on the city provider
  // Create a function which loads the city
  // - Which we can call right here as the component mounts
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
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

  async function getCity(id) {
    try {
      // Start Loading
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error loading data");
    } finally {
      // End Loading
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("Cities context are used outside the cities provider");
  return context;
}

export { CitiesProvider, useCities };
