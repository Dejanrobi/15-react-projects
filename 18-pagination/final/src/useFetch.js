import { useState, useEffect } from 'react'
import paginate from './utils'
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    // paginating the passed data
    // the data is passed to the paginate function that paginates it and returns the paginated data
    // then the data state is updated with the paginated data.
    setData(paginate(data))
    // therefore the array containing other arrays is set as the data and 
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return { loading, data }
}

// the loading plus the set data is returned ?