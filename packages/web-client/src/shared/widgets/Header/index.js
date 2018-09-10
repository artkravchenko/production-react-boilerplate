import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

function Header(props) {
  let className = 'header';

  if (props.className) {
    className += ` ${props.className}`;
  }

  return <div className={className}>This is the header</div>;
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
