import React from "react";
import "./LogoLoader.css";

export default function CustomizeLoader() {
  return (
    <div className="logo-loader-container">
      <div className="spinner">
        <img src={"/images/remindraLogo.png"} alt="logo" className="logo" />
      </div>
    </div>
  );
}
