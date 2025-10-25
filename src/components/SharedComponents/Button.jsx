import React, { useState } from "react";

const Button = ({ text = "Click Me", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    backgroundColor: "#d3d5d5ff",
    color: "#242323ff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.1s ease",
  };

  const hoverStyle = {
    backgroundColor: "#616162ff",
    color: "#faf5f5ff",
    transform: "scale(1.03)",
  };

  return (
    <button
      style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
