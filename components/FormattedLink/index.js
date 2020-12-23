import React from "react";

export const FormattedLink = React.forwardRef(
  ({ children, onClick, href, ...otherProps }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} {...otherProps}>
        {children}
      </a>
    );
  }
);
