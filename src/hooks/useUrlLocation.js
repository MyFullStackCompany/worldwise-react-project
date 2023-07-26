import { useSearchParams } from "react-router-dom";

export function useUrlLocation() {
  const [searchParams] = useSearchParams(); //  useSearch Param will get the data from the URL
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
