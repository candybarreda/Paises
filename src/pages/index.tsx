import CountriesList from "@/components/CountriesList";
import { Nav } from "@/components/nav";
import { Input } from "@/components/ui/input";
import useCountries from "@/hooks/use-countries";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useMemo, useState } from "react";


export default function Index() {
  const { data, loading, error } = useCountries();
  const regions: string[] = useMemo(() => 
    data
      .map((country) => country.region)
      .filter((region, index, arr) => {
        const foundedIndex = arr.findIndex((a) => a === region);
        return foundedIndex === index;
      })
  , [data]);
  const [orderBy, setOrderBy] = useState("")
  
  const [filtro , setFiltro] = useState("");
  const [minPoblacion, setMinPoblacion] = useState("")
  const [maxPoblacion, setMaxPoblacion] =  useState("")
  const [region, setRegion] = useState ("")


  const filteredCountries = useMemo(() => {
    let countries = data;
    if (filtro !== ""){
      countries = countries.filter((c) => 
        c.name.common
          .toLowerCase()
          .startsWith(filtro.toLowerCase())
      )
    }
    if(minPoblacion !== "") {
      countries = countries.filter((c) => c.population >= parseInt(minPoblacion));
    } 
    if(maxPoblacion !== ""){ 
      countries = countries.filter((c) => c.population <=  parseInt(maxPoblacion));
    }
    if(region !== "") {
      countries = countries.filter((c) => c.region === region);
    }
    if (orderBy === "nombre"){
      countries.sort((a, b) => {
        if(a.name.common > b.name.common) return 1;
        else if (a.name.common === b.name.common) return 0;
        else return -1
      })
    } else if (orderBy === "poblacion") {
      countries.sort((a, b) => {
        if(a.population > b.population) return 1;
        else if (a.population === b.population) return 0;
        else return -1
      })
    }
    return countries
  }, [data,filtro,minPoblacion,maxPoblacion, region, orderBy])
  return (
    <>
    <Nav />
    
    <div className="flex flex-col items-center ">
      <h3> LISTADO DE PAISES</h3>
      
      <div className="grid w-full max-w-sm items-center gap-3">
        <Input onChange={(e) => setFiltro(e.target.value)} type="search" placeholder="Buscar Pais" />


        <Input onChange={(e) => setMinPoblacion(e.target.value)}
          type="number" placeholder="Min poblacion" value={minPoblacion} />

        <Input onChange={(e) => setMaxPoblacion(e.target.value)} 
          type="number" placeholder="Max poblacion"value={maxPoblacion} />
      </div>

      <div>
      <Select  onValueChange={(value) => setRegion(value)}>
        <SelectTrigger className="w-[280px]" >
          <SelectValue placeholder="Select region" />
        </SelectTrigger>
        <SelectContent >
          {
            regions?.map((r) => <SelectItem key={r} value={r} >{r}</SelectItem>)
          }
        </SelectContent> 
      </Select>
      </div> 
      <div>
      <Select  onValueChange={(value) => setOrderBy(value)}>
        <SelectTrigger className="w-[280px]" >
          <SelectValue placeholder="Seleccionar orden " />
        </SelectTrigger>
        <SelectContent >
         <SelectItem value="nombre" >Nombre</SelectItem>
         <SelectItem value="poblacion" >Poblacion</SelectItem>
        </SelectContent> 
      </Select>
      </div> 

      {error && <li> error: {error.message}</li>}
      {loading && <li>Loading...</li>}
      <CountriesList countries={filteredCountries} />
    </div> 
    </>
  );
}
