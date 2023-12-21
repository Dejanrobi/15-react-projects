import React, { useState, useContext, createContext } from 'react';
import sublinks from './data';

// creating the context of the entire app(manages the passing of all states to the entire pages in the React App)
const AppContext = createContext();

// creating the AppProvider component for the context and passing in the children that will be accessing the entire react app's context
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [page, setPage] = useState({ page: '', links: [] });
  const [location, setLocation] = useState({});

  // Creating these functions so that they can be called and perform these actions on other pages
  // a function to open the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // a function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // a function to open the submenu (passing the text of the title menu and the coordinates where the submenu should be opened)
  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    // page returns an object with the page value and a links array.
    setPage(page);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  // a function to close the submenu
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      // passing the values to be accessed from the App Context
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {/* passing in the children that will access the context */}
      {children}
    </AppContext.Provider>
  );
};
// make sure use

// exporting the AppContext as a function
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// Exporting both the AppContext and the AppProvider
export { AppContext, AppProvider };
