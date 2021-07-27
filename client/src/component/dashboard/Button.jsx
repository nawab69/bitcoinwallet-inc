import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button className={`px-4 py-2 rounded-lg dash-btn`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
