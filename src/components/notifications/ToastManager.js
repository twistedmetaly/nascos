import React from 'react';
import localStyles from './Toast.module.css';
import PropTypes from 'prop-types';
import Toast from './Toast';
import {useToastContext} from '../../providers/ToastsProvider';

const ToastManager = ({toastList}) => {

  const [, , removeToast] = useToastContext();

  return <div className={localStyles.toastManager}>
    {toastList.map((toast, index) => (
      <Toast
        key={index}
        alertType={toast.alertType}
        message={toast.message}
        onClose={() => removeToast(index)}/>
    ))}
  </div>
};

ToastManager.propTypes = {
  toastList: PropTypes.array
}

export default ToastManager;