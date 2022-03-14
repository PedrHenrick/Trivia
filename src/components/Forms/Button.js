import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { clicked, isNotVisible } = props;
  return (
    <button
      type="button"
      onClick={ clicked }
      disabled={ !isNotVisible }
    >
      Proximo
    </button>
  );
};

Button.defaultProps = {
  clicked: () => '',
};

Button.propTypes = {
  clicked: PropTypes.func,
  isNotVisible: PropTypes.bool.isRequired,
};

export default Button;
