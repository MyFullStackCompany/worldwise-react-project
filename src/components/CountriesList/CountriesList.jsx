import { Spinner } from "../Spinner";
import { Message } from "../Message";
import { CountryItem } from "../CountryItem";
import styles from "./CountryList.module.css";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  /** REDUCE METHOD
   *  - Initial Value
   *    * The reduce method starts with an initial value of an empty array ([])
   *    *This is the value that arr takes in the first iteration of the callback function.
   *  - Callback function
   *    * The callback function takes two parameters:
   *    * arr (the accumulator)
   *    * city (the current element of the cities array).
   *  - Logic inside Callback:
   *    * checks if the country represented by city.country already exists in the arr array
   *    * If the current city.country is not present in the arr array,
   *      - it means it's a new country, and we add a new object to the accumulator array (arr).
   *      - This object contains the id, country and emoji properties from the current city
   *
   * - The purpose of this reduce method is to extract unique
   *   country objects from the cities array
   * - If a country is already represented in the countries array,
   *   it skips adding a duplicate entry.
   *
   */

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { id: city.id, country: city.country, emoji: city.emoji },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
