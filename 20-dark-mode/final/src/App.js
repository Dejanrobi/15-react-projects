import React, { useState, useEffect } from 'react';
import data from './data';
import Article from './Article';

// storing the theme in the local-storage.
const getStorageTheme = () => {
  // default theme is the light-theme
  let theme;
  // checking the local storage and seeing if there is a presence of a theme, then we set the theme to the value of 
  // the theme in the local storage.
  // and return the value of the theme.
  if (localStorage.getItem('theme')) {
    return theme = localStorage.getItem('theme');
  }
  return theme= 'light-theme';
};

function App() {
  // setting the theme state to the value obtained from the getStorageTheme() function.
  const [theme, setTheme] = useState(getStorageTheme());

  // toggling the value of the theme state.
  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  // changing the value of the theme in  the local storage to that of the current theme state.
  // this hook runs only when the theme state changes.
  useEffect(() => {
    // this is used to set the class of the entire html document.
    // hence it sets it to the value currently in the theme state.
    // this class is then picked in css (when the class is light-theme then the variable colors of the light-theme are used in the page)
    // when the class is dark-theme, then the variable colors of dark-theme are used in the page
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>overreacted</h1>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
