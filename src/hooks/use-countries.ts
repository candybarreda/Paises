import { useEffect, useState } from "react";

type CountryName = {
  common: string
  official: string
}

export type Country = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: Record<string, CountryName>
  }
  cca3: string
  capital: string[]
  region: string
  population: number
}

type UseCountriesResponse = {
  data: Country[]
  loading: boolean
  error: Error | null
}


export default function useCountries(): UseCountriesResponse{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  
  useEffect(( ) => {
    setLoading (true);
    fetch('https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital')
    .then(res => res.json())
    .then((data) => {
      setError(null);
      setData(data);
    })
    .finally( () => setLoading(false))
    .catch((error) => {
      setData([]);
      setError(error);
    });
  }, [] );
  
  return {data, loading, error};
}