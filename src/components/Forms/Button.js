import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { clicked, dataTestId, btnName, className } = props;
  return (
    <button
      type="button"
      onClick={ clicked }
      data-testid={ dataTestId }
      className={ className }
    >
      { btnName }
    </button>
  );
};

Button.defaultProps = {
  clicked: () => '',
  dataTestId: '',
  className: '',
};

Button.propTypes = {
  clicked: PropTypes.func,
  dataTestId: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
