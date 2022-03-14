import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { clicked } = props;
  return (
    <button
      type="button"
      onClick={ clicked }
      data-testid="btn-next"
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
};

export default Button;
