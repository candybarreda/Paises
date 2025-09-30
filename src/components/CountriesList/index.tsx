import Country from "../Country";
import { Country as CountryType } from '@/hooks/use-countries'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

type CountriesListParams = {
  countries: CountryType[]
}

export default function CountriesList(params: CountriesListParams) {
  
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);
  const [open, setOpen] = useState(false);
  
  const openModal = (country: CountryType) => {
    setSelectedCountry(country)
    setOpen(true)
  }

  const cleanModalData = (open: boolean) => {
    if(open) return;
    setSelectedCountry(null);
    setOpen(false);
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {params.countries.map((c) => (
          <Country key={c.name.common} country={c} openModal={openModal} />
        ))}
        
      </div>
      <Dialog open={open} onOpenChange={cleanModalData}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>
              {selectedCountry?.name.official}
            </DialogTitle>
            <DialogDescription className="flex flex-col">
              <div>Capital: {selectedCountry?.capital}</div>
              <div>Poblacion: {selectedCountry?.population}</div> 
              <div>Region: {selectedCountry?.region}</div>
              <img src={selectedCountry?.flags.png} alt="" className= 'w-24'/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
    
  )
}
