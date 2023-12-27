import React, { useState } from "react";

import "./styles.scss";
import Header from "../Header";
import Footer from "../Footer";
import MoviesDashboard from "./moviesDashboard";
import TheatersDashboard from "./theatersDashboard";
import Users from "./usersDashboard";

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState("Movies");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="button-container">
          <button onClick={() => handleButtonClick("Movies")}>
            Movies Details
          </button>
          <button onClick={() => handleButtonClick("Theaters")}>
            Theaters Details
          </button>
          <button onClick={() => handleButtonClick("Users")}>
            Users Details
          </button>
        </div>
        <div>
          {activeButton === "Movies" && <MoviesDashboard />}
          {activeButton === "Theaters" && <TheatersDashboard />}
          {activeButton === "Users" && <Users />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
