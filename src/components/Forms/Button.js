import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { clicked, dataTestId, btnName, btnClass } = props;
  return (
    <button
      type="button"
      onClick={ clicked }
      data-testid={ dataTestId }
      className={ btnClass }
    >
      { btnName }
    </button>
  );
};

Button.defaultProps = {
  clicked: () => '',
  dataTestId: '',
  btnClass: '',
};

Button.propTypes = {
  clicked: PropTypes.func,
  dataTestId: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
};

export default Button;
