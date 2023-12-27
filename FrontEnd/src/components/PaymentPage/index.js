import React, { useContext, useState } from "react";
import MovieContext from "../../Contexts/MovieContext";
import Header from "../Header";
import Footer from "../Footer";

import "./styles.scss";

const PaymentPage = () => {
  const { movies } = useContext(MovieContext);
  const { selectedSeats, ticketType, ticketsPrice } = movies;
  const [isPaid, setPaidStatus] = useState(false); // Corrected variable names and useState usage

  // Convert the selectedSeats array to a comma-separated string
  const selectedSeatsString = selectedSeats.join(", ");

  return (
    <>
      <Header />
      <div className="payment-container">
        {isPaid ? (
          <div className="payment-successful">
            <h1 style={{ color: "rgb(79, 219, 79)" }}>
              Your payment is successful
            </h1>
          </div>
        ) : (
          <div>
            <p>Total Amount to pay: {ticketsPrice}</p>
            <p>Selected Seats: {selectedSeatsString}</p>
            <p>Ticket Type: {ticketType}</p>
            <button onClick={() => setPaidStatus(true)}>Pay</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
