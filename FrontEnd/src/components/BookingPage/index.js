import React, { useContext, useState } from "react";
import "./styles.scss";
import MovieContext from "../../Contexts/MovieContext";
import SeatsLayout from "../SeatsLayout";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const BookingPage = () => {
  const [ticketSelectionType, setTicketType] = useState("Standard");
  const [ticketSelectionQty, setTicketQty] = useState("");
  const { movies, changeState } = useContext(MovieContext);
  const { movieName, theaterName } = useParams();

  const updateContextState = () => {
    changeState({
      ...movies,
      ticketType: ticketSelectionType,
      ticketQty: ticketSelectionQty,
    });
  };

  return (
    <>
      <Header />
      <div className="booking-container">
        <div className="theater-name">
          <p>{theaterName}</p>
          <p>{movieName}</p>
        </div>
        <div className="select-container">
          <select
            defaultValue={"Standard"}
            onChange={(e) => setTicketType(e.target.value)}
            onBlur={updateContextState}
          >
            <option value="Ticket Type">Ticket Type</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
          <select
            defaultValue={"1"}
            onChange={(e) => setTicketQty(e.target.value)}
            onBlur={updateContextState}
          >
            <option value="Qty">Qty</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <SeatsLayout />
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
