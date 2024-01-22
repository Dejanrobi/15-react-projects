import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  // the above useEffect is run everytime the list changes
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
