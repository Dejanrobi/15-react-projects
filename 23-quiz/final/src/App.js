import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {

  // accessing the app context's values from the useGlobalContext
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()


  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  // retrieved questions values with the question and the correct answer
  const { question, incorrect_answers, correct_answer } = questions[index]

  // we need to add the correct answer to the incorrect answers in order to get our answers to display
  // const answers = [...incorrect_answers, correct_answer]

  // but if we directly add the correct answer as above, all the correct answers will always be at the last option.
  // this will make the users to always guess the answer is the last option.
  // so we need to add the correct answer randomly inside the answers array

  // Creating an answers array with the incorrect answers value
  let answers = [...incorrect_answers]

  // getting a random number as an index
  // this generates a random number (0, and 3 inclusive)
  const tempIndex = Math.floor(Math.random() * 4)
  // if the index is the last number(3)
  if (tempIndex === 3) {
    // we push the currect answer to the last part of the array
    answers.push(correct_answer)
  } else {
    // when you add an element to a particular index in array, it replaces the element in that particular index.

    // so, we take the element in that particular current index and push it to the end of the array.
    answers.push(answers[tempIndex])
    // then add our correct_answer to that  index
    answers[tempIndex] = correct_answer
  }

  // hence we now a complete array with the answers


  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index + 1}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  // when the answer button is clicked it checks whether this answer is equal to the correct answer
                  // it returns true if equal and false if not
                  // then calls the checkAnswer function with either true or false as an argument
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
