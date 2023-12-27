import React, { useContext, useState, useEffect } from "react";
import { MdOutlineEventSeat } from "react-icons/md";

import MovieContext from "../../../Contexts/MovieContext";
import "./styles.scss";

const Seat = (props) => {
  const { seatno } = props;
  const { movies, changeState } = useContext(MovieContext);

  const [seatColor, setSeatColor] = useState(
    movies.bookedSeats.includes(seatno) ? "seat-red" : "seat-grey"
  );

  const seatClickHandler = (event) => {
    const isbookedSeat = movies.bookedSeats.includes(seatno);
    const selectedSeat = movies.selectedSeats.includes(seatno);

    if (isbookedSeat) {
      // Do nothing when a booked seat is clicked
      return;
    }

    if (!selectedSeat) {
      const selectedSeats = [...movies.selectedSeats, seatno];
      setSeatColor("seat-green");

      changeState({
        ...movies,
        selectedSeats: selectedSeats,
        totalSeatsSelected: movies.totalSeatsSelected + 1,
        ticketsPrice: movies.ticketsPrice + 10,
      });
    } else {
      const newMovieSeats = movies.selectedSeats.filter(
        (seat) => seat !== seatno
      );
      setSeatColor("seat-grey");
      changeState({
        ...movies,
        selectedSeats: newMovieSeats,
        totalSeatsSelected: movies.totalSeatsSelected - 1,
        ticketsPrice: movies.ticketsPrice - 10,
      });
    }
  };

  useEffect(() => {
    setSeatColor(
      movies.bookedSeats.includes(seatno) ? "seat-red" : "seat-grey"
    );
  }, [movies.bookedSeats, seatno]);

  return (
    <div className="seat-container" onClick={seatClickHandler}>
      <MdOutlineEventSeat className={`seat ${seatColor}`} />
    </div>
  );
};

export default Seat;
