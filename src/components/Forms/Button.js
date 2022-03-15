import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { clicked, dataTestId, btnName } = props;
  return (
    <button
      type="button"
      onClick={ clicked }
      data-testid={ dataTestId }
    >
      { btnName }
    </button>
  );
};

Button.defaultProps = {
  clicked: () => '',
  dataTestId: '',
};

Button.propTypes = {
  clicked: PropTypes.func,
  dataTestId: PropTypes.string,
  btnName: PropTypes.string.isRequired,
};

export default Button;
