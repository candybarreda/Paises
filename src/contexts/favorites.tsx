import { Country } from '@/hooks/use-countries';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

type FavoritesContextType = {
  favorites: Country[]
  toogleFavorite: (country: Country) => void
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toogleFavorite: (country: Country) => {console.log("vacio")},
});

export default function FavoritesProvider({ children }:{ children: ReactNode }){
  
  const [favorites, setFavorites] = useState<Country[]>([]);

  const toogleFavorite = useCallback((country: Country) => {
    const index = favorites.findIndex((c) => c.name.common === country.name.common)
    let currentFavorites = favorites;
    if (index === -1) {
      currentFavorites = [...favorites, country]
    } else {
      favorites.splice(index, 1);
      currentFavorites = [...favorites]
    }
    
    setFavorites(currentFavorites)
    localStorage.setItem('countries-favorites', JSON.stringify(currentFavorites))
  }, [favorites, setFavorites])

  
  useEffect(() => {
    const persistedFavorites = localStorage.getItem('countries-favorites');
    if(persistedFavorites) setFavorites(JSON.parse(persistedFavorites));
  }, [])

  const value = useMemo(() => ({
    favorites,
    toogleFavorite
  }), [favorites, toogleFavorite])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )

}

