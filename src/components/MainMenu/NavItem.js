import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import localStyles from './MainMenu.module.css'

const NavItem = ({navText, to, navIcon, onClick}) => {
  return <div className={classNames("nav-item", localStyles.navs)}>
    <NavLink
      to={to}
      className={({isActive}) => `${isActive ? localStyles.active : ''} nav-link`}
      onClick={onClick}
    >
      {navIcon} {navText}
    </NavLink>
  </div>
};

NavItem.propTypes = {
  navIcon: PropTypes.element,
  navText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default NavItem;