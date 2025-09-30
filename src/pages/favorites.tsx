import CountriesList from "@/components/CountriesList"
import { Nav } from "@/components/nav"
import { FavoritesContext } from "@/contexts/favorites"
import Link from "next/link"
import { useContext } from "react"

export default function FavoritesPage(){
  const {  favorites } = useContext(FavoritesContext)
  console.log(favorites)
  return(
    <>

      <Nav/>
      <div className="flex flex-col items-center ">
        PAISES FAVORITOS
      </div>
      <CountriesList countries= {favorites} />
    </>
  )





}