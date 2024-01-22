import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'

// Creating the entire app's context.
const AppContext = React.createContext()

// creating the initial State of the useReducer hook
const initialState = {
  loading: false,
  // cartItems is imported from the data above
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  // the useReducer hook has a state and a dispatch.
  // the state takes in a reducer function( a function to manipulate the initial state based on the dispatched action)
  // it also takes in the initialState.
  // the dispatch has an action which is an object containing the action type and the payload(data associated with the action)
  // when dispatch is called, it calls the reducer function passing the action
  const [state, dispatch] = useReducer(reducer, initialState)

  // a clear cart function that dispatches a clear cart action
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // a function that dispatches the remove action type with a payload containing the id to be removed
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  // a function that dispatches the increase action type with a payload containing the id to be increased
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  // a function that dispatches the decrease action type with a payload containing the id to be decreased
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  // a function to fetch the Data of the Cart.
  const fetchData = async () => {
    // dispatches an action of load type to load the entire page
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    // dispatches an action to display items and a payload containing all the cart items 
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  // dispatches the toggle amount action with an id of the item to be toggle and the type
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  // this hook runs the fetchData once (only when the page loads)
  useEffect(() => {
    fetchData()
  }, [])

  // dispatches the get total action whenever cart changes (i.e any item in the cart changes)
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])


  return (
    <AppContext.Provider

      // passing the values to be accessed throughout the entire webpage
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {/* children to access the context */}
      {children}
    </AppContext.Provider>
  )
}
// make sure use

// exporting the AppContext as a function that runs when the function is called
export const useGlobalContext = () => {
  return useContext(AppContext)
}

// exporting the App Provider to pass in the children.
export { AppContext, AppProvider }
