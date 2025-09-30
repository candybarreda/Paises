import { Country as CountryType } from '@/hooks/use-countries'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useContext, useMemo, useState } from "react"
import { FavoritesContext } from '@/contexts/favorites';

export default function Country({
  country,
  openModal
}: { country: CountryType, openModal: (country: CountryType) => void }){
  const { toogleFavorite, favorites } = useContext(FavoritesContext)

  const favorited = useMemo(() => {
    return favorites.findIndex((c) => c.name.common === country.name.common) !== -1
  }, [favorites])
  return (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>
            <button onClick={() => toogleFavorite(country)}>
              {
                favorited? (< img src="/favoriteRed.svg" className='w-4'/>) 
                :
                (<img src="/favorite.svg" alt="" className='w-4 flex'/>)
              }
              
            </button>
          </CardTitle>
            <CardDescription >
              <div className='flex  gap-4 '  >
                <div >
                  <div>{country.name.common}</div>
                  <img src={country.flags.png} alt="" className= 'w-24'/>
                </div>
                <div >
                  <div>Region:{country.region}</div>
                  <div>Poblacion:{country.population}</div>
                  <button  onClick={() => openModal(country)} >ver</button> 
                </div>
                
              </div>
            </CardDescription>
        </CardHeader>
       
      </Card>
  )
}