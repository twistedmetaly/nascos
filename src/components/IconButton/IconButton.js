import React from 'react';
import PropTypes from 'prop-types';
import localStyle from './IconButton.module.css'

const IconButton = ({icon, onClick}) => {
  return <span className={localStyle.btn} onClick={onClick}>{icon}</span>
};

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func
}

export default IconButton;