import React, { useState, useContext } from 'react';

// Creating a context to be used throughout the entire page.
const AppContext = React.createContext();

// passing all the children to access the context.
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Passing the functions and states to be accessed using the context
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Using the AppContext and exporting it.
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// exporting the AppProvider in order to pass the children that will access the context.
export { AppContext, AppProvider };
