import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

const ToastContext = React.createContext(null);

export const ToastsProvider = ({children}) => {
  const [toastList, updateToastList] = useState([]);

  const removeToast = (index) => updateToastList((toastList) =>
    toastList.filter((toast, toastIndex) => toastIndex !== index)
  )


  return <ToastContext.Provider value={[toastList, updateToastList, removeToast]}>
    {children}
  </ToastContext.Provider>
}

ToastsProvider.propTypes = {
  children: PropTypes.any.isRequired
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error('useToastContext must be used withing a ToastsProvider tag')
  }
  return context;
}