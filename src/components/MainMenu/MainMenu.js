import React from 'react';
import PropTypes from 'prop-types';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './MainMenu.module.css'
import classNames from 'classnames';

const MainMenu = ({children}) => {
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/">
        <FontAwesomeIcon icon={faShoppingCart}/>
        {` Nasco's`}
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <div className={classNames("navbar-nav ms-auto mb-2 mb-lg-0",styles.nav)} id="navbarScroll">
          {children}
        </div>
      </div>
    </div>
  </nav>
};

MainMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default MainMenu;