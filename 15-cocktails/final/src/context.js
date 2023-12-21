import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// Creating the AppContext
const AppContext = React.createContext()

// AppProvider component taking all the children
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  // used to store the fetched data and only runs the fetchDrinks function when the search item changes.
  const fetchDrinks = useCallback( async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      // console to see what comes back
      console.log(data);
      // the data comes as an object, so obtain the drinks array inside the data object by destructuring it.
      const { drinks } = data
      if (drinks) {
        // creating a new array with containing new object details that are easily extractable
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchTerm])
  // the above function only runs when the search item changes


  useEffect(() => {
    fetchDrinks()
  }, [searchTerm,fetchDrinks])
  // the useEffect hook runs the fetchDrinks function only when the search Item changes.
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
