import React, { useContext } from "react";
import { MdOutlineEventSeat } from "react-icons/md";

import "./styles.scss";
import SeatMatrix from "./SeatMatrix";
import MovieContext from "../../Contexts/MovieContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SeatsLayout = () => {
  const navigate = useNavigate();
  const { movies, changeState } = useContext(MovieContext);
  const totalSelectedSeats = movies.totalSeatsSelected;
  const totalPrice = movies.ticketsPrice;
  const bookedSeats = movies.bookedSeats;
  const selectedSeats = movies.selectedSeats;
  const isUserLogedIn = Cookies.get("Token");

  const addToBookedSeats = () => {
    if (isUserLogedIn) {
      changeState({
        ...movies,
        bookedSeats: [...bookedSeats, ...selectedSeats],
      });
      navigate("/payment");
    } else {
      changeState({
        ...movies,
        SignInModal: true,
      });
    }
  };

  return (
    <div className="seating-layout-container">
      <div className="seating-layout">
        <div className="tikets-container">
          <SeatMatrix />
        </div>
        <div className="seats-status">
          <h3>Keys To Seat Layout:</h3>
          <div className="status">
            <MdOutlineEventSeat style={{ color: "grey", fontSize: "30px" }} />
            <p>Available</p>
          </div>
          <div className="status">
            <MdOutlineEventSeat style={{ color: "red", fontSize: "30px" }} />
            <p>UnAvailable</p>
          </div>
          <div className="status">
            <MdOutlineEventSeat
              style={{ color: "rgb(79, 219, 79)", fontSize: "30px" }}
            />
            <p>Your Selection</p>
          </div>
        </div>
      </div>
      <div className="selected-tickets">
        <span>Tickets Selected:{totalSelectedSeats}</span>
        <span>Total Amount:{totalPrice}</span>
        <button onClick={addToBookedSeats}>Proceed</button>
      </div>
    </div>
  );
};

export default SeatsLayout;
