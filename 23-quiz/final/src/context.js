import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'


const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

// Creating the AppContext
const AppContext = React.createContext()




// Parameters: refers to the variables listed during the function definition. They act as placeholders to values passed to the function when it is called.
// def add_numbers(a, b);
// arguments: are the actual values that are passed to the function when it is called.
// result = add_numbers(5, 3);

// Creating an AppProvider component that provides the AppContext to all the children that are under it.
// The children are listed as a parameter.
const AppProvider = ({ children }) => {
  // setting the waiting state
  const [waiting, setWaiting] = useState(true)
  // setting the app's loading state
  const [loading, setLoading] = useState(false)
  // setting the questions available state
  const [questions, setQuestions] = useState([])
  // setting the index state
  const [index, setIndex] = useState(0)
  // setting the correct answers state
  const [correct, setCorrect] = useState(0)
  // setting the error state
  const [error, setError] = useState(false)
  // setting the quiz state
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })

  // setting the isModalOpen state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // a function to fetch the questions where the url to fetch the questions is listed as a parameter.
  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    // using axios to fetch the questions data.
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      console.log("Fetched Data: ", response)
      if (data.length > 0) {
        // setting the new state of questions to the data fetched
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

  // a function to set the next question
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      // setting the new index
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        // opening the modal when the questions are exhausted
        openModal()
        return questions.length - 1
      } else {
        return index
      }
    })
  }

  // the argument passed in this function is true or false(it passes that the answer selected is true or false )

  // if the passed argument is true, we add 1 to the correct state(indicating the correct answers) then call the nextQuestion function
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    // calling the nexQuestion function after the answer is checked
    nextQuestion()
  }

  // An open modal function to open the modal
  const openModal = () => {
    setIsModalOpen(true)
  }

  // closing the modal
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  // handling the change in the values in a form
  const handleChange = (e) => {
    // obtaining the name of the invoked event
    const name = e.target.name
    // obtaining the value of the invoked event
    const value = e.target.value
    // making changes to the quiz object state passing the name and the current value of the invoked event.
    setQuiz({ ...quiz, [name]: value })
  }

  // a function to handle the submission of the form.
  const handleSubmit = (e) => {
    e.preventDefault()

    // destructuring the variables in the object.
    const { amount, category, difficulty } = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  }

  // Passing the values to be accessed by the children provided by the AppProvider
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    > 
      {/* enclosing the children to access the values */}
      {children}
    </AppContext.Provider>
  )
}

// exporting the AppContext to access all the children provided by the AppContext
export const useGlobalContext = () => {
  return useContext(AppContext)
}

// exporting the AppProvider component to enclose all the children
export { AppContext, AppProvider }
