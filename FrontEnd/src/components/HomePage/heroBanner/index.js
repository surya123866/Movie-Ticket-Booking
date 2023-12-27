import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import bannerbg from "../../../images/banner-bg2.png";

const Herobanner = () => {
  const navigate = useNavigate();

  return (
    <div className="heroBanner" style={{ backgroundImage: `url(${bannerbg})` }}>
      <div className="opacity-layer"></div>
      <div className="banner-container">
        <span className="title">Welcome to ReelBook.com</span>
        <span className="sub-title">Get Your Movie Tickets Now!</span>
      </div>
    </div>
  );
};

export default Herobanner;
