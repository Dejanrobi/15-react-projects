import React, { useState } from 'react'
// The following is imported from 'react-markdown library.
import ReactMarkdown from 'react-markdown'

function App() {
  // creates a state variable markdown initialized with the default value '#markdown preview'
  const [markdown, setMarkdown] = useState('# markdown preview')

  return (
    <main>
      <section className='markdown'>
        {/* this textarea value is bound to the markdown state and it has an onChange event handler that updates the markdown state with the new value that enters the textarea */}
        <textarea
          className='input'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <article className='result'>
          {/* The ReactMarkdown component is used here and the markdown state is passed as a child rendering the markdown content in a formatted manner */}
          {/* This component is responsible for parsing the markdown syntax within the provided text and rendering it as HTML. */}
          {/* Takes the markdown text as a string prop and converts it into structured HTML elements based on the Markdown syntax used. */}
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </section>
    </main>
  )
}

export default App
