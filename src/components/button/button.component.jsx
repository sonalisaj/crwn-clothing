import React from 'react';
import './button.styles.scss';
/*

    we have default, inverted, google sign in buttons

*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
  return (
      <div
          className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
          {...otherProps}>
          {children}
    </div>
  )
}

export default Button