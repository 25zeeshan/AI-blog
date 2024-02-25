import React from "react";

const ToggleButton = ({ isSidebarOpen }) => {
  const sidebarStyle = {
    transform: isSidebarOpen ? "rotate(45deg)" : "none",
    transition: "transform 0.3s ease",
  };

  const sidebarStyle2 = {
    display: isSidebarOpen ? "none" : "block",
    transition: "display 0.3s ease",
  };

  const sidebarStyle3 = {
    transform: isSidebarOpen ? "rotate(-45deg)" : "none",
    transition: "transform 0.3s ease",
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={`bg-white w-5 h-0.5 transform ${isSidebarOpen ? "rotate-45" : "rotate-0"} transition-transform`}></div>
      <div className={`bg-white w-5 h-0.5 ${isSidebarOpen ? "hidden" : "block"} transition-opacity`}></div>
      <div className={`bg-white w-5 h-0.5 transform ${ isSidebarOpen ? "-rotate-45" : "rotate-0"} transition-transform`}></div>
    </div>
  );
};

export default ToggleButton;
